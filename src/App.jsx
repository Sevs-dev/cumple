// src/App.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FaRegCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaLeaf,
  FaMusic,
} from "react-icons/fa";
import { FaMartiniGlassCitrus } from "react-icons/fa6";

// Ajusta las rutas según tu estructura real
import palma1 from "./assets/img/palma1.png";
import palma2 from "./assets/img/palma2.png";

import arbusto1 from "./assets/img/arbusto1.png";
import arbusto2 from "./assets/img/arbusto2.png";
import arbusto4 from "./assets/img/arbusto4.png";

import flores1 from "./assets/img/flores.png";
import flores4 from "./assets/img/flor4.png";
import flores5 from "./assets/img/flor5.png";
import flores6 from "./assets/img/flor6.png";
import flores7 from "./assets/img/flor7.png";

import plantasyrocas from "./assets/img/plantasyrocas.png";

import platas3 from "./assets/img/platas3.png"; // top/bottom
import platas4 from "./assets/img/platas4.png"; // lateral izq
import platas5 from "./assets/img/platas5.png"; // lateral der

// Cambia esta ruta por tu canción real
import tropicalSong from "./assets/songs/TropicalHouseBrazilian.mp3";

// Animación flotante genérica
const float = (delay = 0, distance = 10, duration = 5) => ({
  initial: { y: 0 },
  animate: { y: [0, -distance, 0] },
  transition: {
    duration,
    delay,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
  },
});

