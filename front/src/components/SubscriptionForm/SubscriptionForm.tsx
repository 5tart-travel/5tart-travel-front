import React, { useState } from 'react';

interface SubscriptionProps {
  tema: boolean;
}

const SubscriptionForm: React.FC<SubscriptionProps> = ({ tema }) => {

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tours/mailOfertas`, {
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
    <div className={`flex flex-col items-center justify-center py-8 px-4 ${ tema ? 'bg-grey' : 'bg-gray-100'} `}>
      <p className={`mb-4 text-lg font-semibold ${ tema ? 'text-white' : 'text-gray-800'}  text-center`}>
        ¿Querés ser el primero en enterarte cuando hay ofertas?
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full max-w-md">
        <input
          type="email"
          placeholder="Ingresá tu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-t-3xl sm:rounded-l-3xl sm:rounded-t-none focus:outline-none mb-2 sm:mb-0"
        />
        <button
          type="submit"
          className={`px-6 py-2 text-white ${ tema ?  'bg-black' : 'bg-blue-950' } rounded-b-3xl sm:rounded-br-3xl sm:rounded-b-none hover:bg-blue-900 focus:outline-none`}
        >
          Registrate
        </button>
      </form>
      {message && <p className="mt-4 text-gray-800 text-center">{message}</p>}
    </div>
  );
};

export default SubscriptionForm;
