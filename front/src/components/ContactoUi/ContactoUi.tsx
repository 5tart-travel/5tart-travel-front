import { FaWhatsapp, FaExternalLinkAlt } from 'react-icons/fa'; 

const ContactoUi: React.FC = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/tu-número-de-whatsapp', '_blank');
  };

  return (
    <div className="fixed top-[-40px] left-1/2 transform -translate-x-1/2 bg-white shadow-2xl bg-opacity-35 backdrop-blur-lg shadow-3xl rounded-lg p-8 z-10 max-w-4xl mx-auto w-full sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12">
      <div className="flex flex-col items-center justify-center mb-2">
        <h2 className="text-2xl text-blue-900 text-shadow-medium font-bold mb-4">
          Contacto
        </h2>
        <p className="text-center font-medium text-gray-600 text-shadow-semilight mb-4">
          Queremos estar en contacto siempre y por los medios que más te gusten.
          Acá te dejamos algunos para que nos cuentes en qué estás pensando.
          Déjanos tu consulta en el formulario de contacto o puedes mandarnos un
          mensaje por
        </p>
        <div className="flex items-center justify-center">
          <span
            className="text-green-500 hover:text-green-400 cursor-pointer font-semibold"
            onClick={handleWhatsAppClick}
          >
            WhatsApp
          </span>
          <FaWhatsapp
            className="w-5 h-5 ml-2 text-green-500 hover:text-green-400 cursor-pointer"
            onClick={handleWhatsAppClick}
          />
          <FaExternalLinkAlt
            className="w-4 h-4 ml-2 text-green-500 hover:text-green-400 cursor-pointer"
            onClick={handleWhatsAppClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactoUi;
