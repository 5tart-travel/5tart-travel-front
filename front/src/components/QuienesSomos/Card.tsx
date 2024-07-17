/* eslint-disable @next/next/no-img-element */
import styles from './NuestrosDatos.module.css'

const Card = ( props:any ) => {
    const { name, imgUrl, github, linkedin } = props.data

    return (
        <li className="relative">
          <div className={`py-2  border-none rounded-tr-2xl rounded-tl-2xl ${styles.iconContainer}`}>
            <h2>{name}</h2>
          </div>
          <hr className=" w-full left-0 "></hr>
          <img src={imgUrl} alt="Imagen perfil" className="rounded-full my-2 "></img>
          <hr className="border-none w-full left-0 "></hr>
          <div className={`flex justify-center items-center gap-2 rounded-br-2xl rounded-bl-2xl py-2 ${styles.iconContainer}`}>
            <a href={github} target="_blank">
              <img src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720991036/github-142-svgrepo-com_ef0qdj.svg" alt="github" className="h-14 hover:opacity-75  bg-white rounded-full border-none "></img>
            </a>
            <a href={linkedin} target="_blank">
              <img src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720991036/linkedin-round-svgrepo-com_psegzi.svg" alt="linkedin" className="h-custom-3 hover:opacity-75 bg-white rounded-full  "></img>
            </a>
          </div>
        </li>
    )
}

export default Card