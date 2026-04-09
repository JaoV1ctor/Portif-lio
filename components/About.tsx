'use client';

import { motion } from 'motion/react';
import Reveal from './Reveal';
import Terminal from './Terminal';
import { useLanguage } from '@/context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 px-6 md:px-12 lg:px-20 w-full overflow-hidden">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <Reveal direction="right">
          <div>
            <h2 className="text-sm uppercase tracking-widest text-accent-blue font-bold mb-4">
              {t('about.title')}
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-10 leading-tight uppercase italic">
              {t('about.subtitle')}
            </h3>
            <div className="space-y-8 text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl">
              <p className="relative pl-6">
                <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-accent-blue/40 rounded-full" />
                {t('about.p1')}
              </p>
              <p className="bg-white/5 p-8 rounded-3xl border border-white/10 text-white/90 shadow-2xl backdrop-blur-sm">
                {t('about.p2')}
              </p>
              <p className="pl-6">{t('about.p3')}</p>
            </div>
          </div>
        </Reveal>
        
        <Reveal direction="left" width="100%">
          <div className="w-full lg:ml-auto max-w-4xl xl:max-w-5xl">
            <Terminal />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
