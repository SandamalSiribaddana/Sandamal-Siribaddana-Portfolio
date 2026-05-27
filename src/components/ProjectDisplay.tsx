import React, { useState } from 'react';
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
  ListRestart,
  X,
  Hash
} from 'lucide-react';

interface ProjectDisplayProps {
  project: Project;
}

// Map category → glow color class
const categoryBadgeStyle: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  'Machine Learning': { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200', glow: 'badge-ml' },
  'React-Native': { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200', glow: 'badge-full' },
  'AI & Data': { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200', glow: 'badge-ai' },
  'Tools': { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200', glow: 'badge-tools' },
};

const projectNumbers: Record<string, string> = {
  aether: 'I',
  meridian: 'II',
  neurostream: 'III',
  vortex: 'IV',
};

export default function ProjectDisplay({ project }: ProjectDisplayProps) {
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  // NeuroStream AI state
  const [promptInput, setPromptInput] = useState<string>('');
  const [aiOutput, setAiOutput] = useState<string>('Type an inquiry on the parchment above to summon the scroll scribe...');
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  // Vortex CLI state
  const [cliLogs, setCliLogs] = useState<string[]>([
    '$ vortex --version',
    'vortex v1.2.0 - Core active.',
    '$ ready for build...'
  ]);
  const [isPacking, setIsPacking] = useState<boolean>(false);

  const handleAIInquiry = () => {
    if (!promptInput.trim() || isStreaming) return;
    setIsStreaming(true);
    setAiOutput('');
    const responseText = `Regarding "${promptInput}": Dilitha possesses refined engineering prowess for this objective. By coupling rigorous static type checking with optimized paint loops, he achieves highly reliable interfaces. Recommendations: Employ his React + TypeScript stack for this project.`;
    let idx = 0;
    const interval = setInterval(() => {
      setAiOutput(prev => prev + responseText[idx]);
      idx++;
      if (idx >= responseText.length) { clearInterval(interval); setIsStreaming(false); }
    }, 15);
  };

  const handleRunCLI = (command: 'bundle' | 'analyze' | 'clean') => {
    if (isPacking) return;
    setIsPacking(true);
    if (command === 'bundle') {
      setCliLogs(p => [...p, '$ vortex bundle --minify']);
      setTimeout(() => {
        setCliLogs(p => [...p, '📦 Bundling workspace...', '✔ [index.tsx] compiles in 14ms', '✔ [utils.ts] 8 exports pruned', '⚡ dist/bundle.min.js [11.4 KB]', '✨ Done in 32ms.']);
        setIsPacking(false);
      }, 700);
    } else if (command === 'analyze') {
      setCliLogs(p => [...p, '$ vortex analyze']);
      setTimeout(() => {
        setCliLogs(p => [...p, '🔍 Size metrics...', '● react: 6.4 KB', '● motion: 3.2 KB', '● self: 1.8 KB', '🔥 Total: 11.4 KB']);
        setIsPacking(false);
      }, 600);
    } else {
      setCliLogs(p => [...p, '$ vortex clean']);
      setTimeout(() => {
        setCliLogs(['$ vortex clean', '🗑 Cleaned dist/', '$ ready for build...']);
        setIsPacking(false);
      }, 400);
    }
  };

  const badge = categoryBadgeStyle[project.category] ?? categoryBadgeStyle['Tools'];
  const chapterNum = projectNumbers[project.id] ?? '';

  return (
    <div className="flex flex-col h-full justify-between" id={`project-${project.id}`}>

      {/* ── Chapter stamp (top-right corner) ── */}
      <div className="absolute top-6 right-6 sm:right-8 flex flex-col items-center opacity-20 select-none pointer-events-none">
        <span className="font-display font-black text-3xl text-stone-800 leading-none">{chapterNum}</span>
        <span className="text-[7px] font-mono uppercase tracking-widest text-stone-600">Project</span>
      </div>

      {/* ── Amber accent rule at top ── */}
      <div className="absolute top-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r from-amber-600/60 via-amber-400/40 to-transparent pointer-events-none" />

      {/* ── Narrative header ── */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-1 mb-2 pr-10">
          {/* Glowing category badge */}
          <span className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${badge.bg} ${badge.text} ${badge.border} ${badge.glow} uppercase tracking-wider`}>
            {project.category}
          </span>
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-stone-400 hover:text-stone-800 transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="text-stone-400 hover:text-amber-800 transition-colors flex items-center gap-1 text-[11px] font-medium font-sans"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight leading-snug mb-0.5">
          {project.title}
        </h3>
        <p className="italic text-stone-500 font-serif text-sm mb-2">
          {project.subtitle}
        </p>

        {/* Gold divider */}
        <div className="flex items-center gap-2 mb-3">
          <div className="h-[1px] w-6 bg-amber-600/50" />
          <div className="w-1 h-1 rounded-full bg-amber-500/50" />
          <div className="h-[1px] flex-1 bg-gradient-to-r from-amber-500/30 to-transparent" />
        </div>

        <p className="text-stone-700 font-sans text-xs sm:text-sm leading-relaxed mb-3 font-light">
          {project.description}
        </p>

        {/* ── Scrapbook photo layout ── */}
        {project.images && project.images.length > 0 ? (
          <div className="mb-3" id={`photos-${project.id}`}>
            <div className="flex items-center gap-2 mb-2.5">
              <Hash className="w-3 h-3 text-stone-400" />
              <h4 className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-bold">
                Project Details & Preview
              </h4>
            </div>

            <div className="relative" style={{ minHeight: '200px' }}>

              {/* TOP ROW: Photo left + bullets right */}
              <div className="flex gap-3 items-start mb-2">
                {project.images[0] && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    whileHover={{ scale: 1.05, zIndex: 20 }}
                    className="relative flex-shrink-0 cursor-zoom-in z-10 photo-shimmer"
                    onClick={() => setEnlargedImage(project.images![0])}
                  >
                    <div
                      className="relative bg-white rounded-sm"
                      style={{ padding: '5px 5px 20px 5px', boxShadow: '3px 5px 14px rgba(0,0,0,0.22), 0 1px 3px rgba(0,0,0,0.12)' }}
                    >
                      {/* Tape strip */}
                      <div
                        className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-10 h-4 rounded-sm z-10 opacity-65"
                        style={{ background: 'rgba(220,190,130,0.65)', border: '1px solid rgba(180,145,80,0.35)' }}
                      />
                      <img
                        src={project.images[0]}
                        alt={`${project.title} screenshot 1`}
                        className="block rounded-sm object-cover"
                        style={{ width: '155px', height: '108px', objectFit: 'cover' }}
                        loading="lazy"
                      />
                      {/* Small caption line */}
                      <div className="absolute bottom-1.5 inset-x-1 flex justify-center">
                        <div className="h-[1px] w-12 bg-stone-300/50" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Bullet notes top half */}
                <motion.div
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.4, ease: 'easeOut' }}
                  className="flex-1 pt-2"
                >
                  <ul className="space-y-2">
                    {(project.images[1]
                      ? project.details.slice(0, Math.ceil(project.details.length / 2))
                      : project.details
                    ).map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-500 mt-0.5 flex-shrink-0 text-[10px] font-bold">◆</span>
                        <span className="text-[11px] text-stone-600 font-sans leading-snug">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* BOTTOM ROW: bullets left + photo right */}
              {project.images[1] && (
                <div className="flex gap-3 justify-end items-end pr-1 mt-2">
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
                    className="flex-1 pb-2 pl-1"
                  >
                    <ul className="space-y-2">
                      {project.details.slice(Math.ceil(project.details.length / 2)).map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-500 mt-0.5 flex-shrink-0 text-[10px] font-bold">◆</span>
                          <span className="text-[11px] text-stone-600 font-sans leading-snug">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28, duration: 0.45, ease: 'easeOut' }}
                    whileHover={{ scale: 1.05, zIndex: 20 }}
                    className="relative flex-shrink-0 cursor-zoom-in z-10 photo-shimmer"
                    onClick={() => setEnlargedImage(project.images![1])}
                  >
                    <div
                      className="relative bg-white rounded-sm"
                      style={{ padding: '5px 5px 20px 5px', boxShadow: '3px 5px 14px rgba(0,0,0,0.22), 0 1px 3px rgba(0,0,0,0.12)' }}
                    >
                      <div
                        className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-10 h-4 rounded-sm z-10 opacity-65"
                        style={{ background: 'rgba(220,190,130,0.65)', border: '1px solid rgba(180,145,80,0.35)' }}
                      />
                      <img
                        src={project.images[1]}
                        alt={`${project.title} screenshot 2`}
                        className="block rounded-sm object-cover"
                        style={{ width: '148px', height: '100px', objectFit: 'cover' }}
                        loading="lazy"
                      />
                      <div className="absolute bottom-1.5 inset-x-1 flex justify-center">
                        <div className="h-[1px] w-12 bg-stone-300/50" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-2 mb-4">
            <h4 className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-bold flex items-center gap-1.5">
              <Hash className="w-3 h-3" /> Project Details & Architecture
            </h4>
            <ul className="space-y-1.5">
              {project.details.map((detail, idx) => (
                <li key={idx} className="text-xs text-stone-600 font-sans flex items-start gap-1.5 leading-relaxed">
                  <span className="text-amber-600 mt-0.5 font-bold">◆</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ── Sandboxes + Tech Stack ── */}
      <div className="mt-auto pt-3 border-t border-stone-200/60">

        {/* NeuroStream AI Prompter */}
        {project.id === 'neurostream' && (
          <div className="p-3 rounded-xl border border-purple-100 mb-2" style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.04), rgba(139,92,246,0.02))' }} id="sandbox-neurostream">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-stone-500 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                Prompt Scribe Console
              </span>
              {isStreaming && (
                <span className="text-[8px] font-mono bg-purple-600 text-white rounded px-1.5 py-0.5 animate-pulse flex items-center gap-1">
                  <RefreshCw className="w-2.5 h-2.5 animate-spin" /> Stream
                </span>
              )}
            </div>
            <div className="flex gap-1">
              <input
                type="text"
                placeholder="Ask e.g. 'Can Dilitha build secure APIs?'"
                value={promptInput}
                onChange={e => setPromptInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAIInquiry()}
                className="flex-1 bg-white/90 border border-stone-200 text-xs px-2.5 py-1.5 rounded-lg font-sans focus:outline-none focus:border-purple-400 text-stone-800 placeholder-stone-400"
              />
              <button
                onClick={handleAIInquiry}
                disabled={isStreaming}
                className="bg-purple-700 hover:bg-purple-800 disabled:bg-stone-300 text-white px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 shadow-sm transition-all"
              >
                <Play className="w-3 h-3 fill-current" />
              </button>
            </div>
            <div className="bg-purple-50/60 border border-purple-100 min-h-14 max-h-20 overflow-y-auto no-scrollbar rounded-lg p-2 mt-2 text-[11px] font-serif italic text-stone-700 leading-relaxed shadow-inner">
              {aiOutput}
            </div>
          </div>
        )}

        {/* Vortex CLI Terminal */}
        {project.id === 'vortex' && (
          <div className="p-3 bg-stone-900 rounded-xl border border-stone-800 flex flex-col gap-2 mb-2" id="sandbox-vortex">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-stone-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-lime-400" />
                Vortex Terminal
              </span>
              <div className="flex gap-1">
                {[
                  { cmd: 'bundle' as const, label: 'minify', color: 'text-amber-400' },
                  { cmd: 'analyze' as const, label: 'analyze', color: 'text-lime-400' },
                ].map(({ cmd, label, color }) => (
                  <button key={cmd} onClick={() => handleRunCLI(cmd)} disabled={isPacking}
                    className={`text-[9px] bg-stone-800 hover:bg-stone-700 ${color} px-1.5 py-0.5 rounded border border-stone-700 font-mono disabled:opacity-40 transition-colors`}>
                    {label}
                  </button>
                ))}
                <button onClick={() => handleRunCLI('clean')} disabled={isPacking}
                  className="text-[9px] bg-stone-800 hover:bg-stone-700 text-stone-400 px-1.5 py-0.5 rounded border border-stone-700 font-mono disabled:opacity-40">
                  <ListRestart className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
            <div className="bg-stone-950 font-mono text-[10px] text-lime-400 p-2 rounded-lg border border-stone-900 h-24 overflow-y-auto no-scrollbar space-y-0.5">
              {cliLogs.map((log, i) => (
                <div key={i} className={
                  log.startsWith('$') ? 'text-amber-400' :
                    log.startsWith('✔') ? 'text-emerald-400' :
                      log.startsWith('📦') || log.startsWith('🔍') ? 'text-sky-300' : 'text-stone-400'
                }>{log}</div>
              ))}
              {isPacking && <span className="inline-block w-2 h-3 bg-lime-400 animate-pulse ml-0.5" />}
            </div>
          </div>
        )}

        {/* Tech stack tags */}
        <div className="flex flex-wrap gap-1 mt-1.5">
          {project.techStack.map(tech => (
            <span
              key={tech}
              className="text-[9px] font-mono bg-stone-100 hover:bg-amber-50 border border-stone-200/80 hover:border-amber-200 shadow-xs px-2 py-0.5 rounded-full text-stone-600 hover:text-amber-800 transition-all cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {ReactDOM.createPortal(
        <AnimatePresence>
          {enlargedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(5,5,8,0.92)', backdropFilter: 'blur(8px)', padding: '16px', cursor: 'zoom-out' }}
              onClick={() => setEnlargedImage(null)}
            >
              <button
                style={{ position: 'absolute', top: '24px', right: '24px', background: 'rgba(20,20,24,0.8)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '50%', padding: '8px', cursor: 'pointer', color: 'white', display: 'flex' }}
                onClick={() => setEnlargedImage(null)}
              >
                <X style={{ width: '22px', height: '22px' }} />
              </button>
              <motion.img
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                src={enlargedImage}
                alt="Enlarged view"
                style={{ maxWidth: '92vw', maxHeight: '88vh', objectFit: 'contain', borderRadius: '10px', boxShadow: '0 40px 100px rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.06)', cursor: 'default' }}
                onClick={e => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
