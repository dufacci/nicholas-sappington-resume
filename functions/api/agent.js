// Cloudflare Pages Function — proxies the resume's "Ask a question" box to
// Gemini so the API key never reaches the browser. Requires a GEMINI_API_KEY
// secret set on the Pages project (wrangler pages secret put GEMINI_API_KEY).

const RESUME_DATA = `
  Name: Nick Sappington
  Location: San Francisco, CA
  Contact: nicholassappington@gmail.com | 310-621-8502
  Experience:
  - Nutraperfecto (2024-2026): Formulation & Research Specialist. Sourced premium ingredients and engineered proprietary supplement blends by identifying synergistic actives, then testing the combinations rather than trusting the label.
  - Lopass LLC (2023-2026): Founder & Operator. Built and ran a Los Angeles black-car chauffeur service for celebrity, entertainment, and high-net-worth clients — airport transfers and exclusive events. Owned the driver roster, dispatch, and client relationships end to end; Nick ran operations and did not drive clients personally. Exited via a negotiated sale.
  - Technical Market Analyst (2020-2022): Paid charting/technical-analysis contributor for the Royce Jacob and MapleStax brands on YouTube and Twitter (X). Translated dense options and equity setups into visuals retail traders could act on, and published live trade ideas to subscriber communities.
  - TCM Festival (2024): Production Manager. Managed logistics for guest filmmakers and VIPs across the festival run.
  - The Gunter (2017-2018): Audio Production & Lead Sound Designer. Curated the sound-effects library, directed score, and secured critical funding for the audio side of the production.
  - Sprint (2014-2017): Assistant Store Manager & Sales Representative. Top 10 business sales in district; Salesforce power user.
  Education: CSU Los Angeles (B.A. Political Science, 3.5 GPA), Santa Monica College (A.A. Humanities, transfer).
  Languages: English (Native), Spanish (Advanced), French (Intermediate).
  Skills: Ableton Live 12, Claude Code/Cowork & Gemini Canvas, thinkorswim, Adobe Illustrator, Salesforce, MS Office.
`;

const PERSONAL_CONTEXT = `
  PERSONAL CONTEXT (use to add color and personality — not strictly resume facts):
  - Based in San Francisco.
  - Deep into electronic music production in Ableton Live — current focus is humanizing drum patterns. Closet studio built around Kali Audio LP-6 monitors with boundary EQ dialed in, Neumann NDH 20 headphones, and Focal Alpha Evo 65s.
  - Hands-on and DIY-oriented.
  - The throughline across his work is range: supplement formulation, running an operations business to a sale, technical charting, and sound design — same instinct each time, learn the system deeply, then build something in it.
`;

const SYSTEM_PROMPT = `
You are Nick Sappington's Personal AI Agent, embedded on his resume site. Your job is to answer visitor questions about Nick for potential employers/collaborators.
TONE: Confident, concise, professional — never sycophantic or over-the-top.
RESUME DATA: ${RESUME_DATA}
PERSONAL CONTEXT: ${PERSONAL_CONTEXT}
INSTRUCTIONS:
- Only answer questions about Nick's background, work, or skills. If asked something unrelated, politely redirect to his resume.
- Never invent facts not supported by the data above.
- Keep answers under 80 words, no markdown formatting.
`;

export async function onRequestPost(context) {
  const { request, env } = context;
  const jsonHeaders = { 'Content-Type': 'application/json' };

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400, headers: jsonHeaders });
  }

  const query = typeof body?.query === 'string' ? body.query.trim() : '';
  if (!query) {
    return new Response(JSON.stringify({ error: 'Missing question' }), { status: 400, headers: jsonHeaders });
  }
  if (query.length > 500) {
    return new Response(JSON.stringify({ error: 'Question is too long' }), { status: 400, headers: jsonHeaders });
  }

  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Agent is not configured yet.' }), { status: 500, headers: jsonHeaders });
  }

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify({
          contents: [{ parts: [{ text: query }] }],
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        }),
      }
    );

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      console.error('Gemini API error:', geminiRes.status, data);
      return new Response(JSON.stringify({ error: data?.error?.message || `Gemini error ${geminiRes.status}` }), { status: 502, headers: jsonHeaders });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      console.error('Gemini API: empty/unexpected response shape:', data);
      return new Response(JSON.stringify({ error: 'Empty response from model' }), { status: 502, headers: jsonHeaders });
    }

    return new Response(JSON.stringify({ text: text.trim() }), { status: 200, headers: jsonHeaders });
  } catch (err) {
    console.error('Gemini fetch failed:', err);
    return new Response(JSON.stringify({ error: 'Failed to reach the model' }), { status: 502, headers: jsonHeaders });
  }
}

export async function onRequestGet() {
  return new Response(JSON.stringify({ error: 'Use POST' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
}
