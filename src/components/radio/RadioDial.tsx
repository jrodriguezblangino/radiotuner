import React from 'react';
import { Heart } from 'lucide-react';

interface RadioDialProps {
  needlePosition: number;
}

export default function RadioDial({ needlePosition }: RadioDialProps) {
  // Frecuencias para el dial (el centro será el corazón)
  const frequencies = [88, 92, 96, '♥', 104, 108, 112];
  
  return (
    <div className="relative w-full h-24 rounded-lg overflow-hidden"
         style={{
           background: 'linear-gradient(180deg, #1a0f0a 0%, #2C1810 50%, #1a0f0a 100%)',
           boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.8), inset 0 -2px 10px rgba(255,179,71,0.1)'
         }}>
      
      {/* Cristal del dial con efecto de luz */}
      <div className="absolute inset-2 rounded-md overflow-hidden"
           style={{
             background: 'linear-gradient(180deg, rgba(255,235,205,0.95) 0%, rgba(255,222,173,0.9) 100%)',
             boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.3), 0 0 30px rgba(255,179,71,0.3)'
           }}>
        
        {/* Líneas de frecuencia */}
        <div className="absolute inset-0 flex justify-between items-center px-8">
          {frequencies.map((freq, index) => (
            <div key={index} className="flex flex-col items-center">
              {freq === '♥' ? (
                <Heart 
                  className="w-6 h-6 text-red-600 fill-red-500 drop-shadow-lg animate-pulse"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(239,68,68,0.6))' }}
                />
              ) : (
                <span className="text-sm font-bold text-amber-900/80"
                      style={{ fontFamily: 'Georgia, serif' }}>
                  {freq}
                </span>
              )}
              <div className="w-0.5 h-4 bg-amber-900/40 mt-1" />
            </div>
          ))}
        </div>
        
        {/* Líneas pequeñas intermedias */}
        <div className="absolute bottom-4 left-8 right-8 flex justify-between">
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} className="w-px h-2 bg-amber-900/30" />
          ))}
        </div>
        
        {/* Aguja indicadora */}
        <div 
          className="absolute top-2 bottom-2 w-1 transition-all duration-100 ease-out"
          style={{
            left: `calc(${8 + (needlePosition * 84)}% - 2px)`,
            background: 'linear-gradient(180deg, #8B0000 0%, #DC143C 50%, #8B0000 100%)',
            boxShadow: '0 0 10px rgba(220,20,60,0.8), 0 0 20px rgba(220,20,60,0.4)',
            borderRadius: '2px'
          }}
        >
          {/* Punta de la aguja */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0"
               style={{
                 borderLeft: '4px solid transparent',
                 borderRight: '4px solid transparent',
                 borderTop: '6px solid #DC143C',
                 filter: 'drop-shadow(0 2px 4px rgba(220,20,60,0.6))'
               }} />
        </div>
        
        {/* Reflejo del cristal */}
        <div className="absolute inset-0 pointer-events-none"
             style={{
               background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)',
             }} />
      </div>
      
      {/* Marco metálico */}
      <div className="absolute inset-0 pointer-events-none rounded-lg"
           style={{
             border: '3px solid transparent',
             borderImage: 'linear-gradient(180deg, #DAA520, #8B7355, #DAA520) 1',
           }} />
    </div>
  );
}