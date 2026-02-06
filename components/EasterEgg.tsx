import React, { useState, useEffect } from 'react';

const EasterEgg: React.FC = () => {
  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Handle opening transition
  useEffect(() => {
    if (show) {
      // Small delay to allow render before fading in
      setTimeout(() => setIsVisible(true), 50);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [show]);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Reenie+Beanie&display=swap');
          
          .font-chalk-block { font-family: 'Permanent Marker', cursive; }
          .font-chalk-script { font-family: 'Reenie Beanie', cursive; }
          
          .bg-asphalt {
            background-color: #1a1a1a;
            background-image: 
              radial-gradient(circle at 50% 50%, #2a2a2a 0%, #111111 100%);
          }
          
          .asphalt-noise::before {
            content: "";
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            opacity: 0.08;
            pointer-events: none;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          }

          .chalk-effect {
            color: rgba(255, 255, 255, 0.85);
            text-shadow: 
              0px 0px 1px rgba(255,255,255,0.8),
              1px 1px 2px rgba(0,0,0,0.8);
            filter: drop-shadow(0 0 1px rgba(255,255,255,0.2));
            transform: rotate(-2deg); /* Slight natural skew like the photo */
          }
        `}
      </style>

      <div className="text-center pb-4 relative z-50">
        <button
          onClick={() => setShow(true)}
          className="text-[10px] text-gray-400/50 hover:text-rose-400 transition-colors font-mono tracking-[0.2em] uppercase"
        >
          © 2026 Natalie | SECRET MENU
        </button>
      </div>

      {show && (
        <div
          className={`fixed inset-0 z-[100] w-full h-[100dvh] flex flex-col items-center justify-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setShow(false)}
        >
          {/* Background Layer mimicking Asphalt */}
          <div className="absolute inset-0 bg-asphalt asphalt-noise"></div>

          {/* Content Layer - Optimized for iPhone (No Scrolling) */}
          <div className="relative z-10 w-full h-full max-w-sm px-6 py-8 flex flex-col items-center justify-center gap-8 sm:gap-12">

            {/* 1. The Main Message (Reference Photo) */}
            <div className="chalk-effect flex flex-col items-center mt-auto">
              <h1 className="font-chalk-block text-3xl sm:text-5xl leading-tight tracking-wide opacity-90 text-center">
                I Wish We<br />
                <span className="pl-4">Had More Time</span>
              </h1>

              {/* The Heart from the photo */}
              <div className="w-6 h-6 sm:w-8 sm:h-8 mt-3 opacity-80 self-end mr-12 sm:mr-8">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M50 85 C10 60 0 35 0 20 C0 5 20 -5 50 20 C80 -5 100 5 100 20 C100 35 90 60 50 85 Z" />
                </svg>
              </div>
            </div>

            {/* 2. The Signature (Reference Photo) */}
            <div className="chalk-effect transform rotate-2 opacity-80 flex flex-col items-center">
              <p className="font-chalk-script text-2xl sm:text-4xl tracking-widest">
                @TheBrooklynPoet
              </p>
              <div className="w-5 h-5 mx-auto mt-2 opacity-70">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M50 90 C10 60 0 35 0 20 C0 5 20 -5 50 20 C80 -5 100 5 100 20 C100 35 90 60 50 90 Z" />
                </svg>
              </div>
            </div>

            {/* 3. The "Secret" Phrase & I LOVE YOU */}
            <div className="mb-auto pt-8 sm:pt-12 opacity-0 animate-[pop_1s_ease-out_1s_forwards] flex flex-col items-center space-y-4">
              <p className="font-chalk-script text-3xl sm:text-4xl text-rose-200/90 tracking-widest -rotate-2 text-center leading-snug">
                You are Everything<br /> I'm Looking For
              </p>
              <p className="font-chalk-script text-xs sm:text-sm text-white/50 tracking-[0.4em] uppercase">
                I LOVE YOU BABY
              </p>
            </div>

            {/* Subtle Close Hint (Pinned to very bottom) */}
            <div className="absolute bottom-6 text-white/20 text-[10px] font-mono tracking-widest">
              (tap street to return)
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default EasterEgg;