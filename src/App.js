import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, TrendingUp, Shield, Cpu, Activity, DollarSign, 
  LayoutDashboard, Home, ArrowUpRight, ArrowDownLeft, 
  Settings, LogOut, PieChart, Clock, Zap, X, Copy, Download, TrendingDown,
  ChevronLeft, ChevronRight, AlertTriangle
} from 'lucide-react';
import { metaApiService } from './services/metaApi';

// --- Shared Components ---
const TelegramSection = () => (
  <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-32 relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/[0.03] blur-[120px] rounded-full -z-10"></div>

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-3xl sm:rounded-[48px] p-6 sm:p-12 md:p-20 relative overflow-hidden group shadow-2xl"
    >
      <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none">
        <Zap size={300} className="text-blue-500 rotate-12" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center text-blue-500 mb-8 border border-blue-500/20 shadow-[0_0_30px_rgba(37,99,235,0.2)]">
          <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.69-.88-.48-1.38-.78-2.23-1.07-1-.32-.35-.5-.22-.82.04-.08.7-.64 1.28-1.22.74-.74 1.41-1.72 1.41-1.72.01-.01.01-.1-.05-.12-.06-.02-.15-.01-.15-.01s-.94.51-2.66 1.5c-.25.14-.48.21-.69.2-.23-.01-.67-.12-1-.25-.4-.16-.72-.24-.69-.51.02-.14.3-.28.84-.43 1.75-.64 2.92-1.07 3.51-1.28 1.67-.6 3.14-.7 4.05-.7.2 0 .64.04.93.12.24.07.47.22.54.43.07.21.08.45.07.67z"/>
          </svg>
        </div>

        <span className="text-blue-400 text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] mb-4">Join Us</span>
        <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 sm:mb-6 uppercase leading-tight">
          Telegram <span className="text-gray-500">Community</span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-12 font-medium leading-relaxed">
          Join other FlexBot users. Get <span className="text-white">live trade updates</span>, ask questions, share results, and get direct support from our team.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <a 
            href="https://t.me/flexbotcommunity" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 sm:px-12 py-4 sm:py-6 rounded-2xl font-black text-base sm:text-lg tracking-widest transition-all shadow-[0_10px_50px_rgba(37,99,235,0.4)] flex items-center gap-3 active:scale-95"
          >
            JOIN TELEGRAM <ArrowUpRight size={20} />
          </a>
          <div className="flex items-center gap-4 px-4 sm:px-8 py-4 sm:py-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex -space-x-3">
              {['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-yellow-500'].map((color, i) => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-[#050505] ${color} flex items-center justify-center text-white text-[10px] font-black`}>
                  {['F', 'B', 'A', 'I'][i]}
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black text-white uppercase leading-none">Active Community</p>
              <div className="text-[8px] font-bold text-green-500 uppercase tracking-widest mt-1.5 flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div> Check inside
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

const RiskDisclaimer = () => (
  <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-24 border-t border-white/5">
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
          <AlertTriangle size={20} />
        </div>
        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Risk Warning & Disclaimer</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-10 text-[11px] text-gray-500 font-bold leading-relaxed tracking-tight">
        <div className="space-y-6">
          <p>
            <span className="text-white uppercase tracking-widest text-[9px] block mb-1">High Risk Investment</span>
            Trading Gold (XAU/USD) and other financial instruments involves significant risk of loss and is not suitable for every investor. The high degree of leverage that is often under current trading conditions can work against you as well as for you.
          </p>
          <p>
            <span className="text-white uppercase tracking-widest text-[9px] block mb-1">No Financial Advice</span>
            FlexBot AI V5.0 is an automated software protocol designed for informational purposes only. Any signals or trades displayed are simulations and do not constitute financial, investment, or legal advice.
          </p>
        </div>
        <div className="space-y-6">
          <p>
            <span className="text-white uppercase tracking-widest text-[9px] block mb-1">Past Performance</span>
            Past performance is not indicative of future results. Hypothetical or simulated performance results have certain limitations. The protocol results shown (+342.18%) are based on audited master accounts and may vary significantly.
          </p>
          <p>
            <span className="text-white uppercase tracking-widest text-[9px] block mb-1">User Responsibility</span>
            By using FlexBot AI, you acknowledge that you are responsible for your own trading decisions. FlexBot AI and its developers shall not be held liable for any financial losses or damages resulting from the use of this software.
          </p>
        </div>
      </div>
      
      <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
          <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em]">Official Protocol V5.0.4</p>
        </div>
        <p className="text-[9px] font-bold text-gray-700 uppercase tracking-widest">Global Software Node: #FX-884210</p>
      </div>
    </div>
  </section>
);

const SectionDivider = () => (
  <motion.div 
    initial={{ opacity: 0, scaleX: 0 }}
    whileInView={{ opacity: 1, scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.5, ease: "circOut" }}
    className="relative h-px w-full max-w-5xl mx-auto my-4 opacity-50 origin-center"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500/10 blur-2xl rounded-full"></div>
  </motion.div>
);

const FeaturesSection = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-32 relative">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center mb-10 sm:mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-6">
          Why FlexBot AI
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tighter mb-4 uppercase">Built For <span className="text-gray-500">Results</span></h2>
      </motion.div>

      {/* Top row: big feature + stat */}
      <div className="grid lg:grid-cols-5 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3 bg-white/[0.03] border border-white/10 rounded-2xl sm:rounded-[40px] p-6 sm:p-10 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none"><Shield size={280} /></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-500 mb-6">
              <Shield size={24} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-3">Your Money Never Leaves Your Broker</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl">FlexBot connects to your MT5 via a secure bridge. We copy trades — we never touch your funds. You stay in full control of your account at all times.</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-blue-600 rounded-2xl sm:rounded-[40px] p-6 sm:p-10 relative overflow-hidden group flex flex-col justify-between"
        >
          <div className="absolute -right-6 -bottom-6 opacity-20 group-hover:scale-110 transition-transform"><TrendingUp size={140} className="text-white" /></div>
          <div className="relative z-10">
            <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest mb-2 opacity-80">Verified Performance</p>
            <h3 className="text-5xl sm:text-6xl font-black text-white tracking-tighter mb-2">74.2%</h3>
            <p className="text-blue-100 font-bold text-sm">Win rate across our master account. Every trade is verifiable on Myfxbook.</p>
          </div>
        </motion.div>
      </div>

      {/* Bottom row: 3 features */}
      <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
        {[
          {
            icon: <Zap size={20} />,
            title: 'Instant Execution',
            desc: 'Trades are copied from our master account to yours in real-time. No delays, no requotes.',
            style: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
          },
          {
            icon: <Activity size={20} />,
            title: 'Smart Risk Control',
            desc: 'Auto daily loss limits, news filters, and dynamic lot sizing. Built to protect prop firm accounts.',
            style: 'bg-purple-500/10 border-purple-500/20 text-purple-500'
          },
          {
            icon: <Clock size={20} />,
            title: 'Set & Forget',
            desc: 'Install once, runs 24/5. No charts to watch, no signals to follow. FlexBot handles everything.',
            style: 'bg-green-500/10 border-green-500/20 text-green-500'
          },
        ].map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i }}
            className="bg-white/[0.03] border border-white/10 rounded-2xl sm:rounded-[32px] p-6 sm:p-8 group hover:bg-white/[0.05] transition-all"
          >
            <div className={`w-10 h-10 ${f.style} border rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
              {f.icon}
            </div>
            <h3 className="text-lg font-black text-white mb-2 uppercase tracking-tight">{f.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const PerformanceSection = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-32 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/[0.02] blur-[120px] rounded-full -z-10"></div>
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white/5 border border-white/10 rounded-3xl sm:rounded-[48px] overflow-hidden shadow-2xl relative z-10"
      >
        <div className="grid lg:grid-cols-2">
          <div className="p-6 sm:p-12 md:p-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/5 border border-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest mb-8 w-fit">
                FTMO Compliant
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tighter mb-6 sm:mb-8 uppercase">Prop Firm <span className="text-gray-500">Ready</span></h2>
              <p className="text-gray-400 text-lg font-medium leading-relaxed mb-10">
                FlexBot is explicitly engineered to pass and maintain strict prop firm challenges like FTMO. Our strict parameter protocol ensures absolute compliance.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-[20px] transition-colors hover:bg-white/10">
                  <PieChart size={24} className="text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="text-white font-black text-sm uppercase">Max Risk: 0.5%</p>
                    <p className="text-gray-500 text-[9px] font-bold uppercase tracking-widest">Per Trade Strict Limit</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-[20px] transition-colors hover:bg-white/10">
                  <Activity size={24} className="text-purple-500 flex-shrink-0" />
                  <div>
                    <p className="text-white font-black text-sm uppercase">1 Trade Max</p>
                    <p className="text-gray-500 text-[9px] font-bold uppercase tracking-widest">Open At Any Time</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-[20px] transition-colors hover:bg-white/10">
                  <Clock size={24} className="text-yellow-500 flex-shrink-0" />
                  <div>
                    <p className="text-white font-black text-sm uppercase">No News Trading</p>
                    <p className="text-gray-500 text-[9px] font-bold uppercase tracking-widest">Avoids High Impact</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-[20px] transition-colors hover:bg-white/10">
                  <Shield size={24} className="text-green-500 flex-shrink-0" />
                  <div>
                    <p className="text-white font-black text-sm uppercase">Balanced Logic</p>
                    <p className="text-gray-500 text-[9px] font-bold uppercase tracking-widest">No One-Side Betting</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1 }}
            className="h-full lg:h-auto relative overflow-hidden"
          >
            <img src="/ftmo-reward.jpeg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.25] z-0" style={{ objectPosition: 'center 30%' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent z-[1]"></div>
            <div className="relative z-[2]">
              <ChallengeSteps />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "How does FlexBot AI work?",
      a: "FlexBot AI is a plug-and-play Expert Advisor for MetaTrader. It automatically copies trades from our Master Neural Account to your broker. You maintain 100% control of your funds."
    },
    {
      q: "Do I need to send money to FlexBot AI?",
      a: "No. You never send your trading capital to us. Your money stays in your own brokerage account. You only pay for the software license."
    },
    {
      q: "Which brokers are supported?",
      a: "FlexBot AI works with any broker supporting MetaTrader 5. We recommend low-spread brokers for gold (XAU/USD)."
    },
    {
      q: "What is the fixed price?",
      a: "The FlexBot AI lifetime license is available for a one-time payment of $500. This includes all future updates to the Neural V5.0 core and 24/7 technical support."
    },
    {
      q: "Are there any recurring fees?",
      a: "A $30/month subscription fee is required to maintain the AI connection and receive real-time neural updates on your account."
    }
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-32 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10 sm:mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-6">
          Support Center
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase mb-4 text-white">Frequently Asked <span className="text-gray-500">Questions</span></h2>
        <p className="text-gray-500 font-medium max-w-2xl mx-auto">Everything you need to know about the Flexbot protocol and our neural execution.</p>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="max-w-3xl mx-auto space-y-4"
      >
        {faqs.map((faq, i) => (
          <div key={i} className="border border-white/5 rounded-2xl overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between text-left"
            >
              <span className="font-bold text-white tracking-tight">{faq.q}</span>
              <div className={`transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}>
                <ArrowUpRight size={18} className="text-blue-500" />
              </div>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-4 sm:px-8 pb-4 sm:pb-6 text-gray-400 text-sm leading-relaxed font-medium"
                >
                  {faq.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      title: "Purchase License",
      desc: "Secure your FlexBot AI lifetime license for $500 via USDT (BEP-20) payment.",
      icon: <DollarSign size={24} />,
      color: "blue"
    },
    {
      title: "Install on MT5",
      desc: "Deploy the FlexBot AI software on your MetaTrader 5 terminal using our 5-minute guide.",
      icon: <Settings size={24} />,
      color: "yellow"
    },
    {
      title: "Connect AI Core",
      desc: "Link your account to the FlexBot AI Neural Stream for automatic institutional trade copying.",
      icon: <Activity size={24} />,
      color: "blue"
    },
    {
      title: "Full Autonomy",
      desc: "FlexBot AI executes everything. Watch your equity grow while maintaining 100% control.",
      icon: <Shield size={24} />,
      color: "green"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="how-it-works" className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-32 relative">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-6">
          The Process
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tighter mb-6 uppercase text-white">How It <span className="text-gray-500">Works</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">Follow these four steps to initialize institutional execution on your account.</p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 relative"
      >
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1.5, ease: "circIn" }}
          className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-y-1/2 z-0 origin-left"
        ></motion.div>
        
        {steps.map((step, i) => (
          <motion.div 
            key={i} 
            variants={stepVariants}
            className="relative z-10 flex flex-col items-center text-center group"
          >
            <div className={`w-20 h-20 rounded-3xl mb-8 flex items-center justify-center transition-all duration-500 border border-white/10 ${
              step.color === 'blue' ? 'bg-blue-600/10 text-blue-500 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]' :
              step.color === 'green' ? 'bg-green-600/10 text-green-500 group-hover:bg-green-600 group-hover:text-white group-hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]' :
              'bg-yellow-600/10 text-yellow-500 group-hover:bg-yellow-600 group-hover:text-white group-hover:shadow-[0_0_30px_rgba(234,179,8,0.4)]'
            }`}>
              {step.icon}
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center text-[10px] font-black text-white">
                0{i + 1}
              </div>
            </div>
            <h3 className="text-lg font-black text-white mb-3 uppercase tracking-tight">{step.title}</h3>
            <p className="text-gray-500 text-sm font-medium leading-relaxed px-4">{step.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

const TradingViewWidget = () => {
  const container = useRef();
  const [widgetId] = useState("tv_" + Math.random().toString(36).substring(7));

  useEffect(() => {
    let isMounted = true;
    const currentContainer = container.current;

    const createWidget = () => {
      if (!isMounted || !currentContainer) return;
      currentContainer.innerHTML = '';
      
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "autosize": true,
        "symbol": "OANDA:XAUUSD",
        "interval": "1",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "allow_symbol_change": false,
        "container_id": widgetId,
        "backgroundColor": "rgba(0, 0, 0, 0)",
        "gridColor": "rgba(255, 255, 255, 0.05)",
        "hide_top_toolbar": true,
        "hide_legend": true,
        "save_image": false
      });
      
      currentContainer.appendChild(script);
    };

    const timer = setTimeout(createWidget, 500);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      if (currentContainer) currentContainer.innerHTML = '';
    };
  }, [widgetId]);

  return (
    <div className="tradingview-widget-container" style={{ height: "100%", width: "100%" }}>
      <div id={widgetId} ref={container} style={{ height: "100%", width: "100%" }}></div>
    </div>
  );
};

const BackgroundEffects = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-600/[0.03] blur-[150px] rounded-full animate-pulse"></div>
    <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] bg-blue-500/[0.02] blur-[130px] rounded-full"></div>
    <div className="absolute bottom-[-10%] left-[5%] w-[700px] h-[700px] bg-blue-900/[0.03] blur-[140px] rounded-full"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] opacity-50"></div>
  </div>
);

