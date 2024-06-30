/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useState, useEffect } from 'react';
import { FaRegCommentAlt, FaPaperPlane } from 'react-icons/fa';
import Draggable from 'react-draggable';
import LogoChat from './LogoChat';

const GloboChat: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const abrirModal = () => setModalIsOpen(true);
  const cerrarModal = () => setModalIsOpen(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') cerrarModal();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const enviarMensaje = async () => {
    if (message.trim() === '') return;

    // Añadir el mensaje al estado local inmediatamente
    setMessages((prevMessages) => [...prevMessages, message]);
    setMessage('');

    try {
      const response = await fetch('https://tu-backend-url.com/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: message }),
      });

      if (!response.ok) {
        console.error('Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  };

  return (
    <>
      <Draggable>
        <div
          className="fixed bottom-4 right-4 p-3 bg-blue-950 rounded-full shadow-xl cursor-pointer"
          onClick={abrirModal}
          style={{ boxShadow: '0 0 10px rgba(255, 252, 252, 0.842)' }}
        >
          <FaRegCommentAlt className="text-white w-10 h-10 md:w-8 md:h-8" />
        </div>
      </Draggable>

      {modalIsOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center md:justify-end md:items-start z-50"
          onClick={cerrarModal}
        >
          <Draggable handle=".handle">
            <div
              className="w-[300px] md:w-[300px] h-[450px] md:h-[80%] rounded-t-3xl rounded-b-3xl shadow-2xl relative bg-white flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="handle flex items-center justify-center h-20 bg-blue-950 text-white cursor-pointer rounded-tr-3xl rounded-bl-3xl">
                <LogoChat />
              </div>
              <div className="flex-grow p-4 overflow-y-auto flex flex-col space-y-4 bg-gray-100 rounded-b-xl">
                <div className="self-start p-2 bg-gray-300 rounded-tl-3xl rounded-tr-3xl rounded-br-3xl shadow-md w-max max-w-xs">
                  <p className="text-sm">Hola 👋</p>
                  <p className="text-sm">¿En qué podemos ayudarte?</p>
                </div>
                {/* <div className="self-start p-2 bg-gray-300 rounded-tl-3xl rounded-tr-3xl rounded-br-3xl shadow-md w-max max-w-xs">
                  <p className="text-sm">Falta terminar aún ... xD</p>
                </div> */}
                {messages.map((msg, index) => (
                  <div key={index} className="self-start p-2 bg-gray-200 rounded-3xl shadow-md w-max max-w-xs">
                    <p className="text-sm">{msg}</p>
                  </div>
                ))}
              </div>
              <div className="bg-gray-100 h-16 flex items-center p-2 rounded-b-xl space-x-[-40px]">
                <input
                  type="text"
                  className="flex-grow rounded-3xl px-4 py-2 bg-white text-sm border-none shadow-xl focus:outline-none"
                  placeholder="Escribe tu mensaje..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={enviarMensaje} className="bg-blue-950 text-white p-3 rounded-3xl shadow-xl">
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </Draggable>
        </div>
      )}
    </>
  );
};

export default GloboChat;
