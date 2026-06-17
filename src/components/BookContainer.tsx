import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  aboutMeData,
  projectsData
} from '../data/portfolioData';
import {
  Book,
  ChevronLeft,
  ChevronRight,
  Home,
  User,
  Briefcase,
  Compass,
  Mail,
  Sun,
  Moon,
  Flame,
  Volume2,
  VolumeX,
  MapPin,
  Dot,
  FileDown
} from 'lucide-react';
import BookCover from './BookCover';
import ProjectDisplay from './ProjectDisplay';
import SkillCompass from './SkillCompass';
import ContactLetter from './ContactLetter';
import profilePicture from '../assets/profile_picture.jpg';

type LightMode = 'study' | 'candle' | 'midnight';

// Floating dust particles for atmospheric depth
const PARTICLES = [
  { size: 180, left: '8%',  animDuration: '22s', delay: '0s',   opacity: 0.45 },
  { size: 120, left: '25%', animDuration: '30s', delay: '6s',   opacity: 0.30 },
  { size: 90,  left: '50%', animDuration: '18s', delay: '3s',   opacity: 0.25 },
  { size: 150, left: '70%', animDuration: '26s', delay: '9s',   opacity: 0.35 },
  { size: 80,  left: '88%', animDuration: '20s', delay: '14s',  opacity: 0.20 },
];