const Logo = ({ className = "" }) => (
  <div className={`flex items-center gap-2 md:gap-3 group cursor-pointer ${className}`}>
    <div className="relative">
      <div className="absolute inset-[-6px] bg-white/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative w-8 h-8 md:w-12 md:h-12 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
        <img 
          src="/FLEX.png" 
          alt="FlexBot AI Logo" 
          className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        />
      </div>
    </div>
    <div className="flex flex-col">
      <div className="flex items-baseline">
        <span className="text-lg md:text-xl font-black tracking-tighter text-white">FlexBot</span>
        <span className="text-lg md:text-xl font-black tracking-tighter text-blue-500 ml-0.5 md:ml-1">AI</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse"></div>
        <span className="text-[6px] md:text-[7px] font-black text-blue-500/50 uppercase tracking-[0.3em] leading-none">Neural Protocol</span>
      </div>
    </div>
  </div>
);

const ChallengeSteps = () => (
  <div className="w-full h-full relative bg-transparent p-5 sm:p-8 md:p-12 flex flex-col justify-center overflow-hidden">
    <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
         style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
    </div>
    
    <div className="relative z-10 mb-10 flex items-end justify-between">
      <div>
        <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-1">Execution Plan</p>
        <h4 className="text-2xl sm:text-3xl font-black tracking-tighter text-white uppercase">How We Pass You</h4>
      </div>
      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-xl">
        <div className="w-2 h-2 rounded-full bg-green-500"></div>
        <span className="text-[8px] font-black text-green-500 uppercase tracking-widest">FTMO Verified</span>
      </div>
    </div>

    <div className="relative z-10 flex-1 flex flex-col gap-6">
      {/* Step 1 */}
      <div className="flex gap-6 relative group">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-black text-sm z-10 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-[0_0_20px_rgba(37,99,235,0.1)] group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]">1</div>
          <div className="w-px h-full bg-gradient-to-b from-blue-500/30 to-purple-500/30 mt-3 absolute top-10 bottom-[-24px]"></div>
        </div>
        <div className="pb-4">
          <h5 className="text-white font-black uppercase text-sm mb-1.5 tracking-tight">Phase 1: Evaluation</h5>
          <p className="text-gray-500 text-xs font-medium leading-relaxed">Dynamic lot sizing to safely secure the 8-10% profit target while strictly avoiding the daily drawdown limits.</p>
        </div>
      </div>

      {/* Step 2 */}
      <div className="flex gap-6 relative group mt-4">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-2xl bg-purple-600/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-black text-sm z-10 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-[0_0_20px_rgba(147,51,234,0.1)] group-hover:shadow-[0_0_20px_rgba(147,51,234,0.4)]">2</div>
          <div className="w-px h-full bg-gradient-to-b from-purple-500/30 to-green-500/30 mt-3 absolute top-10 bottom-[-24px]"></div>
        </div>
        <div className="pb-4">
          <h5 className="text-white font-black uppercase text-sm mb-1.5 tracking-tight">Phase 2: Verification</h5>
          <p className="text-gray-500 text-xs font-medium leading-relaxed">Risk parameters are automatically halved. Pure focus on hitting the 5% target with zero stress.</p>
        </div>
      </div>

      {/* Step 3 */}
      <div className="flex gap-6 relative group mt-4">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-2xl bg-green-600/10 border border-green-500/30 flex items-center justify-center text-green-400 font-black text-sm z-10 group-hover:bg-green-600 group-hover:text-white transition-all shadow-[0_0_20px_rgba(34,197,94,0.1)] group-hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]">3</div>
        </div>
        <div>
          <h5 className="text-white font-black uppercase text-sm mb-1.5 tracking-tight">Funded & Payouts</h5>
          <p className="text-gray-500 text-xs font-medium leading-relaxed">Ultra-safe mode activated. The AI trades with maximum capital preservation to generate consistent bi-weekly payouts.</p>
        </div>
      </div>
    </div>
  </div>
);

