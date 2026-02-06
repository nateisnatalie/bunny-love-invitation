import React, { useState } from 'react';
import { CONFIG, Step, PLACEHOLDER_BUNNY } from './constants';
import InfoCards from './components/InfoCards';
import RSVPPass from './components/RSVPPass';
import LetterWriter from './components/LetterWriter'; // Import the new component
import EasterEgg from './components/EasterEgg';
import { PassData } from './types';
import { Heart, Volume2, VolumeX, Send, ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';
import { soundManager } from './utils/sound';

const App: React.FC = () => {
  const [step, setStep] = useState<Step>(Step.OPENING);
  const [selectedFlavor, setSelectedFlavor] = useState<string>('');
  const [passData, setPassData] = useState<PassData | null>(null);
  const [isMuted, setIsMuted] = useState(soundManager.isMuted);
  const [showCuteNo, setShowCuteNo] = useState(false);
  
  // Custom Flavor State
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customFlavor, setCustomFlavor] = useState('');

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) soundManager.playClick();
  };

  const handleBack = () => {
    soundManager.playClick();
    switch (step) {
      case Step.INFO_CARDS:
        setStep(Step.OPENING);
        break;
      case Step.FLAVOR:
        setStep(Step.INFO_CARDS);
        break;
      case Step.INVITATION:
        setStep(Step.FLAVOR);
        break;
      case Step.RSVP_PASS:
        setStep(Step.INVITATION);
        break;
      case Step.LETTER:
        setStep(Step.RSVP_PASS);
        break;
      default:
        break;
    }
  };

  const handleStart = () => {
    soundManager.playClick();
    setStep(Step.INFO_CARDS);
  };

  const handleFlavorSelect = (flavor: string) => {
    soundManager.playClick();
    setSelectedFlavor(flavor);
    setTimeout(() => setStep(Step.INVITATION), 300);
  };

  const handleCustomSubmit = () => {
    if (!customFlavor.trim()) return;
    handleFlavorSelect(customFlavor);
  };

  const handleRSVP = () => {
    soundManager.playSuccess();
    const seat = Math.random() > 0.5 ? "VIP-01" : "LOVE-99";
    setPassData({
      flavor: selectedFlavor,
      seatNumber: seat,
      timestamp: new Date().toISOString()
    });
    setStep(Step.RSVP_PASS);
  };

  // --------------------------------------------------------------------------
  // SHARED: The Elegant Card Wrapper
  // This ensures Page 1, 3 & 4 match Page 2 perfectly.
  // --------------------------------------------------------------------------
  const ElegantCardWrapper = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`w-full max-w-[320px] bg-white shadow-2xl relative transition-transform duration-500 hover:scale-[1.01] ${className}`}>
        {/* Decorative Borders (The "Frame") */}
        <div className="absolute top-2.5 left-2.5 right-2.5 bottom-2.5 border border-rose-200 pointer-events-none"></div>
        <div className="absolute top-3.5 left-3.5 right-3.5 bottom-3.5 border border-rose-100 pointer-events-none"></div>
        
        {/* Content */}
        <div className="relative z-10">
            {children}
        </div>
    </div>
  );

  const renderContent = () => {
    switch (step) {
      case Step.OPENING:
        return (
          <div className="flex flex-col items-center justify-center min-h-full animate-pop px-4 w-full py-8">
            
            {/* 
                PAGE 1: THE COVER CARD
                Now aligned with the rest of the app's elegant style
            */}
            <ElegantCardWrapper>
                <div className="px-6 py-12 flex flex-col items-center text-center min-h-[440px] justify-between">
                    
                    {/* Top Section */}
                    <div className="flex flex-col items-center w-full">
                        <p className="font-serif text-[9px] tracking-[0.3em] text-gray-400 uppercase mb-6">
                            A SPECIAL INVITATION FOR
                        </p>
                        
                        {/* Bunny Image - Centered and clean */}
                        <div className="relative w-32 h-32 mb-6 transition-transform duration-700 hover:scale-105">
                            <img 
                              src={CONFIG.bunnyImage} 
                              onError={(e) => e.currentTarget.src = PLACEHOLDER_BUNNY} 
                              alt="Bunny" 
                              className="w-full h-full object-contain drop-shadow-sm" 
                            />
                        </div>

                        {/* Name - Big Script Font */}
                        <h1 className="font-script text-6xl text-gray-900 leading-none mb-4">
                            {CONFIG.herName}
                        </h1>

                        {/* Decorative Divider */}
                        <div className="w-12 h-px bg-rose-200 mb-4"></div>

                        {/* Subtext */}
                        <p className="font-serif italic text-lg text-gray-600">
                           {CONFIG.slogan}
                        </p>
                    </div>

                    {/* Bottom Section - Button */}
                    <div className="mt-4 w-full flex justify-center">
                        <button 
                            onClick={handleStart}
                            className="group px-8 py-3.5 bg-gray-900 text-white rounded-full shadow-xl hover:bg-black transition-all active:scale-95 flex items-center gap-3"
                        >
                            <span className="font-cute font-bold text-[10px] tracking-[0.15em] uppercase">Open Invitation</span>
                            <ArrowRight size={16} className="text-rose-200 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                </div>
            </ElegantCardWrapper>
          </div>
        );

      case Step.INFO_CARDS:
        return (
            <div className="h-full flex flex-col justify-center">
                 <InfoCards onComplete={() => { soundManager.playClick(); setStep(Step.FLAVOR); }} />
            </div>
        );

      case Step.FLAVOR:
        return (
          <div className="flex flex-col items-center justify-center min-h-full animate-pop px-4 w-full py-8">
            
            {/* Elegant Menu Card */}
            <ElegantCardWrapper>
                <div className="px-6 py-8 flex flex-col items-center min-h-[400px]">
                    
                    {/* Header */}
                    <p className="font-serif text-[8px] tracking-[0.3em] text-gray-400 uppercase mb-2">SELECTION</p>
                    <h2 className="font-script text-4xl text-gray-900 mb-6">Le Menu</h2>

                    {/* Menu List */}
                    <div className="w-full space-y-3 flex-1">
                        {CONFIG.flavors.map((flavor, idx) => (
                            <button
                                key={flavor}
                                onClick={() => handleFlavorSelect(flavor)}
                                className="w-full group relative overflow-hidden p-3 transition-all active:scale-[0.98]"
                                style={{ transitionDelay: `${idx * 50}ms` }}
                            >
                                {/* Hover background effect */}
                                <div className="absolute inset-0 bg-rose-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
                                
                                <div className="relative flex items-center justify-between px-2">
                                    <span className="font-serif italic text-lg text-gray-700 group-hover:text-gray-900 transition-colors">
                                        {flavor}
                                    </span>
                                    {/* Small circle indicator */}
                                    <div className="w-4 h-4 rounded-full border border-rose-200 flex items-center justify-center group-hover:border-rose-400">
                                        <div className="w-2 h-2 bg-rose-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                </div>
                                {/* Divider line */}
                                <div className="absolute bottom-0 left-2 right-2 h-px bg-gray-100 group-hover:bg-rose-100 transition-colors"></div>
                            </button>
                        ))}

                        {/* Custom Input Toggle */}
                        {!showCustomInput ? (
                            <button
                                onClick={() => {
                                    soundManager.playClick();
                                    setShowCustomInput(true);
                                }}
                                className="w-full text-center mt-4 py-2"
                            >
                                <span className="font-cute text-[10px] font-bold text-gray-300 hover:text-rose-400 uppercase tracking-widest transition-colors">
                                    + Request Special
                                </span>
                            </button>
                        ) : (
                             <div className="mt-4 animate-pop">
                                <div className="flex items-center gap-2 border-b border-rose-300 pb-1">
                                     <input 
                                        type="text" 
                                        value={customFlavor}
                                        onChange={(e) => setCustomFlavor(e.target.value)}
                                        placeholder="Your wish..."
                                        autoFocus
                                        onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
                                        className="flex-1 px-1 py-1 text-base text-gray-800 font-serif italic placeholder-gray-300 outline-none bg-transparent"
                                    />
                                    <button 
                                        onClick={handleCustomSubmit}
                                        disabled={!customFlavor.trim()}
                                        className="text-gray-900 disabled:opacity-30 hover:scale-110 transition-transform"
                                    >
                                        <Send size={16} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Footer decoration */}
                    <div className="mt-6 text-gray-300">
                        <Sparkles size={12} />
                    </div>
                </div>
            </ElegantCardWrapper>
          </div>
        );

      case Step.INVITATION:
        return (
          <div className="flex flex-col items-center justify-center min-h-full animate-pop px-4 w-full py-8">
            
            {/* Elegant Reservation Card */}
            <ElegantCardWrapper className="mb-6">
                <div className="px-6 py-10 flex flex-col items-center text-center">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-6 opacity-80">
                         <div className="h-px w-6 bg-rose-200"></div>
                         <span className="text-[9px] font-bold text-rose-400 uppercase tracking-widest">Confirmed</span>
                         <div className="h-px w-6 bg-rose-200"></div>
                    </div>

                    <h2 className="font-script text-4xl text-gray-900 mb-8 leading-tight">
                        See You Soon
                    </h2>

                    {/* Details Grid */}
                    <div className="space-y-6 w-full">
                        <div>
                            <p className="font-cute text-[9px] font-bold text-gray-300 uppercase tracking-widest mb-1">When</p>
                            <p className="font-serif italic text-xl text-gray-800">{CONFIG.date}</p>
                        </div>
                        <div>
                            <p className="font-cute text-[9px] font-bold text-gray-300 uppercase tracking-widest mb-1">What</p>
                            <p className="font-serif italic text-lg text-gray-800">{CONFIG.activity}</p>
                        </div>
                        <div>
                            <p className="font-cute text-[9px] font-bold text-gray-300 uppercase tracking-widest mb-1">Choice</p>
                            <div className="flex items-center justify-center gap-2">
                                <Check size={14} className="text-rose-400" />
                                <p className="font-serif italic text-lg text-rose-600 border-b border-rose-100 pb-0.5 inline-block">
                                    {selectedFlavor}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </ElegantCardWrapper>

            {/* Actions - UPDATED BUTTONS TO ROUNDED-FULL */}
            <div className="w-full max-w-[320px] space-y-3 px-4">
                <button 
                    onClick={handleRSVP}
                    className="w-full py-3.5 bg-gray-900 text-white rounded-full font-cute font-bold text-[10px] uppercase tracking-[0.15em] shadow-xl hover:bg-black active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                    <span>Confirm Reservation</span>
                    <Heart size={14} className="fill-rose-500 text-rose-500" />
                </button>
                
                <div className="relative">
                     {showCuteNo && (
                        <div className="absolute bottom-full left-0 w-full mb-2 text-center">
                            <span className="inline-block bg-white text-gray-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md border border-gray-100 animate-bounce">
                                Nope, no changing! 🔒
                            </span>
                        </div>
                    )}
                    <button 
                        onClick={() => {
                            soundManager.playClick();
                            setShowCuteNo(true);
                            setTimeout(() => setShowCuteNo(false), 2000);
                        }}
                        className="w-full py-3 bg-transparent text-gray-400 rounded-full font-cute font-bold text-[10px] uppercase tracking-widest hover:text-gray-800 transition-all"
                    >
                        Maybe later?
                    </button>
                </div>
            </div>
          </div>
        );

      case Step.RSVP_PASS:
        return passData ? (
             <div className="h-full flex flex-col justify-center">
                <RSVPPass 
                    data={passData} 
                    onWriteLetter={() => {
                    soundManager.playClick();
                    setStep(Step.LETTER);
                    }} 
                />
            </div>
        ) : null;

      case Step.LETTER:
        // Letter writer needs to scroll if content is tall
        return <LetterWriter />;

      default:
        return null;
    }
  };

  return (
    // UPDATED: Added overflow-y-auto to main and removed centering constraints
    // This allows the main content area to scroll when the letter content becomes too long
    <div className="h-screen w-full max-w-md mx-auto relative overflow-hidden flex flex-col">
      
      {/* Back Button */}
      {step !== Step.OPENING && (
          <button 
            onClick={handleBack}
            className="absolute top-6 left-6 z-50 w-10 h-10 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white active:scale-90 transition-all shadow-sm"
        >
            <ArrowLeft size={18} />
        </button>
      )}

      {/* Mute Button */}
      <button 
          onClick={toggleMute}
          className={`absolute top-6 right-6 z-50 w-10 h-10 rounded-full border flex items-center justify-center transition-all shadow-sm
            ${isMuted 
                ? 'bg-rose-50 text-rose-500 border-rose-200' 
                : 'bg-white/80 backdrop-blur-sm text-gray-700 border-gray-200 hover:bg-white'}`}
      >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      {/* MAIN CONTENT AREA: Scrollable */}
      <main className="flex-grow z-10 w-full relative overflow-y-auto no-scrollbar">
        {renderContent()}
      </main>

      {/* Footer remains fixed at bottom if possible, or scrolls if inside flow. 
          Here we keep it outside main so it's fixed, but if main scrolls, it might overlap.
          Actually, for this design, putting it relative at bottom of view is safer. 
      */}
      <footer className="shrink-0 text-center pb-8 pt-2 z-10 w-full relative bg-transparent">
          <div className="flex items-center justify-center gap-1.5 mb-1.5 opacity-80">
             <span className="font-cute text-xs font-bold text-gray-400 tracking-widest uppercase">From {CONFIG.myName}</span>
             <Heart size={12} className="text-rose-400 fill-rose-400 animate-pulse" />
          </div>
          <EasterEgg />
      </footer>
    </div>
  );
};

export default App;