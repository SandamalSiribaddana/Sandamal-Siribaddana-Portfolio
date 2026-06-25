import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ExternalLink, Download, ChevronLeft, ChevronRight } from 'lucide-react';

// ── Certificate data ──────────────────────────────────────────────────────────
interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issuerTag: string;
  color: string;         // Tailwind-safe bg tint for badge
  accentColor: string;   // Hex/rgba for decorative elements
  pdfPath: string;
  year: string;
  skills: string[];
}

const certificates: Certificate[] = [
  {
    id: 'coursera',
    title: 'Coursera Certified Course',
    issuer: 'Coursera',
    issuerTag: 'Online Learning',
    color: 'bg-blue-800/10 text-blue-800 border-blue-700/20',
    accentColor: '#0056D2',
    pdfPath: '/certificates/Coursera T9J6RETK3PEN.pdf',
    year: '2026',
    skills: ['Professional Development', 'Online Learning'],
  },
  {
    id: 'datascience',
    title: 'Introduction to Data Science',
    issuer: 'Certified Institute',
    issuerTag: 'Data Science',
    color: 'bg-purple-800/10 text-purple-800 border-purple-700/20',
    accentColor: '#7C3AED',
    pdfPath: '/certificates/Introduction_to_Data_Science_certificate_dilithasandamal13-gmail-com_df4b9fda-8b85-4381-8b84-b8fe7159307c.pdf',
    year: '2026',
    skills: ['Data Science', 'Analytics', 'Statistics'],
  },
  {
    id: 'python',
    title: 'Python for Beginners',
    issuer: 'E-Certificate Program',
    issuerTag: 'Programming',
    color: 'bg-emerald-800/10 text-emerald-800 border-emerald-700/20',
    accentColor: '#059669',
    pdfPath: '/certificates/Python_for_Beginners_E-Certificate.pdf',
    year: '2025',
    skills: ['Python', 'Programming', 'Scripting'],
  },
  {
    id: 'excel',
    title: 'Microsoft Excel Certification',
    issuer: 'Microsoft / Partner',
    issuerTag: 'Productivity',
    color: 'bg-green-800/10 text-green-800 border-green-700/20',
    accentColor: '#217346',
    pdfPath: '/certificates/excel.pdf',
    year: '2025',
    skills: ['Excel', 'Data Analysis', 'Spreadsheets'],
  },
];

export default function CertificateGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const active = certificates[activeIndex];

  const goTo = (idx: number) => {
    if (idx === activeIndex) return;
    setDirection(idx > activeIndex ? 'right' : 'left');
    setActiveIndex(idx);
  };
  const prev = () => { if (activeIndex > 0) goTo(activeIndex - 1); };
  const next = () => { if (activeIndex < certificates.length - 1) goTo(activeIndex + 1); };

  return (
    <div className="flex flex-col h-full gap-3" id="cert-gallery">

      {/* ── Section header ── */}
      <div className="flex items-center gap-2">
        <span className="text-[9px] uppercase font-mono tracking-widest text-amber-800 font-bold bg-amber-800/8 px-2 py-0.5 rounded border border-amber-700/15">
          Foliant Chapter V
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-stone-900 leading-tight">
            Credentials &amp; Awards
          </h2>
          <p className="font-serif italic text-stone-500 text-xs mt-0.5">
            "Learning never exhausts the mind."
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Award className="w-4 h-4 text-amber-700" />
          <span className="text-[10px] font-mono text-stone-500">{certificates.length} certificates</span>
        </div>
      </div>

      {/* ── Gold divider ── */}
      <div className="flex items-center gap-2">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-amber-600/40 to-transparent" />
        <div className="w-1 h-1 rounded-full bg-amber-600/50" />
      </div>

      {/* ── Certificate tab navigation ── */}
      <div className="flex gap-1.5 flex-wrap">
        {certificates.map((cert, idx) => (
          <button
            key={cert.id}
            onClick={() => goTo(idx)}
            className={`px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider border transition-all cursor-pointer ${
              idx === activeIndex
                ? 'bg-amber-800/15 text-amber-900 border-amber-700/35 shadow-sm'
                : 'text-stone-500 border-stone-300/50 hover:border-amber-700/20 hover:text-stone-700 hover:bg-amber-800/5'
            }`}
            id={`cert-tab-${cert.id}`}
          >
            {idx + 1}. {cert.issuerTag}
          </button>
        ))}
      </div>

      {/* ── PDF viewer area ── */}
      <div className="flex-1 relative flex flex-col gap-2 min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, x: direction === 'right' ? 16 : -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === 'right' ? -16 : 16 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex-1 flex flex-col gap-2 h-full"
          >
            {/* Certificate meta */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-sm font-bold text-stone-800 leading-tight truncate">
                  {active.title}
                </h3>
                <p className="text-[10px] text-stone-500 font-sans mt-0.5">
                  Issued by <span className="font-semibold text-stone-700">{active.issuer}</span> · {active.year}
                </p>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <a
                  href={active.pdfPath}
                  download
                  id={`cert-download-${active.id}`}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg border border-amber-700/25 bg-amber-800/8 text-amber-900 text-[9px] font-mono font-bold hover:bg-amber-800/15 transition-all cursor-pointer"
                  title="Download certificate"
                >
                  <Download className="w-3 h-3" />
                  Save
                </a>
                <a
                  href={active.pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`cert-open-${active.id}`}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg border border-stone-300/60 text-stone-600 text-[9px] font-mono font-bold hover:bg-stone-100/60 transition-all cursor-pointer"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-3 h-3" />
                  Open
                </a>
              </div>
            </div>

            {/* Skills chips */}
            <div className="flex gap-1 flex-wrap">
              {active.skills.map(s => (
                <span
                  key={s}
                  className={`text-[8px] font-mono px-1.5 py-0.5 rounded-md border ${active.color}`}
                >
                  {s}
                </span>
              ))}
            </div>

            {/* PDF embed */}
            <div
              className="flex-1 rounded-xl overflow-hidden border border-stone-300/60 shadow-inner relative"
              style={{ minHeight: '200px' }}
            >
              {/* Accent top strip */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] z-10"
                style={{ background: `linear-gradient(90deg, ${active.accentColor}, transparent)` }}
              />
              <embed
                src={active.pdfPath}
                type="application/pdf"
                className="w-full h-full"
                style={{ minHeight: '200px' }}
              />
            </div>

            {/* Cert nav arrows */}
            <div className="flex items-center justify-between">
              <button
                onClick={prev}
                disabled={activeIndex === 0}
                className="flex items-center gap-1 text-[10px] font-serif italic text-stone-500 hover:text-amber-800 disabled:opacity-25 transition-all cursor-pointer disabled:cursor-default"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Previous
              </button>

              {/* Progress pips */}
              <div className="flex gap-1">
                {certificates.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`rounded-full transition-all cursor-pointer border ${
                      i === activeIndex
                        ? 'w-4 h-1.5 bg-amber-600 border-amber-600'
                        : 'w-1.5 h-1.5 bg-stone-300 hover:bg-stone-500 border-stone-400'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                disabled={activeIndex === certificates.length - 1}
                className="flex items-center gap-1 text-[10px] font-serif italic text-stone-500 hover:text-amber-800 disabled:opacity-25 transition-all cursor-pointer disabled:cursor-default"
              >
                Next
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
