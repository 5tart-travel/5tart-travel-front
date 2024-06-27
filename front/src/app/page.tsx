'use client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "@/components/NavBar/NavBar";
import CarouselWithThumbnails from "@/components/CarouselWithThumbnails/CarouselWithThumbnails";


// import TravelAgencyCarousel from "@/components/TravelAgencyCarousel/TravelAgencyCarousel";



export default function Home() {




  return (
    <>


    <Navbar/>
    <div className="flex ">
      <CarouselWithThumbnails/>
    </div>
    
    <div className="flex justify-center items-center my-16">
      {/* <TravelAgencyCarousel /> */}
    </div>
    <div className="flex justify-center items-center my-16">
     
    </div>
   
    
  


    

    </>
  );
}
