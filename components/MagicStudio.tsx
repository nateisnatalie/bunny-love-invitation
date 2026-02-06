import React, { useState, useRef } from 'react';
import { Wand2, Image as ImageIcon, Loader2, Download, ArrowLeft } from 'lucide-react';
import { editImageWithMagic, generateDreamImage } from '../services/geminiService';
import { ImageSize } from '../types';

interface MagicStudioProps {
  onBack: () => void;
}

const MagicStudio: React.FC<MagicStudioProps> = ({ onBack }) => {
  const [mode, setMode] = useState<'generate' | 'edit'>('generate');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<ImageSize>('1K');
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const img = await generateDreamImage(prompt, selectedSize);
      setResultImage(img);
    } catch (e) {
      alert("Oops! Magic failed. Try again?");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!prompt || !uploadImage) return;
    setLoading(true);
    try {
      const img = await editImageWithMagic(uploadImage, prompt);
      setResultImage(img);
    } catch (e) {
      alert("Oops! Magic failed. Try again?");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto p-4 space-y-6 animate-pop">
      <div className="w-full flex justify-between items-center mb-2">
        <button onClick={onBack} className="p-2 bg-white rounded-full shadow-sm text-gray-500 hover:bg-gray-50">
           <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-cute font-bold text-rose-400">✨ Magic Studio</h2>
        <div className="w-10"></div>
      </div>

      <div className="bg-white p-1 rounded-full shadow-sm flex space-x-1 border border-rose-100">
        <button 
          onClick={() => { setMode('generate'); setResultImage(null); }}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${mode === 'generate' ? 'bg-rose-300 text-white' : 'text-gray-400 hover:text-rose-300'}`}
        >
          Create New
        </button>
        <button 
          onClick={() => { setMode('edit'); setResultImage(null); }}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${mode === 'edit' ? 'bg-rose-300 text-white' : 'text-gray-400 hover:text-rose-300'}`}
        >
          Edit Photo
        </button>
      </div>

      <div className="w-full bg-white rounded-3xl p-6 shadow-lg border-2 border-rose-50 flex flex-col space-y-4">
        
        {mode === 'edit' && (
          <div className="flex flex-col items-center justify-center space-y-2">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-32 bg-rose-50 rounded-2xl border-2 border-dashed border-rose-200 flex flex-col items-center justify-center cursor-pointer hover:bg-rose-100 transition-colors overflow-hidden"
            >
              {uploadImage ? (
                <img src={uploadImage} alt="Upload" className="w-full h-full object-cover" />
              ) : (
                <>
                  <ImageIcon className="text-rose-300 mb-1" />
                  <span className="text-xs text-rose-400 font-bold">Tap to upload bunny photo</span>
                </>
              )}
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
          </div>
        )}

        {mode === 'generate' && (
             <div className="flex justify-center space-x-2">
                {(['1K', '2K', '4K'] as ImageSize[]).map(size => (
                    <button 
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`text-xs px-3 py-1 rounded-full border ${selectedSize === size ? 'bg-rose-100 border-rose-300 text-rose-600' : 'bg-gray-50 border-gray-200 text-gray-400'}`}
                    >
                        {size}
                    </button>
                ))}
             </div>
        )}

        <div className="relative">
             <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={mode === 'generate' ? "A cute bunny holding a giant strawberry..." : "Add a retro filter, make it vintage..."}
                className="w-full p-3 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-rose-200 resize-none h-24"
             />
             <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                {mode === 'generate' ? 'Pro 3.0' : 'Flash 2.5'}
             </div>
        </div>

        <button 
            disabled={loading || !prompt || (mode === 'edit' && !uploadImage)}
            onClick={mode === 'generate' ? handleGenerate : handleEdit}
            className="w-full py-3.5 bg-gray-900 text-white rounded-full font-bold shadow-xl hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-transform active:scale-95"
        >
            {loading ? <Loader2 className="animate-spin" /> : <Wand2 size={18} />}
            <span className="font-cute text-[12px] uppercase tracking-widest">{mode === 'generate' ? 'Dream It' : 'Magic Edit'}</span>
        </button>
      </div>

      {resultImage && (
        <div className="w-full bg-white p-4 rounded-3xl shadow-xl border-4 border-white animate-pop relative group">
            <img src={resultImage} alt="Result" className="w-full rounded-xl" />
            <a 
                href={resultImage} 
                download={`magic-bunny-${Date.now()}.png`}
                className="absolute bottom-6 right-6 p-3 bg-white rounded-full shadow-lg text-rose-500 hover:text-rose-600 hover:scale-110 transition-all"
            >
                <Download size={20} />
            </a>
        </div>
      )}
    </div>
  );
};

export default MagicStudio;