import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, RefreshCw, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { ContactMessage } from '../types';

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/SandamalSiribaddana',
    icon: <Github className="w-4 h-4" />,
    color: 'hover:bg-stone-900 hover:text-white hover:border-stone-700',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/dilitha-sandamal-2098a3210',
    icon: <Linkedin className="w-4 h-4" />,
    color: 'hover:bg-blue-700 hover:text-white hover:border-blue-600',
  },
  {
    label: 'Email',
    href: 'mailto:dilithasandamal13@gmail.com',
    icon: <Mail className="w-4 h-4" />,
    color: 'hover:bg-amber-700 hover:text-white hover:border-amber-600',
  },
];

export default function ContactLetter() {
  const [formData, setFormData] = useState<ContactMessage>({
    name: '', email: '', subject: '', message: ''
  });
  const [isDippingSeal, setIsDippingSeal] = useState<boolean>(false);
  const [isSealed, setIsSealed] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStampWax = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsDippingSeal(true);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'ef190848-a830-4139-9809-8129de53b6c7',
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'New Contact from Portfolio',
          message: formData.message,
        }),
      });
      const result = await response.json();
      
      if (result.success) {
        setIsDippingSeal(false);
        setIsSealed(true);
      } else {
        console.error('Submission failed', result);
        setIsDippingSeal(false);
        alert('Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error(error);
      setIsDippingSeal(false);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleResetLetter = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSealed(false);
  };

  return (
    <div className="flex flex-col h-full justify-between" id="contact-letter-widget">

      {/* Header */}
      <div>
        <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest font-bold block mb-1 bg-stone-800/8 px-2 py-0.5 rounded border border-stone-200/60 w-fit">
          Post & Dispatch Carrier
        </span>
        <h3 className="font-display text-3xl font-bold text-stone-900 tracking-tight leading-none mb-0.5">
          Contact Me
        </h3>
        {/* Gold divider */}
        <div className="flex items-center gap-2 mb-2">
          <div className="h-[1px] w-6 bg-amber-600/50" />
          <div className="w-1 h-1 rounded-full bg-amber-500/50" />
          <div className="h-[1px] flex-1 bg-gradient-to-r from-amber-400/25 to-transparent" />
        </div>
        <p className="italic text-stone-500 font-serif text-xs mb-3 leading-relaxed">
          Let’s connect for internships, projects, or collaboration opportunities.
        </p>

        {/* Social quick-links */}
        <div className="flex gap-1.5 mb-3">
          {SOCIAL_LINKS.map(({ label, href, icon, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              title={label}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-stone-200 text-stone-500 text-[10px] font-sans font-medium transition-all duration-200 ${color} shadow-xs`}
            >
              {icon}
              <span className="hidden sm:inline">{label}</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
            </a>
          ))}
        </div>
      </div>

      {/* Letter body */}
      <div className="flex-1 relative rounded-xl border border-stone-200/80 shadow-inner flex flex-col justify-center my-1 select-none overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #fefcf3 0%, #faf6e8 100%)',
          backgroundImage: 'linear-gradient(180deg, #fefcf3 0%, #faf6e8 100%), repeating-linear-gradient(transparent, transparent 23px, rgba(160,130,80,0.10) 23px, rgba(160,130,80,0.10) 24px)',
          backgroundBlendMode: 'normal',
        }}
      >
        {/* Decorative postmark in top-right corner */}
        <div className="absolute top-3 right-3 opacity-15 pointer-events-none select-none" style={{ transform: 'rotate(-12deg)' }}>
          <div className="w-14 h-14 rounded-full border-2 border-stone-700 flex flex-col items-center justify-center">
            <div className="absolute inset-1 border border-stone-700 rounded-full" />
            <span className="text-[7px] font-mono font-bold text-stone-800 uppercase tracking-wider">Dilitha</span>
            <div className="h-[1px] w-8 bg-stone-700 my-0.5" />
            <span className="text-[6px] font-mono text-stone-800">2026</span>
          </div>
        </div>

        {/* Ink drip accent line */}
        <div className="absolute left-8 top-0 w-[1px] h-full bg-gradient-to-b from-red-300/25 via-red-200/15 to-transparent pointer-events-none" />

        <AnimatePresence mode="wait">
          {!isSealed ? (
            <motion.form
              key="letter-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleStampWax}
              className="p-4 sm:p-5 space-y-3.5 font-serif text-sm"
            >
              {/* Salutation */}
              <div className="text-stone-800 text-sm italic font-semibold pl-4">
                Dear Dilitha Sandamal,
              </div>

              {/* Body */}
              <div className="space-y-3 pl-4">
                <div className="leading-relaxed text-stone-700 text-xs">
                  My name is{' '}
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="[ Your Name ]"
                    className="border-b border-stone-300 bg-transparent text-stone-900 focus:border-amber-700 focus:outline-none px-1 font-serif font-semibold w-36 sm:w-44 placeholder-stone-300 text-xs"
                  />
                  , reaching out about{' '}
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="[ subject ]"
                    className="border-b border-stone-300 bg-transparent text-stone-900 focus:border-amber-700 focus:outline-none px-1 font-serif font-semibold w-28 placeholder-stone-300 text-xs"
                  />
                  .
                </div>

                <div className="leading-relaxed text-stone-700 text-xs">
                  Reply to:{' '}
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="[ Your Email ]"
                    className="border-b border-stone-300 bg-transparent text-stone-900 focus:border-amber-700 focus:outline-none px-1 font-sans text-xs font-medium w-48 placeholder-stone-300"
                  />
                  .
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-stone-600 text-xs">My message:</span>
                  <textarea
                    required
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="[ Your Message ]"
                    className="w-full bg-transparent border-b border-l border-stone-200 rounded-sm p-1.5 focus:outline-none focus:border-amber-600 font-sans text-xs leading-relaxed text-stone-800 placeholder-stone-400 no-scrollbar resize-none"
                  />
                </div>
              </div>

              {/* Signature */}
              <div className="text-right italic mt-1 pr-2">
                <p className="text-stone-400 text-[10px]">Respectfully yours,</p>
                <p className="text-stone-800 font-display font-semibold text-sm">{formData.name || 'Your Name'}</p>
              </div>

              {/* Dispatch button */}
              <div className="flex justify-center pt-1">
                <button
                  type="submit"
                  disabled={isDippingSeal || !formData.name || !formData.email || !formData.message}
                  className="relative group text-red-50 font-serif font-medium text-xs tracking-wider px-6 py-2.5 rounded-xl border border-red-900 flex items-center gap-2 transition-all cursor-pointer shadow-md active:scale-95 disabled:opacity-40"
                  style={{ background: 'linear-gradient(135deg, #991b1b, #7f1d1d)' }}
                >
                  {isDippingSeal ? (
                    <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Pouring Wax Seal...</>
                  ) : (
                    <><Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /> Seal & Dispatch Letter</>
                  )}
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="letter-sealed"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center text-center p-4 space-y-4"
            >
              {/* Wax seal */}
              <div className="relative">
                <motion.div
                  initial={{ scale: 2, y: -40, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.4)] cursor-default select-none relative"
                  style={{ background: 'radial-gradient(circle at 35% 35%, #dc2626 0%, #991b1b 60%, #7f1d1d 100%)' }}
                >
                  <div className="absolute inset-2 rounded-full border border-dashed border-red-300/25" />
                  <span className="font-display text-3xl font-extrabold text-red-100/85" style={{ textShadow: '0 -1px 2px rgba(0,0,0,0.9)' }}>DS</span>
                  <div className="absolute top-2.5 left-2.5 w-4 h-4 rounded-full bg-white/20 blur-sm" />
                </motion.div>
                <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white rounded-full p-1 border-2 border-white shadow-md">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h4 className="font-display text-xl font-bold text-stone-800">Letter Sealed & Dispatched</h4>
                <p className="font-sans text-xs text-stone-500 max-w-xs mt-1.5 leading-relaxed">
                  Your parchment coordinate lock is set. The letter has been dispatched to Dilitha Sandamal's review log inbox!
                </p>
              </div>

              <div className="bg-amber-50/60 border border-amber-200/40 rounded-xl p-3 text-[11px] font-mono text-stone-600 max-w-xs leading-relaxed">
                <span className="font-bold text-amber-800">DISPATCH METRICS:</span><br />
                From: {formData.name}<br />
                Route ID: <span className="underline select-text">msg_{Math.floor(Math.random() * 89999 + 10000)}</span>
              </div>

              <button
                onClick={handleResetLetter}
                className="text-xs font-serif text-stone-500 hover:text-amber-800 underline transition-all flex items-center gap-1 cursor-pointer"
              >
                Write Another Dispatch
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="text-[10px] font-mono text-stone-400 text-center pt-2 border-t border-stone-200/40 flex items-center justify-center gap-2">
        <div className="h-[1px] w-8 bg-stone-300/40" />
        <span>Dispatched via modern browser envelope proxy</span>
        <div className="h-[1px] w-8 bg-stone-300/40" />
      </div>

    </div>
  );
}
