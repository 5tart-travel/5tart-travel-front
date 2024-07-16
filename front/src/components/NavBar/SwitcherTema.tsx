import React from "react";
import { FaMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";

interface SwitcherProps {
  tema: boolean;
}

const SwitcherTema: React.FC<SwitcherProps> = ({ tema })  => {

  const claro = <IoSunnyOutline className="text-black filter invert-100 w-10 h-9 mt-2 pb-1"/> 
  const oscuro = <FaMoon className="filter invert-100 w-10 h-7 mt-2.5"/>  

  return <>{tema ? oscuro : claro}</>;
};

export default SwitcherTema;