import styles from './NuestrosDatos.module.css'

const Card = ( props:any ) => {
    const { name, imgUrl, github, linkedin } = props.data

    return (
        <li className="relative">
          <div className={`py-2 radius-1 rounded-tr-md rounded-tl-lg ${styles.iconContainer}`}>
            <h2>{name}</h2>
          </div>
          <hr className="border-black border-opacity-50 w-full left-0 "></hr>
          <img src={imgUrl} alt="Imagen perfil" className="rounded-full my-2 "></img>
          <hr className="border-black border-opacity-50 w-full left-0 "></hr>
          <div className={`flex justify-center items-center gap-2 rounded-br-md rounded-bl-lg py-2 ${styles.iconContainer}`}>
            <a href={github} target="_blank">
              <img src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720991036/github-142-svgrepo-com_ef0qdj.svg" alt="github" className="h-14 hover:opacity-75 bg-white rounded-full"></img>
            </a>
            <a href={linkedin} target="_blank">
              <img src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720984185/linkedin-svgrepo-com_sclucp.svg" alt="linkedin" className="h-16 hover:opacity-75"></img>
            </a>
          </div>
        </li>
    )
}

export default Card