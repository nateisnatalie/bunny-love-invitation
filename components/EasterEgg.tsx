import React, { useState } from 'react';

const EasterEgg: React.FC = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="text-center">
        <button 
            onClick={() => setShow(true)}
            className="text-[10px] text-gray-300/60 hover:text-rose-300 transition-colors font-mono tracking-widest"
        >
            © 2026 Natalie | SECRET MENU
        </button>
      </div>

      {show && (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={() => setShow(false)}
        >
            <div 
                className="bg-white p-8 rounded-3xl shadow-2xl animate-pop max-w-xs text-center border border-gray-100" 
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💌</span>
                </div>
                <h3 className="font-cute text-xl font-bold text-gray-900 mb-2">Secret Note</h3>
                <p className="font-cute text-gray-600 text-base leading-relaxed mb-4">
                    I honestly just wanted an excuse to code something cute for you. 
                    <br/><br/>
                    <span className="text-rose-400 font-bold">Love you!</span>
                </p>
                <p className="text-[10px] text-gray-300 uppercase tracking-widest">(Tap anywhere to close)</p>
            </div>
        </div>
      )}
    </>
  );
};

export default EasterEgg;