'use client';

import { useState, useEffect } from 'react';
import { Terminal, Calendar, Code2, Copy, Check, X } from 'lucide-react';
import { portfolioData, type TILNote } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import { InteractiveCard } from '@/components/ui/interactive-card';

function TILCard({ note, language }: { note: TILNote, language: string }) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Prevenir rolagem do body quando modal abrir
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(note.snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        <InteractiveCard className="relative h-full w-full group cursor-pointer">
          <div className="relative z-10 w-full h-full flex flex-col bg-[#0A0A0A]/90 backdrop-blur-md rounded-[32px] border border-white/10 group-hover:border-accent-green/30 transition-all duration-500 min-h-[420px] shadow-xl group-hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.2)]">
            
            {/* Header card */}
            <div className="p-6 border-b border-white/5 bg-white/[0.02]">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] uppercase font-bold tracking-widest bg-accent-green/10 text-accent-green border border-accent-green/20 px-2.5 py-1 rounded-md">
                  {note.topic}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary opacity-70">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(note.date).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', { day: 'numeric', month: 'short' })}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white leading-snug group-hover:text-accent-green transition-colors">
                {note.title[language as 'pt' | 'en']}
              </h3>
            </div>

            {/* Code Body */}
            <div className="p-6 pt-5 flex-grow relative bg-[#050505] rounded-b-[32px] overflow-hidden group/code">
              <div className="absolute top-3 right-4 flex items-center gap-2">
                 <Code2 className="w-4 h-4 text-white/40" />
                 <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 mr-2">{note.language}</span>
                 <button 
                   onClick={handleCopy}
                   className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all opacity-0 group-hover/code:opacity-100 disabled:opacity-100 flex items-center justify-center transform active:scale-95 z-20"
                   title="Copiar código"
                 >
                   {copied ? <Check className="w-4 h-4 text-accent-green" /> : <Copy className="w-4 h-4 text-white/70 hover:text-white" />}
                 </button>
              </div>
              
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 opacity-0 group-hover/code:opacity-100 backdrop-blur-sm transition-opacity duration-300 pointer-events-none">
                 <span className="text-accent-green font-semibold tracking-widest uppercase text-sm border border-accent-green/50 bg-accent-green/10 px-4 py-2 rounded-full">
                    {language === 'pt' ? 'Clique para Expandir' : 'Click to Expand'}
                 </span>
              </div>

              <pre className="text-sm font-mono text-white/80 overflow-x-auto whitespace-pre pt-4 pb-2 hide-scrollbar">
                <code>{note.snippet}</code>
              </pre>
            </div>

          </div>
        </InteractiveCard>
      </div>

      {/* Modal Popup for Full Code */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12" onClick={() => setIsOpen(false)}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          <div 
            className="relative w-full max-w-4xl max-h-full flex flex-col bg-[#0A0A0A] border border-white/10 rounded-2xl md:rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar dentro do modal
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10 bg-white/5">
              <div className="flex flex-col">
                <span className="text-accent-green text-xs font-bold uppercase tracking-widest">{note.topic}</span>
                <h3 className="text-xl md:text-2xl font-bold text-white mt-1">{note.title[language as 'pt' | 'en']}</h3>
              </div>
              <div className="flex items-center gap-3">
                 <button 
                   onClick={handleCopy}
                   className="p-2 md:p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center transform active:scale-95 group"
                   title="Copiar código"
                 >
                   {copied ? <Check className="w-5 h-5 text-accent-green" /> : <Copy className="w-5 h-5 text-white/70 group-hover:text-white" />}
                 </button>
                 <button 
                   onClick={() => setIsOpen(false)}
                   className="p-2 md:p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-all flex items-center justify-center text-red-400 group"
                 >
                   <X className="w-5 h-5 transition-transform group-hover:scale-110" />
                 </button>
              </div>
            </div>

            {/* Modal Body (Scrollable Code) */}
            <div className="flex-grow overflow-auto p-4 md:p-8 bg-[#050505] hide-scrollbar">
              <pre className="text-sm md:text-base font-mono text-white/90 whitespace-pre hide-scrollbar">
                <code>{note.snippet}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function DigitalGarden() {
  const { language, t } = useLanguage();
  const { tilNotes } = portfolioData;

  if (!tilNotes || tilNotes.length === 0) return null;

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 w-full overflow-hidden" id="digital-garden">
      <div className="max-w-[1800px] mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="flex items-center gap-6">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors shrink-0">
              <Terminal className="w-10 h-10 text-accent-green" />
            </div>
            <div>
              <h2 className="text-sm uppercase tracking-widest text-accent-blue font-bold mb-4">{t('digitalgarden.title')}</h2>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white uppercase italic">
                {t('digitalgarden.subtitle')}
              </h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tilNotes.map(note => (
            <TILCard key={note.id} note={note as TILNote} language={language} />
          ))}
        </div>

      </div>
    </section>
  );
}
