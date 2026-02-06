import React, { useRef, useState } from 'react';
import { CONFIG } from '../constants';
import { PassData } from '../types';
import * as htmlToImage from 'html-to-image';
import { Download, PenLine, Sparkles, Share2 } from 'lucide-react';

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
    <div className="flex flex-col items-center w-full h-full relative animate-pop pt-2 pb-6">

      {/* 1. Header: Atmospheric Transition */}
      <div className="text-center mb-6 z-10">
        <div className="flex items-center justify-center gap-2 mb-2 opacity-60">
          <Sparkles size={14} className="text-rose-400 animate-spin-slow" />
          <span className="font-serif text-[10px] tracking-[0.3em] text-gray-500 uppercase">OFFICIAL ACCESS</span>
          <Sparkles size={14} className="text-rose-400 animate-spin-slow" />
        </div>
        <h2 className="font-script text-5xl text-gray-900 leading-none drop-shadow-sm">
          You're In!
        </h2>
      </div>

      {/* 
         2. THE STAGE (Grand Showcase) 
         We wrap the card in a "Stage" that provides the glow and float effects.
      */}
      <div className="relative w-full flex-1 flex flex-col items-center justify-center min-h-[400px]">

        {/* Ambient Glow / Spotlight Effect behind the card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-400/20 blur-[80px] rounded-full pointer-events-none animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/40 blur-[40px] rounded-full pointer-events-none"></div>

        {/* Floating Animation Wrapper */}
        <div className="relative animate-float transition-transform duration-500 hover:scale-[1.02] z-20">

          {/* 
                THE "POLKA CHIC" CARD (Format Preserved 100%)
                We keep the outer style wrapper for the "Physical Card" look on screen
            */}
          <div
            className="p-3 shadow-2xl relative rotate-[-2deg]"
            style={{
              backgroundColor: '#000',
              backgroundImage: 'radial-gradient(#f9a8d4 1.5px, transparent 1.5px)',
              backgroundSize: '20px 20px',
              borderRadius: '4px'
            }}
          >
            {/* Gold Foil Tape Effect (Decoration Only) */}
            {/* Clipboard clip (decoration only) */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30">
              <div className="relative w-16 h-[22px]">
                {/* metal base */}
                <div
                  className="absolute inset-x-0 top-1 mx-auto w-16 h-4 rounded-t-lg rounded-b-md
                      bg-gradient-to-b from-zinc-100 via-zinc-300 to-zinc-400
                      shadow-[0_4px_8px_rgba(0,0,0,0.14)]
                      border border-white/40"
                />

                {/* inner press plate */}
                <div
                  className="absolute left-1/2 top-[6px] -translate-x-1/2 w-12 h-2 rounded-md
                      bg-gradient-to-b from-zinc-200 to-zinc-400
                      shadow-inner border border-white/30"
                />

                {/* center spring block */}
                <div
                  className="absolute left-1/2 top-0 -translate-x-1/2 w-7 h-2 rounded-md
                      bg-gradient-to-b from-zinc-700 to-zinc-900
                      shadow-[0_1px_0_rgba(255,255,255,0.15)]"
                />

                {/* spring lines */}
                <div className="absolute left-1/2 top-[5px] -translate-x-1/2 w-6 h-px bg-white/25" />
                <div className="absolute left-1/2 top-[7px] -translate-x-1/2 w-6 h-px bg-black/20" />

                {/* side ears */}
                <div
                  className="absolute left-0 top-[7px] w-3 h-2.5 rounded-r-full
                      bg-gradient-to-b from-zinc-200 to-zinc-400
                      shadow-sm border border-white/30"
                />
                <div
                  className="absolute right-0 top-[7px] w-3 h-2.5 rounded-l-full
                      bg-gradient-to-b from-zinc-200 to-zinc-400
                      shadow-sm border border-white/30"
                />

                {/* little bite notch */}
                <div
                  className="absolute left-1/2 top-[16px] -translate-x-1/2 w-7 h-1.5 rounded-b-md
                      bg-gradient-to-b from-zinc-200 to-zinc-400 shadow-sm"
                />
              </div>
            </div>
            {/* The Actual Capture Target */}
            <div
              ref={passRef}
              className="bg-[#fffdfa] relative flex flex-col items-center text-center px-6 py-6"
              style={{
                width: '240px',          // Fixed width (Small)
                height: '320px',         // Fixed height
                backgroundColor: '#fefefe',
                backgroundImage: `
                            radial-gradient(circle at 25% 25%, rgba(0,0,0,0.02) 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, rgba(0,0,0,0.02) 0%, transparent 50%)
                        `,
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
                <p className="font-serif text-[10px] text-gray-800 tracking-wider mt-1">
                  {CONFIG.herName} & {CONFIG.myName}
                </p>

                {/* 5. Date */}
                <p className="font-cute text-[9px] text-rose-200 font-semibold tracking-widest mt-4 uppercase">
                  {CONFIG.date} • {CONFIG.time}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reflection/Shadow on the "floor" */}
        <div className="mt-8 w-40 h-2 bg-black/10 blur-xl rounded-[100%]"></div>
      </div>

      {/* 
        3. ACTIONS (Modern & Clean)
      */}
      <div className="w-full max-w-[90%] sm:max-w-sm mt-4 grid grid-cols-5 gap-3 px-2 z-20">

        {/* Save Button (Smaller) */}
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="col-span-2 py-4 bg-white/60 backdrop-blur-md border border-white text-gray-700 rounded-3xl font-cute font-bold text-[10px] uppercase tracking-wider hover:bg-white hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center gap-1 shadow-sm"
        >
          <Download size={18} className="text-gray-400" />
          <span>{downloading ? "Saving..." : "Save Pass"}</span>
        </button>

        {/* Write Letter (Main Action - Larger) */}
        <button
          onClick={onWriteLetter}
          className="col-span-3 py-4 bg-gray-900 text-white rounded-3xl font-cute font-bold text-xs uppercase tracking-[0.15em] shadow-xl hover:bg-black hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center gap-1 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <PenLine size={20} className="fill-rose-200 text-rose-200 group-hover:-rotate-12 transition-transform" />
          <span>Reply Now</span>
        </button>

      </div>

    </div>
  );
};

export default RSVPPass;