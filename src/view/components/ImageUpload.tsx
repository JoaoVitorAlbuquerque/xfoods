import { ChangeEvent, useState } from "react";

import noImage from './icons/no-image.svg';
import selectImage from './icons/select-image.svg';
import { CrossCircledIcon } from "@radix-ui/react-icons";

interface ImageUploadProps {
  label: string;
  value?: string;
  // onImageChange(imageUrl: string | null): void;
  onImageChange(imageUrl: File | null): void;
  error?: string;
}

export function ImageUpload({ label, value, onImageChange, error }: ImageUploadProps) {
  // const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(value || null);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      onImageChange(file);
    } else {
      setSelectedImage(null);
      onImageChange(null);
    }
  }

  return (
    <>
      <label htmlFor="imageInput" className="text-gray-400 font-semibold text-lg">
        {label}
      </label>
      <div className="w-[416px] border rounded-lg flex flex-col items-center justify-center">
        {selectedImage === null ? (
          <div className="flex flex-col items-center justify-center h-40 w-full bg-gray-100">
            <img src={noImage} alt="Sem imagem" />
          </div>
        ) : (
          <img src={selectedImage} alt="Selected" className="max-h-40 mb-4" />
        )}

        <label
          htmlFor="imageInput"
          className="flex items-center cursor-pointer text-red-600 font-semibold py-4"
        >
          <img src={selectImage} alt="Selecione a imagem" />
          Alterar Imagem
        </label>

        <input
          type="file"
          id="imageInput"
          accept="image/*"
          className="hidden"
          value={value}
          onChange={handleImageChange}
        />
      </div>

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />

          <span className="text-xs">{error}</span>
        </div>
      )}
    </>
  );
}
