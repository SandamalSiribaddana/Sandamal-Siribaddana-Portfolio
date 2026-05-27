import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import {
  ExternalLink,
  Github,
  Play,
  Terminal,
  Sparkles,
  RefreshCw,
  BookOpen,
  Clock,
  ListRestart,
  X
} from 'lucide-react';

interface ProjectDisplayProps {
  project: Project;
}

export default function ProjectDisplay({ project }: ProjectDisplayProps) {
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  // Meridian Books Interactive State
  const [activeLog, setActiveLog] = useState<number>(0);
  const logStats = [
    { chapter: "Ch 1: Sensory Interfaces", readTime: "12m", speed: "290 wpm", notesCount: 7 },
    { chapter: "Ch 2: Typescript Paradigms", readTime: "24m", speed: "310 wpm", notesCount: 15 },
    { chapter: "Ch 3: Fluid Rendering", readTime: "18m", speed: "280 wpm", notesCount: 11 },
  ];

  // NeuroStream Prompt AI Interactive State
  const [promptInput, setPromptInput] = useState<string>('');
  const [aiOutput, setAiOutput] = useState<string>('Type an inquiry on the parchment above to summon the scroll scribe...');
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  // Vortex CLI Interactive State
  const [cliLogs, setCliLogs] = useState<string[]>([
    '$ vortex --version',
    'vortex v1.2.0 - Core active.',
    '$ ready for build...'
  ]);
  const [isPacking, setIsPacking] = useState<boolean>(false);

  // Stream simulation for AI
  const handleAIInquiry = () => {
    if (!promptInput.trim() || isStreaming) return;
    setIsStreaming(true);
    setAiOutput('');

    const responseText = `Regarding "${promptInput}": Dilitha possesses refined engineering prowess for this objective. By coupling rigorous static type checking with optimized paint loops, he achieves highly reliable interfaces. Recommendations: Employ his React + TypeScript stack for this project.`;

    let currentIdx = 0;
    const interval = setInterval(() => {
      setAiOutput((prev) => prev + responseText[currentIdx]);
      currentIdx++;
      if (currentIdx >= responseText.length) {
        clearInterval(interval);
        setIsStreaming(false);
      }
    }, 15);
  };

  // Run bundle command for Vortex
  const handleRunCLI = (command: 'bundle' | 'analyze' | 'clean') => {
    if (isPacking) return;
    setIsPacking(true);

    if (command === 'bundle') {
      setCliLogs((prev) => [...prev, '$ vortex bundle --minify']);
      setTimeout(() => {
        setCliLogs((prev) => [
          ...prev,
          '📦 Bundling workspace...',
          '✔ [index.tsx] compiles with esbuild in 14ms',
          '✔ [utils.ts] tree-shaken, 8 unused exports pruned',
          '⚡ Output bundle: dist/bundle.min.js [11.4 KB]',
          '✨ Finished bundling in 32ms.'
        ]);
        setIsPacking(false);
      }, 700);
    } else if (command === 'analyze') {
      setCliLogs((prev) => [...prev, '$ vortex analyze']);
      setTimeout(() => {
        setCliLogs((prev) => [
          ...prev,
          '🔍 Inspecting size metrics...',
          '● react: 6.4 KB (gzipped)',
          '● motion: 3.2 KB (gzipped)',
          '● self-managed: 1.8 KB (gzipped)',
          '🔥 Density optimal. Total network footprint: 11.4 KB.'
        ]);
        setIsPacking(false);
      }, 600);
    } else {
      setCliLogs((prev) => [...prev, '$ vortex clean']);
      setTimeout(() => {
        setCliLogs([
          '$ vortex clean',
          '🗑 Cleaned dist/ output directories.',
          '$ ready for build...'
        ]);
        setIsPacking(false);
      }, 400);
    }
  };

  return (
    <div className="flex flex-col h-full justify-between" id={`project-${project.id}`}>
      {/* Narrative Section */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-1 mb-2">
          <div>
            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-amber-800/10 text-amber-800 uppercase tracking-wider">
              {project.category}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer referrerPolicy"
                className="text-stone-500 hover:text-amber-800 transition-colors"
                title="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer referrerPolicy"
              className="text-stone-500 hover:text-amber-800 transition-colors flex items-center gap-1 text-[11px] font-medium font-sans"
              title="Visit Live Site"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <h3 className="font-serif text-3xl font-semibold text-stone-900 tracking-tight leading-none mb-1">
          {project.title}
        </h3>
        <p className="italic text-stone-500 font-serif text-sm mb-3">
          {project.subtitle}
        </p>

        <p className="text-stone-700 font-sans text-sm leading-relaxed mb-4 font-light">
          {project.description}
        </p>

        {/* ── Scrapbook Layout: Photo + Points + Photo ── */}
        {project.images && project.images.length > 0 ? (
          <div className="mb-3" id={`photos-${project.id}`}>
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-stone-400 font-bold mb-3">
              Project Details & Preview
            </h4>

            {/* Scrapbook grid: photo left | notes right, then photo bottom-right */}
            <div className="relative" style={{ minHeight: '200px' }}>

              {/* TOP ROW: Photo 1 (left) + bullet notes (right) */}
              <div className="flex gap-3 items-start mb-2">

                {/* Photo 1 — top left, straight */}
                {project.images[0] && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, rotate: 0 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    whileHover={{ scale: 1.04, rotate: 0, zIndex: 20 }}
                    className="relative flex-shrink-0 cursor-zoom-in z-10 group"
                    onClick={() => setEnlargedImage(project.images![0])}
                  >
                    <div
                      className="relative bg-white rounded-sm"
                      style={{
                        padding: '5px 5px 18px 5px',
                        boxShadow: '3px 4px 10px rgba(0,0,0,0.20), 0 1px 2px rgba(0,0,0,0.10)'
                      }}
                    >
                      {/* Tape */}
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-10 h-4 rounded-sm z-10 opacity-65"
                        style={{ background: 'rgba(217,183,130,0.6)', border: '1px solid rgba(180,140,80,0.3)' }}
                      />
                      <img
                        src={project.images[0]}
                        alt={`${project.title} screenshot 1`}
                        className="block rounded-sm object-cover"
                        style={{ width: '155px', height: '105px', objectFit: 'cover' }}
                        loading="lazy"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Bullet notes — top half */}
                <motion.div
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.4, ease: 'easeOut' }}
                  className="flex-1 pt-2"
                >
                  <ul className="space-y-2">
                    {(project.images[1] ? project.details.slice(0, Math.ceil(project.details.length / 2)) : project.details).map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-500 mt-0.5 flex-shrink-0 text-[10px]">✦</span>
                        <span className="text-[11px] text-stone-600 font-sans leading-snug">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* BOTTOM: Bullet notes (left) + Photo 2 pinned to the right */}
              {project.images[1] && (
                <div className="flex gap-3 justify-end items-end pr-1 mt-2">
                  
                  {/* Bullet notes — bottom half */}
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
                    className="flex-1 pb-2 pl-1"
                  >
                    <ul className="space-y-2">
                      {project.details.slice(Math.ceil(project.details.length / 2)).map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-500 mt-0.5 flex-shrink-0 text-[10px]">✦</span>
                          <span className="text-[11px] text-stone-600 font-sans leading-snug">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10, rotate: 0 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ delay: 0.25, duration: 0.45, ease: 'easeOut' }}
                    whileHover={{ scale: 1.04, rotate: 0, zIndex: 20 }}
                    className="relative flex-shrink-0 cursor-zoom-in z-10 group"
                    onClick={() => setEnlargedImage(project.images![1])}
                  >
                    <div
                      className="relative bg-white rounded-sm"
                      style={{
                        padding: '5px 5px 18px 5px',
                        boxShadow: '3px 4px 10px rgba(0,0,0,0.20), 0 1px 2px rgba(0,0,0,0.10)'
                      }}
                    >
                      {/* Tape */}
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-10 h-4 rounded-sm z-10 opacity-65"
                        style={{ background: 'rgba(217,183,130,0.6)', border: '1px solid rgba(180,140,80,0.3)' }}
                      />
                      <img
                        src={project.images[1]}
                        alt={`${project.title} screenshot 2`}
                        className="block rounded-sm object-cover"
                        style={{ width: '155px', height: '100px', objectFit: 'cover' }}
                        loading="lazy"
                      />
                    </div>
                  </motion.div>
                </div>
              )}

            </div>
          </div>
        ) : (
          /* Fallback: text-only bullet list if no images */
          <div className="space-y-2 mb-4">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-stone-400 font-bold">Project Details & Architecture</h4>
            <ul className="space-y-1.5">
              {project.details.map((detail, idx) => (
                <li key={idx} className="text-xs text-stone-600 font-sans flex items-start gap-1.5 leading-relaxed">
                  <span className="text-amber-600 mt-1">✦</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Dynamic Tactile Sandboxes based on Project Type */}
      <div className="mt-auto pt-3 border-t border-stone-200/60">

        {/* Type B: Meridian Books State Log tracker */}
        {project.id === 'meridian' && (
          <div className="p-3 bg-amber-500/5 rounded-lg border border-amber-600/10" id="sandbox-meridian">
            <span className="text-[11px] font-mono text-stone-500 flex items-center gap-1.5 mb-2">
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              Interactive Reading Speed Sandbox
            </span>

            {/* Interactive log toggles */}
            <div className="grid grid-cols-3 gap-1 mb-2">
              {logStats.map((log, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveLog(idx)}
                  className={`text-[9px] p-1.5 text-left rounded-md border font-sans font-medium transition-all ${activeLog === idx
                    ? 'bg-amber-800 text-amber-50 border-amber-800 shadow-sm'
                    : 'bg-white/80 hover:bg-white text-stone-600 border-stone-200'
                    }`}
                >
                  <p className="truncate font-serif italic">{log.chapter.split(':')[0]}</p>
                </button>
              ))}
            </div>

            {/* Simulated Live dashboard telemetry */}
            <div className="bg-white/95 rounded-md p-2.5 border border-stone-200 grid grid-cols-3 gap-2 text-center shadow-xs">
              <div>
                <span className="block text-[8px] font-mono text-stone-400 uppercase">Speed Rate</span>
                <span className="text-sm font-semibold text-stone-800 font-mono italic">{logStats[activeLog].speed}</span>
              </div>
              <div>
                <span className="block text-[8px] font-mono text-stone-400 uppercase">Est. Read</span>
                <span className="text-sm font-semibold text-stone-800 font-mono flex items-center justify-center gap-0.5">
                  <Clock className="w-3 h-3 text-amber-600" />
                  {logStats[activeLog].readTime}
                </span>
              </div>
              <div>
                <span className="block text-[8px] font-mono text-stone-400 uppercase">Annotations</span>
                <span className="text-sm font-semibold text-stone-800 font-mono text-amber-700">{logStats[activeLog].notesCount}</span>
              </div>
            </div>
          </div>
        )}

        {/* Type C: NeuroStream AI Prompter */}
        {project.id === 'neurostream' && (
          <div className="p-3 bg-amber-500/5 rounded-lg border border-amber-600/10 flex flex-col gap-2" id="sandbox-neurostream">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-stone-500 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Prompt Scribe Console
              </span>
              {isStreaming && (
                <span className="text-[8px] font-mono bg-amber-600 text-white rounded px-1.5 py-0.5 animate-pulse flex items-center gap-1">
                  <RefreshCw className="w-2.5 h-2.5 animate-spin" /> Stream Node
                </span>
              )}
            </div>

            {/* Input Parchment bar */}
            <div className="flex gap-1">
              <input
                type="text"
                placeholder="Ask e.g. 'Can Dilitha build secure APIs?'"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAIInquiry()}
                className="flex-1 bg-white/90 border border-stone-200 text-xs px-2.5 py-1.5 rounded-md font-sans focus:outline-none focus:border-amber-600 focus:bg-white text-stone-800 placeholder-stone-400"
              />
              <button
                onClick={handleAIInquiry}
                disabled={isStreaming}
                className="bg-amber-800 hover:bg-amber-900 disabled:bg-stone-300 text-amber-50 px-3 py-1.5 rounded-md text-xs font-serif font-medium transition-all flex items-center gap-1 shadow-sm"
              >
                <Play className="w-3 h-3 fill-current" />
              </button>
            </div>

            {/* Dynamic Scribe parchment answer panel */}
            <div className="bg-orange-50/40 border border-amber-700/10 min-h-16 max-h-20 overflow-y-auto no-scrollbar rounded p-2 text-[11px] font-serif italic text-stone-800 leading-relaxed shadow-inner">
              {aiOutput}
            </div>
          </div>
        )}

        {/* Type D: Vortex CLI Compiler Terminal */}
        {project.id === 'vortex' && (
          <div className="p-3 bg-stone-900 rounded-lg border border-stone-800 flex flex-col gap-2 relative" id="sandbox-vortex">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-stone-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-lime-500" />
                Vortex Active Terminal Sandbox
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => handleRunCLI('bundle')}
                  disabled={isPacking}
                  className="text-[9px] bg-stone-800 hover:bg-stone-700 text-amber-400 px-1.5 py-0.5 rounded border border-stone-700 font-mono disabled:opacity-40"
                >
                  minify
                </button>
                <button
                  onClick={() => handleRunCLI('analyze')}
                  disabled={isPacking}
                  className="text-[9px] bg-stone-800 hover:bg-stone-700 text-lime-400 px-1.5 py-0.5 rounded border border-stone-700 font-mono disabled:opacity-40"
                >
                  analyze
                </button>
                <button
                  onClick={() => handleRunCLI('clean')}
                  disabled={isPacking}
                  className="text-[9px] bg-stone-800 hover:bg-stone-700 text-stone-400 px-1.5 py-0.5 rounded border border-stone-700 font-mono disabled:opacity-40"
                >
                  <ListRestart className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>

            {/* Shell panel */}
            <div className="bg-stone-950 font-mono text-[10px] text-lime-400 p-2 rounded border border-stone-900 h-24 overflow-y-auto no-scrollbar space-y-1">
              {cliLogs.map((log, i) => (
                <div
                  key={i}
                  className={
                    log.startsWith('$') ? 'text-amber-400' :
                      log.startsWith('✔') ? 'text-emerald-400' :
                        log.startsWith('🔎') || log.startsWith('📦') ? 'text-sky-300' : 'text-stone-300'
                  }
                >
                  {log}
                </div>
              ))}
              {isPacking && (
                <span className="inline-block w-2 h-3 bg-lime-400 animate-pulse ml-0.5" />
              )}
            </div>
          </div>
        )}

        {/* Dynamic technology tag stack for the project */}
        <div className="flex flex-wrap gap-1 mt-2.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[9px] font-mono bg-stone-100 border border-stone-200/60 shadow-xs px-2 py-0.5 rounded text-stone-600"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      {ReactDOM.createPortal(
        <AnimatePresence>
          {enlargedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(6px)', padding: '16px', cursor: 'zoom-out' }}
              onClick={() => setEnlargedImage(null)}
            >
              <button
                style={{ position: 'absolute', top: '24px', right: '24px', background: 'rgba(30,30,30,0.7)', border: 'none', borderRadius: '50%', padding: '8px', cursor: 'pointer', color: 'white', display: 'flex' }}
                onClick={() => setEnlargedImage(null)}
              >
                <X style={{ width: '24px', height: '24px' }} />
              </button>
              <motion.img
                initial={{ scale: 0.92, y: 16, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.92, y: 16, opacity: 0 }}
                transition={{ type: 'spring', damping: 26, stiffness: 320 }}
                src={enlargedImage}
                alt="Enlarged view"
                style={{ maxWidth: '90vw', maxHeight: '88vh', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 30px 80px rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'default' }}
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
