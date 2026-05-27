import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { skillsData } from '../data/portfolioData';
import { BrainCircuit, Compass, Award, Quote } from 'lucide-react';

export default function SkillCompass() {
  const [activeCategoryIdx, setActiveCategoryIdx] = useState<number>(0);
  const selectedCategory = skillsData[activeCategoryIdx];

  return (
    <div className="flex flex-col h-full justify-between" id="skill-compass-widget">
      
      {/* Narrative Intro */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Compass className="w-5 h-5 text-amber-600 animate-spin-slow" />
          <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest font-bold">Knowledge & Proficiencies</span>
        </div>

        <h3 className="font-serif text-3xl font-semibold text-stone-900 tracking-tight leading-none mb-1">
          Skill Compass
        </h3>
        <p className="italic text-stone-500 font-serif text-sm mb-4">
          Navigating across modular abstractions & reactive state systems
        </p>

        {/* Dynamic Category Selector Stamps */}
        <div className="grid grid-cols-3 gap-1 mb-5">
          {skillsData.map((category, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategoryIdx(idx)}
              className={`relative p-2 text-center rounded-lg border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                activeCategoryIdx === idx
                  ? 'bg-amber-800 border-amber-800 text-amber-50 shadow-md transform -translate-y-0.5'
                  : 'bg-white/90 border-stone-200/80 text-stone-700 hover:bg-stone-50'
              }`}
            >
              {/* Soft seal pattern */}
              {activeCategoryIdx === idx && (
                <div className="absolute inset-0.5 rounded border border-amber-300/30 pointer-events-none" />
              )}
              
              {idx === 0 && <Compass className={`w-4 h-4 ${activeCategoryIdx === idx ? 'text-amber-300' : 'text-stone-400'}`} />}
              {idx === 1 && <BrainCircuit className={`w-4 h-4 ${activeCategoryIdx === idx ? 'text-amber-300' : 'text-stone-400'}`} />}
              {idx === 2 && <Award className={`w-4 h-4 ${activeCategoryIdx === idx ? 'text-amber-300' : 'text-stone-400'}`} />}

              <span className="text-[10px] font-sans font-medium tracking-tight leading-3">
                {category.name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Skills Board */}
      <div className="flex-1 overflow-y-auto no-scrollbar pr-0.5 my-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategoryIdx}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="space-y-4"
          >
            <div className="p-3 bg-amber-500/5 rounded-lg border border-amber-600/10 mb-2">
              <h4 className="text-xs font-serif font-semibold text-amber-800 uppercase tracking-widest mb-1">
                {selectedCategory.name}
              </h4>
              <p className="text-[11px] text-stone-500 italic font-sans leading-normal">
                An expert consolidation of systems, mechanics, and expressive layers.
              </p>
            </div>

            <div className="space-y-3.5">
              {selectedCategory.skills.map((skill, sIdx) => (
                <div key={sIdx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-serif font-bold text-stone-800 tracking-wide text-sm">
                      {skill.name}
                    </span>
                    <span className="font-mono text-[10px] text-amber-800 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/10">
                      {skill.proficiency}%
                    </span>
                  </div>

                  {/* Tactile scroll ink indicator bar */}
                  <div className="h-1.5 w-full bg-stone-200/70 rounded-full overflow-hidden border border-stone-300/20">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.proficiency}%` }}
                      transition={{ duration: 0.6, delay: sIdx * 0.05, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 rounded-full"
                    />
                  </div>

                  <p className="text-[11px] text-stone-600 font-sans font-light leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Literary Footnote Footer */}
      <div className="pt-3 border-t border-stone-200/60 mt-auto bg-amber-500/0 rounded-b-lg">
        <div className="flex gap-2 p-2 bg-orange-50/30 rounded border border-orange-200/10 italic text-[10px] font-serif text-stone-500 leading-normal">
          <Quote className="w-4 h-4 text-amber-600/50 shrink-0" />
          <span>"Technology remains sterile until it is infused with aesthetics. High code density must dance fluidly on a calm, eye-safe canvas."</span>
        </div>
      </div>

    </div>
  );
}
