import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import baseImage from "./assets/base.png";

// Your sticker files
import apple from "./assets/stickers/apple.png";
import avatar from "./assets/stickers/avatar.png";
import coffee from "./assets/stickers/coffee.png";
import envelope from "./assets/stickers/envelope.png";
import flower from "./assets/stickers/flower.png";
import pencil from "./assets/stickers/pencil.png";
import star from "./assets/stickers/star.png";
import wallet from "./assets/stickers/wallet.png";

// Starting positions — nudge top/left/width per sticker once you see them rendered
const stickerConfig = [
  { key: "avatar", src: avatar, top: "55%", left: "30%", width: 60 },
  { key: "apple", src: apple, top: "38%", left: "30%", width: 40 },
  { key: "envelope", src: envelope, top: "38%", left: "60%", width: 50 },
  { key: "pencil", src: pencil, top: "36%", left: "70%", width: 40 },
  { key: "flower", src: flower, top: "62%", left: "75%", width: 50 },
  { key: "coffee", src: coffee, top: "8%", left: "88%", width: 50 },
  { key: "star", src: star, top: "10%", left: "10%", width: 60 },
  { key: "wallet", src: wallet, top: "70%", left: "45%", width: 50 },
];

const DraggableSticker = ({ src, alt, top, left, width, z, bringToFront }) => (
  <motion.img
    src={src}
    alt={alt}
    draggable={false}
    className="absolute select-none cursor-grab active:cursor-grabbing"
    style={{ top, left, width, zIndex: z }}
    drag
    dragMomentum={false}
    dragElastic={0.15}
    whileDrag={{ scale: 1.1 }}
    onPointerDown={bringToFront}
  />
);

const Pupil = ({ style }) => {
  const pupilRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const maxMove = 4;
    const handleMouseMove = (e) => {
      if (!pupilRef.current) return;
      const rect = pupilRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;
      const dx = e.clientX - eyeCenterX;
      const dy = e.clientY - eyeCenterY;
      const angle = Math.atan2(dy, dx);
      const distance = Math.min(maxMove, Math.hypot(dx, dy) / 20);
      setOffset({ x: Math.cos(angle) * distance, y: Math.sin(angle) * distance });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={pupilRef}
      style={{
        position: "absolute",
        borderRadius: "45%",
        backgroundColor: "#E6E5E1", // 👈 bright red TEMPORARILY so it's easy to spot while positioning
        ...style,
        transform: `translate(${offset.x}px, ${offset.y}px)`,
      }}
    />
  );
};

export default function App() {
  const topZ = useRef(100);
  const [zIndices, setZIndices] = useState(() => {
    const initial = {};
    stickerConfig.forEach((s, i) => (initial[s.key] = 50 + i));
    return initial;
  });

  const bringToFront = (key) => () => {
    topZ.current += 1;
    setZIndices((prev) => ({ ...prev, [key]: topZ.current }));
  };

  return (
    <main className="bg-white min-h-screen flex items-center justify-center overflow-hidden">
      <section className="relative w-[1200px] max-w-[95vw] bg-white overflow-hidden mx-auto" style={{ height: "600px" }}>

        {/* BASE IMAGE */}
        <div className="absolute inset-0 flex items-start justify-center" style={{ paddingTop: "150px" }}>
          <div className="relative" style={{ width: "850px", height: "450px" }}>
            <img
              src={baseImage}
              alt="Sketchbook scene"
              draggable={false}
              className="select-none"
              style={{ width: "850px", height: "450px", objectFit: "cover" }}
            />
            {/* Pupils — tune top/left to sit exactly on her eyes */}
            <Pupil style={{ top: "147px", left: "340px", width: "10px", height: "10px" }} />
            <Pupil style={{ top: "144px", left: "380px", width: "10px", height: "10px" }} />
          </div>
        </div>

        {/* LEFT NAME */}
        <h2
          className="absolute left-2 top-[48%] -translate-y-1/2 font-bold text-[#FF6A00] z-50"
          style={{ fontSize: "56px", lineHeight: 1 }}
        >
          KAVYA
        </h2>

        {/* RIGHT NAME */}
        <h2
          className="absolute right-2 top-[48%] -translate-y-1/2 font-bold text-[#FF6A00] z-50"
          style={{ fontSize: "56px", lineHeight: 1 }}
        >
          JAIN
        </h2>

        {/* DRAG TEXT */}
        <p className="absolute top-[2%] right-[10%] text-[22px] text-gray-500 font-medium z-50">
          (Drag me around 👀)
        </p>

        {/* STICKERS */}
        {stickerConfig.map((s) => (
          <DraggableSticker
            key={s.key}
            src={s.src}
            alt={s.key}
            top={s.top}
            left={s.left}
            width={s.width}
            z={zIndices[s.key]}
            bringToFront={bringToFront(s.key)}
          />
        ))}

      </section>
    </main>
  );
}