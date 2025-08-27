import React from 'react';
import { Check, Clipboard, Download } from 'lucide-react';
import Tooltip from './Tooltip';
const SummaryDisplay = ({ summary, copySuccessId, onCopy, onDownload, classes }) => {
  return (
    <div className={'p-6 rounded-xl border transition-colors duration-300 ' + classes.controlBg + ' shadow-lg slide-in'}>
      <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-bold">Generated Summary</h3>
        <div className="flex items-center gap-2">
          <Tooltip text={copySuccessId==='current' ? 'Copied!' : 'Copy'}><button onClick={() => onCopy(summary,'current')} className={'p-2 rounded-lg transition-all duration-300 ' + classes.buttonSecondary}>{copySuccessId==='current' ? <Check size={16} className="text-green-400"/> : <Clipboard size={16}/>}</button></Tooltip>
          <Tooltip text="Download PDF"><button onClick={() => onDownload(summary)} className={'p-2 rounded-lg transition-all duration-300 ' + classes.buttonSecondary}><Download size={16}/></button></Tooltip>
        </div>
      </div>
      <p className={'whitespace-pre-wrap leading-relaxed ' + classes.textSecondary}>{summary}</p>
    </div>
  );
};
export default SummaryDisplay;
