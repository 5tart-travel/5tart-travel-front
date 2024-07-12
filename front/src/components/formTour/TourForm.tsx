import ImageUpload from '../ui/ImageUpload';
import MultipleImageUpload from '../ui/MultipleImageUpload';
import Provincia from './ReturnFormulario/Provincia';
import Titulo from './ReturnFormulario/Tititulo';
import Precio from './ReturnFormulario/Precio';
import FechaIngreso from './ReturnFormulario/FechaIngreso';
import FechaEgreso from './ReturnFormulario/FechaEgreso';
import Hotel from './ReturnFormulario/Hotel';
import DirecHotel from './ReturnFormulario/DirecHotel';
import TipoTransporte from './ReturnFormulario/TipoTransporte';
import NacionalInter from './ReturnFormulario/NacionalInter';
import NombreEmpresaTrans from './ReturnFormulario/NombreEmpresaTrans';
import AeropuertoTerminal from './ReturnFormulario/AeropuertoTerminal';
import Descripcion from './ReturnFormulario/Descripcion';
import CheckOferta from './ReturnFormulario/CheckOferta';
import { ITourFormProps } from '@/interface/ITourFormProps';

export const TourForm: React.FC<ITourFormProps> = ({
  title,
  setTitle,
  price,
  setPrice,
  description,
  setDescription,
  address,
  setAddress,
  fecha_ingreso,
  setFecha_ingreso,
  fecha_egreso,
  setFecha_egreso,
  destino,
  setDestino,
  salida,
  setSalida,
  transportType,
  setTransportType,
  region,
  setRegion,
  hotel,
  setHotel,
  empresa,
  setEmpresa,
  imgUrl,
  setImgUrl,
  listImg,
  setListImg,
  oferta,
  setOferta,
  handleSubmit,
}) => {
  const handleUpload = (file: File, imageUrl: string) => {
    setImgUrl(imageUrl);
  };

  const handleUploadList = (file: File, imageUrl: string) => {
    setListImg((prevListImg) => [...prevListImg, imageUrl]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4"
    >
      <Provincia destino={destino} setDestino={setDestino} />
      <FechaIngreso
        fecha_ingreso={fecha_ingreso}
        setFecha_ingreso={setFecha_ingreso}
      />
      <Titulo title={title} setTitle={setTitle} />
      <FechaEgreso
        fecha_egreso={fecha_egreso}
        setFecha_egreso={setFecha_egreso}
      />
      <Precio price={price} setPrice={setPrice} />
      <TipoTransporte
        transportType={transportType}
        setTransportType={setTransportType}
      />
      <Hotel hotel={hotel} setHotel={setHotel} />
      <NombreEmpresaTrans
        empresa={empresa}
        setEmpresa={setEmpresa}
        transportType={transportType}
      />
      <DirecHotel address={address} setAddress={setAddress} />
      <Descripcion description={description} setDescription={setDescription} />
      <NacionalInter region={region} setRegion={setRegion} />
      <AeropuertoTerminal salida={salida} setSalida={setSalida} />
      <CheckOferta oferta={oferta} setOferta={setOferta} />
      <ImageUpload onUpload={handleUpload} />
      <MultipleImageUpload onUpload={handleUploadList} />{' '}
      <div className="flex justify-between">
        <button
          type="submit"
          className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-xl text-white bg-indigo-700 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Agregar
        </button>
      </div>
    </form>
  );
};
