import React, { useState, useRef } from 'react';
import { CONFIG } from '../constants';
import { Download, Edit2, Heart, Clock } from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import { soundManager } from '../utils/sound';

const LetterWriter: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isSealed, setIsSealed] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);

  // Get current date/time for display
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/-/g, '.');
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

  const handleSeal = () => {
    if (!message.trim()) return;
    soundManager.playPop();
    setIsSealed(true);
  };

  const handleEdit = () => {
    soundManager.playClick();
    setIsSealed(false);
  };

  const handleDownload = async () => {
    if (letterRef.current) {
      setDownloading(true);
      try {
        const dataUrl = await htmlToImage.toPng(letterRef.current, { quality: 1.0, pixelRatio: 3 });
        const link = document.createElement('a');
        link.download = `Letter-from-${CONFIG.herName}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Failed to download letter', err);
        alert("Oh no! Couldn't save the letter.");
      } finally {
        setDownloading(false);
      }
    }
  };

  // --------------------------------------------------------------------------
  // SHARED CARD CONTENT
  // We extract the "Card Look" so we can use it for both INPUT and RESULT.
  // --------------------------------------------------------------------------
  const CardContent = ({ mode }: { mode: 'input' | 'display' }) => (
    <div 
        className="p-6 relative flex flex-col items-center shadow-xl transition-transform hover:scale-[1.005] duration-500"
        style={{
            backgroundColor: '#fff0f5', // Soft Pink (Rose-50)
            width: '320px', 
            borderRadius: '12px',
        }}
    >
        {/* The White Paper Card */}
        <div className="bg-white w-full rounded-[20px] p-6 shadow-sm flex flex-col relative overflow-hidden min-h-[360px]">
            
            {/* Header: Avatar + User */}
            <div className="flex items-center gap-3 mb-5 z-10 shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 bg-gray-50">
                    <img 
                        src={CONFIG.bunnyImage} 
                        alt="Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col leading-tight">
                    <span className="font-cute font-extrabold text-gray-900 text-base">{CONFIG.herName.toLowerCase()}</span>
                    <span className="font-cute text-gray-400 text-xs font-medium">@{CONFIG.herName.toLowerCase()}</span>
                </div>
            </div>

            {/* Big Date */}
            <h2 className="font-cute font-black text-3xl text-gray-900 mb-4 tracking-tight z-10 shrink-0">
                {dateStr}
            </h2>

            {/* Message Body */}
            <div className="mb-6 flex-grow z-10 w-full relative">
                {mode === 'input' ? (
                     <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write your note here..."
                        className="w-full h-full min-h-[150px] resize-none outline-none text-gray-800 font-cute text-[15px] leading-relaxed bg-transparent placeholder-gray-300"
                        autoFocus
                    />
                ) : (
                    <p className="font-cute text-gray-800 text-[15px] leading-relaxed whitespace-pre-wrap">
                        {message}
                    </p>
                )}
            </div>

            {/* Time Footer */}
            <div className="flex items-center gap-1.5 text-gray-400 mt-auto z-10 shrink-0">
                <Clock size={14} className="opacity-80" />
                <span className="font-cute text-sm font-medium">{timeStr}</span>
            </div>
        </div>

        {/* Bottom Watermark */}
        <div className="mt-6 mb-2 text-center">
            <p className="font-cute text-[10px] font-bold text-rose-400 tracking-widest uppercase opacity-80">
                Created from Bunny Love
            </p>
        </div>
    </div>
  );


  // --------------------------------------------------------------------------
  // RENDER: INPUT MODE
  // --------------------------------------------------------------------------
  if (!isSealed) {
    return (
      <div className="flex flex-col items-center w-full animate-pop py-8 px-4">
        
        {/* 
            Title Area - ALIGNED WITH APP AESTHETIC 
            Replaced generic header with elegant Serif/Script typography
        */}
        <div className="w-full max-w-[320px] mb-8 flex flex-col items-center text-center">
            <p className="font-serif text-[9px] tracking-[0.3em] text-gray-400 uppercase mb-2">
                FINAL TOUCH
            </p>
            <h2 className="font-script text-5xl text-gray-900 leading-none mb-3">
                Write a Note
            </h2>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>
        </div>
        {/* The Card (Input Version) */}
        <div className="mb-8">
            <CardContent mode="input" />
        </div>

        {/* Actions - ROUNDED-FULL */}
        <button
            onClick={handleSeal}
            disabled={!message.trim()}
            className="w-full max-w-[320px] py-3.5 bg-gray-900 text-white rounded-full font-cute font-bold text-[10px] uppercase tracking-[0.15em] shadow-xl hover:bg-black active:scale-95 disabled:opacity-50 disabled:active:scale-100 transition-all flex items-center justify-center gap-2 group"
        >
            <span>Seal & Preview</span>
            <Heart size={14} className="fill-rose-500 text-rose-500" />
        </button>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // RENDER: PREVIEW/DOWNLOAD MODE
  // --------------------------------------------------------------------------
  return (
    <div className="flex flex-col items-center w-full animate-pop py-8 px-4">
        
      {/* Header for Preview Mode */}
      <div className="w-full max-w-[320px] mb-8 flex flex-col items-center text-center">
             <p className="font-serif text-[9px] tracking-[0.3em] text-gray-400 uppercase mb-2">
                 READY TO SEND
             </p>
             <h2 className="font-script text-5xl text-gray-900 leading-none mb-3">
                 Your Letter
             </h2>
      </div>

      {/* Container for the Image Generation */}
      <div className="w-full flex flex-col items-center mb-8">
        {/* We use a ref here to capture EXACTLY this DOM element */}
        <div ref={letterRef}>
            <CardContent mode="display" />
        </div>
      </div>

      {/* Actions - ROUNDED-FULL */}
      <div className="w-full max-w-[320px] flex gap-3">
        <button
            onClick={handleEdit}
            disabled={downloading}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white border border-rose-100 text-rose-400 rounded-full font-cute font-bold text-[10px] uppercase tracking-[0.15em] hover:bg-rose-50 active:scale-95 transition-all group"
        >
            <span>Edit</span>
            <Edit2 size={14} className="group-hover:-rotate-12 transition-transform opacity-70" />
        </button>
        <button 
            onClick={handleDownload}
            disabled={downloading}
            className="flex-[2] py-3.5 bg-gray-900 text-white rounded-full font-cute font-bold text-[10px] uppercase tracking-[0.15em] shadow-xl hover:bg-black active:scale-95 transition-all flex items-center justify-center gap-2 group"
        >
            <span>{downloading ? "Saving..." : "Save Card"}</span>
            <Download size={16} className="text-rose-200 group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>

    </div>
  );
};

export default LetterWriter;