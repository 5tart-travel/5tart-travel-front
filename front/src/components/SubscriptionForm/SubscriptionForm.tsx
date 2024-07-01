import React, { useState } from 'react';

const SubscriptionForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!email) {
      setMessage('Por favor, ingresá tu e-mail.');
      return;
    }

    try {
      const response = await fetch('https://fivetart-travel-kafg.onrender.com/tours/mailOfertas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('¡Te has registrado exitosamente!');
        setEmail('');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setMessage('Hubo un error al intentar registrarse. Por favor, intentá de nuevo más tarde.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 bg-gray-100">
      <p className="mb-4 text-lg font-semibold text-gray-800">
        ¿Querés ser el primero en enterarte cuando hay ofertas?
      </p>
      <form onSubmit={handleSubmit} className="flex w-full max-w-md">
        <input
          type="email"
          placeholder="Ingresá tu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-l-3xl focus:outline-none"
        />
        <button
          type="submit"
          className="px-6 py-2 text-white bg-blue-950 rounded-r-3xl hover:bg-blue-900 focus:outline-none"
        >
          Registrate
        </button>
      </form>
      {message && <p className="mt-4 text-gray-800">{message}</p>}
    </div>
  );
};

export default SubscriptionForm;
