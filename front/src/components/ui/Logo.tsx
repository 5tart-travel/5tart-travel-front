import { saira } from "@/fonts/fonts";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/">
    <div className="flex items-center justify-center">
      <div className="w-16 h-auto md:w-20 lg:w-28 -mr-6 md:-mr-8 lg:-mr-12 mt-14 ">
        <Image src="/star_travel.png" alt="Logo" className="w-full h-auto  " width={100} height={100} />
      </div>
      <div className={`${saira.className} text-white text-sm md:text-lg lg:text-center font-medium`}>
        <h1 className="whitespace-nowrap">tart Travel</h1>
      </div>
    </div>
    </Link>
  );
};

export default Logo;
