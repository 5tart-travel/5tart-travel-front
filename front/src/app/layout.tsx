'use client'

/* eslint-disable @next/next/no-page-custom-font */
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import metadata from "@/app/metadata";
import HiddenNavBar from "@/components/hidden_navbar/HiddenNavBar";
import Navbar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import HiddenFooter from "@/components/hidden_footer/HiddenFooter";
import Script from 'next/script';
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="es">
      <head>
        <title>{String(metadata.title) || "Título por defecto"}</title>
        <meta name="description" content={String(metadata.description) || "Descripción por defecto"} />
        <link rel="icon" href="/ico_travel.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap" />
      </head>
      <body className={inter.className}>
        <HiddenNavBar>
          <Navbar />
        </HiddenNavBar>
        {children}
        <HiddenFooter>
          <Footer tema={null} username={null} />
        </HiddenFooter>
        {pathname !== '/intro' && (
          <Script id="landbot-script" strategy="lazyOnload">
          {`
            window.addEventListener('mouseover', initLandbot, { once: true });
            window.addEventListener('touchstart', initLandbot, { once: true });
            var myLandbot;
            function initLandbot() {
              if (!myLandbot) {
                var s = document.createElement('script');s.type = 'text/javascript';s.async = true;
                s.addEventListener('load', function() {
                  var myLandbot = new Landbot.Livechat({
                    configUrl: 'https://storage.googleapis.com/landbot.online/v3/H-2554135-FF1JTNYN4JZ5723O/index.json',
                  });
                });
                s.src = 'https://cdn.landbot.io/landbot-3/landbot-3.0.0.js';
                var x = document.getElementsByTagName('script')[0];
                x.parentNode.insertBefore(s, x);
              }
            }
          `}
          </Script>
        )}
      </body>
    </html>
  );
}
