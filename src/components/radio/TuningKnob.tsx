import React, { useState, useRef, useCallback } from 'react';

interface TuningKnobProps {
  value: number;
  onChange: (value: number) => void;
}

export default function TuningKnob({ value, onChange }: TuningKnobProps) {
  const knobRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const lastAngleRef = useRef(0);
  
  const getAngleFromEvent = useCallback((e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent, rect: DOMRect) => {
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
  }, []);

  const handleStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const rect = knobRef.current.getBoundingClientRect();
    lastAngleRef.current = getAngleFromEvent(e, rect);
  }, [getAngleFromEvent]);

  const handleMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const rect = knobRef.current.getBoundingClientRect();
    const currentAngle = getAngleFromEvent(e, rect);
    let deltaAngle = currentAngle - lastAngleRef.current;
    
    if (deltaAngle > 180) deltaAngle -= 360;
    if (deltaAngle < -180) deltaAngle += 360;
    
    const sensitivity = 0.003;
    const newValue = Math.max(0, Math.min(1, value + deltaAngle * sensitivity));
    onChange(newValue);
    lastAngleRef.current = currentAngle;
  }, [isDragging, value, onChange, getAngleFromEvent]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove);
      window.addEventListener('touchend', handleEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, handleMove, handleEnd]);

  const rotation = value * 270 - 135; // -135 a +135 grados

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-xs uppercase tracking-widest text-amber-200/60"
            style={{ fontFamily: 'Georgia, serif' }}>
        Sintonía
      </span>
      
      <div 
        ref={knobRef}
        className="relative w-24 h-24 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleStart}
        onTouchStart={handleStart}
      >
        {/* Base del mando */}
        <div className="absolute inset-0 rounded-full"
             style={{
               background: 'linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 100%)',
               boxShadow: '0 8px 30px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.1)'
             }} />
        
        {/* Anillo exterior metálico */}
        <div className="absolute inset-1 rounded-full"
             style={{
               background: 'conic-gradient(from 0deg, #8B7355, #DAA520, #B8860B, #8B7355, #DAA520, #8B7355)',
               boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)'
             }} />
        
        {/* Cuerpo principal del knob */}
        <div className="absolute inset-3 rounded-full"
             style={{
               background: 'radial-gradient(ellipse at 30% 30%, #4a4a4a 0%, #2a2a2a 50%, #1a1a1a 100%)',
               boxShadow: 'inset 0 4px 8px rgba(255,255,255,0.1), inset 0 -4px 8px rgba(0,0,0,0.4)'
             }}>
          
          {/* Textura del knob - surcos */}
          <div className="absolute inset-2 rounded-full overflow-hidden">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-full h-0.5 -translate-y-1/2 origin-left"
                style={{
                  transform: `translateX(-50%) translateY(-50%) rotate(${i * 15}deg)`,
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)'
                }}
              />
            ))}
          </div>
          
          {/* Indicador de posición */}
          <div 
            className="absolute inset-4 rounded-full flex items-start justify-center pt-1"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <div className="w-1.5 h-4 rounded-full"
                 style={{
                   background: 'linear-gradient(180deg, #FFD700 0%, #DAA520 100%)',
                   boxShadow: '0 0 8px rgba(255,215,0,0.6)'
                 }} />
          </div>
        </div>
        
        {/* Reflejo superior */}
        <div className="absolute inset-3 rounded-full pointer-events-none overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full"
               style={{
                 background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 70%)'
               }} />
        </div>
      </div>
      
      {/* Marcas de escala alrededor */}
      <div className="absolute w-32 h-32 pointer-events-none">
        {Array.from({ length: 11 }).map((_, i) => {
          const angle = -135 + (i * 27);
          return (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-1 h-1.5 bg-amber-600/40 rounded-full"
              style={{
                transform: `rotate(${angle}deg) translateY(-52px) translateX(-50%)`
              }}
            />
          );
        })}
      </div>
    </div>
  );
}