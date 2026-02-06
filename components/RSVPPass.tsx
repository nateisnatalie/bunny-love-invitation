import React, { useRef, useState } from 'react';
import { CONFIG } from '../constants';
import { PassData } from '../types';
import * as htmlToImage from 'html-to-image';
import { Download, PenLine, Sparkles } from 'lucide-react';

interface RSVPPassProps {
  data: PassData;
  onWriteLetter: () => void;
}

const RSVPPass: React.FC<RSVPPassProps> = ({ data, onWriteLetter }) => {
  const passRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (passRef.current) {
      setDownloading(true);
      try {
        const dataUrl = await htmlToImage.toPng(passRef.current, { quality: 1.0, pixelRatio: 3 });
        const link = document.createElement('a');
        link.download = `Invitation-${CONFIG.herName}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Failed to download pass', err);
        alert("Oh no! Couldn't save the pass.");
      } finally {
        setDownloading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-4 animate-pop">

      {/* 
         THE "POLKA CHIC" CARD
      */}
      <div className="w-full flex flex-col items-center mb-4">

        {/* Wrapper */}
        <div
          className="p-3 shadow-2xl relative"
          style={{
            backgroundColor: '#000',
            backgroundImage: 'radial-gradient(#f9a8d4 1.5px, transparent 1.5px)',
            backgroundSize: '20px 20px',
          }}
        >
          {/* The Actual Card - Locked 4:3 Ratio */}
          <div
            ref={passRef}
            className="bg-[#fffdfa] relative flex flex-col items-center text-center px-6 py-6 shadow-inner"
            style={{
              width: '240px',          // Fixed width (Small)
              height: '320px',         // Fixed height
              backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")'
            }}
          >
            {/* Gold/Rose Foil Border Inset */}
            <div className="absolute inset-2 border border-rose-300 opacity-60 pointer-events-none" style={{ borderRadius: '2px' }}></div>
            <div className="absolute inset-2.5 border border-rose-200 opacity-40 pointer-events-none" style={{ borderRadius: '2px' }}></div>

            {/* Content - Pure & Simple */}
            <div className="flex-1 flex flex-col items-center justify-center w-full z-10">

              {/* 2. Intro */}
              <p className="font-serif text-[7px] tracking-[0.25em] text-gray-400 uppercase mb-2">
                YOU ARE INVITED TO
              </p>

              {/* 3. Title (Script) */}
              <h1 className="font-script text-3xl text-gray-900 leading-none mb-1">
                Sweetest
              </h1>
              <h1 className="font-script text-3xl text-gray-900 leading-none mb-5">
                Day Ever
              </h1>

              {/* 4. Names */}
              <div className="w-full border-t border-rose-100 my-2 w-1/2"></div>
              <p className="font-serif text-[10px] font-bold text-gray-800 tracking-wider uppercase mt-1">
                {CONFIG.herName} & {CONFIG.myName}
              </p>

              {/* 5. Date */}
              <p className="font-serif text-[9px] text-rose-500 font-semibold tracking-widest mt-4 uppercase">
                {CONFIG.date} • {CONFIG.time}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 
        BUTTONS - Compact spacing
      */}
      <div className="w-full max-w-[240px] space-y-2">
        {/* Primary Action */}
        <button
          onClick={onWriteLetter}
          className="w-full py-3 bg-gray-900 text-white rounded-full font-cute font-bold text-[10px] uppercase tracking-[0.15em] shadow-xl hover:bg-black active:scale-95 transition-all flex items-center justify-center gap-2 group"
        >
          <PenLine size={14} className="text-rose-200 group-hover:-rotate-12 transition-transform" />
          <span>Write a Reply</span>
        </button>

        {/* Secondary Action */}
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="w-full py-3 bg-white/60 backdrop-blur-sm text-gray-600 rounded-full font-cute font-bold text-[10px] uppercase tracking-[0.15em] hover:bg-white hover:text-gray-900 transition-all flex items-center justify-center gap-2"
        >
          <Download size={14} />
          <span>{downloading ? "Saving..." : "Save Image"}</span>
        </button>
      </div>

    </div>
  );
};

export default RSVPPass;