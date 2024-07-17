'use client'
import React, { useEffect } from 'react';

const Intro: React.FC = () => {
  useEffect(() => {
    const iframe = document.querySelector('iframe');

    const onVideoEnd = () => {
      window.location.href = '/';
    };

    iframe?.addEventListener('ended', onVideoEnd);

    return () => {
      iframe?.removeEventListener('ended', onVideoEnd);
    };
  }, []);

  const handleSkipIntro = () => {
    window.location.href = '/';
  };

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '50%', maxWidth: '800px', margin: 'auto', position: 'relative', paddingBottom: '28.125%', overflow: 'hidden', borderRadius: '1rem', background: 'linear-gradient(145deg, #333, #000)', boxShadow: '20px 20px 60px #1a1a1a, -20px -20px 60px #4d4d4d' }}>
        <iframe
          src="https://www.youtube.com/embed/JqqiM0DsBeE?autoplay=1&controls=0&showinfo=0&rel=0&autohide=1&modestbranding=1"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          style={{ border: 'none' }}
        ></iframe>
        <button
          onClick={handleSkipIntro}
          className="absolute bottom-4 left-4 text-yellow-400 py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-transform italic font-serif text-lg"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Saltar Intro &gt;&gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default Intro;
