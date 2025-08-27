import React from 'react';
import { Check, Clipboard, Download, Trash2, History } from 'lucide-react';
import Tooltip from './Tooltip';
const SummaryHistory = ({ items, copySuccessId, onCopy, onDownload, onDelete, onClear, classes }) => {
  if(!items?.length) return null;
  return (
    <div className="space-y-4 mt-6 slide-in" style={{animationDelay: '0.2s'}}>
      <div className="flex justify-between items-center"><h3 className="text-xl font-bold flex items-center gap-2"><History size={20}/> History</h3>
        <Tooltip text="Clear All History"><button onClick={onClear} className={'flex items-center gap-2 px-3 py-1 text-xs rounded-md transition-all duration-300 ' + classes.buttonSecondary}><Trash2 size={14}/> Clear</button></Tooltip>
      </div>
      <div className="space-y-3">{items.map(item => (
        <div key={item.id} className={'p-4 rounded-xl border transition-colors duration-300 ' + classes.controlBg + ' shadow-md'}>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2 flex-wrap"><span className={'px-2 py-0.5 text-xs rounded-full ' + classes.buttonSecondary}>{item.style}</span><span className={'px-2 py-0.5 text-xs rounded-full ' + classes.buttonSecondary}>{item.length}</span></div>
            <div className="flex items-center gap-2">
              <Tooltip text={copySuccessId===item.id ? 'Copied!' : 'Copy'}><button onClick={() => onCopy(item.text,item.id)} className={'p-2 rounded-lg transition-all duration-300 ' + classes.buttonSecondary}>{copySuccessId===item.id ? <Check size={14} className="text-green-400"/> : <Clipboard size={14}/>}</button></Tooltip>
              <Tooltip text="Download PDF"><button onClick={() => onDownload(item.text)} className={'p-2 rounded-lg transition-all duration-300 ' + classes.buttonSecondary}><Download size={14}/></button></Tooltip>
              <Tooltip text="Delete"><button onClick={() => onDelete(item.id)} className={'p-2 rounded-lg transition-all duration-300 ' + classes.buttonSecondary}><Trash2 size={14}/></button></Tooltip>
            </div>
          </div>
          <p className={'text-sm whitespace-pre-wrap leading-relaxed max-h-24 overflow-y-auto ' + classes.textSecondary}>{item.text}</p>
        </div>
      ))}</div>
    </div>
  );
};
export default SummaryHistory;
