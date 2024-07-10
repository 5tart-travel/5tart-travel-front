import { useState } from 'react';

const DniValidate = () => {
  const [dni, setDni] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateDNI(dni)) {
      setErrorMessage(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 8) {
      setDni(value);
    }
  };

  const validateDNI = (dni: string): boolean => {
    if (dni.length !== 8) {
      setErrorMessage('El DNI debe tener exactamente 8 números.');
      return false;
    }

    if (!/^\d{8}$/.test(dni)) {
      setErrorMessage('El DNI solo puede contener números.');
      return false;
    }

    // Aquí podrías agregar validaciones adicionales si fuera necesario

    return true;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="dni">Ingrese su DNI:</label>
        <input
          type="text"
          id="dni"
          value={dni}
          onChange={handleInputChange}
          maxLength={8}
        />
        <button type="submit">Validar</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      {!errorMessage && dni && <p>El DNI es válido: {dni}</p>}
    </div>
  );
};

export default DniValidate;
