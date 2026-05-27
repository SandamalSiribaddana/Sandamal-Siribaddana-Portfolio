import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { BookOpen, Sparkles, Star } from 'lucide-react';

interface BookCoverProps {
  onOpen: () => void;
}

export default function BookCover({ onOpen }: BookCoverProps) {
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateY = useTransform(x, [-150, 150], [14, -14]);
  const rotateX = useTransform(y, [-200, 200], [-10, 10]);

  const glintX = useTransform(x, [-150, 150], [-20, 120]);
  const glintY = useTransform(y, [-200, 200], [-20, 120]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
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
        style={{ rotateY, rotateX, transformStyle: 'preserve-3d' }}
        className="relative w-[340px] h-[520px] sm:w-[390px] sm:h-[570px] cursor-pointer select-none group"
        onClick={onOpen}
        id="book-cover-container"
      >
        {/* ── Book body: deep emerald leather ── */}
        <div
          className="absolute inset-0 rounded-r-3xl rounded-l-sm"
          style={{
            background: 'linear-gradient(160deg, #0e3d2c 0%, #072318 40%, #041910 100%)',
            boxShadow: isHovered
              ? '22px 30px 70px rgba(0,0,0,0.85), -4px 0 14px rgba(0,0,0,0.5), inset 1px 1px 0 rgba(255,255,255,0.04)'
              : '18px 24px 55px rgba(0,0,0,0.75), -4px 0 12px rgba(0,0,0,0.4), inset 1px 1px 0 rgba(255,255,255,0.03)',
            transition: 'box-shadow 0.4s ease',
          }}
        >
          {/* Inner leather depth overlay */}
          <div
            className="absolute inset-0 rounded-r-3xl rounded-l-sm"
            style={{
              background: 'radial-gradient(ellipse at 30% 40%, rgba(30,90,60,0.25) 0%, transparent 65%)',
            }}
          />

          {/* ── Gold outer border frame ── */}
          <div className="absolute inset-4 rounded-r-2xl rounded-l-xs gold-filigree pointer-events-none">
            <div className="absolute inset-1 border border-amber-400/8 rounded-r-xl rounded-l-xs" />
            {/* Corner ornaments — all 4 corners */}
            {[
              'top-1.5 left-1.5 border-t-2 border-l-2 rounded-tl-sm',
              'top-1.5 right-1.5 border-t-2 border-r-2 rounded-tr-sm',
              'bottom-1.5 left-1.5 border-b-2 border-l-2 rounded-bl-sm',
              'bottom-1.5 right-1.5 border-b-2 border-r-2 rounded-br-sm',
            ].map((cls, i) => (
              <div key={i} className={`absolute w-5 h-5 border-amber-500/65 ${cls}`} />
            ))}
            {/* Corner inner diamond dots */}
            {[
              'top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'
            ].map((pos, i) => (
              <div key={i} className={`absolute w-1 h-1 rounded-full bg-amber-500/35 ${pos}`} />
            ))}
          </div>

          {/* ── Left spine ridges ── */}
          <div className="absolute left-0 top-0 bottom-0 w-4 rounded-l-sm flex flex-col justify-around py-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.1))' }}
          >
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-[1.5px] w-full"
                style={{ background: 'linear-gradient(to right, rgba(212,175,55,0.4), rgba(212,175,55,0.1))' }}
              />
            ))}
          </div>

          {/* ── Dynamic glint layer ── */}
          <motion.div
            style={{
              left: useTransform(glintX, (v) => `${v}%`),
              top: useTransform(glintY, (v) => `${v}%`),
              background: 'radial-gradient(circle, rgba(120,200,130,0.12) 0%, transparent 70%)',
            }}
            className="absolute w-52 h-52 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 blur-[80px]"
          />

          {/* ── Animated diagonal glint ── */}
          {isHovered && (
            <div className="absolute inset-0 rounded-r-3xl rounded-l-sm overflow-hidden pointer-events-none">
              <div
                className="absolute top-0 bottom-0 w-16 animate-glint opacity-40"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)', left: '-10%' }}
              />
            </div>
          )}

          {/* ── TOP SECTION: Volume badge ── */}
          <div className="absolute top-9 inset-x-0 flex flex-col items-center gap-1.5" style={{ transform: 'translateZ(50px)' }}>
            <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.3em] text-amber-400/60">
              <Sparkles className="w-3 h-3 animate-pulse" />
              Volume I — Memoirs
              <Sparkles className="w-3 h-3 animate-pulse" />
            </span>
            <div className="flex items-center gap-2 opacity-50">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-500/70" />
              <Star className="w-2 h-2 text-amber-500 fill-amber-500" />
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-500/70" />
            </div>
          </div>

          {/* ── CENTER: Animated gold crest seal + title ── */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4" style={{ transform: 'translateZ(80px) translateY(-50%)' }}>

            {/* Animated crest seal */}
            <div className="relative flex items-center justify-center mb-1 animate-crest-pulse">
              {/* Outer slow-spin dashed ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                className="absolute w-20 h-20 rounded-full border border-dashed border-amber-500/25"
              />
              {/* Middle counter-spin ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute w-14 h-14 rounded-full border border-amber-400/30"
                style={{ borderStyle: 'dotted' }}
              />
              {/* Inner solid seal */}
              <div
                className="relative w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #d4af37 0%, #92740f 60%, #5a4608 100%)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)',
                }}
              >
                <span className="font-serif font-bold text-[11px] text-amber-100 tracking-tight select-none" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>DS</span>
              </div>
            </div>

            {/* Main title */}
            <h1
              className="text-center font-display text-5xl sm:text-6xl font-bold tracking-wide gold-text select-none leading-tight px-4"
              style={{ textShadow: '0 6px 20px rgba(0,0,0,0.8)', transform: 'translateZ(20px)' }}
            >
              My
              <br />
              Journey
            </h1>

            {/* Decorative rule below title */}
            <div className="flex items-center gap-3 opacity-55">
              <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-amber-500" />
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-amber-500/70" />
                ))}
              </div>
              <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-amber-500" />
            </div>

            <p className="italic font-serif text-amber-500/65 text-xs sm:text-sm tracking-wide text-center px-8 leading-relaxed">
              A digital portfolio showcasing<br />projects & skills
            </p>
          </div>

          {/* ── BOTTOM: Author block ── */}
          <div className="absolute bottom-9 inset-x-0 flex flex-col items-center gap-1" style={{ transform: 'translateZ(45px)' }}>
            <div className="flex items-center gap-2 opacity-40 mb-1">
              <div className="h-[1px] w-10 bg-amber-500" />
              <div className="w-1 h-1 rounded-full bg-amber-500" />
              <div className="h-[1px] w-10 bg-amber-500" />
            </div>
            <span className="text-[9px] font-mono text-amber-500/50 uppercase tracking-[0.25em]">Author</span>
            <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-wide text-amber-100/90"
              style={{ textShadow: '0 2px 6px rgba(0,0,0,0.7)' }}
            >
              Dilitha Sandamal
            </h2>
            <div className="text-[9px] font-mono text-amber-600/40 uppercase tracking-widest mt-0.5">Est. 2026</div>
          </div>

          {/* ── Bookmark ribbon ── */}
          <div className="absolute right-9 -bottom-12 w-5 h-20 rounded-b-sm shadow-lg pointer-events-none z-10 flex flex-col justify-end items-center pb-2"
            style={{ background: 'linear-gradient(to bottom, #7f1d1d, #dc2626, #b91c1c)' }}
          >
            <div className="w-2 h-2 rounded-full bg-amber-400 border border-amber-200/60 shadow-sm opacity-85" />
          </div>

          {/* Hover gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/0 via-emerald-300/4 to-amber-100/6 opacity-0 group-hover:opacity-100 rounded-r-3xl rounded-l-sm pointer-events-none transition-opacity duration-500" />
        </div>
      </motion.div>

      {/* ── Open cue ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-10 flex flex-col items-center gap-2"
      >
        {/* Pulsing ring */}
        <div className="relative flex items-center justify-center cursor-pointer group" onClick={onOpen}>
          <div className="absolute w-10 h-10 rounded-full border border-amber-500/30 animate-ping opacity-30" />
          <div className="w-8 h-8 rounded-full border border-amber-500/50 flex items-center justify-center bg-amber-900/20 group-hover:bg-amber-900/40 transition-all">
            <BookOpen className="w-4 h-4 text-amber-400 group-hover:text-amber-300 transition-colors" />
          </div>
        </div>
        <p className="font-serif text-stone-400 text-sm italic hover:text-amber-400 transition-colors cursor-pointer" onClick={onOpen}>
          Click to open & read
        </p>
      </motion.div>
    </div>
  );
}
