import React from 'react';
import NombreEmpresaTrans from './ReturnFormulario/NombreEmpresaTrans';
import NacionalInter from './ReturnFormulario/NacionalInter';
import AeropuertoTerminal from './ReturnFormulario/AeropuertoTerminal';
import { ITourFormProps } from '@/interface/ITourFormProps';
import TipoTransporte from './ReturnFormulario/TipoTransporte';

const Step2: React.FC<ITourFormProps> = ({
  empresa,
  setEmpresa,
  region,
  setRegion,
  salida,
  setSalida,
  transportType,
  setTransportType,
}) => (
  <div>
    <TipoTransporte
      transportType={transportType}
      setTransportType={setTransportType}
    />
    <NombreEmpresaTrans
      empresa={empresa}
      setEmpresa={setEmpresa}
      transportType={transportType}
    />
    <NacionalInter region={region} setRegion={setRegion} />
    <AeropuertoTerminal salida={salida} setSalida={setSalida} />
  </div>
);

export default Step2;
