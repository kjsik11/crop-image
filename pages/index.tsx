import { useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';

import DragDrop from '@src/components/ui/DragDrop';

import 'react-image-crop/dist/ReactCrop.css';

export default function IndexPage() {
  const [originImage, setOriginImage] = useState<File | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: 'px', // default, can be 'px' or '%'
    x: 130,
    y: 50,
    width: 200,
    height: 200,
  });

  return (
    <div className="max-w-7xl mx-auto pt-24">
      <h1 className="text-7xl text-center font-semibold">Crop Your Image!!</h1>
      <section className="mt-20 w-[500px] h-[500px] rounded-sm flex justify-center items-center border-gray-300 border">
        {originImage ? (
          <ReactCrop
            src={URL.createObjectURL(originImage)}
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
          />
        ) : (
          <DragDrop onDropFile={(image) => setOriginImage(image)} />
        )}
      </section>
    </div>
  );
}