// Animación de entrada de la tarjeta
const cardVariant = {
  hidden: { opacity: 0, scale: 0.85, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

function App() {
  const particles = Array.from({ length: 22 });
  const fallingParticles = Array.from({ length: 18 });
  const fallingLeaves = Array.from({ length: 10 });

  // --- Audio ---
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.6;

    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        setIsPlaying(false);
      });
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Audio de fondo */}
      <audio ref={audioRef} src={tropicalSong} loop />

      {/* Partículas flotantes suaves (subiendo) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((_, i) => {
          const size = 4 + (i % 3) * 2;
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const duration = 6 + (i % 5);
          const delay = i * 0.25;

          return (
            <motion.span
              key={`float-${i}`}
              className="absolute rounded-full bg-gradient-to-br from-yellow-300 to-pink-500 opacity-0"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: size,
                height: size,
              }}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 0.8, 0], y: [-10, -30, -10] }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Partículas que caen brillando (más rápidas y por encima de todo) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
        {fallingParticles.map((_, i) => {
          const size = 4 + (i % 3) * 2;
          const left = Math.random() * 100;
          const duration = 5 + (i % 4) * 1.3; // más rápido
          const delay = i * 0.28;

          return (
            <motion.span
              key={`fall-glow-${i}`}
              className="absolute rounded-full bg-gradient-to-br from-emerald-300 via-yellow-300 to-pink-400 blur-[1px]"
              style={{
                left: `${left}%`,
                width: size,
                height: size,
              }}
              initial={{ opacity: 0, y: "-20%" }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: ["-20%", "55%", "75%", "115%"], // cruzan más de la mitad
              }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Hojas cayendo (react-icons) sobre todo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
        {fallingLeaves.map((_, i) => {
          const left = 5 + Math.random() * 90;
          const duration = 7 + (i % 5) * 1.4; // un poco más rápidas
          const delay = i * 0.45;

          return (
            <motion.div
              key={`leaf-${i}`}
              className="absolute text-emerald-300/90 drop-shadow-[0_0_10px_rgba(52,211,153,0.9)]"
              style={{ left: `${left}%` }}
              initial={{ y: "-20%", rotate: 0, opacity: 0 }}
              animate={{
                y: ["-20%", "55%", "75%", "115%"], // claramente pasan la mitad
                rotate: [0, 18, -12, 24],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            >
              <FaLeaf className="text-xl" />
            </motion.div>
          );
        })}
      </div>

      {/* Tarjeta principal tipo story */}
      <motion.div
        variants={cardVariant}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-[430px] aspect-[9/16] rounded-[30px] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.85)]"
      >
        {/* Fondo degradado */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#22c55e_0,#14532d_38%,#020617_80%)] saturate-125" />

        {/* Hojas inferiores (cinturón de plantas) */}
        <motion.img
          src={platas3}
          alt="Plantas inferior"
          className="absolute left-1/2 -translate-x-1/2 w-[125%] z-10 pointer-events-none select-none"
          style={{ bottom: "-1%" }}
          {...float(0.4, 12, 7)}
        />

        {/* PALMAS esquina arriba (como imanes de esquina) */}
        <motion.img
          src={palma1}
          alt="Palma esquina izquierda"
          className="absolute top-0 left-0 w-[52%] z-20 pointer-events-none select-none"
          {...float(0.2, 14, 8)}
        />
        <motion.img
          src={palma1}
          alt="Palma esquina izquierda"
          className="absolute top-4 left-0 w-[52%] z-20 pointer-events-none select-none"
          {...float(0.2, 14, 8)}
        />
        <motion.img
          src={palma2}
          alt="Palma esquina derecha"
          className="absolute top-0 right-0 w-[52%] z-20 pointer-events-none select-none"
          {...float(0.5, 14, 8)}
        />
        <motion.img
          src={palma2}
          alt="Palma esquina derecha"
          className="absolute top-4 right-0 w-[52%] z-20 pointer-events-none select-none"
          {...float(0.5, 14, 8)}
        />

        {/* ARBUSTO4 varias veces para rellenar parte superior */}
        <motion.img
          src={arbusto4}
          alt="Arbusto superior centro"
          className="absolute top-[-1%] left-1/2 -translate-x-1/2 w-[42%] z-18 pointer-events-none select-none"
          {...float(0.7, 10, 8)}
        />
        <motion.img
          src={arbusto4}
          alt="Arbusto superior izquierdo"
          className="absolute top-[-1%] left-[8%] w-[34%] z-17 pointer-events-none select-none"
          {...float(1.0, 9, 8)}
        />
        <motion.img
          src={arbusto4}
          alt="Arbusto superior derecho"
          className="absolute top-[1%] right-[8%] w-[34%] z-17 pointer-events-none select-none"
          {...float(1.3, 9, 8)}
        />

        {/* PLANTAS 4 y 5 en los bordes verticales */}
        <motion.img
          src={platas4}
          alt="Plantas laterales izquierda"
          className="absolute top-0 -left-16 h-full z-10 pointer-events-none select-none"
          {...float(0.3, 10, 7)}
        />
        <motion.img
          src={platas5}
          alt="Plantas laterales derecha"
          className="absolute top-0 -right-16 h-full z-10 pointer-events-none select-none"
          {...float(0.5, 10, 7)}
        />

        {/* FLORES extra en laterales */}
        {/* Lado izquierdo */}
        <motion.img
          src={flores4}
          alt="Flores lateral superior izquierda"
          className="absolute top-[8%] -left-10 w-[28%] z-30 pointer-events-none select-none"
          {...float(0.7, 10, 8)}
        />
        <motion.img
          src={flores1}
          alt="Flores lateral media izquierda"
          className="absolute top-[32%] -left-8 w-[30%] z-30 pointer-events-none select-none"
          {...float(1.0, 11, 8)}
        />
        <motion.img
          src={flores5}
          alt="Flores lateral baja izquierda"
          className="absolute top-[52%] -left-6 w-[26%] z-30 pointer-events-none select-none"
          {...float(1.2, 9, 9)}
        />

        {/* Lado derecho */}
        <motion.img
          src={flores6}
          alt="Flores lateral superior derecha"
          className="absolute top-[10%] -right-10 w-[28%] z-30 pointer-events-none select-none"
          {...float(0.9, 10, 8)}
        />
        <motion.img
          src={flores1}
          alt="Flores lateral media derecha"
          className="absolute top-[34%] -right-8 w-[30%] z-30 pointer-events-none select-none"
          {...float(1.1, 11, 8)}
        />
        <motion.img
          src={flores7}
          alt="Flores lateral baja derecha"
          className="absolute top-[54%] -right-6 w-[26%] z-30 pointer-events-none select-none"
          {...float(1.3, 9, 9)}
        />

        {/* ARBUSTOS + flores laterales centrales inferiores */}
        <motion.img
          src={arbusto1}
          alt="Arbusto izquierdo"
          className="absolute bottom-[-2%] -left-3 w-[38%] z-20 pointer-events-none select-none"
          {...float(0.1, 8, 6)}
        />
        <motion.img
          src={arbusto2}
          alt="Arbusto derecho"
          className="absolute bottom-[-2%] -right-3 w-[38%] z-20 pointer-events-none select-none"
          {...float(0.9, 8, 6)}
        />

        {/* PLANTAS Y ROCAS abajo en esquinas */}
        <motion.img
          src={plantasyrocas}
          alt="Plantas y rocas izquierda"
          className="absolute -left-16 w-[60%] z-20 pointer-events-none select-none"
          style={{ bottom: "-10%" }}
          {...float(0.4, 6, 10)}
        />
        <motion.img
          src={plantasyrocas}
          alt="Plantas y rocas derecha"
          className="absolute -right-16 w-[60%] z-20 pointer-events-none select-none"
          style={{ bottom: "-10%", transform: "scaleX(-1)" }}
          {...float(0.9, 6, 10)}
        />

        {/* CONTENIDO CENTRAL */}
        <div className="relative z-40 h-full flex flex-col justify-center items-center px-6 pt-[5%] pb-10">
          {/* Panel principal */}
          <motion.div
            className="w-full rounded-[26px] bg-black/35 border border-emerald-200/50 backdrop-blur-2xl px-5 py-6 shadow-[0_0_35px_rgba(16,185,129,0.5)]"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            {/* Botón de música (react-icons) */}
            <button
              onClick={toggleAudio}
              className="fixed top-3 right-4 z-[60] rounded-full bg-black/70 border border-emerald-400/60 text-emerald-200 px-3 py-1.5 text-xs font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.7)] backdrop-blur"
            >
              <FaMusic className="text-emerald-300 text-sm" />
              <span>{isPlaying ? "Música ON" : "Ativar música"}</span>
            </button>

            <div className="w-full flex justify-center mt-8">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-[0.7rem] tracking-[0.18em] uppercase bg-slate-900/60 border border-emerald-300/80 shadow-[0_0_15px_rgba(52,211,153,0.7)]"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <span className="text-yellow-300">Tropical</span>
                <span className="text-emerald-300">Party</span>
              </motion.div>
            </div>

            <div className="w-full text-center">
              <motion.h1
                className="mt-3 text-4xl font-extrabold leading-tight tracking-wide 
               bg-gradient-to-r from-emerald-300 via-amber-300 via-rose-300 to-teal-400
               bg-clip-text text-transparent 
               drop-shadow-[0_4px_25px_rgba(0,0,0,0.7)] uppercase"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                ¡Aniversário da Vini!
              </motion.h1>
            </div>

            <motion.div
              className="mt-4 mx-auto w-full rounded-2xl 
             bg-white/25 border border-emerald-200/50 
             backdrop-blur-2xl 
             px-4 py-3 text-xs space-y-2 
             shadow-[0_0_25px_rgba(16,185,129,0.4)]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2">
                  <FaRegCalendarAlt className="text-emerald-300 text-sm drop-shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                  <span className="font-semibold text-emerald-100">
                    Sábado, 29 de Novembro
                  </span>
                </span>

                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full 
                 bg-gradient-to-r from-emerald-400/60 via-lime-300/60 to-amber-300/70 
                 text-emerald-950 
                 text-[0.65rem] font-semibold uppercase tracking-wide shadow-sm"
                >
                  <FaMartiniGlassCitrus className="text-xs" />
                  <span>Uma única noite</span>
                </span>
              </div>

              <div className="flex items-center gap-2 text-emerald-100 font-medium">
                <FaClock className="text-emerald-300 text-sm" />
                <span>17:00 · drinks e diversão 🍹</span>
              </div>

              <div className="flex items-center gap-2 text-emerald-100 font-medium">
                <FaMapMarkerAlt className="text-amber-300 text-sm" />
                <span>CALLE 161 #7B-55 • TORRE 1 • AP 1605</span>
              </div>
            </motion.div>

            <div className="w-full text-center">
              <motion.div
                className="mt-3 text-[0.78rem] text-emerald-50 leading-snug space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
              >
                <p>
                  Dress code:{" "}
                  <span className="font-semibold text-amber-300">
                    toque tropical irresistível
                  </span>{" "}
                  🌴 (camisas floridas, vestidos coloridos, óculos estilosos...).
                </p>

                <p>
                  Confirme sua presença pelo WhatsApp e guarda energia:
                  <br />
                  <span className="font-semibold text-lime-300">
                    a festa não acaba cedo.
                  </span>
                </p>

                <div className="pt-2">
                  <a
                    href="https://wa.me/5531999999999?text=Oi%2C%20vou%20pro%20anivers%C3%A1rio%20tropical%20do%20Vini%21%20🌴🎉"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
                 bg-gradient-to-r from-emerald-400 via-lime-400 to-amber-300 
                 text-emerald-950 text-[0.75rem] font-semibold tracking-wide
                 shadow-[0_0_18px_rgba(52,211,153,0.7)] hover:scale-105 
                 hover:shadow-[0_0_24px_rgba(250,204,21,0.9)] 
                 transition-transform transition-shadow duration-200"
                  >
                    <FaWhatsapp className="text-sm" />
                    <span>Confirmar presença</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default App;
