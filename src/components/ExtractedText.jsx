import React from 'react';
const ExtractedText = ({ text, classes }) => (
  <div className={'p-6 mt-6 rounded-xl border transition-colors duration-300 ' + classes.controlBg + ' shadow-lg slide-in'} style={{animationDelay: '0.1s'}}>
    <h3 className="text-xl font-bold mb-4">Extracted Text</h3>
    <p className={'whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto text-sm pr-2 ' + classes.textSecondary}>{text}</p>
  </div>
);
export default ExtractedText;
