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
  VolumeX
} from 'lucide-react';
import BookCover from './BookCover';
import ProjectDisplay from './ProjectDisplay';
import SkillCompass from './SkillCompass';
import ContactLetter from './ContactLetter';
import profilePicture from '../assets/profile_picture.jpg';

// Types of ambient light modes
type LightMode = 'study' | 'candle' | 'midnight';

export default function BookContainer() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Spread indices: 0 = About (Pages 1-2), 1 = Projects 1-2 (Pages 3-4), 2 = Projects 3-4 (Pages 5-6), 3 = Skills & Contact (Pages 7-8)
  const [currentSpread, setCurrentSpread] = useState<number>(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  // Ambient styling modes
  const [lightMode, setLightMode] = useState<LightMode>('study');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  // Play subtle visual or virtual flip indication
  const triggerFlipEffect = () => {
    if (soundEnabled) {
      // Gentle synthetic click audio cues if supported and chosen
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
      } catch (err) {
        // Fallback for environments blocking instant AudioContext play
      }
    }
  };

  const handleNextPage = () => {
    if (currentSpread < 3) {
      setDirection('forward');
      setCurrentSpread((prev) => prev + 1);
      triggerFlipEffect();
    }
  };

  const handlePrevPage = () => {
    if (currentSpread > 0) {
      setDirection('backward');
      setCurrentSpread((prev) => prev - 1);
      triggerFlipEffect();
    }
  };

  const jumpToSpread = (spreadIndex: number) => {
    if (spreadIndex === currentSpread) return;
    setDirection(spreadIndex > currentSpread ? 'forward' : 'backward');
    setCurrentSpread(spreadIndex);
    triggerFlipEffect();
  };

  const handleCloseBook = () => {
    setIsOpen(false);
    triggerFlipEffect();
  };

  // Set backdrop colors based on ambient light mode selected
  const getBackdropColors = () => {
    switch (lightMode) {
      case 'candle':
        return 'bg-[radial-gradient(ellipse_at_center,#2d2112_0%,#0f0a05_100%)] text-amber-100';
      case 'midnight':
        return 'bg-[radial-gradient(ellipse_at_center,#111827_0%,#030712_100%)] text-stone-300';
      case 'study':
      default:
        return 'bg-[radial-gradient(ellipse_at_center,#2e2e2e_0%,#141414_100%)] text-stone-100';
    }
  };

  return (
    <div className={`min-h-screen ${getBackdropColors()} transition-colors duration-1000 flex flex-col justify-between overflow-x-hidden font-sans relative pb-8`}>

      {/* Decorative Warm Ambient Desk Lamp Light Overlay */}
      <div
        className={`absolute top-0 right-0 w-96 h-96 rounded-full mix-blend-screen pointer-events-none blur-[120px] transition-all duration-1000 ${lightMode === 'candle' ? 'bg-amber-600/35 opacity-90' :
          lightMode === 'midnight' ? 'bg-indigo-900/15 opacity-50' :
            'bg-stone-100/10 opacity-60'
          }`}
      />

      {/* TOP DECK INSTRUMENTS (Control Header Panel) */}
      <header className="w-full max-w-6xl mx-auto px-6 pt-4 flex items-center justify-between pointer-events-auto z-20">
        <div className="flex items-center gap-2">
          <Book className="w-5 h-5 text-amber-500" />
          <span className="font-serif font-semibold text-sm tracking-widest text-stone-400 capitalize">
            {isOpen ? 'My Journey • Open Folio' : 'Library Shelf'}
          </span>
        </div>

        {/* Tactile Control Box */}
        <div className="flex items-center gap-3.5 bg-black/45 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/5 shadow-inner">
          {/* Ambient Lighting Selector */}
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest hidden sm:inline">Desk Light:</span>
            <button
              onClick={() => setLightMode('study')}
              className={`p-1.5 rounded-full transition-all cursor-pointer ${lightMode === 'study' ? 'bg-stone-700 text-yellow-400' : 'text-stone-400 hover:text-white'}`}
              title="Modern Study Lamp"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setLightMode('candle')}
              className={`p-1.5 rounded-full transition-all cursor-pointer ${lightMode === 'candle' ? 'bg-amber-900/60 text-amber-400' : 'text-stone-400 hover:text-white'}`}
              title="Antique Candlelight"
            >
              <Flame className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setLightMode('midnight')}
              className={`p-1.5 rounded-full transition-all cursor-pointer ${lightMode === 'midnight' ? 'bg-indigo-950/60 text-indigo-400' : 'text-stone-400 hover:text-white'}`}
              title="Lunar Solitude"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="w-[1px] h-4 bg-white/10" />

          {/* Sound Toggle (Virtual paper flip click sound) */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-1.5 rounded-full transition-all cursor-pointer ${soundEnabled ? 'text-amber-500' : 'text-stone-500 hover:text-stone-300'}`}
            title={soundEnabled ? "Mute Tactile Flippings" : "Enable Tactile Flippings"}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </header>

      {/* CORE CANVAS WORKSPACE */}
      <main className="flex-1 flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="closed-book"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="origin-left"
            >
              {/* Outer closed book cover display */}
              <BookCover onOpen={() => { setIsOpen(true); triggerFlipEffect(); }} />
            </motion.div>
          ) : (
            <motion.div
              key="open-book-spread"
              initial={{ scale: 0.85, opacity: 0, rotateX: 10 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative w-full max-w-[920px] mx-auto perspective-2000"
              id="open-book-frame"
            >

              {/* Book Spine Shadow Board behind paper */}
              <div className="absolute inset-x-2 -inset-y-3 bg-stone-950/40 rounded-3xl blur-2xl pointer-events-none" />

              {/* The Physical Double-Page Spreader */}
              <div className="relative flex flex-col md:flex-row bg-orange-100/5 backdrop-blur-xs rounded-2xl md:p-1 overflow-visible border border-stone-800/20 shadow-[-5px_30px_60px_rgba(0,0,0,0.7)]">

                {/* Book Leather Rim Left */}
                <div className="absolute left-[-8px] top-1 bottom-1 w-[12px] rounded-l-md bg-stone-900 border-l border-stone-950 pointer-events-none shadow-md hidden md:block" />
                {/* Book Leather Rim Right */}
                <div className="absolute right-[-8px] top-1 bottom-1 w-[12px] rounded-r-md bg-stone-900 border-r border-stone-950 pointer-events-none shadow-md hidden md:block" />

                {/* ================= LEFT PAGE BORDER & CONTENT ================= */}
                <div className="flex-1 min-h-[500px] md:min-h-[550px] bg-parchment text-stone-900 rounded-t-xl md:rounded-t-none md:rounded-l-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden paper-pattern border-r border-stone-300 shadow-[inset_-25px_0_35px_rgba(0,0,0,0.06)]">

                  {/* Parchment Margin Frame */}
                  <div className="absolute inset-3 rounded-l-lg border border-red-950/5 pointer-events-none" />

                  {/* Subtle Spine Crease shadow on the page margins */}
                  <div className="absolute right-0 top-0 bottom-0 w-16 page-shadow-left pointer-events-none" />

                  {/* Top Header Badge */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 border-b border-stone-200/60 pb-1.5 uppercase tracking-wider relative z-10 select-none">
                    <span>My Journey • Dilitha Sandamal</span>
                    <span>Page {currentSpread * 2 + 1}</span>
                  </div>

                  {/* LEFT CONTENT AREA */}
                  <div className="flex-1 mt-6 relative z-10">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSpread}
                        initial={{ opacity: 0, x: direction === 'forward' ? -15 : 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction === 'forward' ? 15 : -15 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="h-full"
                      >
                        {/* Spread 0: About Me bio intro */}
                        {currentSpread === 0 && (
                          <div className="space-y-4" id="intro-card-about">
                            <span className="text-[10px] uppercase font-mono tracking-widest text-amber-800 font-bold">
                              Foliant Chapter I
                            </span>
                            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 leading-tight">
                              The Explorer
                            </h2>
                            <p className="font-serif italic text-stone-600 text-sm leading-relaxed">
                              "{aboutMeData.title}"
                            </p>

                            {/* Profile Picture */}
                            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-amber-600/25 p-1 mx-auto my-4 flex items-center justify-center shadow-md">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                                className="absolute inset-0.5 border border-dashed border-amber-600/40 rounded-full z-10 pointer-events-none"
                              />
                              <img
                                src={profilePicture}
                                alt="Profile"
                                className="w-full h-full object-cover rounded-full"
                              />
                            </div>

                            <p
                              className="text-stone-700 font-sans text-xs sm:text-sm leading-relaxed font-light"
                              dangerouslySetInnerHTML={{ __html: aboutMeData.bio }}
                            />

                            <div className="flex items-center justify-between text-[11px] font-mono pt-2 text-stone-400 italic">
                              <span>Origin: {aboutMeData.location}</span>
                              <span>Est. CE 2026</span>
                            </div>
                          </div>
                        )}

                        {/* Spread 1: Projects Showcase (Project 1: Aether) */}
                        {currentSpread === 1 && (
                          <ProjectDisplay project={projectsData[0]} />
                        )}

                        {/* Spread 2: Projects Showcase (Project 3: Neurostream) */}
                        {currentSpread === 2 && (
                          <ProjectDisplay project={projectsData[2]} />
                        )}

                        {/* Spread 3: Skill Compass (Knowledge layout) */}
                        {currentSpread === 3 && (
                          <SkillCompass />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Left bottom turn curl trigger */}
                  <div
                    onClick={handlePrevPage}
                    className={`absolute bottom-0 left-0 w-8 h-8 rounded-tr-lg page-shadow-left cursor-pointer transition-all hover:bg-black/5 opacity-80 ${currentSpread === 0 ? 'pointer-events-none opacity-20' : ''}`}
                    title="Turn to previous page"
                  >
                    <div className="absolute bottom-1.5 left-1.5 border-b-2 border-l-2 border-stone-400 w-2.5 h-2.5" />
                  </div>
                </div>

                {/* ================= SPINAL SPLIT RING BINDINGS ================= */}
                <div className="relative w-full h-8 md:w-8 md:h-auto bg-stone-900 flex md:flex-col justify-around items-center border-t border-b md:border-t-0 md:border-b-0 md:border-l md:border-r border-stone-950 pointer-events-none">
                  {/* Dynamic Spine Ridges */}
                  <div className="absolute inset-0 book-spine-gradient hidden md:block" />

                  {/* Metal spiral ring pins */}
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-6 md:w-6 md:h-1.5 group rounded-full bg-gradient-to-r md:bg-gradient-to-b from-stone-400 via-stone-200 to-stone-500 shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-20 border border-stone-950"
                    />
                  ))}
                </div>


                {/* ================= RIGHT PAGE BORDER & CONTENT ================= */}
                <div className="flex-1 min-h-[500px] md:min-h-[550px] bg-parchment text-stone-900 rounded-b-xl md:rounded-b-none md:rounded-r-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden paper-pattern shadow-[inset_25px_0_35px_rgba(0,0,0,0.06)]">

                  {/* Parchment Margin Frame */}
                  <div className="absolute inset-3 rounded-r-lg border border-red-950/5 pointer-events-none" />

                  {/* Subtle Spine Crease shadow on right page margins */}
                  <div className="absolute left-0 top-0 bottom-0 w-16 page-shadow-right pointer-events-none" />

                  {/* Top Header Badge */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 border-b border-stone-200/60 pb-1.5 uppercase tracking-wider relative z-10 select-none">
                    <span>Page {currentSpread * 2 + 2}</span>
                    <span>My Journey • Dilitha Sandamal</span>
                  </div>

                  {/* RIGHT CONTENT AREA */}
                  <div className="flex-1 mt-6 relative z-10">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSpread}
                        initial={{ opacity: 0, x: direction === 'forward' ? 15 : -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction === 'forward' ? -15 : 15 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="h-full"
                      >
                        {/* Spread 0: Deep Story Philosophy */}
                        {currentSpread === 0 && (
                          <div className="flex flex-col h-full justify-between" id="intro-card-philosophy">
                            <div className="space-y-4">
                              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-800 font-bold">
                                Chronicle Entry
                              </span>
                              <h3 className="font-serif text-2xl font-semibold text-stone-900 leading-tight">
                                Narrative & Principles
                              </h3>

                              <div className="space-y-2 text-stone-700 font-sans text-xs leading-relaxed font-light">
                                {aboutMeData.detailedStory.map((paragraph, index) => (
                                  <p key={index}>{paragraph}</p>
                                ))}
                              </div>
                            </div>

                            {/* Tactile Core Philosophies */}
                            <div className="mt-4 pt-3.5 border-t border-stone-250 border-dashed">
                              <h4 className="text-[9px] font-mono text-amber-800 font-bold uppercase tracking-wider mb-2">My Core Principles</h4>
                              <div className="grid grid-cols-1 gap-1.5">
                                {aboutMeData.philosophies.map((ph, idx) => (
                                  <div
                                    key={idx}
                                    className="p-1.5 rounded bg-amber-500/0 border border-transparent hover:border-amber-600/10 hover:bg-amber-500/5 transition-all cursor-default"
                                    title={ph.desc}
                                  >
                                    <p className="font-serif font-bold text-xs text-stone-800 leading-none">{ph.title}</p>
                                    <p className="text-[10px] text-stone-500 font-light font-sans mt-0.5 leading-normal">{ph.desc}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Spread 1: Projects Showcase (Project 2: Meridian Books) */}
                        {currentSpread === 1 && (
                          <ProjectDisplay project={projectsData[1]} />
                        )}

                        {/* Spread 2: Projects Showcase (Project 4: Vortex CLI) */}
                        {currentSpread === 2 && (
                          <ProjectDisplay project={projectsData[3]} />
                        )}

                        {/* Spread 3: Contact Letter Dispatch */}
                        {currentSpread === 3 && (
                          <ContactLetter />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Right bottom turn curl trigger */}
                  <div
                    onClick={handleNextPage}
                    className={`absolute bottom-0 right-0 w-8 h-8 rounded-tl-lg page-shadow-right cursor-pointer transition-all hover:bg-black/5 opacity-80 ${currentSpread === 3 ? 'pointer-events-none opacity-20' : ''}`}
                    title="Turn to next page"
                  >
                    <div className="absolute bottom-1.5 right-1.5 border-b-2 border-r-2 border-stone-400 w-2.5 h-2.5" />
                  </div>
                </div>

                {/* ================= DESKTOP CHAPTER BOOKMARKS INDEX TABS (Hanging on right-hand margin) ================= */}
                <div className="absolute right-[-48px] top-6 bottom-6 w-11 flex flex-col gap-2.5 pointer-events-auto z-10 hidden lg:flex select-none">
                  {[
                    { label: 'Cover', index: -1, icon: <Home className="w-4 h-4" /> },
                    { label: 'Bio', index: 0, icon: <User className="w-4 h-4" /> },
                    { label: 'Works I', index: 1, icon: <Briefcase className="w-4 h-4" /> },
                    { label: 'Works II', index: 2, icon: <Briefcase className="w-4 h-4" /> },
                    { label: 'Skills', index: 3, icon: <Compass className="w-4 h-4 animate-spin-slow" /> },
                    { label: 'Letters', index: 3, icon: <Mail className="w-4 h-4" /> },
                  ].map((tab, idx) => {
                    const isActive = tab.index === currentSpread;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          if (tab.index === -1) {
                            handleCloseBook();
                          } else {
                            jumpToSpread(tab.index);
                          }
                        }}
                        className={`group px-3 py-2 rounded-r-lg text-[9px] font-serif font-bold tracking-wider transition-all cursor-pointer shadow-md flex flex-col items-center justify-center gap-1 w-full text-center border-t border-b border-r ${isActive
                          ? 'bg-amber-800 text-amber-50 border-amber-950 translate-x-1.5 w-[50px]'
                          : 'bg-stone-800 hover:bg-stone-700 text-stone-300 border-stone-900 min-h-[48px]'
                          }`}
                        title={tab.label}
                      >
                        {tab.icon}
                        <span className="text-[7px] font-sans font-light hidden xl:inline">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

              </div>

              {/* ================= LOWER NAVIGATION CONTROLS ================= */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-stone-950/20 px-6 py-3 rounded-full border border-white/5 shadow-inner">

                {/* Back to cover button */}
                <button
                  onClick={handleCloseBook}
                  className="px-4 py-1.5 text-xs font-serif italic text-stone-400 hover:text-amber-400 border border-stone-800 rounded-full hover:bg-stone-900/40 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Home className="w-3.5 h-3.5" />
                  Close & return to Cover
                </button>

                {/* Flip controllers */}
                <div className="flex items-center gap-3.5">
                  <button
                    disabled={currentSpread === 0}
                    onClick={handlePrevPage}
                    className="p-1 px-4 bg-stone-800 hover:bg-stone-700 disabled:opacity-20 text-stone-200 text-xs font-serif font-semibold rounded-full flex items-center gap-1 cursor-pointer transition-colors shadow"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  {/* Indicator register */}
                  <span className="text-xs font-mono text-stone-500 font-medium">
                    Spread {currentSpread + 1} of 4
                  </span>

                  <button
                    disabled={currentSpread === 3}
                    onClick={handleNextPage}
                    className="p-1 px-4 bg-stone-800 hover:bg-stone-700 disabled:opacity-20 text-stone-200 text-xs font-serif font-semibold rounded-full flex items-center gap-1 cursor-pointer transition-colors shadow"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Index Tags (Mobile Jump bar under book page) */}
                <div className="flex gap-1.5 lg:hidden justify-center scale-90 sm:scale-100">
                  {[0, 1, 2, 3].map((val) => (
                    <button
                      key={val}
                      onClick={() => jumpToSpread(val)}
                      className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer border ${currentSpread === val
                        ? 'bg-amber-600 border-amber-600 scale-125'
                        : 'bg-stone-800 hover:bg-stone-600 border-stone-700'
                        }`}
                      title={`Go to page ${(val * 2) + 1}`}
                    />
                  ))}
                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER METADATA (Humane, standard credits) */}
      <footer className="text-center font-mono text-[10px] text-stone-600 relative select-none z-10">
        <p>© 2026 Dilitha Sandamal. Built with precision, React, and Framer Motion.</p>
        <p className="mt-1 hidden sm:block">A parchment coordinate register. Open source architecture.</p>
      </footer>

    </div>
  );
}
