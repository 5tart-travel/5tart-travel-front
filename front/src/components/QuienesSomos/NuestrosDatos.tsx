import React from 'react';
import styles from './NuestrosDatos.module.css'
import Card from './Card'
import Text from "./Text";
import { Title } from "./QuienesSomos"

const datosNosotros = [
  {
    name:'Maxi',
    imgUrl:'https://res.cloudinary.com/dd1yaduhv/image/upload/v1720981182/Maxi_lhyhwd.jpg',
    linkedin: 'https://www.linkedin.com/in/maximiliano-salguero/',
    github: 'https://github.com/MaxiSalguero'
  },
  {
    name:'Jonatan',
    imgUrl:'https://res.cloudinary.com/dd1yaduhv/image/upload/v1720981080/Jona_nzsvwl.jpg',
    linkedin: 'https://www.linkedin.com/in/jongabee/',
    github: 'https://github.com/Jongabee'
  },
  {
    name:'Mauri',
    imgUrl:'https://res.cloudinary.com/dd1yaduhv/image/upload/v1720981084/Mauri_thmgic.jpg',
    linkedin: 'https://www.linkedin.com/in/mauricio-villegas-63a308246/',
    github: 'https://github.com/V-Mau'
  },
  {
    name:'Mauro',
    imgUrl:'https://res.cloudinary.com/dd1yaduhv/image/upload/v1720980839/Mauro_a5v7ec.jpg',
    linkedin: 'https://www.linkedin.com/in/mauro-diaz-a0b8916b/',
    github: 'https://github.com/mauro8778'
  },
  {
    name:'Juan',
    imgUrl:'https://res.cloudinary.com/dd1yaduhv/image/upload/v1720981082/Juank_vh87st.jpg',
    linkedin: 'https://www.linkedin.com/in/juan-carlos-castillo-985ab02b0/',
    github: 'https://github.com/juank132'
  }
]

const NuestrosDatos = () => {
  return (
    <section id="techFav">
      <hr className="border-black border-opacity-50 my-4 w-full"></hr>
      <Title>SOBRE NOSOTROS</Title>
      <Text/> 
      <ul className={styles.techFav_cards}>
        {datosNosotros.map( (data, i) =>{ 
            return <Card key={i} data={data}/>
          })
        }
      </ul>
    </section>
   );
};

export default NuestrosDatos;
