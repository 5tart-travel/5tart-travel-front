'use client';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Navbar from '@/components/NavBar/NavBar';
import CarouselWithThumbnails from '@/components/CarouselWithThumbnails/CarouselWithThumbnails';
import TravelBanner from '@/components/Banner_publicidad/B_publicidad';
import CardGridTour from '../components/Tour_home/TourHome';
import SubscriptionForm from '@/components/SubscriptionForm/SubscriptionForm';
import ViajaPorElMundo from '@/components/Home_ui/ViajarPorElMundo';
import ViajesNacionales from '@/components/Home_ui/ViajesNacionales';
import CardInternacional from './Card_Internacional';
import AirlineGrid from '@/components/AirLineGrid.tsx/AirLineGrid';
import BusGrid from '@/components/BusGrid/BuasGrid';
import { ThemeProvider } from 'styled-components';
import { useEffect, useState } from 'react';
import { lightTheme, darkTheme } from '../components/ui/Theme';
import { GlobalStyles } from '@/components/ui/GlobalStyle';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  const [tema, setTema] = useState(false);

  useEffect(() => {
    const savedTema = localStorage.getItem('tema');
    if (savedTema) {
      setTema(JSON.parse(savedTema));
    }
  }, []);

  const theme = tema ? darkTheme : lightTheme;

  const toggleTema = () => {
    setTema((prevTema) => {
      const newTema = !prevTema;
      localStorage.setItem('tema', JSON.stringify(newTema));
      return newTema;
    });
  };
  
  return (
    <ThemeProvider theme={theme}> 
      <>
        <GlobalStyles />
        <Navbar toggleTema={toggleTema} tema={tema} />
        <div className="flex">
          <CarouselWithThumbnails tema={tema}/>
        </div>
        <div>
          <ViajaPorElMundo tema={tema}/>
        </div>
        <div>
          <CardInternacional />
        </div>
        <div className="flex justify-center items-center ">
          <TravelBanner tema={tema}/>
        </div>
        <div>
          <ViajesNacionales tema={tema} />
        </div>
        <div>
          <CardGridTour />
        </div>
        <div>
          <AirlineGrid tema={tema}/>
        </div>
        <div>
          <BusGrid tema={tema} />
        </div>
        <div>
          <SubscriptionForm tema={tema}/>
        </div>
        <Footer tema={tema} username={null} />
      </>
    </ThemeProvider>  
  );
}
