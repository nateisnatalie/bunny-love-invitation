import React, { useEffect, useState } from 'react';
import { CONFIG } from '../constants';
import { ChevronRight } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface InfoCardsProps {
  onComplete: () => void;
}

const InfoCards: React.FC<InfoCardsProps> = ({ onComplete }) => {
  const [visibleIndex, setVisibleIndex] = useState(0);

  // Define the content to display
  const infoItems = [
    { label: "The Occasion", value: CONFIG.activity },
    {
      label: "When", value: (
        <div>
          <div>{CONFIG.date}</div>
          <div>{CONFIG.time === 'All Day' ? 'All Day Long' : CONFIG.time}</div>
        </div>
      )
    },
    { label: "Where", value: CONFIG.location },
    { label: "Little Note", value: "This invitation may contain sugar. " },
  ];

  // Sequence animation
  useEffect(() => {
    if (visibleIndex < infoItems.length) {
      const timer = setTimeout(() => {
        setVisibleIndex(prev => prev + 1);
        soundManager.playPop();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [visibleIndex]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-4 py-2 animate-pop">

      {/* 
          ELEGANT CARD CONTAINER 
          Compact: Reduced max-height and internal padding
       */}
      <div className="w-full max-w-[320px] bg-white shadow-2xl relative transition-transform duration-500 hover:scale-[1.01]">

        {/* Decorative Borders (The "Frame") */}
        <div className="absolute top-2.5 left-2.5 right-2.5 bottom-2.5 border border-rose-200 pointer-events-none"></div>
        <div className="absolute top-3.5 left-3.5 right-3.5 bottom-3.5 border border-rose-100 pointer-events-none"></div>

        {/* Content Area - Compacted */}
        <div className="px-6 py-6 flex flex-col items-center text-center relative z-10 justify-between">

          {/* 1. Header Section */}
          <div className="flex flex-col items-center w-full mt-1 mb-2">
            <p className="font-serif text-[8px] tracking-[0.3em] text-gray-400 uppercase mb-1">
              THE ITINERARY
            </p>
            <h1 className="font-script text-4xl sm:text-5xl text-gray-900 leading-none mb-2">
              Sweet Details
            </h1>
            {/* Divider */}
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>
          </div>

          {/* 2. List Items Section - Tighter Spacing */}
          <div className="flex flex-col space-y-3 w-full my-3">
            {infoItems.map((item, index) => (
              <div
                key={item.label}
                className={`flex flex-col items-center transition-all duration-1000 ease-out ${index < visibleIndex
                    ? 'opacity-100 translate-y-0 blur-0'
                    : 'opacity-0 translate-y-8 blur-sm'
                  }`}
              >
                <h3 className="font-cute text-[8px] font-bold text-rose-300 uppercase tracking-widest mb-0.5">
                  {item.label}
                </h3>
                {/* Typography Update: Italic Serif for elegance */}
                <div className="font-serif text-base text-gray-800 leading-tight italic tracking-wide">
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* 3. Action Button Section */}
          <div className={`mt-2 transition-all duration-1000 delay-300 ${visibleIndex === infoItems.length
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none'
            }`}>
            <button
              onClick={() => { soundManager.playClick(); onComplete(); }}
              className="group flex items-center gap-2 px-7 py-3 bg-gray-900 text-white rounded-full hover:bg-black hover:shadow-lg active:scale-95 transition-all"
            >
              <span className="font-cute font-bold text-[10px] tracking-[0.15em] uppercase">
                Choose Menu
              </span>
              <ChevronRight size={12} className="text-rose-200 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default InfoCards;