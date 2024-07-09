import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { FaHome } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { BiSolidDonateHeart } from "react-icons/bi";
import { MdFavorite } from "react-icons/md";
import { GiAirplaneDeparture } from "react-icons/gi";
import { IoMdPlanet } from "react-icons/io";

const adminLinks = [
  { name: "Inicio", href: "/", icon: FaHome },
  { name: "Overview", href: "/admin", icon: MdDashboardCustomize },
  { name: "Agencias", href: "/admin/agencies", icon: BiSolidDonateHeart },
  { name: "Paquetes", href: "/admin/packages", icon: MdFavorite },
  { name: "Soporte", href: "/admin/reportes", icon: GiAirplaneDeparture },
  { name: "Usuarios", href: "/admin/users", icon: IoMdPlanet },
  { name: "Billetera", href: "/admin/billetera", icon: IoMdPlanet },
];

const NavLinksAdmin: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2  ">
      {adminLinks.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-200 p-3 text-sm font-medium hover:bg-blue-200 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-blue-100 text-blue-600": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinksAdmin;
