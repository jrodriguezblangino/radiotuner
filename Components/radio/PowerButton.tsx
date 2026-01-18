import React from 'react';
import { Power } from 'lucide-react';
import { motion } from 'framer-motion';

interface PowerButtonProps {
  isOn: boolean;
  onToggle: () => void;
}

export default function PowerButton({ isOn, onToggle }: PowerButtonProps) {
  return (
    <motion.button
      onClick={onToggle}
      whileTap={{ scale: 0.95 }}
      className="relative w-14 h-14 rounded-full focus:outline-none"
      style={{
        background: 'linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 100%)',
        boxShadow: isOn 
          ? '0 4px 20px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.1), 0 0 20px rgba(34,197,94,0.3)'
          : '0 4px 20px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.1)'
      }}
    >
      {/* Anillo exterior */}
      <div className="absolute inset-0.5 rounded-full"
           style={{
             background: isOn
               ? 'conic-gradient(from 0deg, #22c55e, #16a34a, #22c55e)'
               : 'conic-gradient(from 0deg, #6B4423, #8B7355, #6B4423)',
             transition: 'all 0.3s ease'
           }} />
      
      {/* Centro del botón */}
      <div className="absolute inset-2 rounded-full flex items-center justify-center"
           style={{
             background: 'radial-gradient(ellipse at 30% 30%, #3a3a3a 0%, #1a1a1a 100%)',
           }}>
        <Power 
          className={`w-5 h-5 transition-all duration-300 ${
            isOn ? 'text-green-400' : 'text-amber-700/50'
          }`}
          style={{
            filter: isOn ? 'drop-shadow(0 0 6px rgba(34,197,94,0.8))' : 'none'
          }}
        />
      </div>
      
      {/* LED indicador */}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2">
        <div 
          className="w-2 h-2 rounded-full transition-all duration-300"
          style={{
            background: isOn ? '#22c55e' : '#3a3a3a',
            boxShadow: isOn ? '0 0 10px #22c55e, 0 0 20px #22c55e' : 'none'
          }}
        />
      </div>
    </motion.button>
  );
}