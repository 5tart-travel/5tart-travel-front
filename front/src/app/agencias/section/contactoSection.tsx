import React from 'react';

interface ContactoSectionProps {
  agencyDetails: {
    name_agency: string;
  };
}

const ContactoSection: React.FC<ContactoSectionProps> = ({ agencyDetails }) => {
  const handleContact = () => {
   
    alert(`Ponte en contacto con ${agencyDetails.name_agency}`);
  };

  return (
    <section className="relative">
      <div className="absolute top-0 right-0 bg-white text-center border-10 border-blue-500 rounded-lg p-12 z-10 mt-4 mr-8 shadow-lg">
        <h2 className="text-xl font-bold mb-4">{agencyDetails.name_agency}</h2>
        
        <button
          onClick={handleContact}
          className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-sm hover:bg-blue-400 hover:text-white transition duration-300 ease-in-out"
        >
          Contacto
        </button>
      </div>
    </section>
  );
};

export default ContactoSection;
