import React, { useState } from 'react';
import { ITourFormProps } from '@/interface/ITourFormProps';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

export const TourForm: React.FC<ITourFormProps> = (props) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const handleUpload = (file: File, imageUrl: string) => {
    props.setImgUrl(imageUrl);
  };

  const handleUploadList = (file: File, imageUrl: string) => {
    props.setListImg((prevListImg: string[]) => [...prevListImg, imageUrl]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.handleSubmit(e);
  };

  return (
    <div className="items-center">
      {currentStep === 1 && <Step1 {...props} />}
      {currentStep === 2 && <Step2 {...props} />}
      {currentStep === 3 && (
        <Step3 {...props} handleUploadList={handleUploadList} />
      )}
      {currentStep === 4 && <Step4 {...props} handleUpload={handleUpload} />}
      <div className="flex justify-between col-span-full mt-8">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-xl text-white bg-indigo-700 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Anterior
          </button>
        )}
        {currentStep < 4 ? (
          <button
            type="button"
            onClick={handleNext}
            className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-xl text-white bg-indigo-700 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Siguiente
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-xl text-white bg-indigo-700 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Agregar tour
          </button>
        )}
      </div>
    </div>
  );
};
