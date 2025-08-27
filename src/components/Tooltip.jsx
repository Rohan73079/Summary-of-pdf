import React from 'react';
const Tooltip = ({ children, text }) => (
  <div className="relative flex items-center group">
    {children}
    <div className="absolute bottom-full mb-2 w-max bg-black/80 text-white text-xs rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">{text}</div>
  </div>
);
export default Tooltip;
