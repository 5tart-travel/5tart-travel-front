'use client';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Navbar from '@/components/NavBar/NavBar';
import CarouselWithThumbnails from '@/components/CarouselWithThumbnails/CarouselWithThumbnails';
import TravelBanner from '@/components/Banner_publicidad/B_publicidad';
import CardGridTour from './Tour_home';
import SubscriptionForm from '@/components/SubscriptionForm/SubscriptionForm';
import ViajaPorElMundo from '@/components/Home_ui/ViajarPorElMundo';
import ViajesNacionales from '@/components/Home_ui/ViajesNacionales';
import CardInternacional from './Card_Internacional';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex">
        <CarouselWithThumbnails />
      </div>

      <div>
        <ViajaPorElMundo />
      </div>
      <div>
        <CardInternacional />
      </div>
      <div className="flex justify-center items-center my-16">
        <TravelBanner />
      </div>
      <div>
        <ViajesNacionales />
      </div>
      <div>
        <CardGridTour />
      </div>
      <div>
        <SubscriptionForm />
      </div>
    </>
  );
}
