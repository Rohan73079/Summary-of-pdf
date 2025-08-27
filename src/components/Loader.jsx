import React from 'react';
const Loader = ({ loadingStep, progress, classes }) => (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-50">
    <div className="w-64"><div className="flex justify-between mb-1"><span className="text-base font-medium text-green-300">{loadingStep}</span><span className="text-sm font-medium text-green-300">{Math.round(progress)}%</span></div>
    <div className={'w-full rounded-full h-2.5 ' + classes.buttonSecondary}><div className="bg-green-500 h-2.5 rounded-full transition-all duration-500" style={{width: `${progress}%`}}></div></div></div>
  </div>
);
export default Loader;
