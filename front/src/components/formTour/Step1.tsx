import React from 'react';
import Provincia from './ReturnFormulario/Provincia';
import FechaIngreso from './ReturnFormulario/FechaIngreso';
import Titulo from './ReturnFormulario/Tititulo';
import FechaEgreso from './ReturnFormulario/FechaEgreso';
import Precio from './ReturnFormulario/Precio';
import { ITourFormProps } from '@/interface/ITourFormProps';

const Step1: React.FC<ITourFormProps> = ({
  destino,
  setDestino,
  fecha_ingreso,
  setFecha_ingreso,
  title,
  setTitle,
  fecha_egreso,
  setFecha_egreso,
  price,
  setPrice,
}) => (
  <div>
    <Provincia destino={destino} setDestino={setDestino} />
    <Titulo title={title} setTitle={setTitle} />
    <Precio price={price} setPrice={setPrice} />
    <FechaIngreso
      fecha_ingreso={fecha_ingreso}
      setFecha_ingreso={setFecha_ingreso}
    />
    <FechaEgreso
      fecha_egreso={fecha_egreso}
      setFecha_egreso={setFecha_egreso}
    />
  </div>
);

export default Step1;
