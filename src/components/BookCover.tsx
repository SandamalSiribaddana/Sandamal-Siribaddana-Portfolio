import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { BookOpen, Sparkles } from 'lucide-react';

interface BookCoverProps {
  onOpen: () => void;
}

export default function BookCover({ onOpen }: BookCoverProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinates relative to card for dynamic 3D tilt & glint
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transform mouse values to rotate degrees (-15 to +15)
  const rotateY = useTransform(x, [-150, 150], [12, -12]);
  const rotateX = useTransform(y, [-200, 200], [-10, 10]);

  // Map coordinates to glint position%
  const glintX = useTransform(x, [-150, 150], [-20, 120]);
  const glintY = useTransform(y, [-200, 200], [-20, 120]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    // Calculate offset from center (-width/2 to +width/2)
    const centerX = event.clientX - rect.left - width / 2;
    const centerY = event.clientY - rect.top - height / 2;
    x.set(centerX);
    y.set(centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-[700px] perspective-2000">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-[340px] h-[520px] sm:w-[380px] sm:h-[560px] cursor-pointer rounded-r-3xl rounded-l-md bg-stone-900 border-r-8 border-stone-850 shadow-[20px_25px_50px_rgba(0,0,0,0.65)] select-none group transition-shadow duration-300 hover:shadow-[30px_35px_70px_rgba(0,0,0,0.8)]"
        onClick={onOpen}
        id="book-cover-container"
      >
        {/* Deep leather texture effect with gold stitching border */}
        <div className="absolute inset-0 rounded-r-2xl rounded-l-sm bg-[radial-gradient(circle_at_center,rgba(50,30,20,0.3)_0%,rgba(15,8,5,0.7)_100%)] opacity-95 flex flex-col justify-between p-8 border-l-4 border-stone-950">

          {/* Authentic gold foil frame */}
          <div className="absolute inset-4 rounded-r-xl rounded-l-xs border-2 border-amber-600/30 pointer-events-none gold-filigree">
            <div className="absolute inset-1 border border-amber-500/10" />

            {/* Corner traditional gold crest ornaments */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-500/60 rounded-tl-sm" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-500/60 rounded-tr-sm" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-500/60 rounded-bl-sm" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-500/60 rounded-br-sm" />
          </div>

          {/* Spine ribbed ridges on the left binding */}
          <div className="absolute left-0 top-0 bottom-0 w-3 bg-stone-950 flex flex-col justify-around py-8 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[2px] w-full bg-amber-500/25 shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
            ))}
          </div>

          {/* Dynamic Glint Reflection mapping */}
          <motion.div
            style={{
              left: useTransform(glintX, (v) => `${v}%`),
              top: useTransform(glintY, (v) => `${v}%`),
            }}
            className="absolute w-40 h-40 rounded-full bg-amber-100/10 blur-[60px] pointer-events-none -translate-x-1/2 -translate-y-1/2"
          />

          {/* TOP SECTION: Cover crest */}
          <div className="flex flex-col items-center mt-6 text-center" style={{ transform: 'translateZ(60px)' }}>
            <span className="text-amber-500/50 text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500/50 animate-pulse" />
              Volume I - Memoirs
            </span>
            <div className="w-10 h-[1px] bg-amber-500/30" />
          </div>

          {/* CENTER SECTION: Title of the book */}
          <div className="flex flex-col items-center justify-center my-auto py-4" style={{ transform: 'translateZ(90px)' }}>
            <h1 className="text-center font-serif text-5xl sm:text-6xl font-medium tracking-wide gold-text drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] select-none">
              My Journey
            </h1>
            <p className="mt-4 italic font-serif text-amber-600/75 text-sm tracking-wide">
              A digital portfolio showcasing my projects and Skills
            </p>
            <div className="w-16 h-8 border-b border-amber-500/30 rounded-full opacity-60 mt-3" />
          </div>

          {/* BOTTOM SECTION: Author Name (as explicitly asked by the user) */}
          <div className="flex flex-col items-center mb-4 text-center" style={{ transform: 'translateZ(50px)' }}>
            <span className="text-[10px] font-mono text-amber-600/50 uppercase tracking-[0.2em] mb-1">Author</span>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold tracking-wide text-amber-100/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              Dilitha Sandamal
            </h2>
            <div className="mt-1 text-[9px] font-mono text-stone-500 uppercase tracking-widest">
              Est. 2026
            </div>
          </div>

          {/* Bookmark Ribbon hanging down out from bottom of cover */}
          <div className="absolute right-8 -bottom-10 w-6 h-20 bg-red-800 rounded-b-md shadow-lg pointer-events-none ribbon-gradient z-10 flex flex-col justify-end items-center pb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-amber-300 shadow-sm opacity-90" />
          </div>
        </div>

        {/* Outer glowing highlights when active/hovered */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/0 via-amber-400/5 to-white/5 opacity-0 group-hover:opacity-100 rounded-r-2xl pointer-events-none transition-opacity duration-500" />
      </motion.div>

      {/* Action Guidance Cue */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex items-center gap-2 font-serif text-stone-400 text-sm italic cursor-pointer group hover:text-amber-400 transition-colors"
        onClick={onOpen}
      >
        <BookOpen className="w-4 h-4 text-amber-500 group-hover:animate-bounce" />
        Click on the cover to open and read
      </motion.p>
    </div>
  );
}
