import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import RadioDial from '../components/radio/RadioDial';
import TuningKnob from '../components/radio/TuningKnob';
import VolumeKnob from '../components/radio/VolumeKnob';
import Speaker from '../components/radio/Speaker';
import KaraokeDisplay from '../components/radio/KaraokeDisplay';
import PowerButton from '../components/radio/PowerButton';

// Letras sincronizadas con timestamps (en segundos)
// Canción: Perdón Leana - David Bisbal (4:40 total = 280 segundos)
// Puente instrumental inicial: 0-12 segundos (12 segundos)
// Contenido vocal: 12-120 segundos (108 segundos) - VELOCIDAD CORREGIDA
const LYRICS_DATA = [
  {
    time: 0,
    line: "",
    words: []
  },
  // Verso 1
  {
    time: 12,
    line: "Se hizo tarde en Copenhague",
    words: [
      { text: "Se", startTime: 12, endTime: 12.4 },
      { text: "hizo", startTime: 12.4, endTime: 12.8 },
      { text: "tarde", startTime: 12.8, endTime: 13.2 },
      { text: "en", startTime: 13.2, endTime: 13.6 },
      { text: "Copenhague", startTime: 13.6, endTime: 14.8 }
    ]
  },
  {
    time: 15,
    line: "Tú mirando el móvil en Francia",
    words: [
      { text: "Tú", startTime: 15, endTime: 15.4 },
      { text: "mirando", startTime: 15.4, endTime: 16.2 },
      { text: "el", startTime: 16.2, endTime: 16.6 },
      { text: "móvil", startTime: 16.6, endTime: 17.2 },
      { text: "en", startTime: 17.2, endTime: 17.6 },
      { text: "Francia", startTime: 17.6, endTime: 18.4 }
    ]
  },
  {
    time: 19,
    line: "Yo perdido en mil detalles",
    words: [
      { text: "Yo", startTime: 19, endTime: 19.3 },
      { text: "perdido", startTime: 19.3, endTime: 20.1 },
      { text: "en", startTime: 20.1, endTime: 20.5 },
      { text: "mil", startTime: 20.5, endTime: 21.1 },
      { text: "detalles", startTime: 21.1, endTime: 22.2 }
    ]
  },
  {
    time: 22,
    line: "Y tú pensando que no importas",
    words: [
      { text: "Y", startTime: 22, endTime: 22.3 },
      { text: "tú", startTime: 22.3, endTime: 22.7 },
      { text: "pensando", startTime: 22.7, endTime: 23.8 },
      { text: "que", startTime: 23.8, endTime: 24.2 },
      { text: "no", startTime: 24.2, endTime: 24.6 },
      { text: "importas", startTime: 24.6, endTime: 25.8 }
    ]
  },
  {
    time: 26,
    line: "Quedamos a las diez",
    words: [
      { text: "Quedamos", startTime: 26, endTime: 26.8 },
      { text: "a", startTime: 26.8, endTime: 27.2 },
      { text: "las", startTime: 27.2, endTime: 27.6 },
      { text: "diez", startTime: 27.6, endTime: 28.4 }
    ]
  },
  {
    time: 28,
    line: "Eran las once",
    words: [
      { text: "Eran", startTime: 28, endTime: 28.4 },
      { text: "las", startTime: 28.4, endTime: 28.8 },
      { text: "once", startTime: 28.8, endTime: 29.6 }
    ]
  },
  {
    time: 30,
    line: "Y el silencio fue mi respuesta",
    words: [
      { text: "Y", startTime: 30, endTime: 30.3 },
      { text: "el", startTime: 30.3, endTime: 30.7 },
      { text: "silencio", startTime: 30.7, endTime: 31.8 },
      { text: "fue", startTime: 31.8, endTime: 32.2 },
      { text: "mi", startTime: 32.2, endTime: 32.6 },
      { text: "respuesta", startTime: 32.6, endTime: 33.8 }
    ]
  },
  {
    time: 34,
    line: "Mientras tú contabas los minutos",
    words: [
      { text: "Mientras", startTime: 34, endTime: 34.8 },
      { text: "tú", startTime: 34.8, endTime: 35.2 },
      { text: "contabas", startTime: 35.2, endTime: 36.2 },
      { text: "los", startTime: 36.2, endTime: 36.6 },
      { text: "minutos", startTime: 36.6, endTime: 37.8 }
    ]
  },
  {
    time: 38,
    line: "Yo contaba excusas en la mesa",
    words: [
      { text: "Yo", startTime: 38, endTime: 38.3 },
      { text: "contaba", startTime: 38.3, endTime: 39.3 },
      { text: "excusas", startTime: 39.3, endTime: 40.3 },
      { text: "en", startTime: 40.3, endTime: 40.7 },
      { text: "la", startTime: 40.7, endTime: 41.1 },
      { text: "mesa", startTime: 41.1, endTime: 42.2 }
    ]
  },
  // Pre-Chorus
  {
    time: 43,
    line: "Y no hay razón que te cure esa espera",
    words: [
      { text: "Y", startTime: 43, endTime: 43.3 },
      { text: "no", startTime: 43.3, endTime: 43.7 },
      { text: "hay", startTime: 43.7, endTime: 44.1 },
      { text: "razón", startTime: 44.1, endTime: 44.9 },
      { text: "que", startTime: 44.9, endTime: 45.3 },
      { text: "te", startTime: 45.3, endTime: 45.7 },
      { text: "cure", startTime: 45.7, endTime: 46.3 },
      { text: "esa", startTime: 46.3, endTime: 46.7 },
      { text: "espera", startTime: 46.7, endTime: 47.8 }
    ]
  },
  {
    time: 48,
    line: "Sé que fallé",
    words: [
      { text: "Sé", startTime: 48, endTime: 48.4 },
      { text: "que", startTime: 48.4, endTime: 48.8 },
      { text: "fallé", startTime: 48.8, endTime: 49.8 }
    ]
  },
  {
    time: 50,
    line: "Que dolió de veras",
    words: [
      { text: "Que", startTime: 50, endTime: 50.4 },
      { text: "dolió", startTime: 50.4, endTime: 51.2 },
      { text: "de", startTime: 51.2, endTime: 51.6 },
      { text: "veras", startTime: 51.6, endTime: 52.6 }
    ]
  },
  {
    time: 53,
    line: "Me odio sabiendo que fui yo",
    words: [
      { text: "Me", startTime: 53, endTime: 53.3 },
      { text: "odio", startTime: 53.3, endTime: 54.1 },
      { text: "sabiendo", startTime: 54.1, endTime: 55.3 },
      { text: "que", startTime: 55.3, endTime: 55.7 },
      { text: "fui", startTime: 55.7, endTime: 56.1 },
      { text: "yo", startTime: 56.1, endTime: 56.5 }
    ]
  },
  {
    time: 57,
    line: "Quien te puso esa voz sincera a temblar",
    words: [
      { text: "Quien", startTime: 57, endTime: 57.5 },
      { text: "te", startTime: 57.5, endTime: 57.9 },
      { text: "puso", startTime: 57.9, endTime: 58.7 },
      { text: "esa", startTime: 58.7, endTime: 59.1 },
      { text: "voz", startTime: 59.1, endTime: 59.6 },
      { text: "sincera", startTime: 59.6, endTime: 60.8 },
      { text: "a", startTime: 60.8, endTime: 61.2 },
      { text: "temblar", startTime: 61.2, endTime: 62.4 }
    ]
  },
  // Chorus
  {
    time: 63,
    line: "Perdón",
    words: [
      { text: "Perdón", startTime: 63, endTime: 64.5 }
    ]
  },
  {
    time: 65,
    line: "Leana",
    words: [
      { text: "Leana", startTime: 65, endTime: 67 }
    ]
  },
  {
    time: 68,
    line: "Por dejarte sola con la llamada",
    words: [
      { text: "Por", startTime: 68, endTime: 68.5 },
      { text: "dejarte", startTime: 68.5, endTime: 69.8 },
      { text: "sola", startTime: 69.8, endTime: 70.6 },
      { text: "con", startTime: 70.6, endTime: 71 },
      { text: "la", startTime: 71, endTime: 71.4 },
      { text: "llamada", startTime: 71.4, endTime: 73 }
    ]
  },
  {
    time: 74,
    line: "Por hacerte sentir segunda en mi agenda cargada",
    words: [
      { text: "Por", startTime: 74, endTime: 74.5 },
      { text: "hacerte", startTime: 74.5, endTime: 76 },
      { text: "sentir", startTime: 76, endTime: 76.8 },
      { text: "segunda", startTime: 76.8, endTime: 78 },
      { text: "en", startTime: 78, endTime: 78.4 },
      { text: "mi", startTime: 78.4, endTime: 78.8 },
      { text: "agenda", startTime: 78.8, endTime: 80 },
      { text: "cargada", startTime: 80, endTime: 81.5 }
    ]
  },
  {
    time: 82,
    line: "Si supieras que en mi lista tú vas la primera",
    words: [
      { text: "Si", startTime: 82, endTime: 82.5 },
      { text: "supieras", startTime: 82.5, endTime: 84 },
      { text: "que", startTime: 84, endTime: 84.4 },
      { text: "en", startTime: 84.4, endTime: 84.8 },
      { text: "mi", startTime: 84.8, endTime: 85.2 },
      { text: "lista", startTime: 85.2, endTime: 86 },
      { text: "tú", startTime: 86, endTime: 86.4 },
      { text: "vas", startTime: 86.4, endTime: 86.8 },
      { text: "la", startTime: 86.8, endTime: 87.2 },
      { text: "primera", startTime: 87.2, endTime: 88.5 }
    ]
  },
  {
    time: 89,
    line: "Que mi futuro se pronuncia con tu nombre",
    words: [
      { text: "Que", startTime: 89, endTime: 89.5 },
      { text: "mi", startTime: 89.5, endTime: 90 },
      { text: "futuro", startTime: 90, endTime: 91 },
      { text: "se", startTime: 91, endTime: 91.4 },
      { text: "pronuncia", startTime: 91.4, endTime: 93 },
      { text: "con", startTime: 93, endTime: 93.4 },
      { text: "tu", startTime: 93.4, endTime: 93.8 },
      { text: "nombre", startTime: 93.8, endTime: 95 }
    ]
  },
  {
    time: 96,
    line: "Leana",
    words: [
      { text: "Leana", startTime: 96, endTime: 98.5 }
    ]
  },
  {
    time: 99,
    line: "Perdón",
    words: [
      { text: "Perdón", startTime: 99, endTime: 101 }
    ]
  },
  {
    time: 102,
    line: "Leana",
    words: [
      { text: "Leana", startTime: 102, endTime: 104.5 }
    ]
  },
  {
    time: 105,
    line: "Si mi amor se ve torpe en la pantalla",
    words: [
      { text: "Si", startTime: 105, endTime: 105.5 },
      { text: "mi", startTime: 105.5, endTime: 106 },
      { text: "amor", startTime: 106, endTime: 106.8 },
      { text: "se", startTime: 106.8, endTime: 107.2 },
      { text: "ve", startTime: 107.2, endTime: 107.6 },
      { text: "torpe", startTime: 107.6, endTime: 108.6 },
      { text: "en", startTime: 108.6, endTime: 109 },
      { text: "la", startTime: 109, endTime: 109.4 },
      { text: "pantalla", startTime: 109.4, endTime: 111 }
    ]
  },
  {
    time: 112,
    line: "Si a veces llego tarde pero el corazón no falla",
    words: [
      { text: "Si", startTime: 112, endTime: 112.5 },
      { text: "a", startTime: 112.5, endTime: 113 },
      { text: "veces", startTime: 113, endTime: 113.8 },
      { text: "llego", startTime: 113.8, endTime: 114.8 },
      { text: "tarde", startTime: 114.8, endTime: 115.8 },
      { text: "pero", startTime: 115.8, endTime: 116.2 },
      { text: "el", startTime: 116.2, endTime: 116.6 },
      { text: "corazón", startTime: 116.6, endTime: 118 },
      { text: "no", startTime: 118, endTime: 118.4 },
      { text: "falla", startTime: 118.4, endTime: 120 }
    ]
  }
];

