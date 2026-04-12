import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Typewriter from './Typewriter';
import { useLanguage } from '@/context/LanguageContext';
import { portfolioData } from '@/lib/data';

export default function Terminal() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ text: string | React.ReactNode; type: 'cmd' | 'output' }[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // --- MINIGAME STATE ---
  const [gameStatus, setGameStatus] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [renderCounter, setRenderCounter] = useState(0);
  const scoreRef = useRef(0);
  const highScoreRef = useRef(0);
  
  const gameState = useRef({
    y: 0,
    vy: 0,
    obstacles: [] as number[],
    speed: 0.8,
    ticks: 0,
    status: 'idle'
  });

  useEffect(() => {
    setHistory(prev => {
      if (prev.length === 0) {
        return [{ text: t('terminal.welcome'), type: 'output' }];
      }
      
      // Update existing welcome message dynamically when language changes
      const newHistory = [...prev];
      if (newHistory[0] && newHistory[0].type === 'output') {
        // Only override if the first line is exactly the English or Portuguese welcome message
        // Or if we just unconditionally replace it (it's always the first message anyway)
        newHistory[0] = { ...newHistory[0], text: t('terminal.welcome') };
      }
      return newHistory;
    });
  }, [t]);

  useEffect(() => {
    if (terminalRef.current && gameStatus === 'idle') {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, gameStatus]);

  // --- MINIGAME LOOP ---
  useEffect(() => {
    let frameId: number;

    const loop = () => {
      frameId = requestAnimationFrame(loop);
      
      const state = gameState.current;
      if (state.status !== 'playing') return;

      state.ticks++;
      
      // Gravity
      if (state.y > 0) {
        state.vy -= 0.8; 
      }
      state.y += state.vy;
      
      // Floor collision
      if (state.y <= 0) {
        state.y = 0;
        state.vy = 0;
      }

      // Move obstacles
      for(let i=0; i < state.obstacles.length; i++) {
        state.obstacles[i] -= state.speed;
      }
      
      // Remove off-screen obstacles
      state.obstacles = state.obstacles.filter(x => x > -10);

      // Spawn new obstacles randomly
      if (state.ticks % Math.max(Math.floor(70 / state.speed), 20) === 0) {
        if (Math.random() > 0.4) {
          state.obstacles.push(100); // start at 100% width
        }
      }

      // Increase difficulty
      if (state.ticks % 500 === 0) {
        state.speed += 0.15;
      }

      // Check collisions (Dino is fixed at X=10%)
      const hit = state.obstacles.some(x => x > 6 && x < 14 && state.y < 20);
      
      if (hit) {
        state.status = 'gameover';
        setGameStatus('gameover');
      } else {
        if (state.ticks % 5 === 0) {
          scoreRef.current += 1;
          if (scoreRef.current > highScoreRef.current) {
            highScoreRef.current = scoreRef.current;
          }
        }
      }

      // Trigger react render to update visuals
      setRenderCounter(c => c + 1);
    };
    
    if (gameStatus === 'playing') {
      gameState.current.status = 'playing';
      frameId = requestAnimationFrame(loop);
    }
    
    return () => cancelAnimationFrame(frameId);
  }, [gameStatus]);

  // Handle global keyboard for the game
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Prevent default scrolling for Space and Up
      if (['Space', 'ArrowUp'].includes(e.code) && gameStatus !== 'idle') {
        e.preventDefault();
        
        if (gameStatus === 'gameover') {
          // Restart Game
          gameState.current = { y: 0, vy: 0, obstacles: [], speed: 0.8, ticks: 0, status: 'playing' };
          scoreRef.current = 0;
          setGameStatus('playing');
        } else if (gameStatus === 'playing') {
          // Jump
          if (gameState.current.y === 0) {
            gameState.current.vy = 14; 
          }
        }
      }
    };

    if (gameStatus !== 'idle') {
      window.addEventListener('keydown', handleGlobalKeyDown, { passive: false });
    }
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [gameStatus]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    
    if (cmd !== '') {
      setCommandHistory(prev => [input, ...prev]);
      setHistoryIndex(-1);
    }

    if (cmd === 'clear') {
      setHistory([]);
    } else if (['play', 'dino'].includes(cmd)) {
      setHistory(prev => [...prev, { text: `> ${input}`, type: 'cmd' }]);
      gameState.current = { y: 0, vy: 0, obstacles: [], speed: 0.8, ticks: 0, status: 'playing' };
      scoreRef.current = 0;
      setGameStatus('playing');
    } else if (['help', 'about', 'skills', 'projects', 'contact', 'ls', 'date', 'whoami', 'sudo', 'resume', 'resume.pdf', 'exit'].includes(cmd)) {
      let output: string | React.ReactNode = '';
      switch (cmd) {
        case 'help': 
          output = t('terminal.help') + '\n\n* Easter Egg: Try "dino" or "play"!'; 
          break;
        case 'about': output = t('terminal.about'); break;
        case 'skills': output = t('terminal.skills'); break;
        case 'projects': output = t('terminal.projects'); break;
        case 'contact': 
          output = (
            <div className="mt-2 space-y-1">
              <p className="mb-2">{t('terminal.contact')}</p>
              {portfolioData.socials.map(s => {
                let displayUrl = s.url;
                if (s.platform === 'Mail' && s.url.includes('mailto:')) {
                   displayUrl = s.url.replace('mailto:', '');
                } else if (s.platform === 'Mail' && s.url.includes('mail.google.com')) {
                   displayUrl = 'vibeagency.oficial@gmail.com';
                }
                
                return (
                  <div key={s.platform} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="text-accent-green font-bold w-full sm:w-24">[{s.platform}]</span>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline break-all">
                      {displayUrl}
                    </a>
                  </div>
                );
              })}
            </div>
          );
          break;
        case 'ls': output = t('terminal.ls'); break;
        case 'date': output = new Date().toLocaleString(); break;
        case 'whoami': output = t('terminal.whoami'); break;
        case 'sudo': output = t('terminal.sudo'); break;
        case 'resume':
        case 'resume.pdf': 
            output = t('terminal.resume'); 
            setTimeout(() => {
              const link = document.createElement('a');
              link.href = '/resume.pdf';
              link.download = 'Joao_Victor_Curriculo.pdf';
              link.click();
            }, 1000);
            break;
        case 'exit': output = t('terminal.exit'); break;
      }
      setHistory(prev => [
        ...prev, 
        { text: `> ${input}`, type: 'cmd' },
        { text: output, type: 'output' }
      ]);
      
      if (cmd === 'exit') {
        setTimeout(() => setHistory([]), 2000);
      }
    } else if (cmd !== '') {
      setHistory(prev => [
        ...prev, 
        { text: `> ${input}`, type: 'cmd' },
        { text: t('terminal.notfound').replace('{cmd}', cmd), type: 'output' }
      ]);
    }

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div 
      className="w-full h-[650px] bg-[#0b0c10]/80 backdrop-blur-3xl border-2 border-white/10 rounded-2xl overflow-hidden font-mono text-sm shadow-[0_30px_100px_-20px_rgba(14,165,233,0.3)] flex flex-col group/terminal relative hover:border-white/30 transition-all duration-500"
      onClick={() => {
        if (gameStatus === 'idle') inputRef.current?.focus();
      }}
    >
      {/* Subtle Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] opacity-50 mix-blend-overlay" />

      {/* Terminal Header */}
      <div className="bg-gradient-to-r from-accent-blue/10 via-black/40 to-black/40 px-4 py-3 flex items-center justify-between border-b border-white/20 z-20 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2">
          <div className="flex gap-2 group-hover/terminal:opacity-100 opacity-60 transition-opacity">
            <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E] shadow-inner" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123] shadow-inner" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29] shadow-inner" />
          </div>
          <div className="text-white/70 font-medium text-[11px] uppercase tracking-wider ml-4 bg-black/40 px-3 py-1 rounded-full border border-white/5 shadow-inner">
            joaovictor@matrix ~ bash
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-white/30 text-[10px] uppercase font-bold tracking-widest hidden md:block">80x24</div>
          <div className="w-2.5 h-2.5 rounded-full bg-accent-green animate-pulse shadow-[0_0_10px_theme(colors.accent.green)]" />
        </div>
      </div>

      {gameStatus !== 'idle' ? (
        // --- GAME UI ---
        <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden select-none bg-[#111] w-full">
          {/* Score Header */}
          <div className="absolute top-6 right-8 flex gap-6 text-sm text-text-secondary font-bold tracking-widest z-10">
            <span>HI {highScoreRef.current.toString().padStart(5, '0')}</span>
            <span className="text-white">{scoreRef.current.toString().padStart(5, '0')}</span>
          </div>
          
          {/* Game Window Container */}
          <div className="w-full h-full max-w-[800px] relative mt-20 flex flex-col justify-end pb-32">
            
            {/* Dinosaur */}
            <div 
              className="absolute text-5xl z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
              style={{ 
                left: '10%', 
                bottom: `calc(8rem + ${gameState.current.y}px)`,
                transform: gameStatus === 'gameover' ? 'scaleY(0.7) translateY(15px)' : 'none',
                transition: 'transform 0.1s'
              }}
            >
              {gameStatus === 'gameover' ? '😵' : gameState.current.y > 0 ? '🦖' : '🦖'}
            </div>

            {/* Obstacles */}
            {gameState.current.obstacles.map((obs, i) => (
              <div 
                key={i} 
                className="absolute text-4xl bottom-[8rem] text-accent-green drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]" 
                style={{ left: `${obs}%` }}
              >
                🌵
              </div>
            ))}

            {/* Ground Line */}
            <div className="w-full border-b-[3px] border-text-secondary/30 absolute bottom-[8rem]" />
          </div>

          {/* Game Over Overlay */}
          {gameStatus === 'gameover' && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-20">
              <h3 className="text-4xl font-black tracking-widest text-red-500 mb-4 drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]">G A M E   O V E R</h3>
              <p className="text-white text-lg animate-pulse mb-8">Pressione ESPAÇO para reiniciar</p>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setGameStatus('idle');
                  setHistory(prev => [...prev, { text: `[Dino Game Finalizado] Score: ${scoreRef.current}`, type: 'output' }]);
                }}
                className="text-xs font-bold uppercase tracking-widest border border-white/20 px-6 py-3 hover:bg-white/10 hover:border-white/50 transition-all rounded-lg text-white"
              >
                Sair / Voltar ao Terminal
              </button>
            </div>
          )}
        </div>
      ) : (
        // --- TERMINAL UI ---
        <div 
          ref={terminalRef}
          className="flex-1 p-4 overflow-y-auto hide-scrollbar space-y-1 selection:bg-accent-blue/30 relative"
        >
          <AnimatePresence mode="popLayout">
            {history.map((line, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={line.type === 'cmd' ? 'text-accent-blue' : 'text-text-secondary'}
              >
                {line.type === 'output' && i === history.length - 1 && typeof line.text === 'string' ? (
                  <Typewriter text={line.text} delay={20} showCursor={false} />
                ) : (
                  line.text
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          
          <form onSubmit={handleCommand} className="flex items-center gap-2">
            <span className="text-accent-green font-bold">➜</span>
            <span className="text-accent-blue font-bold">~</span>
            <div className="flex-1 relative flex items-center">
              <input
                ref={inputRef}
                id="terminal-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none outline-none text-white caret-transparent"
                autoComplete="off"
                autoFocus
              />
              <motion.div 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="absolute bg-accent-green w-2 h-4 pointer-events-none"
                style={{ 
                  left: `${input.length}ch`,
                  display: input.length < 50 ? 'block' : 'none' 
                }}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
