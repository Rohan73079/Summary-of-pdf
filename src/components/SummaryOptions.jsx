import React from 'react';
const SummaryOptions = ({ summaryStyle, setSummaryStyle, summaryLength, setSummaryLength, classes }) => {
  return (
    <div className="mt-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-3">Style</h2>
        <div className="grid grid-cols-3 gap-2">{['paragraph','bullets','keywords'].map(style => (<button key={style} onClick={() => setSummaryStyle(style)} className={'px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ' + (summaryStyle===style ? classes.buttonActive : classes.buttonSecondary)}>{style.charAt(0).toUpperCase() + style.slice(1)}</button>))}</div>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-3">Length</h2>
        <div className="grid grid-cols-3 gap-2">{['short','medium','long'].map(len => (<button key={len} onClick={() => setSummaryLength(len)} className={'px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ' + (summaryLength===len ? classes.buttonActive : classes.buttonSecondary)}>{len.charAt(0).toUpperCase() + len.slice(1)}</button>))}</div>
      </div>
    </div>
  );
};
export default SummaryOptions;
