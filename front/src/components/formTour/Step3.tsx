import React from 'react';
import Hotel from './ReturnFormulario/Hotel';
import DirecHotel from './ReturnFormulario/DirecHotel';
import { ITourFormProps } from '@/interface/ITourFormProps';
import MultipleImageUpload from '../ui/MultipleImageUpload';

interface Step3Props extends ITourFormProps {
  handleUploadList: (file: File, url: string) => void;
}

const Step3: React.FC<Step3Props> = ({
  hotel,
  setHotel,
  address,
  setAddress,
  handleUploadList,
}) => (
  <div>
    <Hotel hotel={hotel} setHotel={setHotel} />
    <DirecHotel address={address} setAddress={setAddress} />
    <div>
      <p className="mb-1">Imágenes del hotel</p>
      <div className="mt-1">
        <MultipleImageUpload onUpload={handleUploadList} />
      </div>
    </div>
  </div>
);

export default Step3;
