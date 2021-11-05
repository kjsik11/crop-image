import cn from 'classnames';
import { useRef, useState } from 'react';

import { useNoti } from '@src/lib/hooks/use-noti';

const VALID_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

interface DragDropProps {
  className?: string;
  id?: string;
  onDropFile: (file: File) => void | Promise<void>;
  maximumSize?: number;
}

export default function DragDrop({
  className,
  id = 'file-upload',
  onDropFile,
  maximumSize = 10,
}: DragDropProps) {
  const [dragOverStatus, setDragOverStatus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isValidFileSize = (file: File) => file.size < maximumSize * 1000 * 1000;

  const { showNoti } = useNoti();

  return (
    <div
      className={cn(
        className,
        'mt-1 flex justify-center items-center px-6 py-3 h-36 border-2 border-dashed rounded-md transition-colors',
        dragOverStatus ? 'border-gray-500' : 'border-gray-300',
      )}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        setDragOverStatus(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        setDragOverStatus(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOverStatus(false);

        const droppedFile = e.dataTransfer.files[0];

        if (!VALID_FILE_TYPES.includes(droppedFile.type)) {
          return showNoti({
            variant: 'alert',
            title: `Invalid file type: ${droppedFile.type ?? 'Unknown'}`,
          });
        }

        // FIXME: file size validation? windows vs macos
        if (!isValidFileSize(droppedFile)) {
          return showNoti({
            variant: 'alert',
            title: `Exceeded maximum file size ${(droppedFile.size / 1000 / 1000).toFixed(
              1,
            )}MB (Max: ${maximumSize}MB)`,
          });
        }

        onDropFile(droppedFile);
      }}
    >
      {dragOverStatus ? (
        <p className="font-medium text-gray-700">drop a file here</p>
      ) : (
        <div className="space-y-1 flex flex-col items-center">
          <div className="text-sm text-gray-600">
            <button className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:underline hover:text-blue-500 focus-within:outline-none">
              Upload a file
            </button>
            <span className="pl-1">&nbsp;or drag and drop image</span>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to {maximumSize}MB</p>
        </div>
      )}
      <input
        id={id}
        ref={inputRef}
        name="file-upload"
        type="file"
        className="hidden"
        accept="image/gif, image/jpeg, image/png"
        onChange={(e) => {
          if (!e.target.files || !e.target.files[0]) return;

          const file = e.target.files[0];

          if (!isValidFileSize(file)) {
            return showNoti({
              variant: 'alert',
              title: `Exceeded maximum file size ${(file.size / 1000 / 1000).toFixed(
                1,
              )}MB (Max: ${maximumSize}MB)`,
            });
          }

          onDropFile(file);
        }}
      />
    </div>
  );
}
