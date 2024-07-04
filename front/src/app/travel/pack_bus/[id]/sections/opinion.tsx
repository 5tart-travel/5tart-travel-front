import React, { useState } from 'react';
import { FaStar, FaRegStar, FaSmile, FaFrown } from 'react-icons/fa';

export interface Card {
  nombre: string;
  loBueno: string;
  loMalo: string;
  calificacion: string;
  fecha: string;
}

interface OpinionSectionProps {
  cards: Card[];
}

const OpinionSection: React.FC<OpinionSectionProps> = ({ cards }) => {
  const [cardsstate, setCardsState] = useState<Card[]>(cards);
  const [nombre, setNombre] = useState('');
  const [loBueno, setLoBueno] = useState('');
  const [loMalo, setLoMalo] = useState('');
  const [calificacion, setCalificacion] = useState('');

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newCard: Card = {
      nombre,
      loBueno,
      loMalo,
      calificacion,
      fecha: new Date().toLocaleDateString(),
    };

    
    setCardsState([...cardsstate, newCard]);

    
    setNombre('');
    setLoBueno('');
    setLoMalo('');
    setCalificacion('');
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'nombre') setNombre(value);
    if (name === 'loBueno') setLoBueno(value);
    if (name === 'loMalo') setLoMalo(value);
    if (name === 'calificacion') setCalificacion(value);
  };

  const renderStars = (rating: string) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Number(rating)) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
      }
    }
    return stars;
  };

  return (
    <section className="text-base mt-5">
      <div className="relative w-full mx-auto rounded-lg overflow-hidden flex flex-wrap" style={{ width: '95%' }}>
        <div className="w-full sm:w-1/2 p-4">
          <div className="bg-gray-200 p-4 rounded-lg flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold mb-4">Déjanos tu opinión</h2>
            <form className="w-full max-w-lg" onSubmit={onFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                  Nombre
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={nombre}
                  onChange={onInputChange}
                  placeholder="Nombre"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="loBueno">
                  Lo Bueno
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="loBueno"
                  name="loBueno"
                  value={loBueno}
                  onChange={onInputChange}
                  placeholder="Lo Bueno"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="loMalo">
                  Lo Malo
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="loMalo"
                  name="loMalo"
                  value={loMalo}
                  onChange={onInputChange}
                  placeholder="Lo Malo"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="calificacion">
                  Calificación
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="calificacion"
                  name="calificacion"
                  type="number"
                  min="1"
                  max="5"
                  value={calificacion}
                  onChange={onInputChange}
                  placeholder="Calificación (1-5)"
                />
              </div>
              <div className="mb-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="w-full sm:w-1/2 p-4">
          <div className="bg-gray-200 rounded-lg flex flex-col text-center h-full">
            <h2 className="text-2xl font-bold mb-4 mt-4 ">Comentarios</h2>
            <div className="comments-container h-96 ml-6 mr-6 overflow-y-auto">
              {cardsstate.map((card, index) => (
                <div key={index} className="card bg-white shadow-md rounded p-4 mb-4 relative">
                  <div className="absolute top-0 left-0 p-2 w-full">
                    <h3 className="font-bold text-xl uppercase text-left">{card.nombre}</h3>
                    <p className="text-gray-500 text-sm text-left">{card.fecha}</p>
                  </div>
                  <div className="absolute top-0 right-0 p-2">
                    <div className="flex">
                      {renderStars(card.calificacion)}
                    </div>
                  </div>
                  <hr className="border-gray-300 flex-grow opacity-20 mt-10" />
                  <div className="flex items-center mt-4">
                    <FaSmile className="text-green-500 mr-2" />
                    <p><strong>Lo Bueno:</strong> {card.loBueno}</p>
                  </div>
                  <div className="flex items-center mt-2">
                    <FaFrown className="text-red-500 mr-2" />
                    <p><strong>Lo Malo:</strong> {card.loMalo}</p>
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
