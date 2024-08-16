import React from 'react';
import Card from './Card';

const datosNosotros = [
  {
    name: 'Maxi',
    imgUrl:
      'https://res.cloudinary.com/dd1yaduhv/image/upload/v1720981182/Maxi_lhyhwd.jpg',
    linkedin: 'https://www.linkedin.com/in/maximiliano-salguero/',
    github: 'https://github.com/MaxiSalguero',
    email: 'salgueromaximiliano8@gmail.com',
    specialization: 'Full Stack Developer',
    location: 'Salta, Argentina',
    especialidad2: 'Back-end',
  },
  {
    name: 'Mauri',
    imgUrl:
      'https://res.cloudinary.com/dd1yaduhv/image/upload/v1720981084/Mauri_thmgic.jpg',
    linkedin: 'https://www.linkedin.com/in/mauricio-villegas-63a308246/',
    github: 'https://github.com/V-Mau',
    email: 'vllgsmau@gmail.com',
    specialization: 'Full Stack Developer',
    location: 'Mendoza, Argentina',
    especialidad2: 'Front-end',
  },
  {
    name: 'Jona',
    imgUrl:
      'https://res.cloudinary.com/dd1yaduhv/image/upload/v1720981080/Jona_nzsvwl.jpg',
    linkedin: 'https://www.linkedin.com/in/jongabee/',
    github: 'https://github.com/Jongabee',
    email: 'jonatanmosqueda@gmail.com',
    specialization: 'Full Stack Developer',
    location: 'Buenos Aires, Argentina',
    especialidad2: 'Front-end',
  },
  {
    name: 'Mauro',
    imgUrl:
      'https://res.cloudinary.com/dd1yaduhv/image/upload/v1720980839/Mauro_a5v7ec.jpg',
    linkedin: 'https://www.linkedin.com/in/mauro-diaz-a0b8916b/',
    github: 'https://github.com/mauro8778',
    email: 'maurodiaz8778@gmail.com',
    specialization: 'Full Stack Developer',
    location: 'Buenos Aires, Argentina',
    especialidad2: 'Back-end',
  },
  {
    name: 'Juan',
    imgUrl:
      'https://res.cloudinary.com/dd1yaduhv/image/upload/v1720981082/Juank_vh87st.jpg',
    linkedin: 'https://www.linkedin.com/in/juan-carlos-castillo-985ab02b0/',
    github: 'https://github.com/juank132',
    email: 'juancarlos_castillo@hotmail.com.ar',
    specialization: 'Full Stack Developer',
    location: 'Buenos Aires, Argentina',
    especialidad2: 'Back-end',
  },
];

const NuestrosDatos = () => {
  return (
    <section id="techFav" className=" py-[40px] px-4">
      <hr className="border-indigo-400 border-1 box-shadow-white-semidark rounded-xl my-4 w-full" />
      <h2 className="text-3xl font-bold text-gray-700 text-shadow-semidark mb-4 text-center">
        DEVELOPERS
      </h2>

      {/* Primera fila con 3 tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {datosNosotros.slice(0, 3).map((data, i) => (
          <div key={i} className="flex justify-center">
            <Card data={data} />
          </div>
        ))}
      </div>

      {/* Segunda fila con 2 tarjetas centradas */}
      <div className="flex justify-center mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:max-w-[66%]">
          {datosNosotros.slice(3).map((data, i) => (
            <div key={i} className="flex justify-center">
              <Card data={data} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NuestrosDatos;
