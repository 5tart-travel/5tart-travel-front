'use client';
import React, { useState } from 'react';
import CbuValidate, {
  IValidationResult,
} from '@/components/Validaciones/CbuValidate'; 
import NameValidate from '@/components/Validaciones/NameValidate';

const DatosBank: React.FC = () => {
  const [cbu, setCbu] = useState('');
  const [cbuError, setCbuError] = useState<string | undefined>(undefined);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const handleCbuChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCbu(value);

    if (attemptedSubmit && value.length !== 22) {
      setCbuError('El CBU debe tener exactamente 22 dígitos.');
    } else {
      const validationResult: IValidationResult = CbuValidate(value);
      if (!validationResult.isValid) {
        setCbuError(validationResult.errorMessage);
      } else {
        setCbuError(undefined);
      }
    }
  };

  const handleSubmit = () => {
    setAttemptedSubmit(true);

    if (cbu.length !== 22) {
      setCbuError('El CBU debe tener exactamente 22 dígitos.');
    } else {
      const validationResult: IValidationResult = CbuValidate(cbu);
      if (!validationResult.isValid) {
        setCbuError(validationResult.errorMessage);
      } else {
        console.log('Formulario enviado correctamente');
      }
    }
  };

  return (
    <div>
      <div className="mt-4 flex items-center">
        <p className="font-semibold w-32">Cbu:</p>
        <input
          type="text"
          value={cbu}
          onChange={handleCbuChange}
          className={`border ${
            cbuError ? 'border-red-500' : 'border-gray-300'
          } rounded-md p-2`}
        />
      </div>
      {cbuError && (
        <p className="text-xs mt-1 text-red-500 ml-32">{cbuError}</p>
      )}
      <p className="text-xs mt-2 text-gray-400 ml-32">
        Ingresa su cbu para recibir su pago, <br /> la misma debe contener 22
        números.
      </p>

      <div className="mt-4">
        <NameValidate /> 
      </div>

      <div className="mt-4 flex items-center">
        <p className="font-semibold w-32">Nombre completo:</p>
        <input type="text" className="border border-gray-300 rounded-md p-2 " />
      </div>
      <p className="text-xs mt-2 text-gray-400 ml-32">
        Ingresa su nombre completo.
      </p>

      <div className="mt-4 flex items-center">
        <p className="font-semibold w-32">Dni:</p>
        <input type="text" className="border border-gray-300 rounded-md p-2 " />
      </div>
      <p className="text-xs mt-2 text-gray-400 ml-32">Ingresa su DNI.</p>

      <div className="mt-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white rounded-md px-4 py-2"
        >
          Guardar
        </button>
      </div>
    </div>
  );
};

export default DatosBank;
