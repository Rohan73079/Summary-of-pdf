import React from 'react';
import { UploadCloud } from 'lucide-react';
const FileUpload = ({ onFile, onDrop, onDrag, isDragging, accept, textAccent, textSecondary, dropZone, dropZoneActive }) => {
  return (
    <div className={"w-full p-8 border-2 border-dashed rounded-2xl text-center transition-all duration-300 " + (isDragging ? dropZoneActive : dropZone)} onDrop={onDrop} onDragOver={onDrag} onDragEnter={onDrag} onDragLeave={onDrag}>
      <div className={'flex flex-col items-center justify-center space-y-4 ' + textSecondary}>
        <UploadCloud className={'w-12 h-12 ' + textAccent} />
        <p><label htmlFor="file-upload" className={'font-semibold cursor-pointer ' + textAccent + ' hover:underline'}>Upload a file</label>{' '}or drag & drop</p>
        <p className="text-xs">PDF or Image (JPG, PNG, WEBP)</p>
        <input id="file-upload" type="file" className="sr-only" accept={accept} onChange={(e)=> onFile(e.target.files[0])} />
      </div>
    </div>
  );
};
export default FileUpload;
