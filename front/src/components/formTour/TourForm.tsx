import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { ITourFormProps } from '@/interface/ITourFormProps';

export const TourForm: React.FC<ITourFormProps> = (props) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < 3) {
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
    props.setListImg((prevListImg) => [...prevListImg, imageUrl]);
  };

  const handleSubmit = () => {
    props.handleSubmit();
  };

  return (
    <div className="items-center">
      {currentStep === 1 && <Step1 {...props} />}
      {currentStep === 2 && <Step2 {...props} />}
      {currentStep === 3 && (
        <Step3
          {...props}
          handleUpload={handleUpload}
          handleUploadList={handleUploadList}
        />
      )}
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
        {currentStep < 3 ? (
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

// // import React, { useState } from 'react';
// // import Step1 from './Step1';
// // import Step2 from './Step2';
// // import Step3 from './Step3';
// // import { ITourFormProps } from '@/interface/ITourFormProps';

// // export const TourForm: React.FC<ITourFormProps> = (props) => {
// //   const [currentStep, setCurrentStep] = useState(1);

// //   const handleNext = () => {
// //     if (currentStep < 3) {
// //       setCurrentStep((prevStep) => prevStep + 1);
// //     }
// //   };

// //   const handlePrev = () => {
// //     if (currentStep > 1) {
// //       setCurrentStep((prevStep) => prevStep - 1);
// //     }
// //   };

// //   const handleUpload = (file: File, imageUrl: string) => {
// //     props.setImgUrl(imageUrl);
// //   };

// //   const handleUploadList = (file: File, imageUrl: string) => {
// //     props.setListImg((prevListImg) => [...prevListImg, imageUrl]);
// //   };

// //   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
// //     event.preventDefault();
// //     props.handleSubmit(event);
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className="items-center">
// //       {currentStep === 1 && <Step1 {...props} />}
// //       {currentStep === 2 && <Step2 {...props} />}
// //       {currentStep === 3 && (
// //         <Step3
// //           {...props}
// //           handleUpload={handleUpload}
// //           handleUploadList={handleUploadList}
// //         />
// //       )}
// //       <div className="flex justify-between col-span-full mt-8">
// //         {currentStep > 1 && (
// //           <button
// //             type="button"
// //             onClick={handlePrev}
// //             className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-xl text-white bg-indigo-700 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
// //           >
// //             Anterior
// //           </button>
// //         )}
// //         {currentStep < 3 ? (
// //           <button
// //             type="button"
// //             onClick={handleNext}
// //             className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-xl text-white bg-indigo-700 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
// //           >
// //             Siguiente
// //           </button>
// //         ) : (
// //           <button
// //             type="submit"
// //             className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-xl text-white bg-indigo-700 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
// //           >
// //             Agregar tour
// //           </button>
// //         )}
// //       </div>
// //     </form>
// //   );
// // };

// import ImageUpload from '../ui/ImageUpload';
// import MultipleImageUpload from '../ui/MultipleImageUpload';
// import Provincia from './ReturnFormulario/Provincia';
// import Precio from './ReturnFormulario/Precio';
// import FechaIngreso from './ReturnFormulario/FechaIngreso';
// import FechaEgreso from './ReturnFormulario/FechaEgreso';
// import Hotel from './ReturnFormulario/Hotel';
// import DirecHotel from './ReturnFormulario/DirecHotel';
// import TipoTransporte from './ReturnFormulario/TipoTransporte';
// import NacionalInter from './ReturnFormulario/NacionalInter';
// import NombreEmpresaTrans from './ReturnFormulario/NombreEmpresaTrans';
// import AeropuertoTerminal from './ReturnFormulario/AeropuertoTerminal';
// import Descripcion from './ReturnFormulario/Descripcion';
// import CheckOferta from './ReturnFormulario/CheckOferta';
// import { ITourFormProps } from '@/interface/ITourFormProps';
// import Titulo from './ReturnFormulario/Tititulo';

// export const TourForm: React.FC<ITourFormProps> = ({
//   title,
//   setTitle,
//   price,
//   setPrice,
//   description,
//   setDescription,
//   address,
//   setAddress,
//   fecha_ingreso,
//   setFecha_ingreso,
//   fecha_egreso,
//   setFecha_egreso,
//   destino,
//   setDestino,
//   salida,
//   setSalida,
//   transportType,
//   setTransportType,
//   region,
//   setRegion,
//   hotel,
//   setHotel,
//   empresa,
//   setEmpresa,
//   imgUrl,
//   setImgUrl,
//   listImg,
//   setListImg,
//   oferta,
//   setOferta,
//   handleSubmit,
// }) => {
//   const handleUpload = (file: File, imageUrl: string) => {
//     setImgUrl(imageUrl);
//   };

//   const handleUploadList = (file: File, imageUrl: string) => {
//     setListImg((prevListImg) => [...prevListImg, imageUrl]);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="items-center">
//       <div
//         onSubmit={handleSubmit}
//         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4"
//       >
//         <Provincia destino={destino} setDestino={setDestino} />
//         <FechaIngreso
//           fecha_ingreso={fecha_ingreso}
//           setFecha_ingreso={setFecha_ingreso}
//         />
//         <Titulo title={title} setTitle={setTitle} />
//         <FechaEgreso
//           fecha_egreso={fecha_egreso}
//           setFecha_egreso={setFecha_egreso}
//         />
//         <Precio price={price} setPrice={setPrice} />
//         <TipoTransporte
//           transportType={transportType}
//           setTransportType={setTransportType}
//         />
//         <Hotel hotel={hotel} setHotel={setHotel} />
//         <NombreEmpresaTrans
//           empresa={empresa}
//           setEmpresa={setEmpresa}
//           transportType={transportType}
//         />
//         <DirecHotel address={address} setAddress={setAddress} />
//         <NacionalInter region={region} setRegion={setRegion} />
//         <AeropuertoTerminal salida={salida} setSalida={setSalida} />

//         <Descripcion
//           description={description}
//           setDescription={setDescription}
//         />
//       </div>
//       <div className="flex justify-center col-span-full mt-8">
//         <div className="grid grid-cols-1 gap-4">
//           {' '}
//           <div>
//             <p className="mb-1">Imagenes del hotel</p>
//             <div className="mt-1">
//               <MultipleImageUpload onUpload={handleUploadList} />
//             </div>
//           </div>
//           <div>
//             <p className="mb-1">Imagen del tour</p>
//             <div className="mt-1 ">
//               <ImageUpload onUpload={handleUpload} />
//             </div>
//           </div>
//           <CheckOferta oferta={oferta} setOferta={setOferta} />
//           <button
//             type="submit"
//             className="mt-4 cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-xl text-white bg-indigo-700 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             Agregar tour
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };
