import { useState } from 'react';

const NameValidate = () => {
  const [fullName, setFullName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateAndFormatFullName(fullName)) {
      setErrorMessage(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value) && value.length <= 40) {
      setFullName(value);
    }
  };

  const validateAndFormatFullName = (name: string): boolean => {
    if (name.length > 40) {
      setErrorMessage('El nombre no puede tener más de 40 caracteres.');
      return false;
    }

    if (/\d/.test(name)) {
      setErrorMessage('El nombre no puede contener números.');
      return false;
    }

    const formattedName = name.replace(/\b\w/g, (char) => char.toUpperCase());
    setFullName(formattedName);
    return true;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fullName">Ingrese su nombre completo:</label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={handleInputChange}
          maxLength={40}
        />
        <button type="submit">Validar</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      {!errorMessage && fullName && (
        <p>El nombre es válido y formateado: {fullName}</p>
      )}
    </div>
  );
};

export default NameValidate;
