import Link from "next/link";
import { FaInstagram, FaYoutube, FaTwitter, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import Logo from "@/components/ui/Logo";

interface FooterProps {
  username: string | null;
  className?: string;
  tema?: boolean | null;
}


const Footer: React.FC<FooterProps> = ({ username, className, tema }) => {
  return (
    <footer className={`${ tema ? 'bg-black' : 'bg-blue-950'} font-sans mt-0 ${className}`}>
      <div className="container mx-auto py-2">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <Logo />
          </div>
          <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-6">
            <Link href="/">
              <p className="text-gray-50 hover:text-blue-300 hover:underline">Inicio</p>
            </Link>
            <Link href="/contacto">
              <p className="text-gray-50 hover:text-blue-300 hover:underline">Contacto</p>
            </Link>
            <Link href="/travel">
              <p className="text-gray-50 hover:text-blue-300 hover:underline">Paquetes</p>
            </Link>
            <Link href="/nosotros">
              <p className="text-gray-50 hover:text-blue-300 hover:underline">Nosotros</p>
            </Link>
            
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="https://www.instagram.com/" target="_blank">
              <FaInstagram className="text-gray-50 hover:text-blue-300" size={30} />
            </Link>
            <Link href="https://www.youtube.com/" target="_blank">
              <FaYoutube className="text-gray-50 hover:text-blue-300" size={30} />
            </Link>

            <Link href="https://www.facebook.com/" target="_blank">
              <FaFacebook className="text-gray-50 hover:text-blue-300" size={30} />
            </Link>
            <Link href="https://github.com/" target="_blank">
              <FaGithub className="text-gray-50 hover:text-blue-300" size={30} />
            </Link>
            <Link href="https://www.linkedin.com/" target="_blank">
              <FaLinkedin className="text-gray-50 hover:text-blue-300" size={30} />
            </Link>
          </div>
        </div>
        <div className="text-center mt-4 text-gray-50">
          <p>Copyright 2024 © | Start Travel </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
