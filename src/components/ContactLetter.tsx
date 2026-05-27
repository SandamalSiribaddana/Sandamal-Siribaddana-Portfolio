import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, RefreshCw } from 'lucide-react';
import { ContactMessage } from '../types';

export default function ContactLetter() {
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isDippingSeal, setIsDippingSeal] = useState<boolean>(false);
  const [isSealed, setIsSealed] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStampWax = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsDippingSeal(true);
    
    // Simulate hot wax pouring/cooling
    setTimeout(() => {
      setIsDippingSeal(false);
      setIsSealed(true);
    }, 1200);
  };

  const handleResetLetter = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSealed(false);
  };

  return (
    <div className="flex flex-col h-full justify-between" id="contact-letter-widget">
      
      {/* Narrative Section */}
      <div>
        <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest font-bold block mb-1">
          Post & Dispatch Carrier
        </span>
        <h3 className="font-serif text-3xl font-semibold text-stone-900 tracking-tight leading-none mb-1">
          Write a Letter
        </h3>
        <p className="italic text-stone-500 font-serif text-sm mb-4">
          Drop a note into Dilitha's journal sandbox
        </p>
      </div>

      {/* Main Letter Content Core */}
      <div className="flex-1 relative bg-stone-50/50 rounded-xl p-4 sm:p-5 border border-stone-200 shadow-inner flex flex-col justify-center my-2 select-none">
        
        <AnimatePresence mode="wait">
          {!isSealed ? (
            <motion.form
              key="letter-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleStampWax}
              className="space-y-4 font-serif text-sm"
            >
              {/* Salutation */}
              <div className="text-stone-800 text-base italic">
                Dear Dilitha Sandamal,
              </div>

              {/* Content Body */}
              <div className="space-y-3">
                {/* Introduction statement */}
                <div className="leading-relaxed text-stone-700">
                  My name is{' '}
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="[ Your Noble Name ]"
                    className="border-b border-stone-300 bg-transparent text-stone-900 focus:border-amber-700 focus:outline-none px-1 font-serif font-semibold w-40 sm:w-48 placeholder-stone-300"
                  />
                  , and I am reaching out to discuss{' '}
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="[ potential alignment ]"
                    className="border-b border-stone-300 bg-transparent text-stone-900 focus:border-amber-700 focus:outline-none px-1 font-serif font-semibold w-36 sm:w-40 placeholder-stone-300"
                  />
                  .
                </div>

                {/* Email (Return address) layout */}
                <div className="leading-relaxed text-stone-700">
                  Please deliver your correspondence back to me at this address:{' '}
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="[ return.address@domain.com ]"
                    className="border-b border-stone-300 bg-transparent text-stone-900 focus:border-amber-700 focus:outline-none px-1 font-sans text-xs font-medium w-52 sm:w-64 placeholder-stone-300"
                  />
                  .
                </div>

                {/* Main Message block */}
                <div className="flex flex-col gap-1">
                  <span className="text-stone-700">Here is the substance of my writing:</span>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Pour your ink, thoughts, queries, or greeting notes here..."
                    className="w-full bg-orange-50/10 border-b border-l border-stone-200 rounded p-2 focus:outline-none focus:border-amber-700 font-sans text-xs leading-relaxed text-stone-800 placeholder-stone-400 no-scrollbar"
                  />
                </div>
              </div>

              {/* Signature block */}
              <div className="text-right italic mt-2">
                <p className="text-stone-500 text-xs">Respectfully yours,</p>
                <p className="text-stone-800 font-semibold">{formData.name || 'Your Name'}</p>
              </div>

              {/* Dispatch Action */}
              <div className="pt-2 flex justify-center">
                <button
                  type="submit"
                  disabled={isDippingSeal || !formData.name || !formData.email || !formData.message}
                  className="relative group bg-red-800 hover:bg-red-900 text-red-50 font-serif font-medium text-xs tracking-wider px-6 py-2.5 rounded-lg border border-red-950 flex items-center gap-2 transition-all cursor-pointer shadow-md active:scale-95 disabled:opacity-40"
                >
                  {isDippingSeal ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Pouring Wax Seal...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      Seal & Dispatch Letter
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="letter-sealed"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="flex flex-col items-center justify-center text-center p-4 space-y-6"
            >
              {/* Wax Seal Render */}
              <div className="relative">
                {/* Simulated Red Wax Seal Stamp with embossed monogram */}
                <motion.div
                  initial={{ scale: 2, y: -50, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                  className="w-20 h-20 rounded-full bg-[radial-gradient(circle_at_center,#b91c1c_0%,#7f1d1d_100%)] border-2 border-red-950 flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.5)] cursor-default select-none relative"
                >
                  {/* Embossed Ring */}
                  <div className="absolute inset-1.5 rounded-full border border-dashed border-red-300/20" />
                  
                  {/* Monogram inside seal */}
                  <span className="font-serif text-3xl font-extrabold text-red-100 opacity-80 drop-shadow-[0_-1px_1px_rgba(0,0,0,1)]">
                    DS
                  </span>

                  {/* Gold seal glint */}
                  <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-white/20 blur-xs" />
                </motion.div>
                
                {/* Success Checkmark overlay */}
                <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white rounded-full p-1 border-2 border-white shadow-md">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h4 className="font-serif text-xl font-bold text-stone-800">
                  Letter Sealed & Dispatched
                </h4>
                <p className="font-sans text-xs text-stone-500 max-w-xs mt-2 leading-relaxed">
                  Your parchment coordinate lock is set. The letter has been dispatched locally to Dilitha Sandamal’s review log inbox!
                </p>
              </div>

              <div className="bg-amber-500/5 border border-amber-600/10 rounded-md p-3 text-[11px] font-mono text-stone-600 max-w-xs leading-normal">
                <span className="font-bold text-amber-800">DISPATCH ENVELOPE METRICS:</span><br />
                From: {formData.name}<br />
                Route ID: <span className="underline select-text">msg_post_{Math.floor(Math.random() * 89999 + 10000)}</span>
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

      {/* Ribbon Detail Footer */}
      <div className="text-[10px] font-mono text-stone-400 text-center pt-2 border-t border-stone-200/50">
        Dispatched via standard modern browser envelope proxy
      </div>

    </div>
  );
}
