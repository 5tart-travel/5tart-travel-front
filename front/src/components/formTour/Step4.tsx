import React from 'react';
import Descripcion from './ReturnFormulario/Descripcion';
import ImageUpload from '../ui/ImageUpload';
import CheckOferta from './ReturnFormulario/CheckOferta';
import { ITourFormProps } from '@/interface/ITourFormProps';

interface Step4Props extends ITourFormProps {
  handleUpload: (file: File, url: string) => void;
}
const Step4: React.FC<Step4Props> = ({
  description,
  setDescription,
  handleUpload,
  oferta,
  setOferta,
}) => (
  <div>
    <Descripcion description={description} setDescription={setDescription} />

    <div>
      <p className="mb-1">Imagen del tour</p>
      <div className="mt-1 ">
        <ImageUpload onUpload={handleUpload} />
      </div>
    </div>
    <CheckOferta oferta={oferta} setOferta={setOferta} />
  </div>
);

export default Step4;
