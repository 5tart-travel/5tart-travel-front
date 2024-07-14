import React from 'react';
import Descripcion from './ReturnFormulario/Descripcion';
import ImageUpload from '../ui/ImageUpload';
import MultipleImageUpload from '../ui/MultipleImageUpload';
import CheckOferta from './ReturnFormulario/CheckOferta';
import { ITourFormProps } from '@/interface/ITourFormProps';

const Step3: React.FC<ITourFormProps> = ({
  description,
  setDescription,
  handleUpload,
  handleUploadList,
  oferta,
  setOferta,
}) => (
  <div>
    <Descripcion description={description} setDescription={setDescription} />
    <div>
      <p className="mb-1">Imagenes del hotel</p>
      <div className="mt-1">
        <MultipleImageUpload onUpload={handleUploadList} />
      </div>
    </div>
    <div>
      <p className="mb-1">Imagen del tour</p>
      <div className="mt-1 ">
        <ImageUpload onUpload={handleUpload} />
      </div>
    </div>
    <CheckOferta oferta={oferta} setOferta={setOferta} />
  </div>
);

export default Step3;
