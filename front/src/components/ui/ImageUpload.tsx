import React, { ChangeEvent, useState, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

interface ImageUploadProps {
  onUpload: (file: File, url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      uploadFile(file);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);
    setErrorMessage(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/files/uploadFile`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      onUpload(file, response.data);
      setUploadSuccess(true);
      // Swal.fire('Tu imagen se subió correctamente!');
    } catch (error) {
      console.error('Error al subir el archivo123:', error);
      setErrorMessage(
        'Asegurate de que la imagen es mayor a 10 KB, formato .jpg .webp .png',
      );
      setUploadSuccess(false);
      // Swal.fire('Ocurrió un error al subir tu imagen!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden border-2 border-lime-500"
      />
      <div className="mt-1 flex items-center">
        <input
          type="text"
          readOnly
          value={selectedFile ? selectedFile.name : ''}
          placeholder="Selecciona una imagen..."
          className="mr-2 flex-1 block w-full text-sm text-gray-900 border border-lime-500 rounded-xl cursor-pointer bg-gray-50 focus:outline-none px-3 py-2 shadow-xl"
        />
        <button
          type="button"
          onClick={handleClick}
          className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-xl text-white bg-indigo-700 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={uploading}
        >
          {uploading ? 'Subiendo...' : 'Seleccionar'}
        </button>
        {uploadSuccess === true && (
          <div className="ml-2 text-green-500">
            <svg
              className="h-8 w-8 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}
        {uploadSuccess === false && (
          <div className="ml-2 text-red-500">
            <svg
              className="h-8 w-8 text-red-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              {' '}
              <circle cx="12" cy="12" r="10" />{' '}
              <line x1="15" y1="9" x2="9" y2="15" />{' '}
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
        )}
      </div>
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
};

export default ImageUpload;
