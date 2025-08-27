import { useCallback, useRef, useState } from 'react';
import { callGeminiApi } from '../api/geminiApi';
import { ensureExternalLibs, extractTextFromFile as extractText } from '../utils/fileUtils';

export const useSummary = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [summary, setSummary] = useState('');
  const [summaryHistory, setSummaryHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const progressIntervalRef = useRef(null);

  const extractTextFromFile = useCallback(async (fileToProcess) => {
    if (!fileToProcess) return;
    setIsLoading(true); setProgress(0); setError(''); setExtractedText(''); setSummary('');
    try {
      await ensureExternalLibs();
      const text = await extractText(fileToProcess, callGeminiApi, setError, setLoadingStep, setProgress);
      if (text) setExtractedText(text); else setError('Could not extract text.');
    } catch (e) { setError(`Extraction error: ${e.message}`); }
    finally { setIsLoading(false); setLoadingStep(''); setProgress(0); }
  }, []);

  const generateSummary = useCallback(async (summaryStyle, summaryLength) => {
    if (!extractedText) { setError('No text to summarize.'); return; }
    setIsLoading(true); setLoadingStep('Summarizing...');
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    progressIntervalRef.current = setInterval(() => { setProgress(p => { if (p>=99) { clearInterval(progressIntervalRef.current); return 99; } return p+1; }); }, 150);
    try {
      const styleInstruction = { paragraph: 'as a single, coherent paragraph.', bullets: 'as a concise bulleted list.', keywords: 'as a comma-separated list of the main keywords.' }[summaryStyle];
      const prompt = `Generate a ${summaryLength} summary for the following text, formatted ${styleInstruction}\n\n---\n${extractedText}\n---`;
      const payload = { contents: [{ parts: [{ text: prompt }] }] };
      const result = await callGeminiApi(payload, setError);
      clearInterval(progressIntervalRef.current); setProgress(100);
      const cleaned = (result||'').replace(/\s*undefined[\W]*$/i,'').trim();
      if (cleaned) { setSummary(cleaned); const newItem = { id: Date.now(), text: cleaned, style: summaryStyle, length: summaryLength }; setSummaryHistory(prev => [newItem,...prev].slice(0,5)); }
      else setError('The AI failed to generate a valid summary. Please try again.');
    } catch (e) { clearInterval(progressIntervalRef.current); setError('Failed to generate summary.'); }
    finally { setTimeout(()=>{ setIsLoading(false); setLoadingStep(''); setProgress(0); },400); }
  }, [extractedText]);

  const handleFileChange = (sf) => { if (sf) { setFile(sf); extractTextFromFile(sf); } };
  const resetAll = () => { setFile(null); setExtractedText(''); setSummary(''); setError(''); setIsLoading(false); };

  return { state: { file, extractedText, summary, summaryHistory, isLoading, loadingStep, progress, error }, actions: { handleFileChange, generateSummary, resetAll, setSummaryHistory, setSummary, setExtractedText, setError, setIsLoading, setProgress } };
};
