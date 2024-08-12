import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaCode } from 'react-icons/fa';
import { IoMdStarHalf } from 'react-icons/io';

interface CardProps {
  data: {
    name: string;
    imgUrl: string;
    linkedin: string;
    github: string;
    email: string;
    specialization: string;
    location: string;
    especialidad2: string;
  };
}

const Card4: React.FC<CardProps> = ({ data }) => {
  return (
    <div className="relative max-w-md w-full bg-neutral-800 box-shadow-white-semidark hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer hover:box-shadow-white-semidark rounded-2xl overflow-hidden flex">
      <div className="w-1/3 bg-neutral-900 flex flex-col justify-between p-4">
        <img src={data.imgUrl} alt={data.name} className="w-20 h-20 rounded-full object-cover mb-4 mx-auto" />
        <div className="text-center ">
          <h3 className="text-xl text-gray-200 font-semibold mb-1">{data.name}</h3>
          <p className="text-indigo-500 text-shadow-white-semilight ">{data.specialization}</p>
        </div>
        <div className="mt-4 mx-auto">
          <FaCode className="text-4xl text-indigo-500 " />
        </div>
      </div>
      <div className="w-2/3 p-4 relative">
        <div className="absolute inset-y-0 left-0 w-[2px] bg-indigo-500"></div>
        <div className="pl-6">
        
          <div className="flex items-center mb-4">
            <FaEnvelope className="text-indigo-400 text-xl mr-3" />
            <span className='text-gray-300'>{data.email}</span>
          </div>
          <div className="flex items-center mb-4">
            <FaMapMarkerAlt className="text-indigo-400 text-xl mr-3" />
            <span className='text-gray-300' >{data.location}</span>
          </div>
          <div className=" flex mb-4 gap-2 text-indigo-400  text-2xl  font-bold items-center">
          <IoMdStarHalf className="text-2xl text-indigo-600  " />
            {data.especialidad2}
          </div>
          <div className="flex items-center space-x-4 mt-6 absolute bottom-6">
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-indigo-600 text-3xl" />
            </a>
            <a href={data.github} target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-gray-300 text-3xl" />
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-1 right-4">
        <img src="/star_travel.png" alt="Star Travel Logo" className="w-16 h-16" />
      </div>
    </div>
  );
};

export default Card4;
