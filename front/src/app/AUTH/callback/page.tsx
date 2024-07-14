'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Spiner from '@/components/ui/Spiner';
import styles from './Callback.module.css'

const Callback = () => {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');

    if (accessToken) {
      localStorage.setItem("userSession", JSON.stringify({ token: accessToken }));
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } else {
      console.error('Tokens not found in the URL');
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Preparando todo...</h1>
        <p className={styles.message}>Estamos procesando tu autenticación. Por favor, aguarde unos segundos.</p>
        <Spiner/>
      </div>
    </div>
  );
};

export default Callback;
