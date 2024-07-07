import React, { useState, useEffect } from 'react';
import { FaStar, FaRegStar, FaSmile, FaFrown } from 'react-icons/fa';

export interface Card {
  id: string;
  username: string;
  good: string;
  bad: string;
  rate: number;
  tourId: string;
}

interface OpinionSectionProps {
  tourId: string;
  comments: Card[];
}

const OpinionSection: React.FC<OpinionSectionProps> = ({ tourId, comments }) => {
  const [cardsState, setCardsState] = useState<Card[]>([]);
  const [username, setUsername] = useState('');
  const [good, setGood] = useState('');
  const [bad, setBad] = useState('');
  const [rate, setRate] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCardsState(comments);
  }, [comments]);

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !good || !bad) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const newCard: Card = {
      id: '',
      username,
      good,
      bad,
      rate,
      tourId,
    };

    setLoading(true);

    try {
      console.log('Enviando comentario:', newCard);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comment/${tourId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCard),
      });

      console.log('Respuesta del servidor:', response);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error al enviar el comentario:', errorText);
        throw new Error(`Error al enviar el comentario: ${errorText}`);
      }

      const contentType = response.headers.get('content-type');
      let responseData;

      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
        console.log('Respuesta del servidor no en JSON:', responseData);
      }

      if (responseData && typeof responseData === 'object' && responseData.id) {
        setCardsState(prevCards => [...prevCards, {
          ...newCard,
          id: responseData.id,
        }]);
      } else {
        console.error('Respuesta del servidor no válida:', responseData);
      }

      setUsername('');
      setGood('');
      setBad('');
      setRate(1);

    } catch (error) {
      console.error('Error al enviar el comentario:', error);
    } finally {
      setLoading(false);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'good') setGood(value);
    if (name === 'bad') setBad(value);
    if (name === 'rate') setRate(Number(value));
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
      }
    }
    return stars;
  };

  return (
    <section className="text-base mt-5">
      <div className="container mx-auto flex flex-wrap justify-center">
        <div className="w-full sm:w-1/2 p-4">
          <div className="bg-gray-200 p-4 rounded-lg flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold mb-4">Déjanos tu opinión</h2>
            <form className="w-full max-w-md mx-auto" onSubmit={onFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Nombre
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={onInputChange}
                  placeholder="Nombre"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="good">
                  Lo Bueno
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="good"
                  name="good"
                  value={good}
                  onChange={onInputChange}
                  placeholder="Lo Bueno"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bad">
                  Lo Malo
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="bad"
                  name="bad"
                  value={bad}
                  onChange={onInputChange}
                  placeholder="Lo Malo"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rate">
                  Calificación
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="rate"
                  name="rate"
                  type="number"
                  min="1"
                  max="5"
                  value={rate}
                  onChange={onInputChange}
                  placeholder="Calificación (1-5)"
                />
              </div>
              <div className="mb-4 text-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="w-full sm:w-1/2 p-4">
          <div className="bg-gray-200 rounded-lg flex flex-col text-center h-full">
            <h2 className="text-2xl font-bold mb-4 mt-4">Comentarios</h2>
            <div className="comments-container h-96 ml-6 mr-6 overflow-y-auto">
              {cardsState.map((card) => (
                <div key={card.id} className="card bg-white shadow-md rounded p-4 mb-4 relative">
                  <div className="flex justify-between mb-2">
                    <div className="flex flex-col">
                      <h3 className="font-bold text-xl text-left">{card.username}</h3>
                    </div>
                    <div className="flex items-center">
                      {renderStars(card.rate)}
                    </div>
                  </div>
                  <hr className="border-gray-300 flex-grow opacity-20" />
                  <div className="flex items-center mt-4">
                    {card.rate >= 3 ? (
                      <FaSmile className="text-green-500 mr-2" />
                    ) : (
                      <FaFrown className="text-red-500 mr-2" />
                    )}
                    <p><strong>Lo Bueno:</strong> {card.good}</p>
                  </div>
                  <div className="flex items-center mt-2">
                    {card.rate < 3 ? (
                      <FaFrown className="text-red-500 mr-2" />
                    ) : (
                      <FaSmile className="text-green-500 mr-2" />
                    )}
                    <p><strong>Lo Malo:</strong> {card.bad}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpinionSection;
