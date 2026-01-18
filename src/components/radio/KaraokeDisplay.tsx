import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface KaraokeDisplayProps {
  currentLyric: string;
  isPlaying: boolean;
  isTuned: boolean;
  visibleLines?: any[];
  currentWordIndex?: number;
}

export default function KaraokeDisplay({ currentLyric, isPlaying, isTuned, visibleLines = [], currentWordIndex = -1 }: KaraokeDisplayProps) {
  const renderWord = (word: any, wordIndex: number, isCurrentLine: boolean, currentWordIndex: number) => {
    const isCurrentWord = isCurrentLine && wordIndex === currentWordIndex;

    return (
      <motion.span
        key={wordIndex}
        className={`inline-block mx-1 ${
          isCurrentWord ? 'text-yellow-300 font-bold' : 'text-amber-100/80'
        }`}
        style={{
          fontFamily: 'Georgia, serif',
          textShadow: isCurrentWord
            ? '0 0 15px rgba(255,215,0,0.8), 0 0 30px rgba(255,215,0,0.4)'
            : '0 2px 4px rgba(0,0,0,0.5)',
          filter: isCurrentWord ? 'brightness(1.3)' : 'none'
        }}
        animate={isCurrentWord ? {
          scale: [1, 1.1, 1],
          textShadow: [
            '0 0 15px rgba(255,215,0,0.8), 0 0 30px rgba(255,215,0,0.4)',
            '0 0 25px rgba(255,215,0,1), 0 0 40px rgba(255,215,0,0.6)',
            '0 0 15px rgba(255,215,0,0.8), 0 0 30px rgba(255,215,0,0.4)'
          ]
        } : {}}
        transition={{
          duration: 0.3,
          repeat: isCurrentWord ? Infinity : 0,
          repeatType: "reverse"
        }}
      >
        {word.text}
      </motion.span>
    );
  };

  return (
    <div className="relative w-full min-h-[180px] rounded-xl overflow-hidden"
         style={{
           background: 'linear-gradient(180deg, #0a0805 0%, #1a1510 50%, #0a0805 100%)',
           boxShadow: 'inset 0 4px 30px rgba(0,0,0,0.9), 0 8px 32px rgba(0,0,0,0.4)'
         }}>

      {/* Borde decorativo */}
      <div className="absolute inset-0 rounded-xl"
           style={{
             border: '2px solid transparent',
             borderImage: 'linear-gradient(180deg, #6B4423, #4A3728, #6B4423) 1'
           }} />

      {/* Área de contenido */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[180px] p-4">
        <AnimatePresence mode="wait">
          {!isTuned ? (
            // Ruido visual cuando no está sintonizado
            <motion.div
              key="noise"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-amber-600/30 rounded-full"
                    animate={{
                      height: [8, 20, 12, 24, 8],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
              <p className="text-amber-700/40 text-sm italic tracking-wide"
                 style={{ fontFamily: 'Georgia, serif' }}>
                ~ Busca la frecuencia correcta ~
              </p>
            </motion.div>
          ) : (
            // Display de karaoke en cascada
            <motion.div
              key="karaoke"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full text-center space-y-2"
            >
              {visibleLines.length > 0 ? (
                visibleLines.map((line, lineIndex) => (
                  <motion.div
                    key={lineIndex}
                    initial={{ opacity: 0, x: lineIndex === visibleLines.length - 1 ? 0 : -20 }}
                    animate={{
                      opacity: line.isCurrent ? 1 : 0.6,
                      x: 0,
                      scale: line.isCurrent ? 1 : 0.95
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-center leading-relaxed"
                  >
                    {line.words ? (
                      <div className="text-lg md:text-xl font-medium">
                        {line.words.map((word: any, wordIndex: number) =>
                          renderWord(word, wordIndex, line.isCurrent, line.currentWordIndex)
                        )}
                      </div>
                    ) : (
                      <p
                        className="text-lg md:text-xl font-medium"
                        style={{
                          fontFamily: 'Georgia, serif',
                          color: line.isCurrent ? '#FFE4B5' : '#DAA520',
                          textShadow: line.isCurrent
                            ? '0 0 20px rgba(255,228,181,0.4), 0 2px 4px rgba(0,0,0,0.5)'
                            : '0 1px 2px rgba(0,0,0,0.3)'
                        }}
                      >
                        {line.line}
                      </p>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-amber-500/60 text-xl"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    ♪ ♫ ♪
                  </motion.span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Efecto de luz cálida cuando está sintonizado */}
      {isTuned && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,179,71,0.1) 0%, transparent 70%)'
          }}
        />
      )}

      {/* Indicador de estado */}
      <div className="absolute top-3 right-3 flex items-center gap-2">
        <div
          className="w-2 h-2 rounded-full transition-all duration-300"
          style={{
            background: isTuned ? '#22c55e' : '#ef4444',
            boxShadow: isTuned ? '0 0 8px #22c55e' : '0 0 8px #ef4444'
          }}
        />
        <span className="text-xs text-amber-600/50 uppercase tracking-wider"
              style={{ fontFamily: 'Georgia, serif' }}>
          {isTuned ? 'Sintonizado' : 'Buscando...'}
        </span>
      </div>
    </div>
  );
}