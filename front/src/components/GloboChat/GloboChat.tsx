'use client';
import { useState } from 'react';
import { FaRegCommentAlt, FaPaperPlane } from 'react-icons/fa';
import Modal from 'react-modal';
import LogoChat from './LogoChat';

const GloboChat: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const abrirModal = () => setModalIsOpen(true);
  const cerrarModal = () => setModalIsOpen(false);

  const enviarMensaje = async () => {
    if (message.trim() === '') return;

    try {
      const response = await fetch('https://tu-backend-url.com/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: message }),
      });

      if (response.ok) {
        const newMessage = await response.json();
        setMessages((prevMessages) => [...prevMessages, newMessage.text]);
        setMessage('');
      } else {
        console.error('Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  };

  return (
    <>
      <div
        className="fixed bottom-4 right-4 p-3 bg-blue-950 rounded-full shadow-lg cursor-pointer"
        onClick={abrirModal}
        style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}
      >
        <FaRegCommentAlt className="text-white w-8 h-8" />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={cerrarModal}
        contentLabel="Chat Modal"
        className="fixed bottom-20 right-4 w-[300px] h-[450px] bg-white rounded-lg shadow-2xl overflow-hidden"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="flex items-center justify-center p-2 bg-blue-950 text-white rounded-t-lg">
          <LogoChat />
        </div>
        <div className="p-4 overflow-y-auto flex flex-col space-y-4 h-[300px] bg-gray-100">
          <div className="self-start p-2 bg-gray-300 rounded-tl-3xl rounded-tr-3xl rounded-br-3xl shadow-md w-max max-w-xs">
            <p className="text-sm">Hola 👋</p>
            <p className="text-sm">¿En qué podemos ayudarte?</p>
          </div>
          <div className="self-start p-2 bg-gray-300 rounded-tl-3xl rounded-tr-3xl rounded-br-3xl shadow-md w-max max-w-xs">
            
            <p className="text-sm">Falta terminar aun ... xD</p>
          </div>
          {messages.map((msg, index) => (
            <div key={index} className="self-start p-2 bg-gray-200 rounded-3xl shadow-md w-max max-w-xs">
              <p className="text-sm">{msg}</p>
            </div>
          ))}
        </div>
        <div className="bg-gray-200 h-16 flex items-center rounded-b-2xl p-2">
          <input
            type="text"
            className="flex-grow rounded-3xl px-2 py-1"
            placeholder="Escribe tu mensaje..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={enviarMensaje} className="ml-2 bg-blue-950 text-white p-2 rounded-lg">
            <FaPaperPlane />
          </button>
        </div>
      </Modal>
    </>
  );
};

export default GloboChat;
