import React, { useState, Component } from 'react';
import { Mail, Phone, Award, Code, FlaskConical, Zap, Sparkles, Send, Loader2, MessageSquare, Info, ChevronRight, User, MapPin, Briefcase, BarChart3 } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err, info) { console.error('App crashed:', err, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', background: '#05080a', color: '#E5FF00', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>NICHOLAS SAPPINGTON</h1>
          <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>nicholassappington@gmail.com · 310-621-8502</p>
          <button onClick={() => window.location.reload()} style={{ background: '#E5FF00', color: '#000', border: 'none', padding: '0.75rem 2rem', borderRadius: '1rem', fontWeight: 900, cursor: 'pointer', fontSize: '0.85rem', letterSpacing: '0.1em' }}>
            RELOAD
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * NICHOLAS SAPPINGTON — LIQUID GLASS SHADER EDITION
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
  "What Drives Nicholas?",
  "Side Projects Overview",
  "Ableton & Sound Design",
  "What Makes Nicholas Unique?",
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

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ""; // Set in .env.local

  const resumeData = `
    Name: Nicholas Sappington
    Location: San Francisco, CA
    Contact: nicholassappington@gmail.com | 310-621-8502
    Experience:
    - Nutraperfecto (2024-2026): Formulation & Research Specialist. Premium ingredient sourcing and engineering proprietary blends. Focus on researching ingredients that work well together and testing formulations.
    - Lopass LLC (2023-2026): Founder & Operator. Built and ran a Los Angeles black-car chauffeur service for celebrity, entertainment, and high-net-worth clientele — airport transfers and special events. Managed the business itself (driver roster, dispatch, client relationships, brand reputation for discretion and reliability) — Nicholas ran operations and did not drive clients personally. Negotiated and closed a successful exit (sold the company).
    - TCM Film Festival (2024): Production Manager. Managed logistics for guest filmmakers and VIPs.
    - Technical Market Analyst (2020-2022): Paid charting / technical-analysis contributor for the Royce Jacob and MapleStax brands across YouTube and Twitter (X). Translated complex options and equity setups into clear visuals for retail audiences and published live trade ideas to subscriber communities.
    - The Gunter (2017-2018): Audio Production & Lead Sound Designer. Secured funding and lead sound effects library direction.
    - Sprint (2014-2017): Assistant Store Manager & Sales Representative. Top 10 business sales in district. Salesforce expert.
    Education: CSU Los Angeles (B.A. Political Science, 3.5 GPA), Santa Monica College (A.A. Humanities).
    Languages: English (Native), Spanish (Advanced), French (Intermediate).
    Skills: Ableton 12, Unity, ThinkOrSwim, Adobe Illustrator, Salesforce, MS Office.
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
      You are Nicholas Sappington's Personal AI Agent. Your goal is to represent Nicholas to potential employers.
      TONE: High-energy, cyberpunk, professional, results-oriented, and confident.
      CONTEXT: Nicholas is based in the Duboce Triangle neighborhood of San Francisco. Use this resume data: ${resumeData}.
      PERSONAL CONTEXT: ${personalContext}
      INSTRUCTIONS:
      - Highlight his versatility (Music + Markets + Supplements + Operations).
      - For Nutraperfecto, emphasize formulation testing and research.
      - For Lopass LLC, emphasize founding, growing, and managing the celebrity-clientele service business — Nicholas ran operations, he did not drive clients himself.
      - For Technical Market Analyst, emphasize charting expertise and translating setups for retail audiences.
      - Use personal context to add genuine personality and depth when relevant — show who Nicholas is beyond the resume.
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

  // STRONGER LIQUID GLASS EFFECT — multi-layer shadows for rim lighting + internal refraction depth
  const liquidGlass = `
    relative overflow-hidden
    bg-black/70 backdrop-blur-[40px]
    rounded-[2.5rem] p-8
    border border-white/20
    shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.3),inset_0_10px_20px_rgba(255,255,255,0.05),inset_-5px_-5px_15px_rgba(0,242,255,0.05),inset_5px_5px_15px_rgba(255,0,255,0.05)]
    transition-all duration-500
    hover:border-[#E5FF00]/40 hover:bg-black/80
  `;

  return (
    <div className="min-h-screen bg-[#05080a] text-white font-sans selection:bg-[#E5FF00] selection:text-black overflow-x-hidden relative pb-40">

      {/* CYBERPUNK POSTER SHADING (Static, Moody) */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Top-Right Yellow Glow */}
        <div className="absolute -top-[5%] right-[5%] w-[60vw] h-[40vh] bg-[#E5FF00] opacity-[0.12] blur-[160px]"></div>

        {/* Deep Center Void */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05080a] to-[#020304]"></div>

        {/* Bottom Left Cyan Glow */}
        <div className="absolute -bottom-[10%] -left-[10%] w-[50vw] h-[50vh] bg-[#00f2ff] opacity-[0.1] blur-[140px]"></div>

        {/* Bottom Right Magenta Glow */}
        <div className="absolute -bottom-[5%] right-[-5%] w-[40vw] h-[40vh] bg-[#ff00ff] opacity-[0.07] blur-[120px]"></div>

        {/* Subtle Grain Overlay — CSS-only, no external dependency */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px' }}></div>
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
                  src="/Gemini_Generated_Image_w5iolew5iolew5io copy.png"
                  alt="Nicholas Sappington"
                  className="w-full h-full object-cover opacity-90 transition-all duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div style={{display: 'none'}} className="absolute inset-0 items-center justify-center bg-zinc-900">
                   <User size={100} className="text-[#E5FF00] opacity-20" />
                </div>
                {/* Internal Refraction Highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/40 pointer-events-none"></div>
              </div>
            </div>
            {/* San Francisco Tag */}
            <div className="absolute -bottom-4 -right-2 bg-[#E5FF00] text-black px-6 py-2 rounded-2xl shadow-[0_10px_30px_rgba(229,255,0,0.3)] font-black text-xs md:text-sm uppercase tracking-widest z-20 border border-white/20">
              San Francisco Based
            </div>
          </div>

          <div className="flex-1 text-center lg:text-left min-w-0">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic uppercase tracking-normal leading-[1.05] mb-4 drop-shadow-[0_10px_30px_rgba(0,0,0,1)]">
              NICHOLAS<br/>
              <span className="text-[#E5FF00] drop-shadow-[0_0_40px_rgba(229,255,0,0.2)]">SAPPINGTON</span>
            </h1>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <a href="mailto:nicholassappington@gmail.com" className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl hover:bg-[#E5FF00] hover:text-black transition-all font-bold text-xs uppercase tracking-widest shadow-lg">
                <Mail size={18}/> nicholassappington@gmail.com
              </a>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest text-[#E5FF00] shadow-lg">
                <Phone size={18}/> 310-621-8502
              </div>
              <a href="/portfolio.html" className="flex items-center gap-3 bg-[#E5FF00] text-black border border-[#E5FF00] px-6 py-3 rounded-2xl hover:bg-white hover:border-white transition-all font-black text-xs uppercase tracking-widest shadow-[0_10px_30px_rgba(229,255,0,0.3)]">
                <FlaskConical size={18}/> View Portfolio
              </a>
            </div>
          </div>
        </header>

        {/* GENERAL INFO AGENT (Interactive Layer) */}
        <section className={`${liquidGlass} mb-16 border-[#E5FF00]/50 border-2`}>
          {/* Glass Gloss Overlay */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

          <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E5FF00] flex items-center justify-center shadow-[0_0_20px_rgba(229,255,0,0.4)]">
                <Sparkles size={24} className="text-black" />
              </div>
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tighter italic leading-none">General Info Agent</h2>
                <p className="text-[10px] text-[#E5FF00] font-bold uppercase tracking-[0.4em] mt-1.5 opacity-80">Interactive SF Representative</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3 bg-green-400/10 px-4 py-1.5 rounded-full border border-green-400/20">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase text-green-400 tracking-widest">Agent Live</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            <div className="flex flex-col">
              <p className="text-sm font-bold text-zinc-100 mb-8 italic border-l-4 border-[#E5FF00] pl-6 leading-relaxed">
                "Verified Agent Online. I represent Nicholas from San Francisco. Ask about his work at Nutraperfecto, his Lopass LLC operations, his charting analyst background, or his expertise in Ableton 12 and Illustrator."
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => { setUserQuery(q); askAgent(q); }}
                    className="text-left p-4 rounded-xl bg-white/5 border border-white/5 text-[10px] md:text-[11px] font-black uppercase tracking-tight hover:bg-[#E5FF00] hover:text-black transition-all flex items-center justify-between group"
                  >
                    {q} <ChevronRight size={14} className="opacity-0 group-hover:opacity-100" />
                  </button>
                ))}
              </div>

              <div className="mt-auto relative">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 pr-16 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#E5FF00]/50 font-bold"
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && askAgent()}
                />
                <button
                  onClick={() => askAgent()}
                  disabled={isLoading}
                  className="absolute right-3 top-3 h-12 w-12 bg-[#E5FF00] text-black rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg"
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : <Send size={22} />}
                </button>
              </div>
            </div>

            <div className="relative min-h-[300px]">
              {aiResponse ? (
                <div className="bg-black/60 border border-white/10 rounded-[2.5rem] p-10 text-base leading-relaxed text-zinc-100 font-medium whitespace-pre-wrap animate-in fade-in zoom-in duration-500 h-full overflow-y-auto shadow-inner">
                   <div className="flex items-center gap-2 mb-6 text-[#E5FF00]">
                    <MessageSquare size={18}/>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Verified Response</span>
                   </div>
                   {aiResponse}
                </div>
              ) : (
                <div className="h-full border-2 border-white/5 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center text-zinc-700 p-12 text-center bg-black/20">
                  <Info size={40} className="mb-4 opacity-10" />
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">Awaiting Recruiter Input</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CORE CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          <div className="lg:col-span-4 space-y-10">
            {/* Tech Stack */}
            <div className={liquidGlass}>
              <div className="mb-8 flex justify-center">
                <div className="relative px-8 py-3 rounded-full bg-white/5 border border-white/10 text-[#E5FF00] font-black uppercase tracking-widest text-xs">
                  Tech Stack
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {['Ableton 12', 'Unity', 'ThinkOrSwim', 'Adobe Illustrator', 'Salesforce', 'MS Office'].map(p => (
                  <div key={p} className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center text-sm font-black uppercase tracking-widest hover:border-[#E5FF00] hover:text-[#E5FF00] transition-all cursor-default">
                    {p}
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className={liquidGlass}>
              <div className="mb-8 flex justify-center">
                <div className="relative px-8 py-3 rounded-full bg-white/5 border border-[#00f2ff]/30 text-[#00f2ff] font-black uppercase tracking-widest text-xs">
                  Linguistics
                </div>
              </div>
              <div className="space-y-6">
                {[{ n: 'English', l: 'Native', c: '#E5FF00' }, { n: 'Spanish', l: 'Advanced', c: '#00f2ff' }, { n: 'French', l: 'Intermed.', c: '#ff00ff' }].map(lang => (
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

          <div className="lg:col-span-8 space-y-10">
            {/* NUTRAPERFECTO */}
            <div className={`${liquidGlass} border-l-[16px] border-l-[#E5FF00]`}>
              <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                <div>
                  <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">Nutraperfecto</h2>
                  <p className="text-[#E5FF00] font-bold text-sm tracking-[0.2em] mt-3 opacity-90">Formulation & Research Specialist</p>
                </div>
                <div className="bg-[#E5FF00] text-black px-8 py-2.5 rounded-2xl text-[11px] font-black shadow-xl italic">2024 — 2026</div>
              </div>
              <div className="space-y-6 text-zinc-100 text-lg leading-relaxed">
                <p className="flex gap-6 items-start">
                  <FlaskConical className="shrink-0 text-[#E5FF00] mt-1" size={24}/>
                  <span>Engineered proprietary formulation blends by identifying synergistic active ingredients through rigorous research and testing.</span>
                </p>
                <p className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl border border-white/5">
                   <Zap className="shrink-0 text-[#E5FF00] mt-1" size={20}/>
                   <span className="text-sm italic">Managed global sourcing for supplement releases, ensuring scientific efficacy and ingredient purity.</span>
                </p>
              </div>
            </div>

            {/* LOPASS LLC */}
            <div className={`${liquidGlass} border-l-[12px] border-l-[#00f2ff]`}>
              <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                <div>
                  <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">Lopass LLC</h2>
                  <p className="text-[#00f2ff] font-bold text-sm tracking-[0.2em] mt-3 opacity-90 uppercase">Founder & Operator — Sold</p>
                </div>
                <div className="bg-[#00f2ff]/10 border border-[#00f2ff]/30 text-[#00f2ff] px-6 py-2 rounded-2xl text-[11px] font-black shadow-lg">2023 — 2026</div>
              </div>
              <div className="space-y-4 text-zinc-100 text-base leading-relaxed">
                <p className="flex gap-4 items-start">
                  <Briefcase className="shrink-0 text-[#00f2ff] mt-1" size={20}/>
                  <span>Founded and grew a Los Angeles black-car chauffeur service catering to celebrity, entertainment, and high-net-worth clientele — airport transfers and exclusive events.</span>
                </p>
                <p className="text-zinc-300 text-sm pl-9">Built the driver roster, ran dispatch, and set the operational standard for absolute discretion and white-glove reliability.</p>
                <p className="text-zinc-300 text-sm pl-9">Owned client relationships and managed day-to-day business operations end-to-end.</p>
                <p className="text-zinc-300 text-sm pl-9 italic">Negotiated and closed a successful exit, selling the company.</p>
              </div>
            </div>

            {/* TECHNICAL MARKET ANALYST */}
            <div className={liquidGlass}>
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
            <div className={liquidGlass}>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className={liquidGlass}>
                  <h4 className="font-black uppercase text-[#E5FF00] text-[10px] tracking-[0.3em] mb-4">CSU Los Angeles</h4>
                  <p className="font-black text-2xl italic uppercase leading-tight">B.A. Liberal Arts</p>
                  <p className="text-[10px] text-zinc-500 font-bold mt-2 tracking-widest uppercase">Political Science | 3.5 GPA</p>
               </div>
               <div className={liquidGlass}>
                  <h4 className="font-black uppercase text-[#E5FF00] text-[10px] tracking-[0.3em] mb-4">Santa Monica College</h4>
                  <p className="font-black text-2xl italic uppercase leading-tight">A.A. Humanities</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glossy Footer Bar */}
      <div className="fixed bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#E5FF00] to-transparent opacity-40 shadow-[0_0_20px_rgba(229,255,0,0.5)]"></div>
    </div>
  );
};

const AppWithBoundary = () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

export default AppWithBoundary;
