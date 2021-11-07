import 'react-image-crop/dist/ReactCrop.css';

import { ChevronDownIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';

import { Button, Dropdown } from '@src/components/ui';
import DragDrop from '@src/components/ui/DragDrop';

export default function IndexPage() {
  const [originImage, setOriginImage] = useState<File | null>(null);
  const [downloadFileName, setDownloadFileName] = useState<string>('');
  const [crop, setCrop] = useState<Crop>({
    unit: '%', // default, can be 'px' or '%'s
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });

  const [currentRatio, setCurrentRatio] = useState<'16 / 9' | '1 / 1'>('1 / 1');

  const ratioList = [
    { label: '16 / 9', onClick: () => setCurrentRatio('16 / 9') },
    { label: '1 / 1', onClick: () => setCurrentRatio('1 / 1') },
  ];

  return (
    <div className="max-w-7xl mx-auto pt-24 px-8">
      <h1 className="text-7xl text-center font-semibold">React cropper!!</h1>
      <section className="grid grid-cols-2 gap-8 mt-20 h-[500px]">
        <div className="rounded-sm flex justify-center items-center">
          {originImage ? (
            <ReactCrop
              onImageLoaded={() => {}}
              src={URL.createObjectURL(originImage)}
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
            />
          ) : (
            <DragDrop
              className="hidden sm:flex justify-center mt-4"
              maximumSize={20}
              onDropFile={(image) => setOriginImage(image)}
            />
          )}
        </div>
        {originImage && (
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-lg font-medium">FileName: {originImage.name}</p>
              <p className="mt-4 text-gray-700">Ratio</p>
              <Dropdown
                dropdownItems={ratioList}
                button={
                  <div className="border border-black rounded-md w-56 h-12 px-4 flex justify-between items-center">
                    {currentRatio}
                    <ChevronDownIcon className="w-5 h-5" />
                  </div>
                }
              />
              <p className="mt-4">Set File name</p>
              <input onChange={(e) => setDownloadFileName(e.target.value)} />
            </div>
            <div className="self-end w-full">
              <Button full size="lg">
                Crop
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
