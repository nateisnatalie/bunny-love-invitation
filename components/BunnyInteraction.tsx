import React, { useState } from 'react';
import { CONFIG, PLACEHOLDER_BUNNY } from '../constants';

interface BunnyInteractionProps {
  onComplete: () => void;
}

const BunnyInteraction: React.FC<BunnyInteractionProps> = ({ onComplete }) => {
  const [status, setStatus] = useState<'idle' | 'moving' | 'fed'>('idle');

  const handleTap = () => {
    if (status !== 'idle') return;
    setStatus('moving');
    
    // Animation timing - waits for css transition (700ms) to mostly complete
    setTimeout(() => {
        setStatus('fed');
        // Wait before proceeding
        setTimeout(onComplete, 1500);
    }, 600);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] relative overflow-hidden animate-pop px-6">
      <h2 className="text-xl font-cute font-bold text-rose-400 mb-8">
        {status === 'fed' ? "Yummy! ❤️" : "Feed the bunny!"}
      </h2>

      {/* Bunny */}
      <div className={`relative w-48 h-48 transition-transform duration-300 ${status === 'fed' ? 'scale-110 rotate-3' : 'scale-100'}`}>
        <img 
            src={CONFIG.bunnyImage} 
            onError={(e) => e.currentTarget.src = PLACEHOLDER_BUNNY}
            alt="Bunny" 
            className="w-full h-full object-contain" 
        />
        {status === 'fed' && (
            <div className="absolute -top-2 -right-2 text-4xl animate-bounce">💖</div>
        )}
      </div>

      <div className="h-40 w-full flex flex-col items-center justify-center relative">
        {/* Strawberry Button */}
        <button
            onClick={handleTap}
            disabled={status !== 'idle'}
            className={`
                text-6xl transition-all duration-700 ease-in-out transform
                ${status === 'moving' ? '-translate-y-40 opacity-0 scale-50' : 'translate-y-0 opacity-100 scale-100'}
                ${status === 'idle' ? 'hover:scale-110 active:scale-90 cursor-pointer animate-pulse' : ''}
            `}
            style={{ 
                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
                zIndex: 10
            }}
        >
            🍓
        </button>
        
        <p className={`text-gray-300 text-sm mt-4 transition-opacity duration-300 ${status !== 'idle' ? 'opacity-0' : 'opacity-100'}`}>
            Tap to feed
        </p>
      </div>
    </div>
  );
};

export default BunnyInteraction;