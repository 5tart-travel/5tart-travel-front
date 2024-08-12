import React from 'react';
import Card from './Card';

const datosNosotros = [
  {
    name: 'Maxi',
    imgUrl: 'https://res.cloudinary.com/dd1yaduhv/image/upload/v1720981182/Maxi_lhyhwd.jpg',
    linkedin: 'https://www.linkedin.com/in/maximiliano-salguero/',
    github: 'https://github.com/MaxiSalguero',
    email: 'maxi@example.com',
    specialization: 'Full Stack Developer',
    location: 'Argentina',
    especialidad2: 'Back',
  },
  {
    name: 'Jona',
    imgUrl: 'https://res.cloudinary.com/dd1yaduhv/image/upload/v1720981080/Jona_nzsvwl.jpg',
    linkedin: 'https://www.linkedin.com/in/jongabee/',
    github: 'https://github.com/Jongabee',
    email: 'jona@example.com',
    specialization: 'Full Stack Developer',
    location: 'Argentina',
    especialidad2: 'Front',
  },
  {
    name: 'Mauri',
    imgUrl: 'https://res.cloudinary.com/dd1yaduhv/image/upload/v1720981084/Mauri_thmgic.jpg',
    linkedin: 'https://www.linkedin.com/in/mauricio-villegas-63a308246/',
    github: 'https://github.com/V-Mau',
    email: 'mauri@example.com',
    specialization: 'Full Stack Developer',
    location: 'Argentina',
    especialidad2: 'Front',
  },
  {
    name: 'Mauro',
    imgUrl: 'https://res.cloudinary.com/dd1yaduhv/image/upload/v1720980839/Mauro_a5v7ec.jpg',
    linkedin: 'https://www.linkedin.com/in/mauro-diaz-a0b8916b/',
    github: 'https://github.com/mauro8778',
    email: 'mauro@example.com',
    specialization: 'Full Stack Developer',
    location: 'Argentina',
    especialidad2: 'Back',
  },
  {
    name: 'Juan',
    imgUrl: 'https://res.cloudinary.com/dd1yaduhv/image/upload/v1720981082/Juank_vh87st.jpg',
    linkedin: 'https://www.linkedin.com/in/juan-carlos-castillo-985ab02b0/',
    github: 'https://github.com/juank132',
    email: 'juank@example.com',
    specialization: 'Full Stack Developer',
    location: 'Argentina',
    especialidad2: 'Back',
  },
];

const NuestrosDatos = () => {
  return (
    <section id="techFav" className="py-8 px-4">
      <hr className="border-indigo-400 border-1 box-shadow-white-semidark rounded-xl my-4 w-full" />
      <h2 className="text-3xl font-bold text-gray-700 text-shadow-semidark mb-4 text-center">SOBRE NOSOTROS</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {datosNosotros.map((data, i) => (
          <li key={i} className={`flex justify-center ${i === 3 || i === 4 ? 'col-span-1 lg:col-span-1 ' : ''}`}>
            <Card data={data} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default NuestrosDatos;
