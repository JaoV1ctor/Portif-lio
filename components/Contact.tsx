'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Instagram, Github, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { portfolioData } from '@/lib/data';

import Reveal from './Reveal';

export default function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t('contact.form.error.name');
    if (!formData.email.trim()) newErrors.email = t('contact.form.error.email');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = t('contact.form.error.email.invalid');
    if (!formData.message.trim()) newErrors.message = t('contact.form.error.message');
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    setErrors(prev => {
      const newErrors = { ...prev };
      if (name === 'name') {
        if (!value.trim()) newErrors.name = t('contact.form.error.name');
        else delete newErrors.name;
      }
      if (name === 'email') {
        if (!value.trim()) newErrors.email = t('contact.form.error.email');
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) newErrors.email = t('contact.form.error.email.invalid');
        else delete newErrors.email;
      }
      if (name === 'message') {
        if (!value.trim()) newErrors.message = t('contact.form.error.message');
        else delete newErrors.message;
      }
      return newErrors;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus('submitting');
    
    try {
      // Envia os dados silenciosamente via FormSubmit AJAX
      const response = await fetch("https://formsubmit.co/ajax/vibeagency.oficial@gmail.com", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            Nome: formData.name,
            Email: formData.email,
            Mensagem: formData.message,
            _subject: `Novo Contato do Portfólio: ${formData.name}`,
            _template: "box",
            _captcha: "false"
        })
      });

      if (!response.ok) throw new Error("Erro ao enviar a mensagem");
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 lg:px-20 w-full border-t border-border-subtle">
      <div className="max-w-[1800px] mx-auto flex flex-col items-center text-center gap-16">
        <Reveal direction="up" width="100%">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-sm uppercase tracking-widest text-accent-blue font-bold mb-4">{t('contact.category')}</h2>
            <h3 
              className="text-4xl md:text-5xl font-bold mb-6 cursor-default tracking-tight text-white uppercase italic"
            >
              {t('contact.title')}
            </h3>
            <p className="text-text-secondary text-lg mb-8 leading-relaxed">
              {t('contact.description')}
            </p>
          </div>
        </Reveal>
        
        <Reveal direction="up" width="100%">
          <div className="w-full max-w-2xl relative mx-auto text-left">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  className="bg-accent-green/5 border border-accent-green/20 p-12 rounded-3xl text-center backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <CheckCircle2 className="w-20 h-20 text-accent-green mx-auto mb-6" />
                  </motion.div>
                  <h3 className="text-3xl font-bold mb-3">{t('contact.form.success.title')}</h3>
                  <p className="text-text-secondary mb-8">{t('contact.form.success.desc')}</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-accent-green hover:text-white transition-all"
                  >
                    {t('contact.form.success.btn')}
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="contact-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6 bg-white/[0.02] p-8 md:p-12 rounded-[2rem] border border-white/5 shadow-2xl backdrop-blur-md"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <input 
                        name="name"
                        type="text" 
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t('contact.form.name')} 
                        className={`w-full bg-black/40 border rounded-2xl px-5 py-4 focus:outline-none transition-all duration-300 text-white placeholder:text-text-secondary ${
                          errors.name ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-white/10 focus:border-accent-blue focus:bg-white/5 focus:shadow-[0_0_20px_rgba(0,112,243,0.2)]'
                        }`}
                      />
                      {errors.name && <p className="text-red-500 text-xs ml-1">{errors.name}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <input 
                        name="email"
                        type="email" 
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t('contact.form.email')} 
                        className={`w-full bg-black/40 border rounded-2xl px-5 py-4 focus:outline-none transition-all duration-300 text-white placeholder:text-text-secondary ${
                          errors.email ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-white/10 focus:border-accent-blue focus:bg-white/5 focus:shadow-[0_0_20px_rgba(0,112,243,0.2)]'
                        }`}
                      />
                      {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t('contact.form.message')} 
                      rows={5}
                      className={`w-full bg-black/40 border rounded-2xl px-5 py-4 focus:outline-none transition-all duration-300 text-white placeholder:text-text-secondary resize-none ${
                        errors.message ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-white/10 focus:border-accent-blue focus:bg-white/5 focus:shadow-[0_0_20px_rgba(0,112,243,0.2)]'
                      }`}
                    />
                    {errors.message && <p className="text-red-500 text-xs ml-1">{errors.message}</p>}
                  </div>
                  
                  {status === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-medium"
                    >
                      {t('contact.form.error')}
                    </motion.div>
                  )}

                  <button 
                    disabled={status === 'submitting'}
                    className={`w-full font-bold py-5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden ${
                      status === 'error' ? 'bg-red-500 text-white' : 'bg-accent-blue hover:bg-blue-500 shadow-[0_0_20px_rgba(0,112,243,0.3)] text-white'
                    }`}
                  >
                    {status === 'submitting' ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>{t('contact.form.sending')}</span>
                      </div>
                    ) : (
                      <>
                        <span className="relative z-10">{status === 'error' ? t('contact.form.retry') : t('contact.form.send')}</span>
                        <Send className="w-4 h-4 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
