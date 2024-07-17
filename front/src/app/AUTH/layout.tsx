'use client';
import Logo from '@/components/ui/Logo';
import Image from 'next/image';
import { FC, ReactNode, useState, useEffect } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const images = [
    'https://res.cloudinary.com/dia2gautk/image/upload/v1719431097/jirv2wvfrh537g5xjide.webp',
    'https://res.cloudinary.com/dia2gautk/image/upload/v1719431099/nwyjnt9orild91firajr.webp',
    
];

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const [currentImage, setCurrentImage] = useState(images[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prevImage => {
        const currentIndex = images.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className='min-h-screen grid grid-cols-1 lg:grid-cols-2 p-5'>
      <section className='hidden h-full lg:flex flex-col items-center justify-center gap-y-5 rounded-2xl bg-blue-950 relative overflow-hidden'>
        <div className='absolute top-[-60px] right-5 m-5'>
          <Logo />
        </div>
        <div className='w-full h-[700px] flex items-center justify-center'>
          <Image src={currentImage} alt='Promo' width={500} height={500} className='rounded-br-full rounded-tr-full object-contain max-w-full max-h-full' />
        </div>
      </section>
      {children}
    </main>
  );
};

export default AuthLayout;
