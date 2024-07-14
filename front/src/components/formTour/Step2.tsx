import React from 'react';
import Hotel from './ReturnFormulario/Hotel';
import NombreEmpresaTrans from './ReturnFormulario/NombreEmpresaTrans';
import DirecHotel from './ReturnFormulario/DirecHotel';
import NacionalInter from './ReturnFormulario/NacionalInter';
import AeropuertoTerminal from './ReturnFormulario/AeropuertoTerminal';
import { ITourFormProps } from '@/interface/ITourFormProps';

const Step2: React.FC<ITourFormProps> = ({
  hotel,
  setHotel,
  empresa,
  setEmpresa,
  transportType,
  address,
  setAddress,
  region,
  setRegion,
  salida,
  setSalida,
}) => (
  <div>
    <Hotel hotel={hotel} setHotel={setHotel} />
    <NombreEmpresaTrans
      empresa={empresa}
      setEmpresa={setEmpresa}
      transportType={transportType}
    />
    <DirecHotel address={address} setAddress={setAddress} />
    <NacionalInter region={region} setRegion={setRegion} />
    <AeropuertoTerminal salida={salida} setSalida={setSalida} />
  </div>
);

export default Step2;
