import React from 'react';

interface ContactoSectionProps {
  agencyDetails: {
    name_agency: string;
    mail: string; 
  };
}

const ContactoSection: React.FC<ContactoSectionProps> = ({ agencyDetails }) => {
  const handleContact = () => {
    const subject = encodeURIComponent(`Consulta para ${agencyDetails.name_agency}`);
    const body = encodeURIComponent(`Hola,\n\nMe gustaría hacer una consulta sobre sus servicios.\n\nGracias.`);
    window.location.href = `mailto:${agencyDetails.mail}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="relative">
      <div className="absolute top-0 right-0 bg-white text-center border-10 border-blue-950 rounded-lg p-12 z-10 mt-4 mr-8 shadow-lg"
           style={{ marginTop: "-150px" }}>
        <h2 className="text-xl font-bold mb-4">{agencyDetails.name_agency}</h2>
        
        <button
          onClick={handleContact}
          className="bg-blue-950 text-white py-3 px-6 rounded-lg shadow-sm hover:bg-blue-900 hover:text-white transition duration-300 ease-in-out"
        >
          Contacto
        </button>
      </div>
    </section>
  );
};

export default ContactoSection;
