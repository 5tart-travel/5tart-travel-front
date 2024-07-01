'use client';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "@/components/NavBar/NavBar";
import CarouselWithThumbnails from "@/components/CarouselWithThumbnails/CarouselWithThumbnails";
import TravelBanner from "@/components/Banner_publicidad/B_publicidad";
import CardGridTour from "./Tour_home";
import SubscriptionForm from "@/components/SubscriptionForm/SubscriptionForm";
import ViajaPorElMundo from "@/components/Home_ui/ViajarPorElMundo";
import ViajesNacionales from "@/components/Home_ui/ViajesNacionales";
import CardInternacional from "./Card_Internacional";
import AirlineGrid from "@/components/AirLineGrid.tsx/AirLineGrid";
import BusGrid from "@/components/BusGrid/BuasGrid";


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
      <div className="flex justify-center items-center ">
        <TravelBanner />
      </div>
      <div>
        <ViajesNacionales />
      </div>
      <div>
        <CardGridTour />
      </div>
      <div>
        <AirlineGrid />
      </div>
      <div>
        <BusGrid />
      </div>
      <div>
        <SubscriptionForm />
      </div>
    </>
  );
}
