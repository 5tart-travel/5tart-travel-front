'use client'

import { useEffect, useState } from "react";
import NuestrosDatos from "./NuestrosDatos";
import styles from './QuienesSomos.module.css'
import styled from "styled-components";

export const Title = styled.h3`
  font-size: x-large;
  margin: 1em 0;
  text-align: center;
  clear: left;
  font-weight: bold;
`
const Img = styled.img`
  border-radius: 5px;
  width: 25rem;
  height: 22rem;
  float: left;
  margin: 0 40px 20px 0;
  transition: 400ms;
  box-shadow: 8px 10px 27px 10px black;

  @media (max-width: 590px) {
    width: 100%;
    height: 25rem;
    float: none;
    margin: 0 0 2rem 0;
  }
`;

const images = [
  'https://res.cloudinary.com/dd1yaduhv/image/upload/v1720999091/sobre_wwnxut.jpg',
  'https://res.cloudinary.com/dd1yaduhv/image/upload/v1720999091/nosotros_rwyvfx.jpg',
  'https://res.cloudinary.com/dd1yaduhv/image/upload/v1720999239/otra_vy3utd.jpg',
];

const QuienesSomos = () => {
  const [currentImage, setCurrentImage] = useState(images[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prevImage => {
        const currentIndex = images.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

   return (
     <div className={styles.container}>
         <section className= "py-5 mx-5">
            <Title className="text-center my-5">SOBRE NUESTRA PAGINA</Title>
            <Img src={currentImage} alt="Imagen Ilustrativa"></Img>
            <p className="text-lg leading-6">
               Posicionada como una revelación en la web, <span className="italic font-bold">5tart Travel</span> trae lo mejor del mundo de los viajes y el turismo a tu alcance. Fundada con el objetivo de revolucionar la forma en que las personas planifican y reservan sus aventuras, <span className="italic font-bold">5tart Travel</span> reúne a las mejores agencias de viaje y a los usuarios que buscan experiencias inolvidables en una sola plataforma.
              <br />
              <br />
              <span className="italic">Nuestra misión es: <span className="font-bold">Facilitar el acceso a las mejores experiencias de viaje, conectando a los viajeros con las agencias más destacadas y ofreciendo una amplia variedad de paquetes para todos los gustos y presupuestos.</span></span>
              <br />
              <br />
              Ofrecemos un espacio donde las pequeñas y grandes agencias de turismo pueden destacar sus mejores ofertas, mientras que los usuarios disfrutan de un proceso de búsqueda y compra sencillo y eficiente. En <span className="italic">5tart Travel</span>, nos aseguramos de que cada viaje sea único y memorable, garantizando calidad y satisfacción en cada paso del camino.
            </p>
			   </section>
         {/*<section className="py-3">
            <h3 className="text-center mt-12 mb-4 italic text-2xl">Anímate a explorar el mundo con nosotros</h3>
            <div className="video w-full max-w-7xl mx-auto">
            <iframe 
              height="300" 
              src="https://www.youtube.com/embed/JqqiM0DsBeE?si=gL0e8ikqtxHGcyBg&amp;showinfo=0&amp;rel=0&amp;autohide=1&amp;modestbranding=1" 
              title="YouTube video player" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
              className="w-full h-64 sm:h-80 md:h-96 lg:h-[35rem] rounded-br-md rounded-bl-lg rounded-tr-md rounded-tl-lg"
            ></iframe>
            </div>
         </section>*/}
         <NuestrosDatos/>
         <hr className="border-black border-opacity-50 mt-2 w-full"></hr>
         <div className={styles.Slider_div__2ugI6}>
            <div className={styles.Slider_container__TdW1j}>
                <Title>TECNOLOGÍAS UTILIZADAS</Title>
                <div className={styles.Slider_inner__EcdOK}>
                    <div className={styles.Slider_tag__MsWMp}><img src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720978824/docker-svgrepo-com_nkgelp.svg" alt="Docker" /></div>
                    <div className={styles.Slider_tag__MsWMp}><img src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720978909/nestjs-svgrepo-com_mila6v.svg" alt="NestJS" /></div>
                    <div className={styles.Slider_tag__MsWMp}><img src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720980190/typeorm-seeklogo_yrhlog.svg" alt="TypeORM" /></div>
                    <div className={styles.Slider_tag__MsWMp}><img src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720979363/nextjs-fill-svgrepo-com_gex3sf.svg" alt="Next.js" /></div>
                    <div className={styles.Slider_tag__MsWMp}><img src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720979364/postgresql-svgrepo-com_rshfwh.svg" alt="PostgreSQL" /></div>
                    <div className={styles.Slider_tag__MsWMp}><img src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720979053/react-svgrepo-com_zr1hmj.svg" alt="React" /></div>
                    <div className={styles.Slider_tag__MsWMp}><img src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720979363/tailwind-svgrepo-com_uc0ova.svg" alt="Tailwind CSS" /></div>
                    <div className={styles.Slider_tag__MsWMp}><img src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720979357/typescript-svgrepo-com_r27oof.svg" alt="TypeScript" /></div>
                    <div className={styles.Slider_tag__MsWMp}><img src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720979359/cloudinary-svgrepo-com_bmgtxs.svg" alt="Cloudinary" /></div>
                    <div className={styles.Slider_tag__MsWMp}><img src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720979357/vercel-svgrepo-com_ikaimt.svg" alt="Vercel" /></div>
                    <div className={styles.Slider_tag__MsWMp}><img src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720978824/docker-svgrepo-com_nkgelp.svg" alt="Docker" /></div>
                    <div className={styles.Slider_tag__MsWMp}><img src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720978909/nestjs-svgrepo-com_mila6v.svg" alt="NestJS" /></div>
                    <div className={styles.Slider_tag__MsWMp}><img src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720980190/typeorm-seeklogo_yrhlog.svg" alt="TypeORM" /></div> 
                    <div className={styles.Slider_tag__MsWMp}><img src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720979363/nextjs-fill-svgrepo-com_gex3sf.svg" alt="Next.js" /></div>                    
                    <div className={styles.Slider_tag__MsWMp}><img src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720979364/postgresql-svgrepo-com_rshfwh.svg" alt="PostgreSQL" /></div>
                    <div className={styles.Slider_tag__MsWMp}><img src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720979053/react-svgrepo-com_zr1hmj.svg" alt="React" /></div>
                    <div className={styles.Slider_tag__MsWMp}><img src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720979363/tailwind-svgrepo-com_uc0ova.svg" alt="Tailwind CSS" /></div>
                    <div className={styles.Slider_tag__MsWMp}><img src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720979357/typescript-svgrepo-com_r27oof.svg" alt="TypeScript" /></div>
                    <div className={styles.Slider_tag__MsWMp}><img src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720979359/cloudinary-svgrepo-com_bmgtxs.svg" alt="Cloudinary" /></div>
                    <div className={styles.Slider_tag__MsWMp}><img src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720979357/vercel-svgrepo-com_ikaimt.svg" alt="Vercel" /></div>
                    <div className={styles.Slider_fade__xptsz}></div>
                </div>
            </div>
         </div>
     </div>  
   );
}

export default QuienesSomos;
