import React from 'react';

export default function Speaker() {
  return (
    <div className="relative w-full h-32 rounded-lg overflow-hidden"
         style={{
           background: 'linear-gradient(180deg, #1a0f0a 0%, #2C1810 100%)',
           boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.8)'
         }}>
      
      {/* Marco del altavoz */}
      <div className="absolute inset-2 rounded-md overflow-hidden"
           style={{
             background: 'linear-gradient(135deg, #8B7355 0%, #6B4423 100%)',
             boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)'
           }}>
        
        {/* Tela del altavoz */}
        <div className="absolute inset-1 rounded"
             style={{
               background: `
                 repeating-linear-gradient(
                   0deg,
                   #3a2a1a 0px,
                   #3a2a1a 1px,
                   #2a1a0a 1px,
                   #2a1a0a 3px
                 ),
                 repeating-linear-gradient(
                   90deg,
                   #3a2a1a 0px,
                   #3a2a1a 1px,
                   #2a1a0a 1px,
                   #2a1a0a 3px
                 )
               `,
               boxShadow: 'inset 0 0 30px rgba(0,0,0,0.6)'
             }}>
          
          {/* Patrón de la tela (grid más visible) */}
          <svg className="absolute inset-0 w-full h-full opacity-30">
            <defs>
              <pattern id="speakerPattern" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
                <circle cx="3" cy="3" r="1" fill="#5a4a3a" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#speakerPattern)" />
          </svg>
        </div>
      </div>
      
      {/* Tornillos decorativos */}
      {[
        { top: '8px', left: '8px' },
        { top: '8px', right: '8px' },
        { bottom: '8px', left: '8px' },
        { bottom: '8px', right: '8px' }
      ].map((pos, i) => (
        <div 
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            ...pos,
            background: 'radial-gradient(ellipse at 30% 30%, #B8860B 0%, #6B4423 100%)',
            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.5)'
          }}
        >
          <div className="absolute inset-1 flex items-center justify-center">
            <div className="w-full h-0.5 bg-amber-900/60 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}