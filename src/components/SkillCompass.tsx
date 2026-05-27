import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { skillsData } from '../data/portfolioData';
import { BrainCircuit, Compass, Award, Quote, Zap } from 'lucide-react';

const categoryIcons = [
  <Compass className="w-4 h-4" />,
  <BrainCircuit className="w-4 h-4" />,
  <Award className="w-4 h-4" />,
];

const categoryColors = [
  { active: 'from-amber-700 to-amber-500',  ring: 'ring-amber-500/30',  text: 'text-amber-300',  label: 'text-amber-50'  },
  { active: 'from-blue-800 to-blue-500',    ring: 'ring-blue-500/30',   text: 'text-blue-300',   label: 'text-blue-50'   },
  { active: 'from-emerald-800 to-emerald-500', ring: 'ring-emerald-500/30', text: 'text-emerald-300', label: 'text-emerald-50' },
];

export default function SkillCompass() {
  const [activeCategoryIdx, setActiveCategoryIdx] = useState<number>(0);
  const selectedCategory = skillsData[activeCategoryIdx];
  const color = categoryColors[activeCategoryIdx];

  return (
    <div className="flex flex-col h-full justify-between" id="skill-compass-widget">

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <Compass className="w-4 h-4 text-amber-600 animate-slow-spin" />
          <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest font-bold">
            Knowledge & Proficiencies
          </span>
        </div>

        <h3 className="font-display text-3xl font-bold text-stone-900 tracking-tight leading-none mb-0.5">
          Skill Compass
        </h3>

        {/* Gold divider */}
        <div className="flex items-center gap-2 mb-3">
          <div className="h-[1px] w-6 bg-amber-600/50" />
          <div className="w-1 h-1 rounded-full bg-amber-500/50" />
          <div className="h-[1px] flex-1 bg-gradient-to-r from-amber-400/25 to-transparent" />
        </div>

        <p className="italic text-stone-500 font-serif text-xs mb-4 leading-relaxed">
          Navigating across modular abstractions & reactive state systems
        </p>

        {/* Category selector stamps */}
        <div className="grid grid-cols-3 gap-1.5 mb-5">
          {skillsData.map((category, idx) => {
            const isActive = activeCategoryIdx === idx;
            const col = categoryColors[idx];
            return (
              <button
                key={idx}
                onClick={() => setActiveCategoryIdx(idx)}
                className={`relative p-2.5 text-center rounded-xl border-2 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all duration-300 ${
                  isActive
                    ? `bg-gradient-to-b ${col.active} border-transparent shadow-lg -translate-y-0.5 ring-2 ${col.ring}`
                    : 'bg-white/80 border-stone-200/80 text-stone-600 hover:bg-white hover:border-stone-300 hover:shadow-md hover:-translate-y-0.5'
                }`}
              >
                <span className={isActive ? col.text : 'text-stone-400'}>
                  {categoryIcons[idx]}
                </span>
                <span className={`text-[9px] font-sans font-semibold leading-tight text-center ${isActive ? col.label : 'text-stone-600'}`}>
                  {category.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Skills board */}
      <div className="flex-1 overflow-y-auto no-scrollbar my-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategoryIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="space-y-4"
          >
            {/* Category header card */}
            <div className={`p-3 rounded-xl border bg-gradient-to-r ${
              activeCategoryIdx === 0 ? 'from-amber-50 to-orange-50 border-amber-200/60' :
              activeCategoryIdx === 1 ? 'from-blue-50 to-indigo-50 border-blue-200/60' :
                                        'from-emerald-50 to-teal-50 border-emerald-200/60'
            }`}>
              <div className="flex items-center gap-2">
                <Zap className={`w-3.5 h-3.5 ${activeCategoryIdx === 0 ? 'text-amber-600' : activeCategoryIdx === 1 ? 'text-blue-600' : 'text-emerald-600'}`} />
                <h4 className={`text-xs font-display font-bold uppercase tracking-widest ${
                  activeCategoryIdx === 0 ? 'text-amber-800' : activeCategoryIdx === 1 ? 'text-blue-800' : 'text-emerald-800'
                }`}>
                  {selectedCategory.name}
                </h4>
              </div>
              <p className="text-[11px] text-stone-500 italic font-sans leading-relaxed mt-1">
                Expert consolidation of systems, mechanics, and expressive layers.
              </p>
            </div>

            {/* Individual skills */}
            <div className="space-y-4">
              {selectedCategory.skills.map((skill, sIdx) => (
                <div key={sIdx} className="space-y-1.5 group">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-stone-800 text-sm tracking-wide group-hover:text-stone-900 transition-colors">
                      {skill.name}
                    </span>
                    {/* Circular proficiency badge */}
                    <div className="relative w-9 h-9 flex items-center justify-center">
                      <svg className="absolute inset-0 w-9 h-9 -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="2.5" />
                        <motion.circle
                          cx="18" cy="18" r="15"
                          fill="none"
                          stroke={activeCategoryIdx === 0 ? '#d97706' : activeCategoryIdx === 1 ? '#3b82f6' : '#10b981'}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 15}`}
                          initial={{ strokeDashoffset: 2 * Math.PI * 15 }}
                          animate={{ strokeDashoffset: 2 * Math.PI * 15 * (1 - skill.proficiency / 100) }}
                          transition={{ duration: 0.8, delay: sIdx * 0.08, ease: 'easeOut' }}
                        />
                      </svg>
                      <span className="font-mono text-[9px] font-bold text-stone-700 z-10">{skill.proficiency}</span>
                    </div>
                  </div>

                  {/* Glowing gradient bar */}
                  <div className="h-2 w-full bg-stone-200/70 rounded-full overflow-hidden border border-stone-300/20">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.proficiency}%` }}
                      transition={{ duration: 0.7, delay: sIdx * 0.07, ease: 'easeOut' }}
                      className="h-full rounded-full glow-bar"
                    />
                  </div>

                  <p className="text-[10px] text-stone-500 font-sans font-light leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer quote */}
      <div className="pt-3 border-t border-stone-200/50 mt-auto">
        <div className="flex gap-2 p-2.5 bg-gradient-to-r from-amber-50/60 to-orange-50/30 rounded-xl border border-amber-200/20 italic text-[10px] font-serif text-stone-500 leading-normal">
          <Quote className="w-4 h-4 text-amber-500/60 shrink-0 mt-0.5" />
          <span>"Technology remains sterile until infused with aesthetics. High code density must dance fluidly on a calm, eye-safe canvas."</span>
        </div>
      </div>

    </div>
  );
}
