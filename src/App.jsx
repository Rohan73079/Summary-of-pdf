import React, { useEffect, useState } from 'react';
import { File, X, Wand2, Sun, Moon, Sparkles } from 'lucide-react';
import Tooltip from './components/Tooltip';
import FileUpload from './components/FileUpload';
import SummaryOptions from './components/SummaryOptions';
import SummaryDisplay from './components/SummaryDisplay';
import ExtractedText from './components/ExtractedText';
import SummaryHistory from './components/SummaryHistory';
import Loader from './components/Loader';
import { themeClasses } from './styles/themeClasses';
import { handleDownloadPDF } from './utils/pdfUtils';
import { useSummary } from './hooks/useSummary';

export default function App() {
  const [summaryStyle, setSummaryStyle] = useState('paragraph');
  const [summaryLength, setSummaryLength] = useState('medium');
  const [theme, setTheme] = useState('dark');
  const [isDragging, setIsDragging] = useState(false);
  const [copySuccessId, setCopySuccessId] = useState(null);

  const { state: { file, extractedText, summary, summaryHistory, isLoading, loadingStep, progress, error }, actions: { handleFileChange, generateSummary, resetAll, setSummaryHistory }, } = useSummary();

  useEffect(() => { const savedTheme = localStorage.getItem('theme') || 'dark'; setTheme(savedTheme); const savedHistory = JSON.parse(localStorage.getItem('summaryHistory') || '[]'); setSummaryHistory(savedHistory); }, [setSummaryHistory]);
  useEffect(() => { localStorage.setItem('theme', theme); document.documentElement.className = theme; }, [theme]);
  useEffect(() => { localStorage.setItem('summaryHistory', JSON.stringify(summaryHistory)); }, [summaryHistory]);

  const toggleTheme = () => setTheme(prev => (prev==='light' ? 'dark' : 'light'));
  const handleFileDrop = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); if (e.dataTransfer.files?.[0]) handleFileChange(e.dataTransfer.files[0]); };
  const handleDragEvents = (e) => { e.preventDefault(); e.stopPropagation(); if (e.type==='dragenter' || e.type==='dragover') setIsDragging(true); else if (e.type==='dragleave') setIsDragging(false); };

  const copyToClipboard = (text, id) => { try { const textArea = document.createElement('textarea'); textArea.value = text; textArea.style.position='fixed'; textArea.style.top='-9999px'; textArea.style.left='-9999px'; document.body.appendChild(textArea); textArea.select(); document.execCommand('copy'); document.body.removeChild(textArea); setCopySuccessId(id); setTimeout(()=>setCopySuccessId(null),2000);} catch(_){}}

  const currentTheme = themeClasses[theme];

  return (
    <>
      <div className={'min-h-screen w-full font-sans transition-colors duration-300 ' + currentTheme.bg + ' ' + currentTheme.text}>
        <div className="grid lg:grid-cols-[400px_1fr]">
          <aside className={'flex flex-col p-6 border-r transition-colors duration-300 ' + currentTheme.cardBg + ' h-screen lg:h-auto lg:min-h-screen'}>
            <header className="mb-8 slide-in">
              <div className="flex justify-between items-center"><h1 className="text-3xl font-bold">Snap<span className={currentTheme.textAccent}>Read</span></h1>
                <Tooltip text={`Switch to ${theme==='light' ? 'Dark' : 'Light'} Mode`}><button onClick={toggleTheme} className={'p-2 rounded-full transition-all duration-300 hover:scale-105 ' + currentTheme.buttonSecondary}>{theme==='light' ? <Moon size={20}/> : <Sun size={20} className="text-yellow-400"/>}</button></Tooltip>
              </div>
              <p className={'mt-2 text-sm ' + currentTheme.textSecondary}>Read Less, Know More</p>
            </header>

            {!file ? (
              <div className="flex-grow flex flex-col items-center justify-center slide-in" style={{animationDelay: '0.1s'}}>
                <FileUpload onFile={handleFileChange} onDrop={handleFileDrop} onDrag={handleDragEvents} isDragging={isDragging} accept=".pdf,image/*" textAccent={currentTheme.textAccent} textSecondary={currentTheme.textSecondary} dropZone={currentTheme.dropZone} dropZoneActive={currentTheme.dropZoneActive} />
              </div>
            ) : (
              <div className="flex-grow flex flex-col slide-in" style={{animationDelay: '0.1s'}}>
                <div className={'w-full p-4 rounded-xl flex items-center justify-between border transition-colors duration-300 ' + currentTheme.controlBg + ' shadow-md'}>
                  <div className="flex items-center space-x-3 overflow-hidden"><File className={'w-6 h-6 ' + currentTheme.textAccent + ' flex-shrink-0'} /><span className={'font-medium truncate'}>{file.name}</span></div>
                  <Tooltip text="Start Over"><button onClick={resetAll} className={'p-1.5 rounded-full transition-all duration-300 hover:scale-105 ' + currentTheme.buttonSecondary}><X size={16}/></button></Tooltip>
                </div>

                {extractedText && (<>
                  <SummaryOptions summaryStyle={summaryStyle} setSummaryStyle={setSummaryStyle} summaryLength={summaryLength} setSummaryLength={setSummaryLength} classes={currentTheme} />
                  <button onClick={() => generateSummary(summaryStyle, summaryLength)} disabled={!extractedText || isLoading} className={'w-full mt-6 flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 animated-bg-button'}><Wand2 size={20}/> <span>Generate Summary</span></button>
                </>) }
              </div>
            )}
          </aside>

          <main className="p-6 md:p-10 overflow-y-auto h-screen">
            {error && (<div className={'w-full p-4 mb-6 text-center rounded-lg border slide-in ' + currentTheme.cardBg}><p className="text-red-500">{error}</p></div>)}

            {!file && summaryHistory.length===0 && !summary && (
              <div className={'p-6 rounded-xl border transition-colors duration-300 ' + currentTheme.controlBg + ' shadow-lg slide-in text-center flex flex-col items-center justify-center h-full'}>
                <Sparkles className={'w-16 h-16 mb-4 ' + currentTheme.textAccent} />
                <h2 className="text-2xl font-bold mb-2">Welcome to SnapRead</h2>
                <p className={currentTheme.textSecondary + ' mb-6 max-w-sm'}>Get started by uploading a document on the left. SnapRead will extract the text and generate a smart summary for you.</p>
                <div className="space-y-2 text-left"><p className="flex items-center gap-2">✓ PDF & Image Support</p><p className="flex items-center gap-2">✓ Customizable Summaries</p><p className="flex items-center gap-2">✓ PDF Downloads</p></div>
              </div>
            )}

            {summary && <SummaryDisplay summary={summary} copySuccessId={copySuccessId} onCopy={copyToClipboard} onDownload={(text) => handleDownloadPDF(text, () => {})} classes={currentTheme} />}
            {extractedText && <ExtractedText text={extractedText} classes={currentTheme} />}
            {summaryHistory.length>0 && !file && <SummaryHistory items={summaryHistory} copySuccessId={copySuccessId} onCopy={copyToClipboard} onDownload={(text)=> handleDownloadPDF(text, ()=>{})} onDelete={(id) => setSummaryHistory(prev => prev.filter(i=> i.id !== id))} onClear={() => setSummaryHistory([])} classes={currentTheme} />}
          </main>
        </div>
      </div>

      {isLoading && <Loader loadingStep={loadingStep} progress={progress} classes={currentTheme} />}
    </>
  );
}