const ProfessionalIcon = ({ type, color = "blue" }) => {
  const colorClass = 
    color === "green" ? "text-green-500" : 
    color === "purple" ? "text-purple-500" :
    color === "yellow" ? "text-yellow-500" :
    "text-blue-500";
    
  const bgClass = 
    color === "green" ? "bg-green-500/5 border-green-500/20" : 
    color === "purple" ? "bg-purple-500/5 border-purple-500/20" :
    color === "yellow" ? "bg-yellow-500/5 border-yellow-500/20" :
    "bg-blue-500/5 border-blue-500/20";
    
  const icons = {
    withdraw: <Clock size={20} className={colorClass} />,
    secure: <Shield size={20} className={colorClass} />,
    performance: <Activity size={20} className={colorClass} />,
    profit: <DollarSign size={20} className={colorClass} />
  };
  return <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${bgClass} border`}>{icons[type]}</div>;
};

// --- Navbar ---
const Navbar = ({ onBuyClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav className="flex justify-between items-center px-4 md:px-8 py-3 sm:py-4 border-b border-white/10 bg-[#050505]/80 backdrop-blur-2xl sticky top-0 z-50">
        <Link to="/"><Logo /></Link>
        {!isDashboard && (
          <div className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 p-1.5 rounded-full backdrop-blur-xl shadow-inner">
            <Link to="/dashboard" className="px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300">Terminal</Link>
            <div className="w-px h-4 bg-white/10"></div>
            <Link to="/results" className="px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300">Live Results</Link>
            <div className="w-px h-4 bg-white/10"></div>
            <Link to="/how-it-works" className="px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300">How It Works</Link>
          </div>
        )}
        <div className="flex items-center gap-2 md:gap-4">
          {!isDashboard && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X size={22} /> : <Settings size={22} />}
            </button>
          )}
          <Link to="/dashboard" className="group relative flex items-center gap-2 bg-blue-600/10 hover:bg-blue-600 border border-blue-500/20 hover:border-blue-400 px-3 md:px-5 py-2 md:py-2.5 rounded-full transition-all duration-300">
            <div className="flex items-center gap-2 relative z-10">
              <LayoutDashboard size={14} className="text-blue-500 group-hover:text-white transition-colors" />
              <span className="text-xs md:text-sm font-black tracking-widest text-white uppercase">Dashboard</span>
              <ArrowUpRight size={12} className="hidden md:block text-blue-500 group-hover:text-white transition-all" />
            </div>
          </Link>
        </div>
      </nav>
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && !isDashboard && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden fixed top-[57px] left-0 right-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10 p-4"
          >
            <div className="flex flex-col gap-2">
              <Link to="/dashboard" className="px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white hover:bg-white/5 transition-all">Terminal</Link>
              <Link to="/results" className="px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white hover:bg-white/5 transition-all">Live Results</Link>
              <Link to="/how-it-works" className="px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white hover:bg-white/5 transition-all">How It Works</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- Page: Landing ---
const LandingPage = ({ onBuyClick, tradingLogs }) => {
  return (
    <div className="relative">
      <header className="relative w-full lg:h-[calc(100vh-60px)] flex flex-col items-center justify-center overflow-visible">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-blue-900/5 to-transparent"></div>
          <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-blue-600/[0.05] blur-[150px] rounded-full animate-pulse"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.04] mix-blend-overlay"></div>
          <svg className="absolute bottom-0 left-0 w-full h-[60%] opacity-20" viewBox="0 0 1440 400">
            <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 3, ease: "easeInOut" }} d="M0,320 L120,280 L240,340 L360,200 L480,260 L600,140 L720,220 L840,80 L960,160 L1080,40 L1200,100 L1320,20 L1440,60" fill="none" stroke="url(#gradient-line)" strokeWidth="4" />
            <defs><linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#2563eb" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient></defs>
          </svg>
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-0 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-6 max-w-7xl mx-auto">
            {/* Left Column - Text */}
            <motion.div
               initial={{ opacity: 0, x: -50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 1 }}
               className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start"
            >
              <div className="inline-flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-3 lg:mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] lg:text-xs font-bold"><div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>V5.0 NEURAL NETWORK</div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[10px] lg:text-xs font-bold uppercase tracking-widest leading-none"><Zap size={14} className="text-blue-500" />Gold Specialized</div>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-5xl 2xl:text-7xl font-black mb-2 sm:mb-3 lg:mb-3 leading-[1.05] tracking-tight uppercase">Gold <br /><span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">FlexBot AI</span></h1>
              <p className="text-gray-400 text-sm sm:text-base lg:text-sm xl:text-base max-w-xl mx-auto lg:mx-0 mb-4 sm:mb-6 lg:mb-5 leading-relaxed font-medium">Get the <span className="text-white font-black">Flexbot Expert Advisor</span>. Institutional-grade gold trading software copied directly to <span className="text-white font-bold">your own broker account</span>.</p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start w-full sm:w-auto relative">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 sm:left-auto sm:right-[-40px] sm:translate-x-0 rotate-12 z-20">
                  <div className="bg-blue-600 text-white text-[9px] font-black px-3 py-1 rounded-lg shadow-xl flex flex-col items-center border border-white/20">
                    <span>$500 LIFETIME</span>
                    <span className="text-[6px] mt-0.5 opacity-70">LIMITED SLOTS</span>
                  </div>
                </div>
                <button onClick={onBuyClick} className="bg-blue-600 hover:bg-blue-500 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl font-black text-sm sm:text-base transition-all shadow-[0_10px_50px_rgba(37,99,235,0.4)] hover:-translate-y-1 group flex items-center justify-center gap-3">GET FLEXBOT AI <ArrowUpRight className="group-hover:translate-x-1 transition-transform" size={18} /></button>
                <a href="#how-it-works" className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl font-black text-sm sm:text-base transition-all backdrop-blur-md flex items-center justify-center">HOW IT WORKS</a>
              </div>
            </motion.div>

            {/* Right Column - Astronaut */}
            <motion.div
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 1, delay: 0.2 }}
               className="flex-1 relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[380px] xl:max-w-[450px] 2xl:max-w-[550px] flex justify-center items-center pointer-events-none mt-4 lg:mt-0"
            >
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-600/10 blur-[130px] rounded-full -z-10 animate-pulse"></div>
               <motion.img
                  initial={{ y: 0 }}
                  animate={{ y: [-15, 15, -15] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  src="/photo_2026-04-04_12-16-05.jpg"
                  alt="FlexBot FTMO Astronaut"
                  className="w-full h-auto object-contain mix-blend-lighten contrast-[1.2] opacity-100 drop-shadow-2xl"
                  style={{ maskImage: 'radial-gradient(ellipse at center, black 45%, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 45%, transparent 75%)' }}
               />
            </motion.div>
          </div>
        </div>
      </header>
      
      {/* Decorative Section Divider */}
      <div className="relative h-px w-full max-w-6xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500/10 blur-xl rounded-full"></div>
      </div>
      
      <PerformanceSection />
      <SectionDivider />
      
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/[0.01] pointer-events-none"></div>
        <HowItWorks />
      </div>
      
      <SectionDivider />
      <FeaturesSection />
      
      <SectionDivider />
      <TelegramSection />
      
      <SectionDivider />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/[0.01] pointer-events-none"></div>
        <FAQSection />
      </div>

      <RiskDisclaimer />
    </div>
  );
};

// --- Page: Dashboard ---
// --- Helpers for Real Analysis ---
const calculateSMA = (prices, period) => {
  if (prices.length < period) return null;
  return prices.slice(-period).reduce((a, b) => a + b, 0) / period;
};

const calculateRSI = (prices, period = 14) => {
  if (prices.length < period + 1) return 50;
  let gains = 0, losses = 0;
  for (let i = prices.length - period; i < prices.length; i++) {
    const diff = prices[i] - prices[i - 1];
    if (diff >= 0) gains += diff; else losses -= diff;
  }
  if (losses === 0) return 100;
  const rs = gains / losses;
  return 100 - (100 / (1 + rs));
};

  // --- Account History Chart ---
const AccountHistoryChart = ({ isLinked, dailyGrowth }) => {
  const [timeRange, setTimeRange] = useState('1W');

  // Simulated data for different time ranges
  const getChartData = () => {
    if (!isLinked) return Array(30).fill(50);
    
    // If we have real daily growth data, use it for 1W and 1M
    if (dailyGrowth && dailyGrowth.length > 0) {
      const growthPoints = dailyGrowth.map(d => d.profitPercentage || 0);
      
      // Calculate cumulative growth starting from 50 (middle of the chart)
      let cumulative = 50;
      const realPoints = growthPoints.map(p => {
        cumulative += p;
        return cumulative;
      });

      if (timeRange === '1W') return realPoints.slice(-7);
      if (timeRange === '1M') return realPoints.slice(-30);
    }
    
    switch(timeRange) {
      case '1D': // Last 24 hours (simulated 24 points)
        return [50, 51, 49, 52, 53, 52, 54, 55, 54, 56, 57, 55, 58, 59, 58, 60, 61, 60, 62, 63, 62, 64, 65, 64];
      case '1W': // Last 7 days
        return [50, 55, 52, 60, 58, 65, 68];
      case '1M': // Last 30 days
        return [50, 52, 48, 55, 58, 54, 60, 65, 62, 58, 63, 68, 72, 70, 75, 78, 74, 80, 85, 82, 88, 92, 90, 95, 98, 102, 100, 105, 110, 108];
      case '1Y': // Last 12 months
        return [50, 60, 55, 75, 85, 80, 100, 110, 105, 125, 140, 135];
      default:
        return Array(30).fill(50);
    }
  };

  const points = getChartData();
  const minPoint = Math.min(...points);
  const maxPoint = Math.max(...points);
  const range = maxPoint - minPoint || 1;
  
  // Normalize points to fit 0-100 scale (inverted for SVG where 0 is top)
  const normalizedPoints = points.map(p => 100 - ((p - minPoint) / range) * 80 - 10);
  const pathData = normalizedPoints.length > 1
    ? normalizedPoints.map((p, i) => `${(i / (normalizedPoints.length - 1)) * 100},${p}`).join(' L ')
    : `0,${normalizedPoints[0] || 50} L 100,${normalizedPoints[0] || 50}`;

  const getXLabels = () => {
    if (isLinked && dailyGrowth && dailyGrowth.length > 0) {
      const dates = dailyGrowth.slice(timeRange === '1W' ? -7 : -30).map(d => 
        new Date(d.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
      );
      if (dates.length > 5) {
        return [dates[0], dates[Math.floor(dates.length/4)], dates[Math.floor(dates.length/2)], dates[Math.floor(3*dates.length/4)], dates[dates.length-1]];
      }
      return dates;
    }
    switch(timeRange) {
      case '1D': return ['00:00', '06:00', '12:00', '18:00', '23:59'];
      case '1W': return ['Jan 05', 'Jan 06', 'Jan 07', 'Jan 08', 'Jan 09', 'Jan 10', 'Jan 11'];
      case '1M': return ['Dec 12', 'Dec 18', 'Dec 24', 'Dec 30', 'Jan 05', 'Jan 11'];
      case '1Y': return ['Feb 25', 'Apr 25', 'Jun 25', 'Aug 25', 'Oct 25', 'Dec 25'];
      default: return [];
    }
  };

  const xLabels = getXLabels();

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-[40px] p-4 sm:p-6 md:p-10 relative overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 mb-6 sm:mb-10">
        <div>
          <h3 className="text-2xl font-black tracking-tight text-white uppercase">Growth Analysis</h3>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Performance History ({timeRange})</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/10">
          {['1D', '1W', '1M', '1Y'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${timeRange === range ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[240px] w-full relative mt-4">
        {/* Y-Axis Grid Lines */}
            {[0, 25, 50, 75, 100].map((g) => (
              <div key={g} className="absolute left-0 right-0 border-b border-white/5" style={{ top: `${g}%` }}>
                <span className="absolute -left-2 -translate-x-full -translate-y-1/2 text-[8px] font-black text-white uppercase">
                  {isLinked ? (g === 50 ? '0%' : g < 50 ? `+${(50-g)*2}%` : `-${(g-50)*2}%`) : '0%'}
                </span>
              </div>
            ))}

        {/* Middle Baseline Indicator */}
        <div className="absolute left-0 right-0 border-b border-blue-500/20 top-1/2 z-0"></div>

        <svg className="w-full h-full overflow-visible relative z-10" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Area Fill */}
          <motion.path
            key={`area-${timeRange}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            fill="url(#chartGradient)"
            d={`M 0,100 L ${pathData} L 100,100 Z`}
          />

          {/* Line */}
          <motion.path
            key={`line-${timeRange}`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d={`M ${pathData}`}
          />

          {/* Data Points */}
          {normalizedPoints.map((p, i) => (
            <motion.circle
              key={`${timeRange}-${i}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * (1/normalizedPoints.length) }}
              cx={(i / (normalizedPoints.length - 1)) * 100}
              cy={p}
              r="0.8"
              fill="#3b82f6"
              className="cursor-pointer hover:r-1.5 transition-all"
            />
          ))}
        </svg>

        {/* X-Axis Labels */}
            <div className="absolute -bottom-8 left-0 right-0 flex justify-between px-1">
              {xLabels.map((label, idx) => (
                <span key={idx} className="text-[8px] font-black text-white uppercase">{label}</span>
              ))}
            </div>
      </div>
    </div>
  );
};

const TradingViewAnalysisWidget = ({ analysis }) => {
  const isBuy = analysis.sentiment.includes('Buy');
  const isStrongBuy = analysis.sentiment.includes('Strong Buy');
  const isSell = analysis.sentiment.includes('Sell');
  const isStrongSell = analysis.sentiment.includes('Strong Sell');
  
  const color = isStrongBuy || isBuy ? 'text-green-500' : isStrongSell || isSell ? 'text-red-400' : 'text-blue-400';
  const bgColor = isStrongBuy || isBuy ? 'bg-green-500/10' : isStrongSell || isSell ? 'bg-red-500/10' : 'bg-blue-500/10';
  const borderColor = isStrongBuy || isBuy ? 'border-green-500/20' : isStrongSell || isSell ? 'border-red-500/20' : 'border-blue-500/20';
  const dotColor = isStrongBuy || isBuy ? 'bg-green-500' : isStrongSell || isSell ? 'bg-red-500' : 'bg-blue-500';

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex-1 flex flex-col items-center justify-center relative py-4">
        {/* Neural Scan Ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className={`w-36 h-36 rounded-full border border-dashed opacity-20 ${color.replace('text-', 'border-')}`}
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className={`w-28 h-28 rounded-full border border-dotted opacity-10 ${color.replace('text-', 'border-')}`}
          />
        </div>
        
        <div className="relative z-10 text-center">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${bgColor} border ${borderColor} mb-4`}>
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${dotColor}`} />
            <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${color}`}>Neural Sentiment Pulse</span>
          </div>
          <h4 className={`text-4xl font-black italic uppercase tracking-tighter mb-2 ${color}`}>
            {analysis.sentiment.split(' / ')[0]}
          </h4>
          <div className="flex items-center justify-center gap-2">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest opacity-60">Neural Accuracy</span>
            <span className="text-[10px] font-black text-white">{analysis.confidence}%</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {[
          { label: 'Moving Avg', value: analysis.movingAvg || 'NEUTRAL', color: analysis.movingAvg === 'BUY' ? 'text-green-500' : analysis.movingAvg === 'SELL' ? 'text-red-400' : 'text-gray-400' },
          { label: 'Oscillators', value: analysis.oscillator || 'NEUTRAL', color: analysis.oscillator === 'BUY' ? 'text-green-500' : analysis.oscillator === 'SELL' ? 'text-red-400' : 'text-gray-400' },
          { label: 'Liquidity', value: analysis.liquidity || 'STABLE', color: 'text-blue-400' }
        ].map((item, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center backdrop-blur-sm transition-all hover:bg-white/10">
            <p className="text-[7px] font-black text-gray-500 uppercase mb-1.5 tracking-tighter">{item.label}</p>
            <p className={`text-[9px] font-black ${item.color} leading-none`}>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Page: Results ---
const FLEXBOT_SERVER = 'https://flexbot-qpf2.onrender.com';

const ResultsPage = () => {
  const [trades, setTrades] = useState([]);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weekOffset, setWeekOffset] = useState(0);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const res = await fetch(`${FLEXBOT_SERVER}/api/trades?limit=2000`);
        const data = await res.json();
        if (data.ok) {
          setTrades(data.trades || []);
          setAccount(data.account || null);
        }
      } catch (e) {
        console.error('[Results] Failed to fetch trades:', e);
      }
      setLoading(false);
    };
    fetchTrades();
    const interval = setInterval(fetchTrades, 30000);
    return () => clearInterval(interval);
  }, []);

  const parseResult = (r) => {
    if (!r) return 0;
    const cleaned = String(r).replace(/[^0-9.\-+]/g, '');
    return parseFloat(cleaned) || 0;
  };

  // Get week start (Monday) for a given date
  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  // Current selected week range
  const now = new Date();
  const currentWeekStart = getWeekStart(now);
  const selectedWeekStart = new Date(currentWeekStart);
  selectedWeekStart.setDate(selectedWeekStart.getDate() + weekOffset * 7);
  const selectedWeekEnd = new Date(selectedWeekStart);
  selectedWeekEnd.setDate(selectedWeekEnd.getDate() + 6);

  const weekLabel = `${selectedWeekStart.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} — ${selectedWeekEnd.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`;

  // Filter trades for selected week (exclude weekends and trades without result)
  const weekTrades = trades.filter(t => {
    if (!t.result || t.outcome === 'closed') return false;
    const ts = t.closed_at || t.opened_at;
    if (!ts) return false;
    const d = new Date(ts);
    const day = d.getDay();
    if (day === 0 || day === 6) return false;
    return d >= selectedWeekStart && d <= new Date(selectedWeekEnd.getTime() + 86400000);
  });

  // Group filtered trades by day
  const tradesByDay = {};
  weekTrades.forEach(t => {
    const ts = t.closed_at || t.opened_at;
    if (!ts) return;
    const date = new Date(ts).toISOString().split('T')[0];
    if (!tradesByDay[date]) tradesByDay[date] = { trades: [], totalProfit: 0 };
    const profit = parseResult(t.result);
    tradesByDay[date].trades.push({ ...t, profitNum: profit });
    tradesByDay[date].totalProfit += profit;
  });

  const sortedDays = Object.keys(tradesByDay).sort((a, b) => new Date(b) - new Date(a));

  // Stats for selected week
  const weekProfit = weekTrades.reduce((acc, t) => acc + parseResult(t.result), 0);
  const weekWins = weekTrades.filter(t => t.outcome === 'TP' || parseResult(t.result) > 0).length;
  const weekWinRate = weekTrades.length > 0 ? ((weekWins / weekTrades.length) * 100).toFixed(1) : '0';

  // Check if there are trades in older weeks (for prev button)
  const oldestTrade = trades.length > 0 ? Math.min(...trades.map(t => t.closed_at || t.opened_at || Infinity)) : null;
  const oldestWeekStart = oldestTrade ? getWeekStart(new Date(oldestTrade)) : null;
  const canGoPrev = oldestWeekStart ? selectedWeekStart > oldestWeekStart : false;

  return (
    <div className="relative min-h-screen pt-12 sm:pt-24 pb-12 sm:pb-20">
      <div className="absolute inset-0 bg-blue-600/[0.02] pointer-events-none"></div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/5 border border-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> Live MT5 Verification
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-4 text-white uppercase">Live <span className="text-gray-500">Results</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Real-time performance tracked directly from our Master EA account. Complete transparency.
          </p>
        </div>

        {/* Trading Journal */}
        <div className="max-w-6xl mx-auto bg-white/[0.02] border border-white/[0.05] rounded-2xl sm:rounded-[48px] p-4 sm:p-6 md:p-12 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/[0.03] blur-[150px] rounded-full -z-10 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-green-500/[0.02] blur-[150px] rounded-full -z-10"></div>

          {/* Header */}
          <div className="mb-6 sm:mb-8 border-b border-white/5 pb-4 sm:pb-6 space-y-3 sm:space-y-4">
            {/* Title row */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <LayoutDashboard className="text-blue-500 w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-lg md:text-xl font-black text-white uppercase tracking-tighter leading-tight truncate">Trading Journal</h3>
                <p className="text-gray-500 font-medium text-[9px] sm:text-[10px] truncate">Master EA {account ? `— ${account.server}` : ''}</p>
              </div>
            </div>

            {/* Week selector + stats row */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              {/* Week selector */}
              <div className="flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-full">
                <button
                  onClick={() => canGoPrev && setWeekOffset(prev => prev - 1)}
                  disabled={!canGoPrev}
                  className={`p-1.5 rounded-full transition-all shrink-0 ${!canGoPrev ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 hover:text-white text-gray-400'}`}
                >
                  <ChevronLeft size={14} />
                </button>
                <div className="flex-1 px-2 text-[9px] sm:text-[10px] font-black text-white tracking-wider uppercase text-center whitespace-nowrap">
                  {weekLabel}
                </div>
                <button
                  onClick={() => weekOffset < 0 && setWeekOffset(prev => prev + 1)}
                  disabled={weekOffset >= 0}
                  className={`p-1.5 rounded-full transition-all shrink-0 ${weekOffset >= 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 hover:text-white text-gray-400'}`}
                >
                  <ChevronRight size={14} />
                </button>
              </div>

              {/* Weekly stats */}
              <div className="grid grid-cols-3 bg-white/5 rounded-full border border-white/10 overflow-hidden flex-1">
                <div className="text-center py-2 px-2">
                  <p className="text-[7px] sm:text-[8px] font-black text-gray-500 uppercase tracking-widest leading-none mb-0.5">Win</p>
                  <p className="text-xs sm:text-sm font-black text-white tabular-nums leading-none">{weekWinRate}%</p>
                </div>
                <div className="text-center py-2 px-2 border-x border-white/10">
                  <p className="text-[7px] sm:text-[8px] font-black text-gray-500 uppercase tracking-widest leading-none mb-0.5">Trades</p>
                  <p className="text-xs sm:text-sm font-black text-white tabular-nums leading-none">{weekTrades.length}</p>
                </div>
                <div className="text-center py-2 px-2 min-w-0">
                  <p className="text-[7px] sm:text-[8px] font-black text-gray-500 uppercase tracking-widest leading-none mb-0.5">P/L</p>
                  <p className={`text-xs sm:text-sm font-black tabular-nums truncate leading-none ${weekProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {weekProfit >= 0 ? '+' : '-'}${Math.abs(weekProfit).toFixed(0)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="py-20 flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Connecting to Master MT5...</p>
            </div>
          ) : weekTrades.length === 0 ? (
            <div className="py-20 text-center">
              <Activity size={32} className="text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">No trades this week</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Headers */}
              <div className="hidden md:grid grid-cols-5 gap-4 px-6 pb-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                <div>Date</div>
                <div>Trades</div>
                <div>Net P/L ($)</div>
                <div>Type</div>
                <div className="text-right">Symbol</div>
              </div>

              {/* Group by day */}
              {sortedDays.map((dateKey, di) => {
                const dayData = tradesByDay[dateKey];
                const dayProfit = dayData.totalProfit;
                const dayWin = dayProfit >= 0;
                const displayDate = new Date(dateKey).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                const tpCount = dayData.trades.filter(t => t.outcome === 'TP').length;
                const slCount = dayData.trades.filter(t => t.outcome === 'SL').length;

                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: di * 0.05 }}
                    key={dateKey}
                    className="bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300"
                  >
                    {/* Day header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-6 md:px-8 md:py-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shrink-0 ${dayWin ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                          {dayData.trades.length}
                        </div>
                        <div>
                          <p className="text-base sm:text-lg font-black text-white">{displayDate}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {tpCount > 0 && <span className="text-[9px] font-black text-green-500 bg-green-500/10 px-2 py-0.5 rounded">{tpCount} TP</span>}
                            {slCount > 0 && <span className="text-[9px] font-black text-red-400 bg-red-500/10 px-2 py-0.5 rounded">{slCount} SL</span>}
                            <span className="text-[9px] font-bold text-gray-600 uppercase">{dayData.trades[0]?.symbol || 'XAUUSD'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 sm:gap-6">
                        <p className={`text-xl sm:text-2xl md:text-3xl font-black tracking-tight tabular-nums ${dayWin ? 'text-green-500' : 'text-red-400'}`}>
                          {dayProfit !== 0 ? `${dayWin ? '+' : '-'}$${Math.abs(dayProfit).toFixed(2)}` : (tpCount > slCount ? 'WIN' : 'LOSS')}
                        </p>
                      </div>
                    </div>

                    {/* Individual trades table */}
                    <div className="border-t border-white/5">
                      {dayData.trades.map((t, ti) => {
                        const isTP = t.outcome && t.outcome.toUpperCase().includes('TP');
                        const isSL = t.outcome && t.outcome.toUpperCase().includes('SL');
                        return (
                          <div key={ti} className={`flex items-center justify-between gap-2 px-3 sm:px-6 md:px-8 py-3 sm:py-4 ${ti !== dayData.trades.length - 1 ? 'border-b border-white/[0.03]' : ''} hover:bg-white/[0.02] transition-colors`}>
                            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                              <span className={`w-12 sm:w-14 text-center px-2 py-1 rounded-lg text-[10px] sm:text-xs font-black shrink-0 ${t.direction === 'BUY' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                {t.direction}
                              </span>
                              <span className="text-sm sm:text-base font-mono font-bold text-white tabular-nums shrink-0">
                                {t.closed_at ? new Date(t.closed_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                              </span>
                              {t.entry_price && <span className="text-sm sm:text-base font-bold text-gray-300 tabular-nums truncate">@ {t.entry_price}</span>}
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                              <span className={`text-sm sm:text-base font-black tabular-nums ${t.profitNum >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {t.result ? t.result : (t.profitNum !== 0 ? `${t.profitNum >= 0 ? '+' : ''}$${Math.abs(t.profitNum).toFixed(2)}` : '—')}
                              </span>
                              <span className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-black uppercase ${isTP ? 'bg-green-500/15 text-green-400 border border-green-500/30' : isSL ? 'bg-red-500/15 text-red-400 border border-red-500/30' : 'bg-white/5 text-gray-400 border border-white/10'}`}>
                                {isTP ? 'TP' : isSL ? 'SL' : '—'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ tradingLogs, onBuyClick }) => {
  const navigate = useNavigate();
  const [, setCurrentGoldPrice] = useState(4432.69);
  const [, setPriceHistory] = useState([]);
  const [isInitialAnalysis, setIsInitialAnalysis] = useState(true);
  const [lastSignalTime, setLastSignalTime] = useState(0);
  const [analysis, setAnalysis] = useState({ target: 0, stopLoss: 0, confidence: 0, reason: "Initializing Neural Core...", sentiment: "Analyzing" });
  const [activeSignal, setActiveSignal] = useState(null);
  const [masterStats, setMasterStats] = useState(null);

  // Fetch real active signal + master account stats from server
  useEffect(() => {
    const fetchServerData = async () => {
      try {
        const [sigRes, tradesRes] = await Promise.all([
          fetch(`${FLEXBOT_SERVER}/api/active-signal?symbol=XAUUSD`),
          fetch(`${FLEXBOT_SERVER}/api/trades?limit=2000`),
        ]);
        const sigData = await sigRes.json();
        const tradesData = await tradesRes.json();
        if (sigData.ok) setActiveSignal(sigData.signal);
        if (tradesData.ok) {
          const START_BALANCE = 100000;
          const LIVE_START_MS = new Date('2026-03-26T00:00:00Z').getTime();
          const parseR = (r) => parseFloat(String(r).replace(/[^0-9.\-+]/g, '')) || 0;
          const trades = (tradesData.trades || []).filter(t =>
            t.result && t.outcome !== 'closed' && (t.closed_at || 0) >= LIVE_START_MS
          );
          const wins = trades.filter(t => parseR(t.result) > 0).length;
          const winRate = trades.length > 0 ? (wins / trades.length) * 100 : 0;
          const balance = tradesData.account?.balance || START_BALANCE;
          const equity = tradesData.account?.equity || balance;
          const totalProfit = equity - START_BALANCE;
          // Max drawdown from running balance since live start
          let peak = START_BALANCE, running = START_BALANCE, maxDD = 0;
          [...trades].reverse().forEach(t => {
            running += parseR(t.result);
            if (running > peak) peak = running;
            const dd = peak - running;
            if (dd > maxDD) maxDD = dd;
          });
          const maxDDPct = (maxDD / START_BALANCE) * 100;
          setMasterStats({
            equity,
            balance,
            totalProfit,
            winRate,
            maxDrawdown: maxDDPct,
            tradeCount: trades.length,
          });
        }
      } catch (e) {
        console.error('[Dashboard] Failed to fetch server data:', e);
      }
    };
    fetchServerData();
    const interval = setInterval(fetchServerData, 15000);
    return () => clearInterval(interval);
  }, []);

  // --- MetaTrader Account State ---
  const [isLinked, setIsLinked] = useState(false);
  const [isLinking, setIsLinking] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const [formData, setFormData] = useState({
    server: '',
    accountId: '',
    password: '',
    platform: 'mt5'
  });
  const [accountInfo, setAccountInfo] = useState({
    id: '',
    server: '',
    balance: 10000.00,
    equity: 10000.00,
    profit: 0.00,
    trades: [],
    metrics: {
      winRate: 0,
      profitFactor: 0,
      totalTrades: 0,
      averageWin: 0,
      averageLoss: 0,
      maxDrawdown: 0
    }
  });

  // Auto-link account if credentials exist in localStorage
  useEffect(() => {
    const savedCreds = localStorage.getItem('metaTrader_creds');
    if (savedCreds && !isLinked) {
      try {
        const credentials = JSON.parse(savedCreds);
        setFormData(prev => ({
          ...prev,
          server: credentials.server || '',
          accountId: credentials.accountId || '',
          password: credentials.password || '',
          platform: credentials.platform || 'mt5'
        }));
        
        console.log("[AutoLink] Credentials found, connecting...");
        
        const autoLink = async () => {
          setIsLinking(true);
          try {
            const linkResult = await metaApiService.linkAccount(credentials);
            if (linkResult) {
              setAccountInfo(prev => ({
                ...prev,
                id: linkResult.id,
                server: credentials.server,
                isSimulated: false
              }));
              setIsLinked(true);
              console.log("[AutoLink] Successfully connected to account:", linkResult.id);
            }
          } catch (err) {
            console.error("[AutoLink] Error connecting:", err);
          } finally {
            setIsLinking(false);
          }
        };
        autoLink();
      } catch (e) {
        console.error("Failed to parse saved credentials", e);
        localStorage.removeItem('metaTrader_creds');
      }
    }
  }, [isLinked]);

  const handleLinkAccount = async (e) => {
    if (e) e.preventDefault();
    setIsLinking(true);
    
    const credentials = {
      server: formData.server,
      accountId: formData.accountId,
      password: formData.password,
      platform: formData.platform
    };

    try {
      const linkResult = await metaApiService.linkAccount(credentials);
      
      if (linkResult && !linkResult.error) {
        if (rememberMe) {
          localStorage.setItem('metaTrader_creds', JSON.stringify(credentials));
        } else {
          localStorage.removeItem('metaTrader_creds');
        }

        setIsLinked(true);
        setAccountInfo(prev => ({
          ...prev,
          id: linkResult.id,
          server: credentials.server,
          platform: credentials.platform,
          isSimulated: linkResult.simulated,
          balance: prev.balance || 0,
          equity: prev.equity || 0,
          profit: prev.profit || 0,
          trades: []
        }));

        // Give the account time to boot on the server
        setTimeout(() => {
          // De useEffect zal dit oppakken omdat isLinked is veranderd
        }, 2000);

      } else {
        alert("Could not connect. Please check your login credentials, server name and password.");
      }
    } catch (err) {
      console.error("Link error:", err);
      alert("Something went wrong while linking your account.");
    } finally {
      setIsLinking(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('metaTrader_creds');
    setIsLinked(false);
    setFormData({
      server: '',
      accountId: '',
      password: '',
      platform: 'mt5'
    });
    setAccountInfo({
      id: '',
      server: '',
      balance: 10000.00,
      equity: 10000.00,
      profit: 0.00,
      trades: [],
      metrics: {
        winRate: 0,
        profitFactor: 0,
        totalTrades: 0,
        averageWin: 0,
        averageLoss: 0,
        maxDrawdown: 0
      }
    });
  };

  useEffect(() => {
    if (isLinked && accountInfo.id) {
      const fetchData = async () => {
        const info = await metaApiService.getAccountInformation(accountInfo.id);
        const positions = await metaApiService.getOpenPositions(accountInfo.id);
        const metrics = await metaApiService.getAccountMetrics(accountInfo.id);

        if (info || metrics) {
          setAccountInfo(prev => ({
            ...prev,
            balance: info?.balance ?? metrics?.balance ?? prev.balance ?? 0,
            equity: info?.equity ?? metrics?.equity ?? prev.equity ?? 0,
            profit: info?.profit ?? (metrics ? (metrics.equity - metrics.balance) : prev.profit) ?? 0,
            isSimulated: false,
            metrics: metrics ? {
              winRate: metrics.winRate || 0,
              profitFactor: metrics.profitFactor || 0,
              totalTrades: metrics.totalTrades || 0,
              averageWin: metrics.averageWin || 0,
              averageLoss: metrics.averageLoss || 0,
              maxDrawdown: metrics.maxDrawdown || 0,
              deposits: metrics.deposits || 0,
              withdrawals: metrics.withdrawals || 0,
              totalProfit: metrics.totalProfit || 0,
              dailyGrowth: metrics.dailyGrowth || [],
              trades: metrics.trades || []
            } : prev.metrics,
            trades: (positions || []).map(p => ({
              id: `#${p.id}`,
              pair: p.symbol || 'N/A',
              type: p.type?.includes('BUY') ? 'BUY' : 'SELL',
              size: (p.volume || 0).toFixed(2),
              entry: (p.openPrice || 0).toFixed(2),
              current: (p.currentPrice || 0).toFixed(2),
              pnl: (p.unrealizedProfit || 0).toFixed(2),
              status: 'Active',
              time: p.time || new Date().toISOString()
            }))
          }));
        } else {
          // Alleen simuleren als we ECHT niks hebben van geen enkele API
          console.warn("[Dashboard] No data from Trading and Stats API, falling back to simulation.");
          setAccountInfo(prev => {
            const baseBalance = prev.balance || 15000;
            const newProfit = (prev.profit || 0) + (Math.random() * 2 - 1);
            return {
              ...prev,
              balance: baseBalance,
              equity: baseBalance + newProfit,
              profit: newProfit,
              isSimulated: true
            };
          });
        }
      };

      fetchData();
      const interval = setInterval(fetchData, 5000);
      return () => clearInterval(interval);
    }
  }, [isLinked, accountInfo.id]);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialAnalysis(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=PAXGUSDT');
        if (!response.ok) return;
        const data = await response.json();
        const price = parseFloat(data.price);
        setCurrentGoldPrice(price);
        setPriceHistory(prev => {
          const newHistory = [...prev, price].slice(-200);
          const now = Date.now();
          
          // --- REAL TECHNICAL ANALYSIS ---
          const sma20 = calculateSMA(newHistory, 20);
          const sma50 = calculateSMA(newHistory, 50);
          const rsi = calculateRSI(newHistory, 14);
          
          let movingAvg = 'NEUTRAL';
          if (sma20 && sma50) {
            if (price > sma20 && sma20 > sma50) movingAvg = 'BUY';
            else if (price < sma20 && sma20 < sma50) movingAvg = 'SELL';
          }
          
          let oscillator = 'NEUTRAL';
          if (rsi > 70) oscillator = 'SELL'; // Overbought
          else if (rsi < 30) oscillator = 'BUY'; // Oversold
          
          const totalChange = price - (newHistory[0] || price);
          let sentiment, reason, confidence, target, stopLoss;
          
          if (movingAvg === 'BUY' && oscillator === 'BUY') { sentiment = "Strong Buy"; reason = "Neural & Technical Alignment (SMA+RSI)"; confidence = (96 + Math.random() * 2).toFixed(1); target = price + 15.00; stopLoss = price - 7.50; }
          else if (movingAvg === 'BUY' || totalChange > 2.0) { sentiment = "Bullish / Buy"; reason = "Trend Expansion detected"; confidence = (88 + Math.random() * 5).toFixed(1); target = price + 8.50; stopLoss = price - 4.20; }
          else if (movingAvg === 'SELL' && oscillator === 'SELL') { sentiment = "Strong Sell"; reason = "Institutional Liquidity Exit"; confidence = (94 + Math.random() * 3).toFixed(1); target = price - 18.20; stopLoss = price + 9.10; }
          else if (movingAvg === 'SELL' || totalChange < -2.0) { sentiment = "Bearish / Sell"; reason = "Market Structure Break"; confidence = (85 + Math.random() * 6).toFixed(1); target = price - 9.40; stopLoss = price + 4.80; }
          else { sentiment = "Neutral / Wait"; reason = "M15 Equilibrium Zone"; confidence = (82 + Math.random() * 4).toFixed(1); target = price + 1.50; stopLoss = price - 1.50; }
          
          if (!isInitialAnalysis) {
            setAnalysis(prev => {
              const shouldUpdate = now - lastSignalTime > 900000 || lastSignalTime === 0;
              if (shouldUpdate) {
                setLastSignalTime(now);
                return { target, stopLoss, confidence, reason, sentiment, movingAvg, oscillator, liquidity: 'STABLE' };
              }
              return prev;
            });
          } else {
            const thinkingMsgs = ["Scanning M15 Liquidity Pools...", "Calculating Neural Divergence...", "Analyzing Smart Money Pressure..."];
            setAnalysis(prev => ({ ...prev, reason: thinkingMsgs[Math.floor(Date.now() / 1500) % thinkingMsgs.length] }));
          }
          return newHistory;
        });
      } catch (e) {}
    };
    const interval = setInterval(fetchPrice, 4000);
    fetchPrice();
    return () => clearInterval(interval);
  }, [isInitialAnalysis, lastSignalTime, analysis.sentiment]);

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-10 flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-10 relative">
      <aside className="w-full lg:w-72 flex flex-col gap-4 sm:gap-6 lg:sticky lg:top-32 lg:self-start">
        {/* Navigation Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-[32px] p-4 sm:p-6 shadow-xl relative overflow-hidden group">
          <div className="space-y-4 sm:space-y-6 relative z-10">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2 hidden sm:block">Navigation</p>
            <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible">
              {[
                { label: 'Overview', icon: <PieChart size={18} /> }, 
                { label: 'Account', icon: <Wallet size={18} /> }, 
                { label: 'Settings', icon: <Settings size={18} /> }
              ].map((item, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveTab(item.label)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${activeTab === item.label ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                  {item.icon}{item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/5">
            <button onClick={() => navigate('/')} className="flex items-center gap-4 px-4 py-2 text-gray-500 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors group">
              <Home size={16} className="group-hover:scale-110 transition-transform" /> Back to Home
            </button>
          </div>
        </div>

        {/* Dynamic Sidebar Card */}
        {activeTab === 'Account' && !isLinked ? (
          <div className="bg-black/40 border border-white/10 rounded-[32px] p-6 shadow-2xl backdrop-blur-md relative overflow-hidden border-t-blue-500/20">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500 border border-blue-500/20 shadow-inner"><Wallet size={20} /></div>
              <div>
                <h3 className="text-[10px] font-black text-white uppercase tracking-tight">Link MetaTrader</h3>
                <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-0.5 italic">Login with account number</p>
              </div>
            </div>
            
            <form onSubmit={handleLinkAccount} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[8px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Broker Server</label>
                <input 
                  required 
                  name="server" 
                  type="text" 
                  value={formData.server}
                  onChange={(e) => setFormData({...formData, server: e.target.value})}
                  placeholder="e.g. Vantage-Live 3" 
                  className="w-full bg-white/[0.03] border border-white/10 px-4 py-2.5 rounded-xl text-white text-[10px] font-bold focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-700 shadow-inner" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[8px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">MT5 Account Number</label>
                <input 
                  required 
                  name="accountId" 
                  type="text" 
                  value={formData.accountId}
                  onChange={(e) => setFormData({...formData, accountId: e.target.value})}
                  placeholder="e.g. 1234567" 
                  className="w-full bg-white/[0.03] border border-white/10 px-4 py-2.5 rounded-xl text-white text-[10px] font-bold focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-700 shadow-inner" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[8px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Master Password</label>
                <input 
                  required 
                  name="password" 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••" 
                  className="w-full bg-white/[0.03] border border-white/10 px-4 py-2.5 rounded-xl text-white text-[10px] font-bold focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-700 shadow-inner" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[8px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Platform</label>
                <select 
                  name="platform" 
                  value={formData.platform}
                  onChange={(e) => setFormData({...formData, platform: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/10 px-4 py-2.5 rounded-xl text-white text-[10px] font-bold focus:outline-none focus:border-blue-500 transition-all shadow-inner appearance-none cursor-pointer"
                >
                  <option value="mt5" className="bg-[#0a0a0a]">MT5 (MetaTrader 5)</option>
                </select>
              </div>

              <div className="flex items-center gap-2 px-1 py-1">
                <input 
                  type="checkbox" 
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3 h-3 rounded border-white/10 bg-white/5 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                />
                <label htmlFor="rememberMe" className="text-[9px] font-black text-gray-400 uppercase tracking-widest cursor-pointer select-none">Remember password</label>
              </div>

              <button disabled={isLinking} type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-xl font-black text-[10px] tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 mt-2 active:scale-[0.98]">
                {isLinking ? (
                  <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>LINK ACCOUNT <ArrowUpRight size={14} /></>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="bg-black/40 border border-white/10 rounded-[32px] p-6 shadow-2xl backdrop-blur-md relative overflow-hidden border-t-blue-500/20">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-[9px] font-black tracking-widest uppercase text-gray-500">Sentiment</h3>
                  <p className="text-[8px] font-bold text-blue-500 mt-0.5 uppercase">Neural Pulse</p>
                </div>
                <div className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-[8px] font-black text-blue-400">XAU</div>
              </div>
              <div className="h-[280px]">
                <TradingViewAnalysisWidget analysis={analysis} />
              </div>
            </div>

            {isLinked && (
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-4 shadow-xl">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-lg active:scale-95"
                >
                  <LogOut size={14} /> Disconnect Broker
                </button>
              </div>
            )}
          </div>
        )}
      </aside>

      <main className="flex-1 flex flex-col gap-10 min-h-full pb-10">
        {activeTab === 'Account' ? (
          <div className="flex flex-col gap-10">
            {/* Account Tab Content */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${isLinked ? 'bg-green-500/20 text-green-500' : 'bg-blue-600/20 text-blue-500'} rounded-xl flex items-center justify-center`}>
                  {isLinked ? <Activity size={24} /> : <Shield size={24} />}
                </div>
                <div>
                  <h4 className="text-lg font-black text-white uppercase tracking-tight">
                    {isLinked ? (accountInfo.isSimulated ? 'System Local-Mode' : 'System Online') : 'Account Not Linked'}
                  </h4>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                    {isLinked && accountInfo.isSimulated ? (
                      <a href="https://cors-anywhere.herokuapp.com/corsdemo" target="_blank" rel="noopener noreferrer" className="text-yellow-500 animate-pulse flex items-center gap-2 hover:text-white transition-colors">
                        <AlertTriangle size={12} /> Click here and press 'Request temporary access' to activate live data.
                      </a>
                    ) : isLinked ? (
                      `Syncing with MetaTrader ID: ${accountInfo.id}`
                    ) : (
                      'Use your account number in the sidebar to link'
                    )}
                  </div>
                </div>
              </div>
              {isLinked && (
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500/20 transition-all flex items-center gap-2"
                >
                  <Activity size={14} className="rotate-45" /> Disconnect Bridge
                </button>
              )}
              {!isLinked && (
                <div className="flex items-center gap-2 text-blue-400 text-[10px] font-black uppercase tracking-widest animate-pulse px-4 py-2 bg-blue-500/5 border border-blue-500/10 rounded-full">
                  <ArrowDownLeft size={14} /> Use sidebar to link account
                </div>
              )}
            </motion.div>

            {/* Top KPI Cards - Primary Metrics Only */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-10">
              {/* Total Balance Card */}
              <div className="bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20 rounded-2xl sm:rounded-[32px] p-5 sm:p-8 relative overflow-hidden group transition-all hover:bg-blue-600/20 shadow-2xl">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Total Balance</p>
                  <div className="p-2 bg-blue-600/20 rounded-lg text-blue-400 border border-blue-500/30 group-hover:scale-110 transition-transform shadow-inner"><Wallet size={14} /></div>
                </div>
                <h3 className="text-3xl font-black tracking-tighter text-white">
                  {isLinked ? `$${(accountInfo.balance || 0).toLocaleString()}` : '$0'}
                </h3>
                <p className="text-[10px] font-bold text-gray-500 mt-2 uppercase tracking-tight">{isLinked ? accountInfo.server : 'No Connection'}</p>
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Wallet size={120} />
                </div>
              </div>

              {/* Total Result Card */}
              <div className="bg-gradient-to-br from-purple-600/10 to-transparent border border-purple-500/20 rounded-2xl sm:rounded-[32px] p-5 sm:p-8 relative overflow-hidden group transition-all hover:bg-purple-600/20 shadow-2xl">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Total Result</p>
                  <div className="p-2 bg-purple-600/20 rounded-lg text-purple-400 border border-purple-500/30 group-hover:scale-110 transition-transform shadow-inner"><Activity size={14} /></div>
                </div>
                <h3 className={`text-3xl font-black tracking-tighter ${(accountInfo.metrics?.totalProfit || 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {isLinked ? `${(accountInfo.metrics?.totalProfit || 0) >= 0 ? '+' : ''}${(accountInfo.metrics?.totalProfit || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$0'}
                </h3>
                <p className={`text-[10px] font-bold ${(accountInfo.metrics?.totalProfit || 0) >= 0 ? 'text-green-500' : 'text-red-500'} mt-2 uppercase tracking-widest`}>
                  {isLinked ? `${(((accountInfo.metrics?.totalProfit || 0) / (accountInfo.balance || 1)) * 100).toFixed(2)}%` : '0.00%'}
                </p>
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <TrendingUp size={120} />
                </div>
              </div>

              {/* Bridge Status Card */}
              <div className={`${isLinked ? 'bg-blue-600 shadow-[0_20px_40px_rgba(37,99,235,0.3)]' : 'bg-white/5'} border ${isLinked ? 'border-white/20' : 'border-white/10'} rounded-2xl sm:rounded-[32px] p-5 sm:p-8 shadow-2xl transition-all relative overflow-hidden group`}>
                <div className="relative z-10">
                  <p className={`text-[10px] font-black ${isLinked ? 'text-blue-100' : 'text-gray-500'} uppercase tracking-widest mb-1`}>Bridge Status</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className={`w-2 h-2 rounded-full ${isLinked ? 'bg-green-400 animate-pulse shadow-[0_0_12px_#4ade80]' : 'bg-gray-700'}`} />
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-white">
                      {isLinked ? 'CONNECTED' : 'OFFLINE'}
                    </h3>
                  </div>
                  <p className={`text-[10px] font-bold ${isLinked ? 'text-blue-100/70' : 'text-gray-400'} italic mt-1 tracking-widest`}>{isLinked ? `ID: ${accountInfo.id}` : 'Link Required'}</p>
                </div>
                {isLinked && (
                  <div className="absolute -right-6 -bottom-6 opacity-20 group-hover:scale-110 transition-transform group-hover:rotate-12 duration-700">
                    <Activity size={140} className="text-white" />
                  </div>
                )}
                {!isLinked && (
                   <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Shield size={120} />
                  </div>
                )}
              </div>
            </div>

            {/* Consolidated Audit & Performance Panel */}
            <div className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-[40px] p-4 sm:p-6 md:p-10 relative overflow-hidden shadow-2xl">
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 md:gap-12">
                {/* Financials Group */}
                <div className="space-y-4 sm:space-y-6 bg-blue-600/5 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-blue-500/10">
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] border-b border-blue-500/10 pb-2 flex items-center gap-2">
                    <DollarSign size={12} /> Financials
                  </p>
                  <div className="space-y-5">
                    {[
                      { label: 'Total Result', val: isLinked ? `$${(accountInfo.metrics?.totalProfit || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$0', sub: 'Net Profit/Loss', color: (accountInfo.metrics?.totalProfit || 0) >= 0 ? 'text-green-500' : 'text-red-500' },
                      { label: 'Deposits', val: isLinked ? `$${(accountInfo.metrics?.deposits || accountInfo.balance || 0).toLocaleString()}` : '$0', sub: 'Verified Protocol', color: 'text-white' },
                      { label: 'Withdrawals', val: isLinked ? `$${(accountInfo.metrics?.withdrawals || 0).toLocaleString()}` : '$0', sub: 'Total Outflow', color: 'text-white' }
                    ].map((item, i) => (
                      <div key={i}>
                        <p className="text-[9px] font-bold text-gray-500 uppercase mb-1">{item.label}</p>
                        <p className={`text-xl font-black tracking-tight ${item.color || 'text-white'}`}>{item.val}</p>
                        <p className="text-[8px] font-bold text-gray-600 uppercase mt-0.5">{item.sub}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Group */}
                <div className="space-y-4 sm:space-y-6 bg-purple-600/5 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-purple-500/10">
                  <p className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em] border-b border-purple-500/10 pb-2 flex items-center gap-2">
                    <Activity size={12} /> Performance
                  </p>
                  <div className="space-y-5">
                    {[
                      { label: 'Max Drawdown', val: isLinked ? `${Math.min(accountInfo.metrics?.maxDrawdown || 0, 100).toFixed(2)}%` : '0.00%', sub: 'Risk Exposure', color: 'text-white' },
                      { label: 'Win Rate', val: isLinked ? `${(accountInfo.metrics?.winRate || 0).toFixed(1)}%` : '0%', sub: 'Accuracy', color: 'text-blue-500' },
                      { label: 'Profit Factor', val: isLinked ? (accountInfo.metrics?.profitFactor || 0).toFixed(2) : '0.00', sub: 'Efficiency', color: 'text-white' },
                      { label: 'Total Orders', val: isLinked ? (accountInfo.metrics?.totalTrades || 0).toString() : '0', sub: 'Verified Trades', color: 'text-white' }
                    ].map((item, i) => (
                      <div key={i}>
                        <p className="text-[9px] font-bold text-gray-500 uppercase mb-1">{item.label}</p>
                        <p className={`text-xl font-black tracking-tight ${item.color || 'text-white'}`}>{item.val}</p>
                        <p className="text-[8px] font-bold text-gray-600 uppercase mt-0.5">{item.sub}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Averages Group */}
                <div className="space-y-4 sm:space-y-6 bg-green-600/5 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-green-500/10">
                  <p className="text-[10px] font-black text-green-400 uppercase tracking-[0.2em] border-b border-green-500/10 pb-2 flex items-center gap-2">
                    <TrendingUp size={12} /> Averages
                  </p>
                  <div className="space-y-5">
                    {[
                      { label: 'Average Win', val: isLinked ? `$${(accountInfo.metrics?.averageWin || 0).toFixed(2)}` : '$0', sub: 'Per Trade', color: 'text-green-500' },
                      { label: 'Average Loss', val: isLinked ? `$${(accountInfo.metrics?.averageLoss || 0).toFixed(2)}` : '$0', sub: 'Per Trade', color: 'text-red-500' }
                    ].map((item, i) => (
                      <div key={i}>
                        <p className="text-[9px] font-bold text-gray-500 uppercase mb-1">{item.label}</p>
                        <p className={`text-xl font-black tracking-tight ${item.color || 'text-white'}`}>{item.val}</p>
                        <p className="text-[8px] font-bold text-gray-600 uppercase mt-0.5">{item.sub}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Status Group */}
                <div className="space-y-4 sm:space-y-6 bg-yellow-600/5 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-yellow-500/10">
                  <p className="text-[10px] font-black text-yellow-400 uppercase tracking-[0.2em] border-b border-yellow-500/10 pb-2 flex items-center gap-2">
                    <Zap size={12} /> Live Status
                  </p>
                  <div className="space-y-5">
                    {[
                      { label: 'Equity', val: isLinked ? `$${(accountInfo.equity || 0).toLocaleString()}` : '$0', sub: 'Live Equity Sync', color: 'text-white' },
                      { label: 'Floating P/L', val: isLinked ? `$${(accountInfo.profit || 0).toFixed(2)}` : '$0', sub: `${isLinked ? (accountInfo.trades || []).length : 0} active orders`, color: (accountInfo.profit || 0) >= 0 ? 'text-green-500' : 'text-red-500' }
                    ].map((item, i) => (
                      <div key={i}>
                        <p className="text-[9px] font-bold text-gray-500 uppercase mb-1">{item.label}</p>
                        <p className={`text-xl font-black tracking-tight ${item.color || 'text-white'}`}>{item.val}</p>
                        <p className="text-[8px] font-bold text-gray-600 uppercase mt-0.5">{item.sub}</p>
                      </div>
                    ))}
                    <div className="pt-2">
                      <p className="text-[8px] font-black text-gray-700 uppercase tracking-[0.2em]">Updated: {isLinked ? 'Just Now' : 'Never'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Growth Analysis & Daily Performance Section */}
            <div className="grid lg:grid-cols-12 gap-4 sm:gap-10">
              <div className="lg:col-span-8">
                <AccountHistoryChart isLinked={isLinked} dailyGrowth={accountInfo.metrics?.dailyGrowth} />
              </div>
              <div className="lg:col-span-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl sm:rounded-[40px] h-full relative overflow-hidden flex flex-col group transition-all hover:bg-white/[0.05] shadow-2xl">
                  {/* Premium glass effect header */}
                  <div className="p-4 sm:p-6 md:p-8 pb-4 sm:pb-6 border-b border-white/5 bg-white/[0.02] backdrop-blur-md">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-xl font-black tracking-tight text-white uppercase">Daily Pulse</h3>
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 rounded-lg bg-white/5 hover:bg-blue-600/20 text-gray-500 hover:text-blue-400 transition-all border border-white/5"><ChevronLeft size={14} /></button>
                        <button className="p-1.5 rounded-lg bg-white/5 hover:bg-blue-600/20 text-gray-500 hover:text-blue-400 transition-all border border-white/5"><ChevronRight size={14} /></button>
                      </div>
                    </div>
                    <div className="flex justify-between items-end">
                      <p className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em]">Protocol Weekly View</p>
                      <span className="text-[8px] font-black text-blue-500 uppercase bg-blue-500/10 px-2 py-0.5 rounded">WEEK 02</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-hidden">
                    {/* Header Row */}
                    <div className="grid grid-cols-3 text-[9px] sm:text-[10px] font-black text-gray-500 uppercase tracking-widest px-3 sm:px-6 md:px-8 py-3 sm:py-4 border-b border-white/5 bg-[#050505]/95">
                      <span>Date</span>
                      <span className="text-center">Drawdown</span>
                      <span className="text-right">Result</span>
                    </div>
                    
                    <div className="px-4 py-2">
                      {isLinked ? (
                        (() => {
                          const growthMap = new Map();
                          (accountInfo.metrics?.dailyGrowth || []).forEach(d => {
                            const dateStr = new Date(d.date).toISOString().split('T')[0];
                            growthMap.set(dateStr, d);
                          });

                          return Array.from({ length: 7 }).map((_, i) => {
                            const d = new Date();
                            d.setDate(d.getDate() - i);
                            const dateKey = d.toISOString().split('T')[0];
                            const dayData = growthMap.get(dateKey) || { 
                              date: d.toISOString(), 
                              profit: 0, 
                              profitPercentage: 0, 
                              drawdown: 0 
                            };

                            return (
                              <div key={i} className="grid grid-cols-3 items-center px-2 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl hover:bg-white/[0.03] transition-all duration-300 group/row">
                                <div className="flex items-center gap-3">
                                  <div className="w-1 h-4 rounded-full bg-blue-600/20 group-hover/row:bg-blue-500 transition-colors"></div>
                                  <span className="text-[11px] font-black text-white/80 group-hover/row:text-white transition-colors">
                                    {new Date(dayData.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                                  </span>
                                </div>
                                
                                <div className="flex flex-col items-center">
                                  <span className="text-[10px] font-bold text-white group-hover/row:text-white transition-colors">
                                    {(dayData.drawdown || 0).toFixed(2)}%
                                  </span>
                                </div>
                                
                                <div className="text-right">
                                  <p className={`text-[11px] font-black ${(dayData.profit || 0) >= 0 ? 'text-green-500' : 'text-red-500'} group-hover/row:brightness-110 leading-none`}>
                                    ${(dayData.profit || 0).toFixed(2)}
                                  </p>
                                  <p className={`text-[9px] font-bold ${(dayData.profitPercentage || 0) >= 0 ? 'text-green-500/70' : 'text-red-500/70'} mt-1 uppercase tracking-tighter`}>
                                    {(dayData.profitPercentage || 0) >= 0 ? '+' : ''}{(dayData.profitPercentage || 0).toFixed(2)}%
                                  </p>
                                </div>
                              </div>
                            );
                          });
                        })()
                      ) : (
                        Array.from({ length: 7 }).map((_, i) => {
                          const d = new Date();
                          d.setDate(d.getDate() - i);
                          return {
                            date: d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
                            dd: '0.00%',
                            res: '$0',
                            resPct: '0.00%'
                          };
                        }).map((day, i) => (
                          <div key={i} className="grid grid-cols-3 items-center px-2 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl hover:bg-white/[0.03] transition-all duration-300 group/row">
                            <div className="flex items-center gap-3">
                              <div className="w-1 h-4 rounded-full bg-blue-600/20 group-hover/row:bg-blue-500 transition-colors"></div>
                              <span className="text-[11px] font-black text-white/80 group-hover/row:text-white transition-colors">{day.date}</span>
                            </div>
                            
                            <div className="flex flex-col items-center">
                              <span className="text-[10px] font-bold text-white group-hover/row:text-white transition-colors">{day.dd}</span>
                            </div>
                            
                            <div className="text-right">
                              <p className={`text-[11px] font-black ${parseFloat(day.res.replace('$', '')) >= 0 ? 'text-green-500' : 'text-red-500'} group-hover/row:brightness-110 leading-none`}>{day.res}</p>
                              <p className={`text-[9px] font-bold ${parseFloat(day.resPct) >= 0 ? 'text-green-500/70' : 'text-red-500/70'} mt-1 uppercase tracking-tighter`}>{parseFloat(day.resPct) >= 0 ? '+' : ''}{day.resPct}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Bottom Stats Footer */}
                  <div className="p-6 bg-blue-600/5 border-t border-white/5 flex items-center justify-between">
                    <p className="text-[9px] font-black text-blue-500/50 uppercase tracking-[0.3em]">Institutional Feed</p>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500/30"></div>
                      <p className="text-[9px] font-bold text-gray-600 uppercase">Live Sync</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              {/* Open Positions Section */}
              <div className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-[40px] p-4 sm:p-6 md:p-10 relative overflow-hidden">
                <div className="flex justify-between items-center mb-6 sm:mb-10">
                  <div>
                    <h3 className="text-lg sm:text-2xl font-black tracking-tight text-white uppercase">{isLinked ? 'Open Positions' : 'Live Signal Bridge'}</h3>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">{isLinked ? 'Your current active trades' : 'Global execution pool'}</p>
                  </div>
                  {isLinked && (
                    <div className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-500 text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                      Live Syncing
                    </div>
                  )}
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/5 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                        <th className="pb-6">Asset Pair</th>
                        <th className="pb-6">Position</th>
                        <th className="pb-6">Entry</th>
                        <th className="pb-6">Current</th>
                        <th className="pb-6">PnL (USD)</th>
                        <th className="pb-6">Size</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm font-bold text-gray-300">
                      {isLinked ? (
                        accountInfo.trades.length > 0 ? (
                          accountInfo.trades
                            .sort((a, b) => new Date(b.time) - new Date(a.time))
                            .map((trade, i) => (
                              <tr key={i} className="group hover:bg-white/[0.02] transition-colors border-b border-white/5 last:border-0">
                                <td className="py-6 flex items-center gap-3 text-white">
                                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-black text-xs">{trade.pair?.substring(0, 1)}</div>
                                  {trade.pair}
                                </td>
                                <td className="py-6">
                                  <span className={`px-2 py-1 rounded text-[10px] ${trade.type === 'BUY' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>{trade.type}</span>
                                </td>
                                <td className="py-6 font-mono text-xs text-white">{trade.entry}</td>
                                <td className="py-6 font-mono text-xs text-white">{trade.current}</td>
                                <td className={`py-6 font-mono text-xs ${parseFloat(trade.pnl) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                  {parseFloat(trade.pnl) >= 0 ? '+' : ''}{trade.pnl}
                                </td>
                                <td className="py-6 font-mono text-xs text-gray-500">{trade.size}</td>
                              </tr>
                            ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="py-10 text-center text-[10px] font-bold text-gray-600 uppercase tracking-widest">No active positions found</td>
                          </tr>
                        )
                      ) : (
                        <tr>
                          <td colSpan="6" className="py-20 text-center">
                            <div className="flex flex-col items-center gap-4">
                              <Activity size={32} className="text-gray-700 animate-pulse" />
                              <p className="text-gray-600 font-bold uppercase tracking-[0.3em] text-[10px]">Awaiting bridge connection</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Closed Trades Section */}
              <div className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-[40px] p-4 sm:p-6 md:p-10 relative overflow-hidden">
                <div className="flex justify-between items-center mb-6 sm:mb-10">
                  <div>
                    <h3 className="text-lg sm:text-2xl font-black tracking-tight text-white uppercase">Trading History</h3>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Recently closed deals and performance</p>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/5 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                        <th className="pb-6">Date</th>
                        <th className="pb-6">Asset</th>
                        <th className="pb-6">Type</th>
                        <th className="pb-6">Result (USD)</th>
                        <th className="pb-6">Outcome</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm font-bold text-gray-300">
                      {isLinked && accountInfo.metrics?.trades?.length > 0 ? (
                        [...accountInfo.metrics.trades]
                          .sort((a, b) => new Date(b.time) - new Date(a.time))
                          .map((trade, i) => {
                            const tradeDate = new Date(trade.time);
                            const isToday = tradeDate.toDateString() === new Date().toDateString();
                            
                            return (
                              <tr key={i} className={`group hover:bg-white/[0.02] transition-colors border-b border-white/5 last:border-0 ${isToday ? 'bg-blue-500/[0.02]' : ''}`}>
                                <td className="py-6 text-[11px] font-mono text-gray-500">
                                  <div className="flex flex-col">
                                    <span className={isToday ? 'text-blue-400 font-black' : ''}>
                                      {tradeDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                                    </span>
                                    <span className="text-[9px] opacity-50">
                                      {tradeDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                  </div>
                                </td>
                                <td className="py-6 flex items-center gap-3 text-white">
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${isToday ? 'bg-blue-600/30 text-blue-300' : 'bg-gray-600/20 text-gray-400'}`}>
                                    {(trade.symbol || 'X').substring(0, 1)}
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="font-black tracking-tight">{trade.symbol}</span>
                                    {isToday && <span className="text-[7px] text-blue-500 font-black uppercase tracking-widest">New Today</span>}
                                  </div>
                                </td>
                                <td className="py-6">
                                  <span className={`px-2 py-1 rounded text-[10px] ${(trade.profit || 0) >= 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                    {trade.type}
                                  </span>
                                </td>
                                <td className={`py-6 font-mono text-xs ${(trade.profit || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                  {(trade.profit || 0) >= 0 ? '+' : ''}{(trade.profit || 0).toFixed(2)}
                                </td>
                                <td className="py-6">
                                  <span className={`text-[10px] font-black uppercase tracking-widest ${(trade.profit || 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {(trade.profit || 0) >= 0 ? 'PROFIT' : 'LOSS'}
                                  </span>
                                </td>
                              </tr>
                            );
                          })
                      ) : (
                        <tr>
                          <td colSpan="5" className="py-20 text-center text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                            {isLinked ? 'No history available yet' : 'Connect account to view history'}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-10">
              <div className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-[32px] p-4 sm:p-8 relative overflow-hidden group transition-all hover:bg-white/[0.07]">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Master Status</p>
                <h3 className="text-xl sm:text-3xl font-black mb-2 tracking-tighter uppercase text-white">{activeSignal ? 'IN TRADE' : 'STANDBY'}</h3>
                <p className="text-[10px] font-bold text-green-500 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>Live Connection</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-[32px] p-4 sm:p-8 relative overflow-hidden group transition-all hover:bg-white/[0.07]">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Max Drawdown</p>
                <h3 className="text-xl sm:text-3xl font-black mb-2 tracking-tighter text-red-500 tabular-nums">
                  {isLinked ? `${Math.min(accountInfo.metrics?.maxDrawdown || 0, 100).toFixed(2)}%` : (masterStats ? `${masterStats.maxDrawdown.toFixed(2)}%` : '—')}
                </h3>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{isLinked ? 'Current Live Risk' : 'Master Account'}</p>
              </div>
              <div className="bg-blue-600 border border-blue-400/30 rounded-2xl sm:rounded-[32px] p-4 sm:p-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><TrendingUp size={48} /></div>
                <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest mb-1 opacity-80">Win Rate</p>
                <h3 className="text-xl sm:text-3xl font-black mb-2 tracking-tighter text-white tabular-nums">
                  {isLinked && accountInfo.metrics?.winRate ? `${accountInfo.metrics.winRate.toFixed(1)}%` : (masterStats ? `${masterStats.winRate.toFixed(1)}%` : '—')}
                </h3>
                <p className="text-[10px] font-bold text-blue-100 italic">{isLinked ? 'Live Account Data' : `${masterStats?.tradeCount || 0} Trades Tracked`}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-[32px] p-4 sm:p-8 relative overflow-hidden group transition-all hover:bg-white/[0.07]">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Total P/L</p>
                <h3 className={`text-xl sm:text-3xl font-black mb-2 tracking-tighter tabular-nums ${(masterStats?.totalProfit || 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {isLinked && accountInfo.metrics?.totalProfit !== undefined ?
                    (accountInfo.metrics.totalProfit >= 0 ? `+$${accountInfo.metrics.totalProfit.toFixed(2)}` : `-$${Math.abs(accountInfo.metrics.totalProfit).toFixed(2)}`)
                    : (masterStats ? `${masterStats.totalProfit >= 0 ? '+' : '-'}$${Math.abs(masterStats.totalProfit).toFixed(0)}` : '—')}
                </h3>
                <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">{isLinked ? 'Verified Result' : 'All Time Verified'}</p>
              </div>
            </div>

            {/* Main Sections */}
            <div className="grid lg:grid-cols-12 gap-4 sm:gap-10 items-start">
              <div className="lg:col-span-8 bg-white/5 border border-white/10 rounded-2xl sm:rounded-[40px] p-4 sm:p-8 pb-2 relative overflow-hidden">
                <div className="flex justify-between items-center mb-6 relative z-10 text-white">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-600/10 p-2 rounded-xl border border-blue-500/20"><TrendingUp className="text-blue-400" size={18} /></div>
                    <div><h3 className="text-xl font-black tracking-tight text-white uppercase">Master Execution</h3><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Live Global Spot Price (XAU/USD)</p></div>
                  </div>
                  <div className="px-3 py-1 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div><span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Live Feed</span></div>
                </div>
                <div className="h-[400px] w-full relative group">
                  <TradingViewWidget />
                  <AnimatePresence>
                    {isInitialAnalysis && (
                      <><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-20 pointer-events-none bg-blue-500/5 backdrop-blur-[1px]" />
                        <motion.div initial={{ left: "-5%" }} animate={{ left: "105%" }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-blue-400 to-transparent z-30 pointer-events-none" />
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-black/40 border border-blue-500/20 px-6 py-2 rounded-full backdrop-blur-md flex items-center gap-3"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#3b82f6]" /><span className="text-blue-400 text-[9px] font-black uppercase tracking-[0.4em]">Neural Scanning</span></motion.div></>
                    )}
                  </AnimatePresence>
                  <div className="absolute bottom-12 left-6 flex flex-col gap-4 pointer-events-none sm:pointer-events-auto z-30">
                    <motion.div layout className="bg-black/80 border border-white/10 p-3 sm:p-4 rounded-2xl backdrop-blur-xl shadow-xl min-w-[180px] sm:min-w-[240px]">
                      {activeSignal ? (
                        <>
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <p className="text-[7px] font-black text-blue-400 uppercase tracking-widest mb-0.5">Active Master Trade</p>
                              <h4 className={`text-[14px] font-black uppercase ${activeSignal.direction === 'BUY' ? 'text-green-400' : 'text-red-400'}`}>{activeSignal.direction} XAUUSD</h4>
                            </div>
                            <div className="px-1.5 py-0.5 border rounded bg-green-500/10 text-green-500 border-green-500/20 flex items-center gap-1">
                              <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div>
                              <span className="text-[8px] font-black uppercase">Live</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            {activeSignal.entry_price && (
                              <div className="flex justify-between text-[9px] font-bold border-b border-white/5 pb-1.5"><span className="text-gray-500 uppercase">Entry</span><span className="text-white tabular-nums">{activeSignal.entry_price.toFixed(2)}</span></div>
                            )}
                            <div className="flex justify-between text-[9px] font-bold border-b border-white/5 pb-1.5"><span className="text-green-400 uppercase">Target</span><span className="text-green-400 tabular-nums">{(activeSignal.tp || 0).toFixed(2)}</span></div>
                            <div className="flex justify-between text-[9px] font-bold"><span className="text-red-400 uppercase">Stop Loss</span><span className="text-red-400 tabular-nums">{(activeSignal.sl || 0).toFixed(2)}</span></div>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center py-2">
                          <p className="text-[7px] font-black text-blue-400 uppercase tracking-widest mb-1">Master Account</p>
                          <h4 className="text-[14px] font-black uppercase text-gray-400">No Active Trade</h4>
                          <p className="text-[8px] font-bold text-gray-600 italic mt-1">Waiting for next setup</p>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-10">
                <div className="bg-white rounded-[32px] p-6 shadow-2xl relative overflow-hidden flex flex-col group border border-gray-100 transition-all">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600"></div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100"><Cpu size={16} /></div>
                    <div><h3 className="text-lg font-black tracking-tighter leading-none text-black uppercase">FlexBot AI License</h3><p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Official Protocol V5.0</p></div>
                  </div>
                  <div className="space-y-4">
                    <div className="text-center py-6 bg-gray-50 rounded-2xl border border-gray-100 relative overflow-hidden">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5">Lifetime Access</p>
                      <div className="flex items-baseline justify-center gap-2 mb-1"><h4 className="text-4xl font-black tracking-tighter text-black">$500</h4><span className="text-gray-300 text-sm font-bold line-through">$700</span></div>
                      <div className="mt-3 pt-3 border-t border-gray-100 w-full px-4"><p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Ongoing Access</p><p className="text-base font-black text-blue-600">$30<span className="text-[10px] opacity-60 ml-1">/ MONTH</span></p></div>
                    </div>
                    <div className="space-y-1.5">
                      {["FlexBot AI V5.0 Core", "Lifetime Protocol Access", "MT5 Signal Bridge", "24/7 Deployment Support"].map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5 px-3 py-2 bg-white rounded-xl border border-gray-100 shadow-sm"><div className="w-1 h-1 rounded-full bg-blue-600" /><span className="text-[9px] font-bold text-gray-500 uppercase tracking-tight">{item}</span></div>
                      ))}
                    </div>
                    <button onClick={onBuyClick} className="w-full bg-black hover:bg-blue-600 text-white py-4 rounded-xl font-black text-sm transition-all shadow-xl flex items-center justify-center gap-3 group/btn uppercase tracking-widest">Activate FlexBot AI<ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" /></button>
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-2.5"><Shield size={14} className="text-gray-400 mt-0.5" /><p className="text-[8px] font-bold text-gray-400 leading-relaxed uppercase tracking-tight">Secure non-custodial software. 100% user-controlled capital.</p></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trades Table */}
            <div className="grid lg:grid-cols-12 gap-4 sm:gap-10 pb-10">
              <div className="lg:col-span-8 bg-white/5 border border-white/10 rounded-2xl sm:rounded-[40px] p-4 sm:p-6 md:p-10">
                <h3 className="text-2xl font-black tracking-tight text-white mb-10">{isLinked ? 'My MetaTrader Trades' : 'Active AI Trades'}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead><tr className="border-b border-white/5 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]"><th className="pb-6">Asset Pair</th><th className="pb-6">Position</th><th className="pb-6">Entry Price</th><th className="pb-6">Current</th><th className="pb-6">PnL (USD)</th><th className="pb-6">Status</th></tr></thead>
                    <tbody className="text-sm font-bold text-gray-300">
                      {isLinked && accountInfo.trades.map((trade, i) => (
                        <tr key={i} className="group hover:bg-white/[0.02] transition-colors border-b border-white/5 last:border-0">
                          <td className="py-6 flex items-center gap-3 text-white"><div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400 font-black text-xs">X</div>{trade.pair}</td>
                          <td className="py-6"><span className={`px-2 py-1 rounded text-[10px] ${(trade.side || trade.type) === 'LONG' || (trade.side || trade.type) === 'BUY' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>{trade.side || trade.type}</span></td>
                          <td className="py-6 font-mono text-xs text-white">{trade.entry}</td>
                          <td className="py-6 font-mono text-xs text-white">{trade.current}</td>
                          <td className={`py-6 font-mono text-xs ${trade.pnl.toString().startsWith('+') || parseFloat(trade.pnl) >= 0 ? 'text-green-400' : 'text-red-400'}`}>{trade.pnl.toString().startsWith('+') || parseFloat(trade.pnl) >= 0 ? '+' : ''}{trade.pnl}</td>
                          <td className="py-6"><div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div><span className="text-xs text-gray-500 uppercase">{trade.status}</span></div></td>
                        </tr>
                      ))}
                      {!isLinked && activeSignal && (
                        <tr className="group hover:bg-white/[0.02] transition-colors">
                          <td className="py-6 flex items-center gap-3 text-white"><div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400 font-black text-xs">XAU</div>{activeSignal.symbol}</td>
                          <td className="py-6"><span className={`px-2 py-1 rounded text-[10px] ${activeSignal.direction === 'BUY' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>{activeSignal.direction}</span></td>
                          <td className="py-6 font-mono text-xs text-white tabular-nums">{activeSignal.entry_price ? activeSignal.entry_price.toFixed(2) : '—'}</td>
                          <td className="py-6 font-mono text-xs text-gray-500 tabular-nums">TP {(activeSignal.tp || 0).toFixed(2)}</td>
                          <td className="py-6 font-mono text-xs text-red-400 tabular-nums">SL {(activeSignal.sl || 0).toFixed(2)}</td>
                          <td className="py-6"><div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div><span className="text-xs text-green-500 uppercase">Active</span></div></td>
                        </tr>
                      )}
                      {!isLinked && !activeSignal && (
                        <tr>
                          <td colSpan="6" className="py-20 text-center text-[10px] font-bold text-gray-600 uppercase tracking-widest">No active master trade — waiting for next setup</td>
                        </tr>
                      )}
                      {isLinked && accountInfo.trades.length === 0 && (
                        <tr>
                          <td colSpan="6" className="py-10 text-center text-[10px] font-bold text-gray-600 uppercase tracking-widest">No active positions found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="lg:col-span-4 flex flex-col">
            <div className="bg-[#111] border border-white/5 rounded-2xl sm:rounded-[40px] p-4 sm:p-8 flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-8"><h3 className="text-xs font-black tracking-widest uppercase text-gray-500">Terminal Log</h3><div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div></div>
              <div className="flex-1 font-mono text-[12px] space-y-3 overflow-hidden">
                {tradingLogs.slice(0, 8).map((log, i) => (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} key={i} className={`p-3 rounded-xl border-l-2 ${log.type === 'TRADE' ? 'bg-blue-600/10 border-blue-500' : 'bg-white/[0.03] border-white/10'}`}>
                    <div className="flex justify-between items-center text-[9px] opacity-70 font-bold uppercase tracking-widest mb-1.5"><span className="text-gray-300">{log.type}</span><span className="text-blue-400">{log.meta}</span></div>
                    <div className={`leading-snug ${log.type === 'TRADE' ? 'text-white font-bold' : 'text-gray-400'}`}>{log.msg}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// --- Page: Protocol ---
const ContractPage = ({ onBuyClick }) => {
  return (
    <div className="relative min-h-screen py-12 sm:py-24 px-4 sm:px-6">
      <div className="absolute inset-0 bg-blue-600/[0.02] pointer-events-none"></div>
      <div className="container mx-auto max-w-6xl relative z-10">

        {/* Hero Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 sm:mb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-6">
                <Cpu size={12} /> V5.0 Protocol
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-5 text-white uppercase leading-[1.1]">How FlexBot <br/><span className="text-blue-500">AI</span> Works</h1>
              <p className="text-gray-400 font-medium leading-relaxed text-sm sm:text-base">FlexBot is an Expert Advisor that automatically copies our trades to your MetaTrader account. Your funds always stay with your own broker.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { value: '0.5%', label: 'Risk per trade', bg: 'bg-blue-500/5 border-blue-500/10' },
                { value: '1', label: 'Max open trades', bg: 'bg-purple-500/5 border-purple-500/10' },
                { value: '5%', label: 'Max drawdown', bg: 'bg-red-500/5 border-red-500/10' },
                { value: '24/5', label: 'Fully automated', bg: 'bg-green-500/5 border-green-500/10' },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 * i }}
                  className={`${s.bg} border rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center`}>
                  <p className="text-2xl sm:text-3xl font-black text-white mb-1">{s.value}</p>
                  <p className="text-[8px] sm:text-[9px] font-black text-gray-500 uppercase tracking-widest">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Big visual: 3 Steps */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-white/[0.03] border border-white/10 rounded-2xl sm:rounded-[48px] overflow-hidden shadow-2xl mb-6 sm:mb-10">
          <div className="grid lg:grid-cols-3">
            {[
              { step: '01', title: 'Purchase & Install', desc: 'Get the FlexBot AI license ($500 USDT). Install the EA on your MetaTrader 5. Takes less than 5 minutes with our setup guide.', iconStyle: 'bg-blue-500/10 border-blue-500/20 text-blue-500', icon: <DollarSign size={24} /> },
              { step: '02', title: 'Connect to AI', desc: 'The EA connects to our server. Trades are automatically copied to your account. Your funds stay with your own broker at all times.', iconStyle: 'bg-purple-500/10 border-purple-500/20 text-purple-500', icon: <Activity size={24} /> },
              { step: '03', title: 'Let It Run', desc: 'FlexBot trades Gold (XAU/USD) fully automated. Entries, stop-losses, lot sizing — everything handled for you.', iconStyle: 'bg-green-500/10 border-green-500/20 text-green-500', icon: <Zap size={24} /> },
            ].map((s, i) => (
              <div key={i} className={`p-6 sm:p-10 ${i < 2 ? 'border-b lg:border-b-0 lg:border-r border-white/5' : ''} group hover:bg-white/[0.03] transition-all`}>
                <div className={`w-12 h-12 rounded-2xl ${s.iconStyle} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {s.icon}
                </div>
                <div className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] mb-2">Step {s.step}</div>
                <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Split: What it does + Safety */}
        <div className="grid lg:grid-cols-5 gap-6 sm:gap-10 mb-6 sm:mb-10">
          {/* Left: Features */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-3 bg-white/[0.03] border border-white/10 rounded-2xl sm:rounded-[40px] p-5 sm:p-8 md:p-10 shadow-2xl">
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-8">What FlexBot Does For You</h2>
            <div className="space-y-5">
              {[
                { icon: <Cpu size={18} />, title: 'Fully Automated', desc: 'No manual trading needed. Set it up once and FlexBot handles the rest. Runs 24 hours a day, 5 days a week.' },
                { icon: <Shield size={18} />, title: 'Your Funds, Your Broker', desc: 'We never touch your money. The EA runs on your own MetaTrader and your own broker account.' },
                { icon: <Clock size={18} />, title: 'News Filter', desc: 'FlexBot automatically stops trading during high-impact news events like NFP, FOMC and CPI releases.' },
                { icon: <Activity size={18} />, title: 'Daily Loss Protection', desc: 'When the maximum daily loss is reached, FlexBot automatically stops trading until the next day. Built for prop firm rules.' },
              ].map((f, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-black uppercase text-sm mb-1">{f.title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Prop Firm Compliance */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-2 bg-blue-600 rounded-2xl sm:rounded-[40px] p-5 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none"><Shield size={200} /></div>
            <div className="relative z-10">
              <div className="text-[10px] font-black text-blue-200 uppercase tracking-[0.3em] mb-2">Compliant</div>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-6">Prop Firm Ready</h2>
              <p className="text-blue-100 text-sm leading-relaxed mb-8">FlexBot is built to pass FTMO and other prop firm challenges, and to keep funded accounts safe.</p>
              <div className="space-y-3">
                {[
                  'Max 0.5% risk per trade',
                  'Maximum 1 trade at a time',
                  'No weekend or overnight positions',
                  'Avoids news events automatically',
                  'Dynamic lot sizing per equity',
                  'Auto-stop at daily loss limit',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-white shrink-0"></div>
                    <span className="text-[11px] font-bold text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Pricing Banner */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-white/[0.03] border border-white/10 rounded-2xl sm:rounded-[48px] overflow-hidden shadow-2xl mb-6 sm:mb-10">
          <div className="grid lg:grid-cols-2">
            <div className="p-6 sm:p-10 md:p-14 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/5">
              <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-3">Pricing</div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-5xl sm:text-6xl font-black text-white">$500</span>
                <span className="text-gray-600 font-bold line-through text-lg">$700</span>
              </div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6">One-time + $30/month for AI connection</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">Lifetime license for FlexBot AI V5.0. Includes all updates, installation support, and access to our Telegram community.</p>
              <button onClick={onBuyClick} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-[0_10px_50px_rgba(37,99,235,0.3)] flex items-center gap-3 w-fit">
                Get FlexBot AI <ArrowUpRight size={18} />
              </button>
            </div>
            <div className="p-6 sm:p-10 md:p-14 flex flex-col justify-center">
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-6">What You Get</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'FlexBot AI V5.0 EA',
                  'Lifetime updates',
                  'MT5 support',
                  'Signal bridge',
                  'Prop firm mode',
                  'Telegram support 24/7',
                  'Installation guide',
                  'Lot sizing engine'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 py-2">
                    <div className="w-5 h-5 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    </div>
                    <span className="text-[11px] font-bold text-gray-300 uppercase tracking-tight">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-2">
                <Shield size={14} className="text-gray-600" />
                <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Payment via USDT (BEP-20) on Binance Smart Chain</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Requirements - Horizontal */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-white/[0.03] border border-white/10 rounded-2xl sm:rounded-[40px] p-5 sm:p-8 md:p-10 shadow-2xl">
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-8 flex items-center gap-3">
            <Settings size={20} className="text-blue-500" /> Requirements
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[
              { title: 'MetaTrader 5', desc: 'Desktop version' },
              { title: 'Any broker with Gold', desc: 'Low spread recommended' },
              { title: 'Min. $1,000 balance', desc: 'For proper lot sizing' },
              { title: 'VPS (optional)', desc: 'For 24/5 uptime' },
              { title: 'Stable internet', desc: 'EA must stay running' },
              { title: '1:100 leverage', desc: 'Or higher recommended' },
            ].map((item, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl sm:rounded-2xl p-4 hover:bg-white/[0.05] transition-all">
                <h4 className="text-white font-black text-xs sm:text-sm uppercase mb-1">{item.title}</h4>
                <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

// --- Payment Modal ---
const PaymentModal = ({ isOpen, step, onSelect, onConfirm, onClose, selectedPlan, usdtAddress }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/80 backdrop-blur-xl">
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="bg-[#0a0a0a] border border-white/10 rounded-t-3xl sm:rounded-[40px] w-full max-w-xl overflow-y-auto max-h-[90vh] shadow-2xl relative p-5 sm:p-6 md:p-10 text-center">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
        {step === 'select' && (
          <>
            <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mx-auto mb-6"><Cpu size={32} /></div>
            <h3 className="text-3xl font-black tracking-tighter mb-4 text-white uppercase text-center">FlexBot AI Access</h3>
            <p className="text-gray-400 mb-10 font-medium italic leading-relaxed text-center px-10">Select the lifetime license to initialize FlexBot AI V5.0 on your account.</p>
            
            <div className="flex justify-center">
              <button 
                onClick={() => onSelect({ type: 'LIFETIME', price: '$500' })} 
                className="bg-white hover:bg-gray-50 transition-all p-6 pt-10 rounded-[32px] shadow-2xl w-full max-w-[360px] flex flex-col items-center group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600" />
                <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-blue-50 text-blue-600 text-[7px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest border border-blue-100 whitespace-nowrap">Official AI License</div>
                
                <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5">FlexBot AI Protocol</p>
                <h4 className="text-2xl font-black text-black mb-1 tracking-tighter uppercase">Lifetime</h4>
                
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-black text-black tracking-tighter">$500</span>
                    <span className="text-gray-300 text-xs font-bold line-through">$700</span>
                  </div>
                <div className="bg-blue-600/[0.03] px-5 py-2.5 rounded-xl border border-blue-100 mb-6 w-full max-w-[240px]">
                  <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest text-center">Ongoing Protocol Access</p>
                  <p className="text-lg font-black text-blue-600 text-center">$30<span className="text-[10px] opacity-60 ml-1">/ MONTH</span></p>
                </div>
                
                <div className="w-full space-y-1.5 mb-6">
                  {[
                    "FlexBot AI V5.0 Core",
                    "Lifetime Protocol Access",
                    "MT5 Signal Bridge",
                    "24/7 Deployment Support"
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 px-3 py-1.5 bg-gray-50 rounded-xl border border-gray-100/50 w-full">
                      <div className="w-1 h-1 rounded-full bg-blue-600" />
                      <span className="text-[8px] font-bold text-gray-500 uppercase tracking-wide text-left">{feat}</span>
                    </div>
                  ))}
                </div>
                
                <div className="w-full bg-black hover:bg-blue-600 text-white py-3.5 rounded-xl font-black text-[10px] transition-all shadow-lg uppercase tracking-widest">
                  Activate FlexBot AI
                </div>
              </button>
            </div>
          </>
        )}
        {step === 'pay' && (
          <>
            <h3 className="text-3xl font-black tracking-tighter mb-2 text-white uppercase">Send Payment</h3>
            <p className="text-gray-400 mb-8 font-medium italic leading-relaxed px-12">
              Transfer {selectedPlan.price} USDT (BEP-20) for the FlexBot AI License. 
              ($30/mo subscription applies to maintain connection).
            </p>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-8">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Deposit Address (USDT BEP-20)</p>
              <div className="flex items-center gap-3 bg-black rounded-xl p-4 border border-white/5 mb-4 group"><code className="text-blue-400 text-xs font-mono break-all flex-1">{usdtAddress}</code><button onClick={() => navigator.clipboard.writeText(usdtAddress)} className="p-2 bg-white/5 hover:bg-blue-600 rounded-lg text-white transition-all active:scale-90"><Copy size={16} /></button></div>
              <div className="flex items-center justify-center gap-2 text-[10px] font-black text-yellow-500 uppercase"><Shield size={14} />Verify network is Binance Smart Chain</div>
            </div>
            <button onClick={onConfirm} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl">I HAVE TRANSFERRED THE FUNDS</button>
          </>
        )}
        {step === 'confirm' && (
          <>
            <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-3xl flex items-center justify-center text-green-500 mx-auto mb-8">
              <Shield size={32} />
            </div>
            <h3 className="text-3xl font-black tracking-tighter mb-4 text-white uppercase">Almost Done</h3>
            <p className="text-gray-400 mb-4 font-medium leading-relaxed px-6">
              Send us your <span className="text-white">transaction hash</span> on Telegram so we can verify your payment and deliver the EA to your account.
            </p>
            <p className="text-gray-500 text-xs mb-10 italic">You'll typically receive access within a few hours.</p>
            <div className="space-y-4">
              <a
                href="https://t.me/flexbotdev?text=Hi%2C%20I%20just%20sent%20my%20payment%20for%20FlexBot%20AI.%20My%20tx%20hash%3A%20"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3"
              >
                SEND TX HASH ON TELEGRAM
                <ArrowUpRight size={20} />
              </a>
              <button onClick={onClose} className="w-full bg-white/5 hover:bg-white/10 text-gray-400 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">Close</button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

// --- Main App ---
function App() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState('select');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [tradingLogs, setTradingLogs] = useState([
    { type: 'SYSTEM', msg: "NEURAL CORE INITIALIZED", meta: "v5.0.4" },
    { type: 'BRIDGE', msg: "METATRADER 5 LINK ESTABLISHED", meta: "ID: 884210" },
    { type: 'SCAN', msg: "GOLD LIQUIDITY SYNC COMPLETE", meta: "latency: 12ms" },
  ]);

  const usdtAddress = "0xada3abe97b3c5b03aaf3756bbfc99a5722611927"; // Officieel USDT Wallet Adres (BEP-20)

  const handleSelectPlan = (plan) => { setSelectedPlan(plan); setPaymentStep('pay'); };
  const confirmPayment = () => { setPaymentStep('confirm'); };
  const closeModal = () => { setShowPaymentModal(false); setTimeout(() => setPaymentStep('select'), 300); };

  useEffect(() => {
    const interval = setInterval(() => {
      const action = Math.random() > 0.5 ? "BUY" : "SELL";
      const confidence = (Math.random() * 5 + 92).toFixed(2);
      const newLog = { type: 'TRADE', msg: `MT5 SIGNAL: AI ${action} GOLD (XAU/USD)`, meta: `CONF: ${confidence}% • NODE: ${Math.floor(Math.random() * 12) + 1}`, time: new Date().toLocaleTimeString([], { hour12: false }) };
      setTradingLogs(prev => [newLog, ...prev].slice(0, 15));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30 relative overflow-x-hidden">
      <BackgroundEffects />
      <div className="relative z-10">
        <Navbar onBuyClick={() => setShowPaymentModal(true)} />
        <PaymentModal isOpen={showPaymentModal} step={paymentStep} onSelect={handleSelectPlan} onConfirm={confirmPayment} onClose={closeModal} selectedPlan={selectedPlan} usdtAddress={usdtAddress} />
        <Routes>
          <Route path="/" element={<LandingPage onBuyClick={() => setShowPaymentModal(true)} tradingLogs={tradingLogs} />} />
          <Route path="/dashboard" element={<Dashboard tradingLogs={tradingLogs} onBuyClick={() => setShowPaymentModal(true)} />} />
          <Route path="/how-it-works" element={<ContractPage onBuyClick={() => setShowPaymentModal(true)} />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
        <Routes>
          <Route path="/" element={<footer className="container mx-auto px-4 sm:px-6 py-10 sm:py-20 flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-10 border-t border-white/5"><Logo /><p className="text-xs font-bold text-gray-600 tracking-widest uppercase">&copy; 2026 All Rights Reserved.</p><div className="flex gap-6 text-xs font-black text-gray-500 uppercase tracking-widest"><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a><a href="https://t.me/flexbotcommunity" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Telegram</a><a href="https://docs.flexbot.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Docs</a></div></footer>} />
          <Route path="*" element={null} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
