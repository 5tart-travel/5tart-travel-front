"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { FaHome } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { BiSolidDonateHeart } from "react-icons/bi";
import { MdFavorite } from "react-icons/md";
import { GiAirplaneDeparture } from "react-icons/gi";
import { IoMdPlanet } from "react-icons/io";





const links = [
  { name: "Inicio", href: "/", icon: FaHome },
  { name: "Mi perfil", href: "/dashboard/mi-perfil", icon: MdDashboardCustomize },
  { name: "Compras", href: "/dashboard/compras", icon: BiSolidDonateHeart },
  { name: "Favoritos", href: "/dashboard/favoritos", icon: MdFavorite },
  { name: "Agregar Tour", href: "/dashboard/agregar-tour", icon: GiAirplaneDeparture },
  { name: "Mis Tours", href: "/dashboard/mis-tours", icon: IoMdPlanet },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
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
    </>
  );
}