import React, { useState, useRef, useCallback } from 'react';

interface VolumeKnobProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
}

export default function VolumeKnob({ value, onChange, label = "Volumen" }: VolumeKnobProps) {
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
    
    const sensitivity = 0.004;
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

  const rotation = value * 270 - 135;

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs uppercase tracking-widest text-amber-200/60"
            style={{ fontFamily: 'Georgia, serif' }}>
        {label}
      </span>
      
      <div 
        ref={knobRef}
        className="relative w-16 h-16 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleStart}
        onTouchStart={handleStart}
      >
        {/* Base */}
        <div className="absolute inset-0 rounded-full"
             style={{
               background: 'linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 100%)',
               boxShadow: '0 4px 15px rgba(0,0,0,0.6)'
             }} />
        
        {/* Anillo metálico */}
        <div className="absolute inset-0.5 rounded-full"
             style={{
               background: 'conic-gradient(from 0deg, #6B4423, #8B7355, #B8860B, #6B4423)',
             }} />
        
        {/* Cuerpo del knob */}
        <div className="absolute inset-2 rounded-full"
             style={{
               background: 'radial-gradient(ellipse at 30% 30%, #3a3a3a 0%, #1a1a1a 100%)',
               boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1)'
             }}>
          
          {/* Indicador */}
          <div 
            className="absolute inset-2 rounded-full flex items-start justify-center pt-0.5"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <div className="w-1 h-3 rounded-full"
                 style={{
                   background: 'linear-gradient(180deg, #DAA520 0%, #B8860B 100%)',
                   boxShadow: '0 0 4px rgba(218,165,32,0.5)'
                 }} />
          </div>
        </div>
      </div>
    </div>
  );
}