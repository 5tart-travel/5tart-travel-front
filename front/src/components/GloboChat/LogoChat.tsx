import { saira } from "@/fonts/fonts";
import Image from "next/image";

const LogoChat: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center">
      <div className="w-16 h-auto md:w-20 lg:w-28">
        <Image src="/star_travel.png" alt="Logo" className="w-16 h-auto" width={100} height={100} />
      </div>
      <div
        className={`${saira.className} text-white text-sm md:text-xs lg:text-xs absolute`}
        style={{ top: '30%', left: '30%', transform: 'translate(-50%, -50%)', zIndex: 10 }}
      >
        <h1 className="whitespace-nowrap">tart Travel</h1>
      </div>
    </div>
  );
};

export default LogoChat;
