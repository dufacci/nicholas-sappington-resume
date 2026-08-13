import { useEffect, useState, useCallback, Component } from 'react';
import './resume-index.css';

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err, info) { console.error('Resume crashed:', err, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', background: '#000', color: '#E9F5A5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: '"Courier Prime", monospace', padding: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: '.5rem' }}>Nick Sappington</h1>
          <p style={{ color: '#8f8f8f', marginBottom: '1.5rem', fontFamily: '"JetBrains Mono", monospace' }}>nicholassappington@gmail.com · 310-621-8502</p>
          <button onClick={() => window.location.reload()} style={{ background: '#E9F5A5', color: '#000', border: 'none', padding: '.75rem 2rem', fontWeight: 700, cursor: 'pointer', fontSize: '.75rem', letterSpacing: '.1em', textTransform: 'uppercase', fontFamily: '"Courier Prime", monospace' }}>
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const QA = {
  'Nutraperfecto role details': "Formulation & Research Specialist, 2024–2026. Sourced premium ingredients and engineered proprietary blends — the work was finding actives that actually work together, then testing the combination rather than trusting the label.",
  'Lopass LLC story': "Founded a Los Angeles black-car service for celebrity and high-net-worth clients. Nick ran the business — driver roster, dispatch, client relationships — and built a reputation on discretion. He never drove clients himself. Exited via a negotiated sale.",
  'Charting analyst background': "Paid technical-analysis contributor for the Royce Jacob and MapleStax brands, 2020–2022. Turned dense options and equity setups into visuals retail traders could act on, and published live ideas to subscriber communities.",
  'Tech stack overview': "Ableton Live 12 for production, Claude Code / Cowork and Gemini Canvas for building, thinkorswim for markets, Illustrator for design, plus Salesforce and MS Office from the sales years.",
  'Music production setup': "A closet studio built around Kali Audio LP-6 monitors with boundary EQ properly dialled in, Neumann NDH 20 headphones, and Focal Alpha Evo 65s. Current obsession: humanizing drum patterns in Ableton.",
  'What makes Nick unique?': "The range is the point — supplement formulation, running an operations business to a sale, technical charting, and sound design. Same instinct each time: learn the system deeply, then build something in it.",
};

const SQ_VIEWBOX = { sq1: '0 0 435.2 47.8', sq2: '0 0 437.3 53.4', sq3: '0 0 427.3 35.4' };

const EXP = [
  { name: 'Nutraperfecto', year: '2024 — 2026', tip: 'Formulation & Research Specialist', titleColor: '#E9F5A5', title: 'Formulation & Research Specialist', sq: 'sq1',
    body: ['Engineered proprietary supplement blends by identifying synergistic active ingredients through rigorous research and testing.', 'Managed global sourcing, holding suppliers to scientific efficacy and purity over price.'],
    link: { text: 'Read the neuropathy case study ↗', href: '/portfolio.html' } },
  { name: 'Lopass LLC', year: '2023 — 2026', tip: 'Founder & Operator — sold', titleColor: '#00f2ff', title: 'Founder & Operator — Sold', sq: 'sq2',
    body: ['Founded and grew a Los Angeles black-car service for celebrity, entertainment, and high-net-worth clients — airport transfers and exclusive events.', 'Built the driver roster and dispatch, owned client relationships end to end, and negotiated a successful exit.'],
    link: { text: 'Visit lopassllc.com ↗', href: 'https://lopassllc.com', external: true } },
  { name: 'Market Analyst', year: '2020 — 2022', tip: 'Charting & technical analysis', titleColor: '#00f2ff', title: 'Technical Market Analyst — Royce Jacob & MapleStax', sq: 'sq3',
    body: ['Paid technical-analysis contributor for the Royce Jacob and MapleStax brands on YouTube and Twitter (X).', 'Translated options and equity setups into accessible visuals, publishing live trade ideas to active subscriber communities.'] },
  { name: 'TCM Festival', year: '2024', tip: 'Production Manager', titleColor: '#ff00ff', title: 'Production Manager', sq: 'sq1',
    body: ['Managed logistics for guest filmmakers and VIPs across the festival run.'] },
  { name: 'The Gunter', year: '2017 — 2018', tip: 'Audio Production Lead', titleColor: '#ff00ff', title: 'Audio Production & Lead Sound Designer', sq: 'sq2',
    body: ['Lead sound designer — curated the sound-effects library, directed score, and secured critical funding for the audio side of the production.'] },
  { name: 'Sprint', year: '2014 — 2017', tip: 'Assistant Store Manager', titleColor: '#E9F5A5', title: 'Assistant Store Manager & Sales Representative', sq: 'sq3',
    body: ['Top 10 business sales in district; Salesforce power user.'] },
];

const TECH_STACK = [
  { name: 'Ableton Live 12', icon: '/logos/ableton.png' },
  { name: 'Claude Code / Cowork & Gemini Canvas', icon: '/logos/claude.svg' },
  { name: 'thinkorswim', icon: '/logos/thinkorswim.png' },
  { name: 'Adobe Illustrator', icon: '/logos/illustrator.svg' },
  { name: 'Salesforce', icon: '/logos/salesforce.svg' },
  { name: 'MS Office', icon: '/logos/msoffice.svg' },
];

const LANGUAGES = [
  { name: 'English', level: 'Native', width: '100%', color: 'var(--lime)', glow: 'rgba(233,245,165,.5)' },
  { name: 'Spanish', level: 'Advanced', width: '80%', color: 'var(--cyan)', glow: 'rgba(0,242,255,.5)' },
  { name: 'French', level: 'Intermediate', width: '50%', color: 'var(--magenta)', glow: 'rgba(255,0,255,.5)' },
];

function pickRandom(n) {
  return Object.keys(QA).sort(() => Math.random() - 0.5).slice(0, n);
}

/** Splits text into per-character spans so CSS can cycle hover colors letter by letter. */
function HoverText({ text, className = '' }) {
  return (
    <span className={`hover-split ${className}`}>
      {[...text].map((ch, i) => (
        <span className="ltr" key={i}>{ch === ' ' ? ' ' : ch}</span>
      ))}
    </span>
  );
}

const App = () => {
  const [tip, setTip] = useState({ show: false, text: '', x: 0, y: 0 });
  const [expandedMap, setExpandedMap] = useState({});
  const [hoveredEntry, setHoveredEntry] = useState(null);
  const [qOptions] = useState(() => pickRandom(2));
  const [askInput, setAskInput] = useState('');
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExpandedMap((prev) => ({ ...prev, 0: true }));
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  const onFieldMove = useCallback((e) => {
    setTip((t) => (t.show ? { ...t, x: e.clientX, y: e.clientY } : t));
  }, []);

  const showTip = (text) => setTip((t) => ({ ...t, show: true, text }));
  const hideTip = () => setTip((t) => ({ ...t, show: false }));

  const toggleEntry = (idx) => setExpandedMap((prev) => ({ ...prev, [idx]: !prev[idx] }));
  const onEntryEnter = (idx, tipText) => {
    showTip(tipText);
    setHoveredEntry(idx);
    if (idx === 1) setExpandedMap((prev) => (prev[1] ? prev : { ...prev, 1: true }));
  };
  const onEntryLeave = () => { hideTip(); setHoveredEntry(null); };

  const showAnswer = (q) => {
    setAnswer(QA[q] || "In the live build this question goes to the agent, which answers from Nick's resume and personal context.");
    setAskInput(q);
  };
  const submitAsk = () => { if (askInput.trim()) showAnswer(askInput.trim()); };

  return (
    <div className="resume-root" onMouseMove={onFieldMove}>
      <div className="field" aria-hidden="true">
        <div className="glow glow-lime"></div>
        <div className="glow glow-cyan"></div>
        <div className="glow glow-magenta"></div>
      </div>

      <div className="tip" style={{ left: tip.x, top: tip.y, opacity: tip.show ? 1 : 0 }} aria-hidden="true">
        {tip.text}
      </div>

      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
        <symbol id="sq1" viewBox={SQ_VIEWBOX.sq1}>
          <g transform="translate(-5.6,-13.7)">
            <path pathLength="1" vectorEffect="non-scaling-stroke" d="m437.8 33.8c-5-7.8-14.3-13.8-24.8-14.3-27.4-1.2-40.7 27.9-61.7 35.8s-40.4-0.3-54.9-6.9c-20.7-12.3-36.9-23.4-56.4-23.3-30.5 0-55.4 24.5-85 31.9-39.5 6-62.8-21.9-91.9-35.8-16.8-7.5-43.1-7.7-54.5 16.7"/>
          </g>
        </symbol>
        <symbol id="sq2" viewBox={SQ_VIEWBOX.sq2}>
          <g transform="translate(-5.0,-53.4)">
            <path pathLength="1" vectorEffect="non-scaling-stroke" d="m439.3 77.1c-4.3-2.8-10.3-3.2-17.4-0.1-12.4 5.6-18.9 13.8-30.9 14.1s-22.3-5.5-37-6.6c-25.6-1.4-47.8 13.9-74.9 18.5-17.1 2.8-36-1.3-43.8-15-8.2-13.8-2.7-31 11.4-31.6 14.3-0.5 18 16.8 7.8 25.1-3.5 2.8-8.8 5.6-18.3 5.8-14.5-0.2-28.5-11.3-44-14.5-22.8-3.8-37.2 14.8-57.3 21.3-11.8 3.8-26.2 2.5-40.7-2-19-5.4-36-15-55.3-17-11.7-0.4-22.3 1.5-30.9 10.1"/>
          </g>
        </symbol>
        <symbol id="sq3" viewBox={SQ_VIEWBOX.sq3}>
          <g transform="translate(-9.7,-106.1)">
            <path pathLength="1" vectorEffect="non-scaling-stroke" d="m12.7 132.9c24.6 2 48.2-8.8 73.6-15.9 15.7-4.4 36-9 52.8-3 5.6 1.9 19.2 6.9 19.2 15.1-0.3 9.3-11.3 9.3-12.7 0.8-1.1-6 8.4-19.8 33.8-20.7 34.5-1.3 61.6 19.4 94.3 25.2 10.4 1.6 26.3 1.4 32.9-5 10.4-7.5 5.5-22.3-6.2-19.9-15.9 3.4-14.3 22.6 0.3 27.4 12 4.1 24.8-0.3 35.8-4.5 17-6.8 27.4-7.4 46.5-5.8l51 4.6"/>
          </g>
        </symbol>
      </svg>

      <div className="page has-agent">
        <header className="masthead">
          <div className="portrait" data-tip="Nick Sappington" onMouseEnter={() => showTip('Nick Sappington')} onMouseLeave={hideTip}>
            <div className="portrait-frame">
              <img src="/nick-photo.png" alt="Nick Sappington" onError={(e) => { e.currentTarget.style.opacity = '0'; }} />
            </div>
            <div className="tagpill">San Francisco Based</div>
          </div>

          <div className="namebox">
            <h1>
              <HoverText text="NICK" />
              <br />
              <HoverText text="SAPPINGTON" className="accent-word" />
            </h1>
            <div className="tagline">Formulation · Operations · Markets · Sound</div>
            <div className="contact-row">
              <a href="mailto:nicholassappington@gmail.com" data-tip="Send an email" onMouseEnter={() => showTip('Send an email')} onMouseLeave={hideTip}>
                nicholassappington@gmail.com
              </a>
              <span className="static lime">310-621-8502</span>
              <a href="/portfolio.html" data-tip="Nutraperfecto case study" onMouseEnter={() => showTip('Nutraperfecto case study')} onMouseLeave={hideTip}>
                Portfolio ↗
              </a>
            </div>
          </div>

          <div className="agent-panel">
            <div className="agent-panel-inner">
              <div className="agent-head">
                <span className="agent-dot" aria-hidden="true"></span>
                <h2><HoverText text="General Info Agent" /></h2>
              </div>

              <p className="agent-quote">&ldquo;Verified agent online. Ask about Nick&apos;s work, background, or skills.&rdquo;</p>

              <div className="qgrid">
                {qOptions.map((q) => (
                  <button key={q} className="qbtn" onClick={() => showAnswer(q)}>
                    <span>{q}</span><span>↗</span>
                  </button>
                ))}
              </div>

              <div className="ask">
                <input
                  type="text"
                  placeholder="Ask a question…"
                  aria-label="Ask the agent a question"
                  value={askInput}
                  onChange={(e) => setAskInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') submitAsk(); }}
                />
                <button aria-label="Send" onClick={submitAsk}>→</button>
              </div>

              <div className={`answer ${answer ? '' : 'idle'}`}>
                {answer ? (
                  <div>
                    <span className="tagline-sm">Verified response · mockup</span>
                    {answer}
                  </div>
                ) : 'Awaiting input'}
              </div>
            </div>
          </div>
        </header>

        <div className="index-label">Experience</div>

        <div className="idx">
          {EXP.map((exp, idx) => {
            const isOpen = !!expandedMap[idx];
            const sqOn = hoveredEntry === idx;
            return (
              <div className="entry" key={exp.name}>
                <button
                  className="entry-head"
                  aria-expanded={isOpen}
                  data-tip={exp.tip}
                  onClick={() => toggleEntry(idx)}
                  onMouseEnter={() => onEntryEnter(idx, exp.tip)}
                  onMouseLeave={onEntryLeave}
                >
                  <span className="entry-num">{`# 0${idx + 1}`}</span>
                  <span className="entry-name"><HoverText text={exp.name} /></span>
                  <span className={`entry-sq entry-sq-wrap ${sqOn ? 'on' : ''}`}>
                    <svg preserveAspectRatio="none" viewBox={SQ_VIEWBOX[exp.sq]}><use xlinkHref={`#${exp.sq}`}></use></svg>
                  </span>
                  <span className="entry-year">{exp.year}</span>
                  <span className="entry-chev">▸</span>
                </button>
                <div className={`entry-wrap ${isOpen ? 'open' : ''}`}>
                  <div className="entry-wrap-inner">
                    <div className="entry-glow" aria-hidden="true"></div>
                    <div className="entry-body">
                      <div className="entry-title" style={{ color: exp.titleColor }}>{exp.title}</div>
                      {exp.body.map((p, i) => <p key={i}>{p}</p>)}
                      {exp.link && (
                        <p style={{ margin: 0 }}>
                          <a
                            className="entry-link"
                            href={exp.link.href}
                            {...(exp.link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          >
                            {exp.link.text}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="panels">
          <div className="glass panel">
            <h2><HoverText text="Tech Stack" /></h2>
            {TECH_STACK.map((t, i) => (
              <div className="stack-row" key={t.name}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <img src={t.icon} alt="" />
                {t.name}
              </div>
            ))}
          </div>

          <div className="glass panel">
            <h2><HoverText text="Linguistics" /></h2>
            {LANGUAGES.map((lang) => (
              <div className="lang" key={lang.name}>
                <div className="lang-top">
                  <span>{lang.name}</span>
                  <span style={{ color: lang.color }}>{lang.level}</span>
                </div>
                <div className="lang-bar">
                  <span style={{ width: lang.width, background: lang.color, boxShadow: `0 0 8px ${lang.glow}` }}></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="edu-section">
          <div className="index-label" style={{ padding: 0 }}>Education</div>
          <div className="edu-grid">
            <div className="edu">
              <div className="school">CSU Los Angeles</div>
              <div className="deg">B.A. Political Science</div>
              <div className="meta">3.5 GPA</div>
            </div>
            <div className="edu">
              <div className="school">Santa Monica College</div>
              <div className="deg">A.A. Humanities</div>
              <div className="meta">Transfer</div>
            </div>
          </div>
        </div>

        <footer className="resume-footer">
          <span>Nick Sappington</span>
          <span>San Francisco</span>
          <a href="mailto:nicholassappington@gmail.com">nicholassappington@gmail.com</a>
        </footer>
      </div>
    </div>
  );
};

const AppWithBoundary = () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

export default AppWithBoundary;