export default function Home() {
  const [isPoweredOn, setIsPoweredOn] = useState(false);
  const [tuningValue, setTuningValue] = useState(0.3);
  const [masterVolume, setMasterVolume] = useState(0.7);
  const [currentLyric, setCurrentLyric] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [visibleLines, setVisibleLines] = useState<any[]>([]);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  const musicRef = useRef<HTMLAudioElement>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const noiseGainRef = useRef<GainNode | null>(null);
  const musicGainRef = useRef<GainNode | null>(null);
  const musicSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Calcular si está sintonizado (centro = 0.5, con tolerancia de ±0.05)
  const tolerance = 0.05;
  const isTuned = Math.abs(tuningValue - 0.5) < tolerance;

  // Calcular volúmenes basados en la distancia al centro
  const distanceFromCenter = Math.abs(tuningValue - 0.5);
  const musicVolume = isTuned ? 1 : Math.max(0, 1 - (distanceFromCenter / 0.15));
  // Asegurar que el ruido sea exactamente 0 cuando esté sintonizado
  const noiseVolume = isTuned ? 0 : Math.min(1, distanceFromCenter * 4);

  // Conectar el elemento de audio al contexto cuando esté disponible
  const connectAudioSource = useCallback(() => {
    if (!audioContext || !musicRef.current || !musicGainRef.current || musicSourceRef.current) return;

    try {
      const source = audioContext.createMediaElementSource(musicRef.current);
      source.connect(musicGainRef.current);
      musicSourceRef.current = source;
    } catch (error) {
      // El elemento ya está conectado, ignorar el error
      console.log('Audio ya conectado o error de conexión:', error);
    }
  }, [audioContext]);

  // Crear contexto de audio y ruido blanco
  const initAudio = useCallback(async () => {
    if (audioContext) return;

    const ctx = new (window.AudioContext || window.webkitAudioContext!)();

    // En iOS/Safari, el contexto de audio puede estar suspendido inicialmente
    if (ctx.state === 'suspended') {
      try {
        await ctx.resume();
        console.log('Audio context resumed for iOS/Safari');
      } catch (error) {
        console.warn('Failed to resume audio context:', error);
      }
    }

    setAudioContext(ctx);

    // Crear ruido blanco
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0;

    whiteNoise.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    whiteNoise.start();

    noiseSourceRef.current = whiteNoise;
    noiseGainRef.current = noiseGain;

    // Configurar ganancia para la música
    const musicGain = ctx.createGain();
    musicGain.gain.value = 0;
    musicGain.connect(ctx.destination);
    musicGainRef.current = musicGain;

    // Conectar el elemento de audio si está disponible
    if (musicRef.current) {
      try {
        const source = ctx.createMediaElementSource(musicRef.current);
        source.connect(musicGain);
        musicSourceRef.current = source;
      } catch (error) {
        console.log('Error al conectar audio inicial:', error);
      }
    }
  }, [audioContext]);

  // Asegurar que el audio esté conectado cuando el contexto y el elemento estén listos
  useEffect(() => {
    if (audioContext && musicRef.current) {
      connectAudioSource();
    }
  }, [audioContext, connectAudioSource]);

  // Asegurar que el audio se reproduzca cuando se sintoniza
  useEffect(() => {
    if (!isPoweredOn || !audioContext || !isTuned) return;

    // Si está sintonizado, asegurar que el audio se esté reproduciendo
    if (musicRef.current) {
      const audio = musicRef.current;
      if (audio.paused) {
        audio.play().catch((error) => {
          console.log('Error al reproducir audio:', error);
        });
      }
    }
  }, [isPoweredOn, isTuned, audioContext]);

  // Event listener para activar audio en iOS/Safari
  useEffect(() => {
    const handleUserInteraction = () => {
      ensureAudioContextActive();
    };

    // Agregar listeners para interacciones comunes del usuario
    document.addEventListener('touchstart', handleUserInteraction, { once: true });
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [ensureAudioContextActive]);

  // Actualizar volúmenes
  useEffect(() => {
    if (!isPoweredOn) return;

    const noiseGainValue = noiseVolume * masterVolume * 0.3;
    const musicGainValue = musicVolume * masterVolume;

    console.log(`Audio volumes - Noise: ${noiseGainValue.toFixed(3)}, Music: ${musicGainValue.toFixed(3)}, IsTuned: ${isTuned}, Distance: ${Math.abs(tuningValue - 0.5).toFixed(3)}`);

    if (noiseGainRef.current) {
      noiseGainRef.current.gain.setTargetAtTime(
        noiseGainValue,
        audioContext?.currentTime || 0,
        0.1
      );
    }

    if (musicGainRef.current) {
      musicGainRef.current.gain.setTargetAtTime(
        musicGainValue,
        audioContext?.currentTime || 0,
        0.1
      );
    }
  }, [isPoweredOn, noiseVolume, musicVolume, masterVolume, audioContext, isTuned, tuningValue]);

  // Función para asegurar que el contexto de audio esté activo (especialmente para iOS)
  const ensureAudioContextActive = useCallback(async () => {
    if (audioContext && audioContext.state === 'suspended') {
      try {
        await audioContext.resume();
        console.log('Audio context resumed on user interaction');
      } catch (error) {
        console.warn('Failed to resume audio context on interaction:', error);
      }
    }
  }, [audioContext]);

  // Control de encendido/apagado
  const togglePower = async () => {
    // Asegurar que el contexto de audio esté activo antes de cualquier operación
    await ensureAudioContextActive();

    if (!isPoweredOn) {
      await initAudio();
      setIsPoweredOn(true);
      // El audio se reproducirá automáticamente cuando esté sintonizado
      // gracias al useEffect de reproducción
    } else {
      setIsPoweredOn(false);
      if (musicRef.current) {
        musicRef.current.pause();
      }
      if (noiseGainRef.current) {
        noiseGainRef.current.gain.value = 0;
      }
      if (musicGainRef.current) {
        musicGainRef.current.gain.value = 0;
      }
    }
  };

  // Actualizar letras basadas en el tiempo de reproducción
  useEffect(() => {
    if (!isPoweredOn || !isTuned) {
      setCurrentLyric("");
      setCurrentWordIndex(-1);
      setVisibleLines([]);
      return;
    }

    const updateLyrics = () => {
      if (musicRef.current) {
        const currentTime = musicRef.current.currentTime;

        // Encontrar la línea actual
        const currentLineIndex = LYRICS_DATA.findIndex((line, index) => {
          const nextLine = LYRICS_DATA[index + 1];
          return line.time <= currentTime && (!nextLine || nextLine.time > currentTime);
        });

        if (currentLineIndex >= 0) {
          const currentLine = LYRICS_DATA[currentLineIndex];
          setCurrentLyric(currentLine.line);

          // Encontrar la palabra actual
          const currentWord = currentLine.words?.findIndex(word =>
            currentTime >= word.startTime && currentTime <= word.endTime
          );
          setCurrentWordIndex(currentWord >= 0 ? currentWord : -1);

          // Mantener las últimas 3 líneas visibles
          const startIndex = Math.max(0, currentLineIndex - 2);
          const visible = LYRICS_DATA.slice(startIndex, currentLineIndex + 1).map((line, index) => ({
            ...line,
            isCurrent: index === (currentLineIndex - startIndex),
            currentWordIndex: index === (currentLineIndex - startIndex) ? (currentWord >= 0 ? currentWord : -1) : -1
          }));
          setVisibleLines(visible);
        }
      }
      animationFrameRef.current = requestAnimationFrame(updateLyrics);
    };

    animationFrameRef.current = requestAnimationFrame(updateLyrics);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPoweredOn, isTuned]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8"
         style={{
           background: 'radial-gradient(ellipse at center, #2a1a10 0%, #1a0f08 50%, #0a0503 100%)'
         }}>

      {/* Audio element oculto */}
      <audio
        ref={musicRef}
        src="/music.mp3"
        loop
        preload="auto"
        crossOrigin="anonymous"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-2xl"
      >
        {/* Cuerpo principal de la radio */}
        <div className="relative rounded-3xl p-6 md:p-8"
             style={{
               background: `
                 linear-gradient(135deg, #4A3728 0%, #2C1810 50%, #1a0f0a 100%)
               `,
               boxShadow: `
                 0 30px 60px rgba(0,0,0,0.8),
                 0 10px 20px rgba(0,0,0,0.6),
                 inset 0 1px 0 rgba(255,255,255,0.1),
                 inset 0 -1px 0 rgba(0,0,0,0.3)
               `
             }}>

          {/* Textura de madera */}
          <div className="absolute inset-0 rounded-3xl opacity-20 pointer-events-none"
               style={{
                 backgroundImage: `
                   repeating-linear-gradient(
                     90deg,
                     transparent,
                     transparent 2px,
                     rgba(139,115,85,0.1) 2px,
                     rgba(139,115,85,0.1) 4px
                   )
                 `
               }} />

          {/* Borde decorativo dorado */}
          <div className="absolute inset-2 rounded-2xl pointer-events-none"
               style={{
                 border: '1px solid rgba(218,165,32,0.2)',
                 boxShadow: 'inset 0 0 30px rgba(0,0,0,0.3)'
               }} />

          {/* Contenido de la radio */}
          <div className="relative z-10 space-y-6">

            {/* Header con marca */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <PowerButton isOn={isPoweredOn} onToggle={togglePower} />
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold tracking-wider"
                      style={{
                        fontFamily: 'Georgia, serif',
                        color: '#DAA520',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                      }}>
                    RADIO PETITE CHOU
                  </h1>
                  <p className="text-xs tracking-[0.3em] text-amber-700/50 uppercase">
                    Donde solo viven los exitos
                  </p>
                </div>
              </div>

              {/* Indicador de señal */}
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 rounded-full"
                    style={{
                      height: 8 + i * 4,
                      background: isPoweredOn && isTuned && i < 4
                        ? 'linear-gradient(180deg, #22c55e, #16a34a)'
                        : isPoweredOn && i < Math.floor((1 - distanceFromCenter * 2) * 5)
                        ? 'linear-gradient(180deg, #eab308, #ca8a04)'
                        : '#3a3a3a',
                      boxShadow: isPoweredOn && isTuned && i < 4
                        ? '0 0 6px rgba(34,197,94,0.6)'
                        : 'none',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Altavoz */}
            <Speaker />

            {/* Dial de frecuencia */}
            <motion.div
              animate={{
                opacity: isPoweredOn ? 1 : 0.3,
              }}
              transition={{ duration: 0.5 }}
            >
              <RadioDial needlePosition={tuningValue} />
            </motion.div>

            {/* Panel de control */}
            <div className="flex items-center justify-center gap-8 md:gap-16 py-4">
              <VolumeKnob
                value={masterVolume}
                onChange={setMasterVolume}
                label="Volumen"
              />
              <TuningKnob
                value={tuningValue}
                onChange={setTuningValue}
              />
            </div>

            {/* Pies decorativos */}
            <div className="flex justify-between px-4">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-3 h-1 rounded-full"
                  style={{
                    background: 'linear-gradient(180deg, #8B7355, #6B4423)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Display de Karaoke */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8"
        >
          <KaraokeDisplay
            currentLyric={currentLyric}
            isPlaying={isPoweredOn}
            isTuned={isTuned && isPoweredOn}
            visibleLines={visibleLines}
            currentWordIndex={currentWordIndex}
          />
        </motion.div>

        {/* Instrucciones */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-6 text-amber-700/40 text-sm"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Enciende la radio y gira el mando de sintonía hasta encontrar el ♥
        </motion.p>
      </motion.div>
    </div>
  );
}