export default function BookContainer() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentSpread, setCurrentSpread] = useState<number>(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [lightMode, setLightMode] = useState<LightMode>('study');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  const triggerFlipEffect = () => {
    if (soundEnabled) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
      } catch (_) {}
    }
  };

  const handleNextPage = () => {
    if (currentSpread < 3) { setDirection('forward'); setCurrentSpread(p => p + 1); triggerFlipEffect(); }
  };
  const handlePrevPage = () => {
    if (currentSpread > 0) { setDirection('backward'); setCurrentSpread(p => p - 1); triggerFlipEffect(); }
  };
  const jumpToSpread = (idx: number) => {
    if (idx === currentSpread) return;
    setDirection(idx > currentSpread ? 'forward' : 'backward');
    setCurrentSpread(idx);
    triggerFlipEffect();
  };
  const handleCloseBook = () => { setIsOpen(false); triggerFlipEffect(); };

  // Rich multi-layer backdrop per light mode
  const getBackdropStyle = (): React.CSSProperties => {
    switch (lightMode) {
      case 'candle':
        return { background: 'radial-gradient(ellipse at 60% 30%, #2a1a08 0%, #150d04 60%, #080501 100%)' };
      case 'midnight':
        return { background: 'radial-gradient(ellipse at 40% 20%, #0d1528 0%, #070d1a 60%, #020408 100%)' };
      case 'study':
      default:
        return { background: 'radial-gradient(ellipse at 50% 20%, #1a1a2e 0%, #10101a 50%, #080810 100%)' };
    }
  };

  const getTextColor = () => {
    switch (lightMode) {
      case 'candle':   return 'text-amber-100';
      case 'midnight': return 'text-slate-300';
      default:         return 'text-stone-100';
    }
  };

  // Particle color tint by mode
  const getParticleColor = () => {
    switch (lightMode) {
      case 'candle':   return 'rgba(255, 160, 60, ';
      case 'midnight': return 'rgba(100, 140, 255, ';
      default:         return 'rgba(212, 175, 55, ';
    }
  };

  // Page background per mode
  const getPageStyle = (): React.CSSProperties => ({
    background: lightMode === 'midnight'
      ? 'linear-gradient(160deg, #f0ead8 0%, #e8dfc5 100%)'
      : 'linear-gradient(160deg, #fdfaf0 0%, #f7f0dc 100%)',
  });

  return (
    <div
      className={`min-h-screen ${getTextColor()} transition-colors duration-1000 flex flex-col justify-between overflow-x-hidden font-sans relative pb-8`}
      style={getBackdropStyle()}
    >

      {/* ── Floating Atmospheric Dust Particles ── */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            bottom: '-10%',
            animationDuration: p.animDuration,
            animationDelay: p.delay,
            opacity: p.opacity,
            background: `radial-gradient(circle, ${getParticleColor()}0.6) 0%, ${getParticleColor()}0) 70%)`,
          }}
        />
      ))}

      {/* ── Warm ambient light overlays ── */}
      <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full mix-blend-screen pointer-events-none blur-[140px] transition-all duration-1000 ${
        lightMode === 'candle'   ? 'bg-amber-600/25 opacity-80' :
        lightMode === 'midnight' ? 'bg-indigo-900/20 opacity-40' :
                                   'bg-emerald-900/20 opacity-50'
      }`} />
      <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full mix-blend-screen pointer-events-none blur-[120px] transition-all duration-1000 ${
        lightMode === 'candle'   ? 'bg-orange-800/20 opacity-60' :
        lightMode === 'midnight' ? 'bg-blue-950/15 opacity-30' :
                                   'bg-stone-800/15 opacity-40'
      }`} />

      {/* ── TOP HEADER ── */}
      <header className="w-full max-w-6xl mx-auto px-6 pt-4 flex items-center justify-between pointer-events-auto z-20">
        <div className="flex items-center gap-2">
          <Book className="w-5 h-5 text-amber-500" />
          <span className="font-serif font-semibold text-sm tracking-widest text-stone-400 capitalize">
            {isOpen ? 'My Journey • Open Folio' : 'My Shelf'}
          </span>
        </div>

        {/* Glassmorphic control pill */}
        <div className="flex items-center gap-3.5 px-4 py-2 rounded-full border border-white/8 shadow-inner"
          style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(16px)' }}
        >
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest hidden sm:inline">Light:</span>
            {([
              { mode: 'study',    icon: <Sun className="w-3.5 h-3.5" />,   label: 'Study Lamp',      active: 'bg-stone-700/80 text-yellow-300' },
              { mode: 'candle',   icon: <Flame className="w-3.5 h-3.5" />, label: 'Candlelight',     active: 'bg-amber-900/70 text-amber-300' },
              { mode: 'midnight', icon: <Moon className="w-3.5 h-3.5" />,  label: 'Midnight Mode',   active: 'bg-indigo-950/70 text-indigo-300' },
            ] as const).map(({ mode, icon, label, active }) => (
              <button
                key={mode}
                onClick={() => setLightMode(mode)}
                className={`p-1.5 rounded-full transition-all cursor-pointer ${lightMode === mode ? active : 'text-stone-500 hover:text-stone-200'}`}
                title={label}
              >
                {icon}
              </button>
            ))}
          </div>

          <div className="w-[1px] h-4 bg-white/10" />

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-1.5 rounded-full transition-all cursor-pointer ${soundEnabled ? 'text-amber-400' : 'text-stone-600 hover:text-stone-300'}`}
            title={soundEnabled ? 'Mute page sounds' : 'Enable page sounds'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </header>

      {/* ── MAIN CANVAS ── */}
      <main className="flex-1 flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="closed-book"
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.65, ease: 'easeInOut' }}
              className="origin-left"
            >
              <BookCover onOpen={() => { setIsOpen(true); triggerFlipEffect(); }} />
            </motion.div>
          ) : (
            <motion.div
              key="open-book-spread"
              initial={{ scale: 0.85, opacity: 0, rotateX: 12 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative w-full max-w-[960px] mx-auto perspective-2000"
              id="open-book-frame"
            >
              {/* Book drop shadow */}
              <div className="absolute inset-x-2 -inset-y-4 bg-black/50 rounded-3xl blur-3xl pointer-events-none" />

              {/* Double-page spread */}
              <div className="relative flex flex-col md:flex-row bg-transparent rounded-2xl md:p-1 overflow-visible border border-stone-800/25 shadow-[-6px_32px_70px_rgba(0,0,0,0.75)]">

                {/* Leather rim left */}
                <div className="absolute left-[-9px] top-1 bottom-1 w-[13px] rounded-l-md border-l border-stone-950 pointer-events-none shadow-lg hidden md:block"
                  style={{ background: 'linear-gradient(to right, #0a0a0a, #1c1c1c)' }}
                />
                {/* Leather rim right */}
                <div className="absolute right-[-9px] top-1 bottom-1 w-[13px] rounded-r-md border-r border-stone-950 pointer-events-none shadow-lg hidden md:block"
                  style={{ background: 'linear-gradient(to left, #0a0a0a, #1c1c1c)' }}
                />

                {/* ═══════════ LEFT PAGE ═══════════ */}
                <div
                  className="flex-1 min-h-[520px] md:min-h-[580px] text-stone-900 rounded-t-xl md:rounded-t-none md:rounded-l-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden paper-pattern page-ruled border-r border-stone-300/80 shadow-[inset_-28px_0_40px_rgba(0,0,0,0.07)]"
                  style={getPageStyle()}
                >
                  {/* Margin line */}
                  <div className="page-margin-line" />
                  {/* Parchment inset frame */}
                  <div className="absolute inset-3 rounded-l-lg border border-amber-900/6 pointer-events-none" />
                  {/* Spine shadow */}
                  <div className="absolute right-0 top-0 bottom-0 w-16 page-shadow-left pointer-events-none" />

                  {/* Page header */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 border-b border-stone-300/50 pb-2 uppercase tracking-wider relative z-10 select-none">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600/60" />
                      My Journey • Dilitha Sandamal
                    </span>
                    <span>Page {currentSpread * 2 + 1}</span>
                  </div>

                  {/* LEFT CONTENT */}
                  <div className="flex-1 mt-5 relative z-10">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSpread}
                        initial={{ opacity: 0, x: direction === 'forward' ? -18 : 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction === 'forward' ? 18 : -18 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="h-full"
                      >
                        {/* ── Spread 0 LEFT: About Me ── */}
                        {currentSpread === 0 && (
                          <div className="space-y-3.5" id="intro-card-about">
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] uppercase font-mono tracking-widest text-amber-800 font-bold bg-amber-800/8 px-2 py-0.5 rounded border border-amber-700/15">
                                Foliant Chapter I
                              </span>
                            </div>
                            <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
                              The Explorer
                            </h2>
                            <p className="font-serif italic text-stone-500 text-sm leading-relaxed">
                              "{aboutMeData.title}"
                            </p>

                            {/* Profile picture with premium frame */}
                            <div className="relative mx-auto w-fit my-3">
                              <div className="relative w-36 h-36 sm:w-44 sm:h-44">
                                {/* Outer slow-spin dashed ring */}
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}
                                  className="absolute inset-0 rounded-full border border-dashed border-amber-600/35"
                                />
                                {/* Inner ring */}
                                <motion.div
                                  animate={{ rotate: -360 }}
                                  transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
                                  className="absolute inset-2 rounded-full border border-dotted border-amber-500/20"
                                />
                                <div className="absolute inset-3 rounded-full border-2 border-amber-600/30 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.18)] animate-soft-float">
                                  <img
                                    src={profilePicture}
                                    alt="Dilitha Sandamal"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>
                              {/* "Currently Seeking" badge */}
                              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-emerald-700 text-emerald-50 text-[8px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md whitespace-nowrap">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse-dot" />
                                Open to Opportunities
                              </div>
                            </div>

                            <p
                              className="text-stone-700 font-sans text-xs sm:text-sm leading-relaxed font-light"
                              dangerouslySetInnerHTML={{ __html: aboutMeData.bio }}
                            />

                            {/* CV Download Button & Location */}
                            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-stone-300/40">
                              <a
                                href="/Dilitha_Sandamal_CV.pdf"
                                download="Dilitha_Sandamal_CV.pdf"
                                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-amber-800/35 bg-amber-800/8 text-amber-900 font-serif text-xs font-semibold hover:bg-amber-800/15 hover:border-amber-800/60 hover:text-amber-950 hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-xs cursor-pointer w-fit"
                              >
                                <FileDown className="w-4 h-4 text-amber-800" />
                                <span>Download CV</span>
                              </a>
                              
                              <div className="flex items-center justify-between sm:justify-end gap-4 text-[11px] font-mono text-stone-400">
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-amber-700" />
                                  {aboutMeData.location}
                                </span>
                                <span className="italic">Est. CE 2026</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Spread 1 LEFT: Project 1 (Aether - Tomato ML) */}
                        {currentSpread === 1 && <ProjectDisplay project={projectsData[0]} />}
                        {/* Spread 2 LEFT: Project 3 (NeuroStream) */}
                        {currentSpread === 2 && <ProjectDisplay project={projectsData[2]} hideHeaderAndImages={true} />}
                        {/* Spread 3 LEFT: Skill Compass */}
                        {currentSpread === 3 && <SkillCompass />}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Left bottom page-turn curl */}
                  <div
                    onClick={handlePrevPage}
                    className={`absolute bottom-0 left-0 w-9 h-9 rounded-tr-lg cursor-pointer transition-all hover:bg-amber-900/8 ${currentSpread === 0 ? 'pointer-events-none opacity-20' : 'opacity-70 hover:opacity-100'}`}
                    title="Previous page"
                  >
                    <div className="absolute bottom-2 left-2 border-b-2 border-l-2 border-stone-400/60 w-3 h-3" />
                  </div>
                </div>

                {/* ═══════════ SPINE ═══════════ */}
                <div className="relative w-full h-8 md:w-9 md:h-auto flex md:flex-col justify-around items-center border-t border-b md:border-t-0 md:border-b-0 md:border-l md:border-r border-stone-950 pointer-events-none"
                  style={{ background: 'linear-gradient(to right, #0c0c0c, #1a1a1a, #0c0c0c)' }}
                >
                  <div className="absolute inset-0 book-spine-gradient hidden md:block" />
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-6 md:w-6 md:h-1.5 rounded-full z-20 border border-stone-900"
                      style={{ background: 'linear-gradient(to bottom, #c8a96e, #e8c87c, #a07830)' }}
                    />
                  ))}
                </div>

                {/* ═══════════ RIGHT PAGE ═══════════ */}
                <div
                  className="flex-1 min-h-[520px] md:min-h-[580px] text-stone-900 rounded-b-xl md:rounded-b-none md:rounded-r-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden paper-pattern page-ruled shadow-[inset_28px_0_40px_rgba(0,0,0,0.07)]"
                  style={getPageStyle()}
                >
                  {/* Parchment inset frame */}
                  <div className="absolute inset-3 rounded-r-lg border border-amber-900/6 pointer-events-none" />
                  {/* Spine shadow */}
                  <div className="absolute left-0 top-0 bottom-0 w-16 page-shadow-right pointer-events-none" />

                  {/* Page header */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 border-b border-stone-300/50 pb-2 uppercase tracking-wider relative z-10 select-none">
                    <span>Page {currentSpread * 2 + 2}</span>
                    <span className="flex items-center gap-1.5">
                      My Journey • Dilitha Sandamal
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600/60" />
                    </span>
                  </div>

                  {/* RIGHT CONTENT */}
                  <div className="flex-1 mt-5 relative z-10">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSpread}
                        initial={{ opacity: 0, x: direction === 'forward' ? 18 : -18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction === 'forward' ? -18 : 18 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="h-full"
                      >
                        {/* ── Spread 0 RIGHT: Story & Philosophy ── */}
                        {currentSpread === 0 && (
                          <div className="flex flex-col h-full justify-between" id="intro-card-philosophy">
                            <div className="space-y-3.5">
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] uppercase font-mono tracking-widest text-amber-800 font-bold bg-amber-800/8 px-2 py-0.5 rounded border border-amber-700/15">
                                  Chronicle Entry
                                </span>
                              </div>
                              <h3 className="font-display text-2xl font-bold text-stone-900 leading-tight">
                                Narrative & Principles
                              </h3>

                              {/* Gold divider */}
                              <div className="flex items-center gap-2">
                                <div className="h-[1px] flex-1 bg-gradient-to-r from-amber-600/40 to-transparent" />
                                <div className="w-1 h-1 rounded-full bg-amber-600/50" />
                              </div>

                              <div className="space-y-2 text-stone-700 font-sans text-xs leading-relaxed font-light">
                                {aboutMeData.detailedStory.map((para, i) => (
                                  <p key={i} className={i === 0 ? 'first-letter:text-2xl first-letter:font-display first-letter:font-bold first-letter:text-amber-800 first-letter:float-left first-letter:mr-1 first-letter:leading-none' : ''}>
                                    {para}
                                  </p>
                                ))}
                              </div>
                            </div>

                            {/* Core Principles */}
                            <div className="mt-4 pt-3 border-t border-dashed border-stone-300/60">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="h-[1px] w-4 bg-amber-600/50" />
                                <h4 className="text-[9px] font-mono text-amber-800 font-bold uppercase tracking-widest">My Core Principles</h4>
                                <div className="h-[1px] flex-1 bg-amber-600/20" />
                              </div>
                              <div className="grid grid-cols-1 gap-2">
                                {aboutMeData.philosophies.map((ph, idx) => (
                                  <div
                                    key={idx}
                                    className="p-2 rounded-lg border border-amber-600/12 hover:border-amber-600/25 hover:bg-amber-500/4 transition-all cursor-default group"
                                  >
                                    <div className="flex items-start gap-2">
                                      <span className="text-amber-600 text-xs mt-0.5 group-hover:scale-110 transition-transform">◆</span>
                                      <div>
                                        <p className="font-display font-bold text-xs text-stone-800 leading-snug">{ph.title}</p>
                                        <p className="text-[10px] text-stone-500 font-light font-sans mt-0.5 leading-normal">{ph.desc}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Spread 1 RIGHT: Project 2 (Hotel Mgmt) */}
                        {currentSpread === 1 && <ProjectDisplay project={projectsData[1]} />}
                        {/* Spread 2 RIGHT: Project 4 (Vortex CLI) */}
                        {currentSpread === 2 && <ProjectDisplay project={projectsData[3]} hideHeaderAndImages={true} />}
                        {/* Spread 3 RIGHT: Contact Letter */}
                        {currentSpread === 3 && <ContactLetter />}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Right bottom page-turn curl */}
                  <div
                    onClick={handleNextPage}
                    className={`absolute bottom-0 right-0 w-9 h-9 rounded-tl-lg cursor-pointer transition-all hover:bg-amber-900/8 ${currentSpread === 3 ? 'pointer-events-none opacity-20' : 'opacity-70 hover:opacity-100'}`}
                    title="Next page"
                  >
                    <div className="absolute bottom-2 right-2 border-b-2 border-r-2 border-stone-400/60 w-3 h-3" />
                  </div>
                </div>

                {/* ═══════════ CHAPTER TAB BOOKMARKS (desktop right rail) ═══════════ */}
                <div className="absolute right-[-52px] top-6 bottom-6 w-12 flex flex-col gap-2 pointer-events-auto z-10 hidden lg:flex select-none">
                  {[
                    { label: 'Cover',   index: -1, icon: <Home className="w-3.5 h-3.5" /> },
                    { label: 'Bio',     index: 0,  icon: <User className="w-3.5 h-3.5" /> },
                    { label: 'Works I', index: 1,  icon: <Briefcase className="w-3.5 h-3.5" /> },
                    { label: 'Works II',index: 2,  icon: <Briefcase className="w-3.5 h-3.5" /> },
                    { label: 'Skills',  index: 3,  icon: <Compass className="w-3.5 h-3.5 animate-slow-spin" /> },
                    { label: 'Contact', index: 3,  icon: <Mail className="w-3.5 h-3.5" /> },
                  ].map((tab, idx) => {
                    const isActive = tab.index === currentSpread;
                    return (
                      <button
                        key={idx}
                        onClick={() => tab.index === -1 ? handleCloseBook() : jumpToSpread(tab.index)}
                        className={`group px-2.5 py-2 rounded-r-lg text-[8px] font-serif font-bold tracking-wider transition-all cursor-pointer shadow-md flex flex-col items-center justify-center gap-1 w-full border-t border-b border-r ${
                          isActive
                            ? 'border-amber-900 translate-x-2 text-amber-50'
                            : 'bg-stone-900 hover:bg-stone-700 text-stone-400 border-stone-800 min-h-[44px] hover:translate-x-0.5'
                        }`}
                        style={isActive ? { background: 'linear-gradient(135deg, #92400e, #b45309)' } : {}}
                        title={tab.label}
                      >
                        {tab.icon}
                        <span className="text-[7px] font-sans font-light hidden xl:inline leading-tight text-center">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

              </div>

              {/* ═══════════ LOWER NAVIGATION ═══════════ */}
              <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-2.5 rounded-full border border-white/6 shadow-inner"
                style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(12px)' }}
              >
                <button
                  onClick={handleCloseBook}
                  className="px-4 py-1.5 text-xs font-serif italic text-stone-400 hover:text-amber-400 border border-stone-800 rounded-full hover:bg-stone-900/40 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Home className="w-3.5 h-3.5" />
                  Close & return to Cover
                </button>

                <div className="flex items-center gap-3">
                  <button
                    disabled={currentSpread === 0}
                    onClick={handlePrevPage}
                    className="p-1 px-4 hover:bg-stone-700 disabled:opacity-20 text-stone-200 text-xs font-serif font-semibold rounded-full flex items-center gap-1 cursor-pointer transition-all shadow border border-stone-700"
                    style={{ background: currentSpread === 0 ? undefined : 'rgba(40,40,40,0.8)' }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Prev
                  </button>

                  {/* Spread dots */}
                  <div className="flex items-center gap-1.5">
                    {[0, 1, 2, 3].map(v => (
                      <button
                        key={v}
                        onClick={() => jumpToSpread(v)}
                        className={`rounded-full transition-all cursor-pointer border ${
                          currentSpread === v
                            ? 'w-5 h-2 bg-amber-500 border-amber-500'
                            : 'w-2 h-2 bg-stone-700 hover:bg-stone-500 border-stone-600'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    disabled={currentSpread === 3}
                    onClick={handleNextPage}
                    className="p-1 px-4 hover:bg-stone-700 disabled:opacity-20 text-stone-200 text-xs font-serif font-semibold rounded-full flex items-center gap-1 cursor-pointer transition-all shadow border border-stone-700"
                    style={{ background: currentSpread === 3 ? undefined : 'rgba(40,40,40,0.8)' }}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Mobile jump dots */}
                <div className="flex gap-1.5 lg:hidden">
                  {[0, 1, 2, 3].map(v => (
                    <button
                      key={v}
                      onClick={() => jumpToSpread(v)}
                      className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer border ${
                        currentSpread === v ? 'bg-amber-600 border-amber-600 scale-125' : 'bg-stone-800 hover:bg-stone-600 border-stone-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ── FOOTER ── */}
      <footer className="text-center font-mono text-[10px] text-stone-600 relative select-none z-10 px-4">
        <div className="flex items-center justify-center gap-3 mb-1 opacity-30">
          <div className="h-[1px] w-16 bg-stone-600" />
          <div className="w-1 h-1 rounded-full bg-amber-600" />
          <div className="h-[1px] w-16 bg-stone-600" />
        </div>
        <p>© 2026 Dilitha Sandamal · Designed with purpose, built with React</p>
        <p className="mt-0.5 hidden sm:block text-stone-700">A parchment coordinate register · Open source architecture</p>
      </footer>

    </div>
  );
}
