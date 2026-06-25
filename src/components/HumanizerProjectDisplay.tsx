import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  Github,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Brain,
  Zap,
  Layers,
  Hash,
  X
} from 'lucide-react';
import { projectsData } from '../data/portfolioData';

// ─── Get the humanizer project data ───
const humanizer = projectsData.find(p => p.id === 'humanizer')!;

// ─── Feature highlights ───
const features = [
  { icon: Brain,  label: 'Semantic AI',     desc: 'Gemini 2.5 Flash understands context deeply before rewriting', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
  { icon: Layers, label: '3 Writing Modes', desc: 'Academic · Business · Professional — prompt-engineered modes', color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200' },
  { icon: Zap,    label: 'Instant Results', desc: 'Real-time analytics: word count, char stats, language detection', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
];

// ─── Stats ───
const stats = [
  { value: '2.5 Flash', label: 'Gemini Model',  accent: 'text-purple-700' },
  { value: '3 Modes',   label: 'Writing Styles', accent: 'text-violet-700' },
  { value: '100%',      label: 'Responsive UI',  accent: 'text-emerald-700' },
];

// ─── Tech stack groupings ───
const techGroups = [
  { group: 'Core', items: ['Next.js 16', 'React 19', 'TypeScript'],         color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { group: 'AI',   items: ['Google Gemini API', 'Prompt Engineering'],       color: 'bg-purple-50 border-purple-200 text-purple-700' },
  { group: 'UI',   items: ['Tailwind CSS', 'Framer Motion'],                 color: 'bg-violet-50 border-violet-200 text-violet-700' },
  { group: 'Ops',  items: ['REST APIs', 'Dark/Light Mode'],                  color: 'bg-amber-50 border-amber-200 text-amber-700' },
];

// ─── Demo texts ───
const AI_TEXT = 'The implementation of machine learning algorithms necessitates the utilization of comprehensive datasets to facilitate the optimization of model parameters.';
const HUMAN_TEXT = "To build effective ML models, you need good data — it's what actually drives better performance and more accurate predictions.";

interface Props {
  slide: 'left' | 'right';
}

export default function HumanizerProjectDisplay({ slide }: Props) {
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [isTransforming, setIsTransforming] = useState(false);
  const [showHuman, setShowHuman] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeMode, setActiveMode] = useState<'Academic' | 'Business' | 'Professional'>('Academic');

  const handleTransform = () => {
    if (isTransforming || showHuman) return;
    setIsTransforming(true);
    setTimeout(() => { setIsTransforming(false); setShowHuman(true); }, 1400);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(HUMAN_TEXT).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleReset = () => { setShowHuman(false); setIsTransforming(false); };

  // ─── Lightbox portal (shared by both slides) ───
  const lightbox = ReactDOM.createPortal(
    <AnimatePresence>
      {enlargedImage && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(5,5,8,0.92)', backdropFilter: 'blur(8px)', padding: '16px', cursor: 'zoom-out' }}
          onClick={() => setEnlargedImage(null)}
        >
          <button
            style={{ position: 'absolute', top: 24, right: 24, background: 'rgba(20,20,24,0.8)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '50%', padding: 8, cursor: 'pointer', color: 'white', display: 'flex' }}
            onClick={() => setEnlargedImage(null)}
          ><X style={{ width: 22, height: 22 }} /></button>
          <motion.img
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            src={enlargedImage} alt="Enlarged view"
            style={{ maxWidth: '92vw', maxHeight: '88vh', objectFit: 'contain', borderRadius: 10, boxShadow: '0 40px 100px rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.06)', cursor: 'default' }}
            onClick={e => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );

  // ──────────────────── LEFT SLIDE ────────────────────
  if (slide === 'left') {
    return (
      <div className="flex flex-col h-full justify-between" id="project-humanizer-left">
        {/* Chapter stamp */}
        <div className="absolute top-6 right-6 sm:right-8 flex flex-col items-center opacity-20 select-none pointer-events-none">
          <span className="font-display font-black text-3xl text-stone-800 leading-none">V</span>
          <span className="text-[7px] font-mono uppercase tracking-widest text-stone-600">Project</span>
        </div>

        {/* Purple accent rule */}
        <div className="absolute top-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r from-purple-600/60 via-violet-400/40 to-transparent pointer-events-none" />

        <div>
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-1 mb-2 pr-10">
            <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border bg-purple-50 text-purple-800 border-purple-200 uppercase tracking-wider">
              AI &amp; Data
            </span>
            <div className="flex items-center gap-3">
              {humanizer.githubUrl && (
                <a href={humanizer.githubUrl} target="_blank" rel="noreferrer"
                   className="text-stone-400 hover:text-stone-800 transition-colors" title="GitHub">
                  <Github className="w-4 h-4" />
                </a>
              )}
              <a href={humanizer.liveUrl} target="_blank" rel="noreferrer"
                 className="text-stone-400 hover:text-purple-700 transition-colors flex items-center gap-1 text-[11px] font-medium font-sans">
                <span>Live Site</span><ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight leading-snug mb-0.5">
            {humanizer.title}
          </h3>
          <p className="italic text-stone-500 font-serif text-sm mb-2">{humanizer.subtitle}</p>

          {/* Divider */}
          <div className="flex items-center gap-2 mb-3">
            <div className="h-[1px] w-6 bg-purple-600/50" />
            <div className="w-1 h-1 rounded-full bg-purple-500/50" />
            <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-500/30 to-transparent" />
          </div>

          <p className="text-stone-700 font-sans text-xs sm:text-sm leading-relaxed mb-3 font-light">
            {humanizer.description}
          </p>

          {/* Scrapbook photos */}
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-2.5">
              <Hash className="w-3 h-3 text-stone-400" />
              <h4 className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-bold">
                App Screenshots &amp; Preview
              </h4>
            </div>

            {/* Photo 1 + bullet notes (top row) */}
            <div className="flex gap-3 items-start mb-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                whileHover={{ scale: 1.05, zIndex: 20 }}
                className="relative flex-shrink-0 cursor-zoom-in z-10 photo-shimmer"
                onClick={() => setEnlargedImage(humanizer.images![0])}
              >
                <div className="relative bg-white rounded-sm"
                     style={{ padding: '5px 5px 20px 5px', boxShadow: '3px 5px 14px rgba(0,0,0,0.22), 0 1px 3px rgba(0,0,0,0.12)' }}>
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-10 h-4 rounded-sm z-10 opacity-65"
                       style={{ background: 'rgba(220,190,130,0.65)', border: '1px solid rgba(180,145,80,0.35)' }} />
                  <img src={humanizer.images![0]} alt="AI Humanizer hero"
                       className="block rounded-sm object-cover"
                       style={{ width: 155, height: 108, objectFit: 'cover' }} loading="lazy" />
                  <div className="absolute bottom-1.5 inset-x-1 flex justify-center">
                    <div className="h-[1px] w-12 bg-stone-300/50" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.4, ease: 'easeOut' }}
                className="flex-1 pt-2"
              >
                <ul className="space-y-2">
                  {humanizer.details.slice(0, 2).map((d, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-purple-500 mt-0.5 flex-shrink-0 text-[10px] font-bold">◆</span>
                      <span className="text-[11px] text-stone-600 font-sans leading-snug">{d}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Photo 2 + last bullet (bottom row) */}
            <div className="flex gap-3 justify-end items-end pr-1 mt-2">
              <motion.div
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
                className="flex-1 pb-2 pl-1"
              >
                <ul className="space-y-2">
                  {humanizer.details.slice(2).map((d, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-purple-500 mt-0.5 flex-shrink-0 text-[10px] font-bold">◆</span>
                      <span className="text-[11px] text-stone-600 font-sans leading-snug">{d}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.45, ease: 'easeOut' }}
                whileHover={{ scale: 1.05, zIndex: 20 }}
                className="relative flex-shrink-0 cursor-zoom-in z-10 photo-shimmer"
                onClick={() => setEnlargedImage(humanizer.images![1])}
              >
                <div className="relative bg-white rounded-sm"
                     style={{ padding: '5px 5px 20px 5px', boxShadow: '3px 5px 14px rgba(0,0,0,0.22), 0 1px 3px rgba(0,0,0,0.12)' }}>
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-10 h-4 rounded-sm z-10 opacity-65"
                       style={{ background: 'rgba(220,190,130,0.65)', border: '1px solid rgba(180,145,80,0.35)' }} />
                  <img src={humanizer.images![1]} alt="AI Humanizer features"
                       className="block rounded-sm object-cover"
                       style={{ width: 148, height: 100, objectFit: 'cover' }} loading="lazy" />
                  <div className="absolute bottom-1.5 inset-x-1 flex justify-center">
                    <div className="h-[1px] w-12 bg-stone-300/50" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Feature pills + tech stack */}
        <div className="mt-auto pt-3 border-t border-stone-200/60">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i, duration: 0.3 }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${f.bg} ${f.border} cursor-default`}
                title={f.desc}
              >
                <f.icon className={`w-3 h-3 ${f.color}`} />
                <span className={`text-[10px] font-mono font-semibold ${f.color}`}>{f.label}</span>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            {humanizer.techStack.map(tech => (
              <span key={tech}
                    className="text-[9px] font-mono bg-stone-100 hover:bg-purple-50 border border-stone-200/80 hover:border-purple-200 px-2 py-0.5 rounded-full text-stone-600 hover:text-purple-800 transition-all cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {lightbox}
      </div>
    );
  }

  // ──────────────────── RIGHT SLIDE ────────────────────
  return (
    <div className="flex flex-col h-full justify-between" id="project-humanizer-right">
      {/* Chapter stamp */}
      <div className="absolute top-6 left-6 flex flex-col items-center opacity-20 select-none pointer-events-none">
        <span className="font-display font-black text-3xl text-stone-800 leading-none">V</span>
        <span className="text-[7px] font-mono uppercase tracking-widest text-stone-600">Cont.</span>
      </div>

      <div>
        {/* Sub-header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[9px] uppercase font-mono tracking-widest text-purple-800 font-bold bg-purple-800/8 px-2 py-0.5 rounded border border-purple-700/15">
            Live Demo &amp; Gallery
          </span>
        </div>
        <h3 className="font-display text-xl font-bold text-stone-900 tracking-tight mb-0.5">
          AI Text Humanizer — In Action
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <div className="h-[1px] w-6 bg-purple-600/50" />
          <div className="w-1 h-1 rounded-full bg-purple-500/50" />
          <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-500/30 to-transparent" />
        </div>

        {/* Interactive Demo Panel */}
        <div className="mb-3 p-3 rounded-xl border border-purple-200/60 shadow-inner"
             style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.06), rgba(139,92,246,0.03))' }}
             id="humanizer-live-demo">
          {/* Mode selector */}
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            <span className="text-[10px] font-mono text-stone-600 font-semibold">Choose Mode:</span>
            <div className="flex gap-1 ml-auto">
              {(['Academic', 'Business', 'Professional'] as const).map(m => (
                <button key={m}
                        onClick={() => { setActiveMode(m); handleReset(); }}
                        className={`text-[9px] px-2 py-0.5 rounded-full border font-mono transition-all ${
                          activeMode === m
                            ? 'bg-purple-700 border-purple-700 text-white'
                            : 'bg-white border-purple-200 text-purple-600 hover:border-purple-400'
                        }`}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="mb-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] font-mono text-stone-400 uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" /> AI-Generated
              </span>
              <span className="text-[8px] font-mono text-stone-400">{AI_TEXT.split(' ').length} words</span>
            </div>
            <div className="bg-white/90 border border-stone-200 rounded-lg p-2 text-[10px] text-stone-600 font-sans leading-relaxed min-h-[44px]">
              {AI_TEXT}
            </div>
          </div>

          {/* Transform button */}
          <div className="flex gap-2 mb-2">
            <button
              onClick={handleTransform}
              disabled={isTransforming || showHuman}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[10px] font-mono font-semibold transition-all shadow-sm disabled:opacity-50 text-white"
              style={{ background: isTransforming || showHuman ? '#7c3aed80' : 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}
            >
              {isTransforming
                ? <><RefreshCw className="w-3 h-3 animate-spin" /> Humanizing...</>
                : showHuman
                  ? <><Check className="w-3 h-3" /> Humanized!</>
                  : <><Sparkles className="w-3 h-3" /> Humanize Text</>}
            </button>
            {showHuman && (
              <button onClick={handleReset}
                      className="px-3 py-1.5 rounded-lg border border-stone-200 text-[10px] font-mono text-stone-500 hover:border-purple-300 hover:text-purple-600 transition-all bg-white">
                Reset
              </button>
            )}
          </div>

          {/* Output */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] font-mono text-stone-400 uppercase tracking-wider flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full inline-block ${showHuman ? 'bg-emerald-400' : 'bg-stone-300'}`} />
                Humanized Output
                {showHuman && <span className="ml-1 text-emerald-600 text-[8px] font-bold">✓ Ready</span>}
              </span>
              {showHuman && (
                <button onClick={handleCopy}
                        className="flex items-center gap-1 text-[8px] font-mono text-stone-400 hover:text-purple-600 transition-colors">
                  {copied ? <><Check className="w-2.5 h-2.5 text-emerald-500" /> Copied!</> : <><Copy className="w-2.5 h-2.5" /> Copy</>}
                </button>
              )}
            </div>
            <div className={`border rounded-lg p-2 text-[10px] font-sans leading-relaxed min-h-[44px] transition-all duration-300 ${
              showHuman
                ? 'bg-emerald-50/60 border-emerald-200 text-stone-700'
                : 'bg-stone-50/60 border-stone-100 text-stone-400'
            }`}>
              <AnimatePresence mode="wait">
                {showHuman ? (
                  <motion.span key="human" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    {HUMAN_TEXT}
                  </motion.span>
                ) : isTransforming ? (
                  <motion.span key="loading" className="flex items-center gap-1.5 italic">
                    <RefreshCw className="w-2.5 h-2.5 animate-spin text-purple-500" />
                    <span className="text-purple-400">Processing with {activeMode} mode...</span>
                  </motion.span>
                ) : (
                  <span key="empty" className="italic">Humanized text will appear here...</span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Screenshots row: images 3 & 4 */}
        <div className="flex gap-2.5 mb-3">
          {[humanizer.images![2], humanizer.images![3]].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * i, duration: 0.4 }}
              whileHover={{ scale: 1.04, zIndex: 20 }}
              className="flex-1 cursor-zoom-in photo-shimmer"
              onClick={() => setEnlargedImage(img)}
            >
              <div className="relative bg-white rounded-sm"
                   style={{ padding: '4px 4px 18px 4px', boxShadow: '3px 5px 14px rgba(0,0,0,0.2)' }}>
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-8 h-4 rounded-sm z-10 opacity-65"
                     style={{ background: 'rgba(220,190,130,0.65)', border: '1px solid rgba(180,145,80,0.35)' }} />
                <img src={img} alt={`Humanizer screenshot ${i + 3}`}
                     className="block rounded-sm w-full object-cover"
                     style={{ height: 80, objectFit: 'cover' }} loading="lazy" />
                <div className="absolute bottom-1.5 inset-x-1 flex justify-center">
                  <div className="h-[1px] w-8 bg-stone-300/50" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex gap-2 mb-3">
          {stats.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.2, duration: 0.35 }}
              className="flex-1 p-2 rounded-xl border border-stone-200/70 bg-white/60 text-center"
            >
              <div className={`font-display font-bold text-base leading-none ${s.accent}`}>{s.value}</div>
              <div className="text-[9px] font-mono text-stone-400 mt-0.5 leading-tight">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tech Stack Groups */}
      <div className="mt-auto pt-3 border-t border-stone-200/60">
        <div className="flex items-center gap-2 mb-2">
          <Hash className="w-3 h-3 text-stone-400" />
          <h4 className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-bold">Tech Stack</h4>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {techGroups.map((g, i) => (
            <div key={i} className="rounded-lg border border-stone-200/60 bg-white/40 p-1.5">
              <div className="text-[8px] font-mono text-stone-400 uppercase tracking-widest mb-1">{g.group}</div>
              <div className="flex flex-wrap gap-1">
                {g.items.map(item => (
                  <span key={item} className={`text-[8px] font-mono px-1.5 py-0.5 rounded-full border ${g.color}`}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox}
    </div>
  );
}
