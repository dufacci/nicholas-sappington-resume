import React, { useState, useEffect, Component } from 'react';
import { Mail, Phone, Award, Code, FlaskConical, Zap, Sparkles, Send, Loader2, MessageSquare, Info, ChevronRight, User, MapPin, Briefcase, BarChart3 } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err, info) { console.error('App crashed:', err, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', background: '#05080a', color: '#E9F5A5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>NICK SAPPINGTON</h1>
          <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>nicholassappington@gmail.com · 310-621-8502</p>
          <button onClick={() => window.location.reload()} style={{ background: '#E9F5A5', color: '#000', border: 'none', padding: '0.75rem 2rem', borderRadius: '1rem', fontWeight: 900, cursor: 'pointer', fontSize: '0.85rem', letterSpacing: '0.1em' }}>
            RELOAD
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * NICK SAPPINGTON — LIQUID GLASS SHADER EDITION
 * Shading: Cyberpunk Poster (Dark Star)
 * Glass: Enhanced Refractive Depth
 */

const ALL_QUESTIONS = [
  "Nutraperfecto Role Details",
  "Lopass LLC Story",
  "Charting Analyst Background",
  "Tech Stack Overview",
  "TCM Film Festival Role",
  "The Gunter Audio Work",
  "Sprint Sales Career",
  "Language Skills",
  "Education Background",
  "Music Production Setup",
  "Studio 808 Project",
  "RIDEWAY App Concept",
  "Only Pans Marketplace",
  "Trading Automation Plans",
  "Tesla DIY & Hands-On Skills",
  "Life in San Francisco",
  "What Drives Nick?",
  "Side Projects Overview",
  "Ableton & Sound Design",
  "What Makes Nick Unique?",
];

function pickRandom4() {
  const shuffled = [...ALL_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 4);
}

const App = () => {
  const [userQuery, setUserQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);
  const [quickQuestions] = useState(() => pickRandom4());

  // Parallax: one shared CSS var drives BOTH the background grid and each card's
  // inner "lens" dots, so the dots drift even under the glass bubbles.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        document.documentElement.style.setProperty('--dot-shift', `${window.scrollY * -0.4}px`);
        document.documentElement.style.setProperty('--dot-shift-lens', `${window.scrollY * -0.2}px`);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ""; // Set in .env.local

  const resumeData = `
    Name: Nick Sappington
    Location: San Francisco, CA
    Contact: nicholassappington@gmail.com | 310-621-8502
    Experience:
    - Nutraperfecto (2024-2026): Formulation & Research Specialist. Premium ingredient sourcing and engineering proprietary blends. Focus on researching ingredients that work well together and testing formulations.
    - Lopass LLC (2023-Present): Founder & Operator. Built and ran a Los Angeles black-car chauffeur service for celebrity, entertainment, and high-net-worth clientele — airport transfers and special events. Managed the business itself (driver roster, dispatch, client relationships, brand reputation for discretion and reliability) — Nick ran operations and did not drive clients personally. Sold the cars-and-drivers chauffeur operation and is now transitioning Lopass LLC toward mobile app development.
    - TCM Film Festival (2024): Production Manager. Managed logistics for guest filmmakers and VIPs.
    - Technical Market Analyst (2020-2022): Paid charting / technical-analysis contributor for the Royce Jacob and MapleStax brands across YouTube and Twitter (X). Translated complex options and equity setups into clear visuals for retail audiences and published live trade ideas to subscriber communities.
    - The Gunter (2017-2018): Audio Production & Lead Sound Designer. Secured funding and lead sound effects library direction.
    - Sprint (2014-2017): Assistant Store Manager & Sales Representative. Top 10 business sales in district. Salesforce expert.
    Education: CSU Los Angeles (B.A. Political Science, 3.5 GPA), Santa Monica College (A.A. Humanities).
    Languages: English (Native), Spanish (Advanced), French (Intermediate).
    Skills: Ableton Live 12, Claude Code/Cowork & Gemini Canvas, thinkorswim Trading Platform, Adobe Illustrator, Salesforce, MS Office.
  `;

  const personalContext = `
    PERSONAL CONTEXT (use to add color, personality, and depth — not necessarily resume facts):
    - Lives in the Duboce Triangle neighborhood of San Francisco. Has a girlfriend who is a frequent part of his life.
    - Deep into electronic music production using Ableton Live — recent focus on humanizing drum patterns. Has a closet studio setup with Kali Audio LP-6 monitors (with proper boundary EQ dialing), and has been evaluating upgrades including Genelec 8040B and Neumann KH 150 with Sonarworks SoundID Reference calibration. Also uses Neumann NDH 20 headphones and Focal Alpha Evo 65 monitors.
    - Hands-on and DIY-oriented — recently replaced the trunk liftgate latch and cinching actuator on his 2021+ Tesla Model S (Palladium refresh). Has a strong practical/mechanical side.
    - Active seller on Facebook Marketplace and eBay — pays close attention to listing presentation and buyer disputes.
    - Took a group trip to Moab/Arches National Park and Salt Lake City with his girlfriend and mother (~late March 2025), requiring detailed itinerary planning, UTV rentals, Dead Horse Point logistics, and restaurant curation.
    - Has built several digital projects with Claude: RIDEWAY (a rideshare aggregator app concept), "Only Pans" (a cookware resale marketplace site), and Studio 808 (a disco/house music learning app).
    - Has researched Vespa S150 scooters as a city transportation option, and investigated billboard rental costs in San Francisco.
    - Actively exploring automating a personal trading strategy via thinkorswim and Python.
    - Curious about tools like Tidal music downloaders and architectural design connectors (Autodesk/SketchUp).
    - Enjoys cooking, home improvement projects, and curating social experiences like bad movie nights.
  `;

  const askAgent = async (specificQuery) => {
    const queryToUse = specificQuery || userQuery;
    if (!queryToUse) return;

    setIsLoading(true);
    setAiResponse('');

    const systemPrompt = `
      You are Nick Sappington's Personal AI Agent. Your goal is to represent Nick to potential employers.
      TONE: High-energy, cyberpunk, professional, results-oriented, and confident.
      CONTEXT: Nick is based in the Duboce Triangle neighborhood of San Francisco. Use this resume data: ${resumeData}.
      PERSONAL CONTEXT: ${personalContext}
      INSTRUCTIONS:
      - Highlight his versatility (Music + Markets + Supplements + Operations).
      - For Nutraperfecto, emphasize formulation testing and research.
      - For Lopass LLC, emphasize founding, growing, and managing the celebrity-clientele chauffeur business — Nick ran operations, he did not drive clients himself. He sold off the cars-and-drivers side of the business and is now transitioning Lopass LLC into mobile app development.
      - For Technical Market Analyst, emphasize charting expertise and translating setups for retail audiences.
      - Use personal context to add genuine personality and depth when relevant — show who Nick is beyond the resume.
      - Keep answers concise, punchy, and under 100 words.
    `;

    try {
      let retries = 0;
      const maxRetries = 5;
      let success = false;
      let resultText = "";

      if (!apiKey) {
        setAiResponse("Missing API key. Add VITE_GEMINI_API_KEY to .env.local and restart the dev server.");
        setIsLoading(false);
        return;
      }

      while (retries < maxRetries && !success) {
        try {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: queryToUse }] }],
              systemInstruction: { parts: [{ text: systemPrompt }] }
            })
          });
          const data = await response.json();

          if (!response.ok) {
            // Google returned an error JSON — log it so we can see what's wrong
            console.error("Gemini API error:", response.status, data);
            throw new Error(data?.error?.message || `HTTP ${response.status}`);
          }

          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (!text) {
            console.error("Gemini API: empty/unexpected response shape:", data);
            throw new Error("Empty response from model");
          }

          resultText = text;
          success = true;
        } catch (err) {
          console.error(`Gemini call failed (attempt ${retries + 1}/${maxRetries}):`, err);
          retries++;
          if (retries < maxRetries) {
            await new Promise(r => setTimeout(r, Math.pow(2, retries) * 1000));
          }
        }
      }
      setAiResponse(success ? resultText : "Agent offline. Check the browser console for details.");
    } catch (error) {
      console.error("Gemini outer error:", error);
      setAiResponse("Connection error. Even the best tech has hiccups!");
    } finally {
      setIsLoading(false);
    }
  };

  // Liquid-glass card classes — visuals live in index.css (.lg-card / .lg-a / .lg-b)
  // Variant B = featured (agent, Nutraperfecto, tech stack); Variant A = everything else.
  const glassA = "lg-card lg-a p-8";
  const glassB = "lg-card lg-b p-8";

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans selection:bg-[#E9F5A5] selection:text-black overflow-x-hidden relative pb-40">

      {/* CYBERPUNK POSTER SHADING (lifted tone + texture) */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Top-Right Pastel Glow */}
        <div className="absolute -top-[8%] right-[2%] w-[60vw] h-[42vh] bg-[#E9F5A5] opacity-[0.20] blur-[150px]"></div>

        {/* Soft bottom vignette for grounding */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>

        {/* Bottom Left Cyan Glow */}
        <div className="absolute -bottom-[12%] -left-[12%] w-[52vw] h-[52vh] bg-[#00f2ff] opacity-[0.16] blur-[130px]"></div>

        {/* Bottom Right Magenta Glow */}
        <div className="absolute -bottom-[8%] right-[-8%] w-[46vw] h-[46vh] bg-[#ff00ff] opacity-[0.12] blur-[120px]"></div>

        {/* Scattered-symbol texture — two layered copies (disguises the repeat), glowing, drifts on scroll */}
        <div className="absolute inset-0 will-change-[background-position]" style={{
          backgroundImage: 'var(--sym-tile), var(--sym-tile)',
          backgroundSize: '340px 340px, 250px 250px',
          backgroundPosition: '0 var(--dot-shift, 0px), 150px calc(90px + var(--dot-shift, 0px))',
          filter: 'drop-shadow(0 0 2px rgba(233,245,165,0.55)) drop-shadow(0 0 6px rgba(255,255,255,0.30))'
        }}></div>

        {/* Subtle Grain Overlay — CSS-only, no external dependency */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-16 relative z-10">

        {/* HEADER */}
        <header className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          <div className="relative group shrink-0">
            {/* Enhanced Shader Frame for Photo */}
            <div
              className={`w-64 h-64 rounded-[4rem] rotate-2 bg-white/10 p-[1px] shadow-2xl transition-all duration-700 ${isPhotoHovered ? 'scale-105 rotate-0' : ''}`}
              onMouseEnter={() => setIsPhotoHovered(true)}
              onMouseLeave={() => setIsPhotoHovered(false)}
            >
              <div className="w-full h-full rounded-[4rem] bg-[#05080a] overflow-hidden relative flex items-center justify-center border border-white/20 shadow-inner">
                <img
                  src="/nick-photo.png"
                  alt="Nick Sappington"
                  className="w-full h-full object-cover opacity-90 transition-all duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div style={{display: 'none'}} className="absolute inset-0 items-center justify-center bg-zinc-900">
                   <User size={100} className="text-[#E9F5A5] opacity-20" />
                </div>
                {/* Internal Refraction Highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/40 pointer-events-none"></div>
              </div>
            </div>
            {/* San Francisco Tag */}
            <div className="absolute -bottom-4 -right-2 bg-[#E9F5A5] text-black px-6 py-2 rounded-2xl shadow-[0_10px_30px_rgba(233,245,165,0.3)] font-black text-xs md:text-sm uppercase tracking-widest z-20 border border-white/20">
              San Francisco Based
            </div>
          </div>

          <div className="flex-1 text-center lg:text-left min-w-0">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic uppercase tracking-normal leading-[1.05] mb-4 drop-shadow-[0_10px_30px_rgba(0,0,0,1)]">
              NICK<br/>
              <span className="text-[#E9F5A5] drop-shadow-[0_0_40px_rgba(233,245,165,0.2)]">SAPPINGTON</span>
            </h1>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <a href="mailto:nicholassappington@gmail.com" className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl hover:bg-[#E9F5A5] hover:text-black transition-all font-bold text-xs uppercase tracking-widest shadow-lg">
                <Mail size={18}/> nicholassappington@gmail.com
              </a>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest text-[#E9F5A5] shadow-lg">
                <Phone size={18}/> 310-621-8502
              </div>
              <a href="/portfolio.html" style={{ animation: 'portfolioPulse 1.8s ease-in-out infinite' }} className="flex items-center gap-3 bg-[#E9F5A5] text-black border border-[#E9F5A5] px-6 py-3 rounded-2xl hover:bg-white hover:border-white transition-all font-black text-xs uppercase tracking-widest shadow-[0_10px_30px_rgba(233,245,165,0.3)]">
                <FlaskConical size={18}/> View Portfolio
              </a>
            </div>
          </div>
        </header>

        {/* CORE CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          <div className="contents lg:block lg:col-span-4 lg:space-y-10">
            {/* GENERAL INFO AGENT (Interactive Layer) */}
            <div className={`${glassB} border-[#E9F5A5]/50 border-2 order-1 lg:order-none max-md:p-6!`}>
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

              <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E9F5A5] flex items-center justify-center shadow-[0_0_20px_rgba(233,245,165,0.4)]">
                    <Sparkles size={20} className="text-black" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-tighter italic leading-none">General Info Agent</h2>
                    <p className="text-[9px] text-[#E9F5A5] font-bold uppercase tracking-[0.3em] mt-1 opacity-80">SF Representative</p>
                  </div>
                </div>
                <div
                  className="flex items-center bg-green-400/10 px-3.5 py-1 rounded-full border border-green-400/40"
                  style={{ animation: 'livePulse 1.8s ease-in-out infinite' }}
                >
                  <span className="text-[9px] font-black uppercase text-green-400 tracking-widest">Live</span>
                </div>
              </div>

              <p className="text-xs font-bold text-zinc-100 mb-6 italic border-l-4 border-[#E9F5A5] pl-4 leading-relaxed">
                "Verified Agent Online. Ask about Nick's work at Nutraperfecto, his Lopass LLC operations, his charting analyst background, or his Ableton 12 and Illustrator expertise."
              </p>

              <div className="grid grid-cols-1 gap-2 mb-6">
                {quickQuestions.map((q, i) => (
                  <button
                    key={q}
                    onClick={() => { setUserQuery(q); askAgent(q); }}
                    className={`text-left p-3 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-tight hover:bg-[#E9F5A5] hover:text-black transition-all flex items-center justify-between group ${i >= 2 ? 'max-md:hidden' : ''}`}
                  >
                    {q} <ChevronRight size={14} className="opacity-0 group-hover:opacity-100" />
                  </button>
                ))}
              </div>

              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pr-14 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#E9F5A5]/50 font-bold text-sm"
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && askAgent()}
                />
                <button
                  onClick={() => askAgent()}
                  disabled={isLoading}
                  className="absolute right-2.5 top-2.5 h-10 w-10 bg-[#E9F5A5] text-black rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={18}/> : <Send size={18} />}
                </button>
              </div>

              <div className="relative min-h-[120px] md:min-h-[160px]">
                {aiResponse ? (
                  <div className="bg-black/60 border border-white/10 rounded-2xl p-6 text-sm leading-relaxed text-zinc-100 font-medium whitespace-pre-wrap animate-in fade-in zoom-in duration-500 h-full overflow-y-auto shadow-inner">
                    <div className="flex items-center gap-2 mb-4 text-[#E9F5A5]">
                      <MessageSquare size={16}/>
                      <span className="text-[9px] font-black uppercase tracking-[0.2em]">Verified Response</span>
                    </div>
                    {aiResponse}
                  </div>
                ) : (
                  <div className="h-full min-h-[120px] md:min-h-[160px] border-2 border-white/5 border-dashed rounded-2xl flex flex-col items-center justify-center text-zinc-700 p-6 md:p-8 text-center bg-black/20">
                    <Info size={32} className="mb-3 opacity-10" />
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-30">Awaiting Input</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tech Stack */}
            <div className={`${glassB} order-3 lg:order-none`}>
              <div className="mb-8 flex justify-center">
                <div className="relative px-8 py-3 rounded-full bg-white/5 border border-white/10 text-[#E9F5A5] font-black uppercase tracking-widest text-xs">
                  Tech Stack
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { name: 'Ableton Live 12', icon: '/logos/ableton.png' },
                  { name: 'Claude Code/Cowork & Gemini Canvas', icon: '/logos/claude.svg' },
                  { name: 'thinkorswim Trading Platform', icon: '/logos/thinkorswim.png' },
                  { name: 'Adobe Illustrator', icon: '/logos/illustrator.svg' },
                  { name: 'Salesforce', icon: '/logos/salesforce.svg' },
                  { name: 'MS Office', icon: '/logos/msoffice.svg' },
                ].map(p => (
                  <div key={p.name} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-3 text-sm font-black uppercase tracking-wide hover:border-[#E9F5A5] hover:text-[#E9F5A5] transition-all cursor-default">
                    <img src={p.icon} alt="" className="w-6 h-6 object-contain shrink-0" />
                    <span>{p.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className={`${glassA} order-4 lg:order-none`}>
              <div className="mb-8 flex justify-center">
                <div className="relative px-8 py-3 rounded-full bg-white/5 border border-[#00f2ff]/30 text-[#00f2ff] font-black uppercase tracking-widest text-xs">
                  Linguistics
                </div>
              </div>
              <div className="space-y-6">
                {[{ n: 'English', l: 'Native', c: '#E9F5A5' }, { n: 'Spanish', l: 'Advanced', c: '#00f2ff' }, { n: 'French', l: 'Intermed.', c: '#ff00ff' }].map(lang => (
                   <div key={lang.n}>
                      <div className="flex justify-between text-[11px] font-black uppercase mb-3 opacity-90">
                        <span>{lang.n}</span>
                        <span style={{color: lang.c}}>{lang.l}</span>
                      </div>
                      <div className="h-1.5 w-full bg-black/40 rounded-full border border-white/5 shadow-inner">
                        <div className="h-full rounded-full transition-all duration-1000" style={{width: lang.l === 'Native' ? '100%' : lang.l === 'Advanced' ? '80%' : '50%', backgroundColor: lang.c, boxShadow: `0 0 10px ${lang.c}44`}}></div>
                      </div>
                   </div>
                ))}
              </div>
            </div>
          </div>

          <div className="contents lg:block lg:col-span-8 lg:space-y-10">
            {/* NUTRAPERFECTO */}
            <div className={`${glassB} lg-edge-nutra order-2 lg:order-none`}>
              <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                <div>
                  <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">Nutraperfecto</h2>
                  <p className="text-[#E9F5A5] font-bold text-sm tracking-[0.2em] mt-3 opacity-90">Formulation & Research Specialist</p>
                </div>
                <div className="bg-[#E9F5A5] text-black px-8 py-2.5 rounded-2xl text-[11px] font-black shadow-xl italic">2024 — 2026</div>
              </div>
              <div className="space-y-6 text-zinc-100 text-lg leading-relaxed">
                <p className="flex gap-6 items-start">
                  <FlaskConical className="shrink-0 text-[#E9F5A5] mt-1" size={24}/>
                  <span>Engineered proprietary formulation blends by identifying synergistic active ingredients through rigorous research and testing.</span>
                </p>
                <p className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl border border-white/5">
                   <Zap className="shrink-0 text-[#E9F5A5] mt-1" size={20}/>
                   <span className="text-sm italic">Managed global sourcing for supplement releases, ensuring scientific efficacy and ingredient purity.</span>
                </p>
              </div>
            </div>

            {/* LOPASS LLC */}
            <div className={`${glassA} lg-edge-lopass order-2 lg:order-none`}>
              <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                <div>
                  <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">Lopass LLC</h2>
                  <p className="text-[#00f2ff] font-bold text-sm tracking-[0.2em] mt-3 opacity-90 uppercase">Founder & Operator — Now Building Apps</p>
                </div>
                <div className="bg-[#00f2ff]/10 border border-[#00f2ff]/30 text-[#00f2ff] px-6 py-2 rounded-2xl text-[11px] font-black shadow-lg">2023 — Present</div>
              </div>
              <div className="space-y-4 text-zinc-100 text-base leading-relaxed">
                <p className="flex gap-4 items-start">
                  <Briefcase className="shrink-0 text-[#00f2ff] mt-1" size={20}/>
                  <span>Founded and grew a Los Angeles black-car chauffeur service catering to celebrity, entertainment, and high-net-worth clientele — airport transfers and exclusive events.</span>
                </p>
                <p className="text-zinc-300 text-sm pl-9">Built the driver roster, ran dispatch, and set the operational standard for absolute discretion and white-glove reliability.</p>
                <p className="text-zinc-300 text-sm pl-9">Owned client relationships and managed day-to-day business operations end-to-end.</p>
                <p className="text-zinc-300 text-sm pl-9 italic">Sold the cars-and-drivers chauffeur operation, and is now transitioning Lopass LLC into mobile app development.</p>
              </div>
            </div>

            {/* TECHNICAL MARKET ANALYST */}
            <div className={`${glassA} order-2 lg:order-none`}>
              <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-2">
                <div>
                  <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none">Technical Market Analyst</h2>
                  <p className="text-[#00f2ff] font-bold text-sm tracking-widest mt-1 opacity-80 uppercase">Royce Jacob & MapleStax — YouTube / Twitter</p>
                </div>
                <div className="bg-white/5 border border-white/10 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-500">2020 — 2022</div>
              </div>
              <div className="space-y-3 text-zinc-300 text-base leading-relaxed pl-4 border-l-2 border-[#00f2ff]/40">
                <p className="flex gap-3 items-start"><BarChart3 className="shrink-0 text-[#00f2ff] mt-1" size={18}/> <span>Paid contributor providing technical charting analysis across the Royce Jacob and MapleStax brands on YouTube and Twitter (X).</span></p>
                <p>Translated complex options and equity setups into accessible, engaging visuals for retail audiences.</p>
                <p className="italic">Published live trade ideas and chart breakdowns to active subscriber communities.</p>
              </div>
            </div>

            {/* THE GUNTER */}
            <div className={`${glassA} order-2 lg:order-none`}>
              <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-2">
                <div>
                  <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none text-zinc-400">The Gunter</h2>
                  <p className="text-[#ff00ff] font-bold text-sm tracking-widest mt-1 opacity-80 uppercase">Audio Production Lead</p>
                </div>
                <div className="bg-white/5 border border-white/10 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-500">2017 — 2018</div>
              </div>
              <p className="text-zinc-300 text-base leading-relaxed pl-4 border-l-2 border-[#ff00ff]/40 italic">
                Lead Sound Designer responsible for sound effects library curation and score direction. Secured critical funding for audio projects.
              </p>
            </div>

            {/* EDUCATION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 order-2 lg:order-none">
               <div className={glassA}>
                  <h4 className="font-black uppercase text-[#E9F5A5] text-[10px] tracking-[0.3em] mb-4">CSU Los Angeles</h4>
                  <p className="font-black text-2xl italic uppercase leading-tight">B.A. Liberal Arts</p>
                  <p className="text-[10px] text-zinc-500 font-bold mt-2 tracking-widest uppercase">Political Science | 3.5 GPA</p>
               </div>
               <div className={glassA}>
                  <h4 className="font-black uppercase text-[#E9F5A5] text-[10px] tracking-[0.3em] mb-4">Santa Monica College</h4>
                  <p className="font-black text-2xl italic uppercase leading-tight">A.A. Humanities</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glossy Footer Bar */}
      <div className="fixed bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#E9F5A5] to-transparent opacity-40 shadow-[0_0_20px_rgba(233,245,165,0.5)]"></div>
    </div>
  );
};

const AppWithBoundary = () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

export default AppWithBoundary;
