import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { FaHome } from "react-icons/fa";
import { MdDashboardCustomize, MdSupportAgent } from "react-icons/md";
import { GiAirplaneDeparture } from "react-icons/gi";
import { FaWallet } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa"; 
import { FaSuitcaseRolling } from "react-icons/fa"; 

const adminLinks = [
  { name: "Inicio", href: "/", icon: FaHome },
  { name: "Overview", href: "/admin", icon: MdDashboardCustomize },
  { name: "Agencias", href: "/admin/agencies", icon: GiAirplaneDeparture },
  { name: "Paquetes", href: "/admin/packages", icon: FaSuitcaseRolling }, 
  { name: "Soporte", href: "/admin/reportes", icon: MdSupportAgent },
  { name: "Usuarios", href: "/admin/users", icon: FaUserFriends }, 
  
];

const NavLinksAdmin: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2">
      {adminLinks.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 bg-white rounded-br-3xl rounded-tl-3xl shadow-xl p-3 text-sm font-medium hover:bg-blue-200 hover:text-blue-900 md:flex-none md:justify-start md:p-2 md:px-3",
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
