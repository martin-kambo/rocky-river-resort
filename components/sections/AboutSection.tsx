/* ════════════════════════════════
   ABOUT SECTION
════════════════════════════════ */
export function AboutSection() {
  return (
    <section id="about" style={{ background:'var(--cream)', padding:'7rem 0' }}>
      <div className="sec-inner" style={{ maxWidth:1180, margin:'0 auto', padding:'0 5%' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6rem', alignItems:'center' }} className="about-grid">
 
          {/* Image + badge */}
          <div className="about-img-wrap rl" style={{ position:'relative' }}>
            <div style={{ width:'100%', aspectRatio:'4/5', overflow:'hidden', background:'var(--sage-mid)' }}>
              {/* Exact SVG from index.html */}
              <svg viewBox="0 0 480 600" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'100%', display:'block' }}>
                <defs>
                  <linearGradient id="ab-sky"   x1="0" y1="0" x2="0" y2="1"><stop offset="0%"   stopColor="#C8DCD8"/><stop offset="100%" stopColor="#8ABCCA"/></linearGradient>
                  <linearGradient id="ab-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%"   stopColor="#EDE5D0"/><stop offset="100%" stopColor="#D9CDB8"/></linearGradient>
                </defs>
                <rect width="480" height="600" fill="url(#ab-floor)"/>
                <rect x="50" y="55" width="380" height="265" fill="url(#ab-sky)" rx="2"/>
                <polygon points="50,320 120,210 185,250 240,170 300,215 365,185 430,218 480,198 480,320" fill="#2C4636" opacity=".75"/>
                <polygon points="50,320 150,255 215,275 270,215 325,248 395,228 430,248 480,238 480,320" fill="#3A5C45" opacity=".5"/>
                <ellipse cx="70"  cy="315" rx="28" ry="42" fill="#1A2E22"/>
                <ellipse cx="445" cy="313" rx="25" ry="38" fill="#1A2E22"/>
                <line x1="242" y1="170" x2="236" y2="295" stroke="#A8D8E8" strokeWidth="8" opacity=".35"/>
                <line x1="248" y1="170" x2="242" y2="295" stroke="#A8D8E8" strokeWidth="4" opacity=".2"/>
                <circle cx="380" cy="115" r="60" fill="#F8E488" opacity=".2"/>
                <circle cx="380" cy="115" r="35" fill="#F5D870" opacity=".3"/>
                <rect x="50" y="55"  width="380" height="8" fill="#8B7A60" opacity=".4"/>
                <rect x="50" y="312" width="380" height="8" fill="#8B7A60" opacity=".4"/>
                <rect x="0" y="365" width="480" height="235" fill="#EDE5D0"/>
                <rect x="70" y="378" width="340" height="185" fill="#C8BDA8" rx="4"/>
                <rect x="70" y="378" width="340" height="52"  fill="#B0A492" rx="4"/>
                <rect x="85"  y="365" width="88" height="58" fill="#F5EFE0" rx="10"/>
                <rect x="307" y="365" width="88" height="58" fill="#F5EFE0" rx="10"/>
                <rect x="70" y="430" width="340" height="30" fill="#9A8E78" rx="2"/>
                <line x1="70" y1="446" x2="410" y2="446" stroke="#8A8068" strokeWidth="1" opacity=".5"/>
                <rect x="30"  y="430" width="35" height="55" fill="#A89C88"/>
                <circle cx="47"  cy="420" r="22" fill="#F8E488" opacity=".15"/>
                <rect x="415" y="430" width="35" height="55" fill="#A89C88"/>
                <circle cx="432" cy="420" r="22" fill="#F8E488" opacity=".15"/>
                <ellipse cx="455" cy="400" rx="16" ry="25" fill="#3A6248" opacity=".8"/>
                <rect x="449" y="425" width="12" height="18" fill="#7A5A3A"/>
                <polygon points="50,320 200,550 0,570 0,320" fill="#F8F0D8" opacity=".07"/>
              </svg>
            </div>
            <div style={{ position:'absolute', bottom:'-1.8rem', right:'-1.8rem', background:'var(--sage)', padding:'1.5rem', border:'3px solid var(--cream)' }}>
              <span style={{ fontFamily:'var(--serif)', fontSize:'2.4rem', fontWeight:300, color:'var(--gold-warm)', lineHeight:1, display:'block' }}>10+</span>
              <div style={{ fontFamily:'var(--sans)', fontSize:'.58rem', letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(247,242,232,.6)', marginTop:'.3rem' }}>Years of riverside luxury</div>
            </div>
          </div>
 
          {/* Text */}
          <div className="about-text rr" style={{ paddingRight:'1rem' }}>
            <div className="eyebrow">Our Story</div>
            <h2 className="sec-title">Born from the <em>Rhythm</em><br />of the Athi</h2>
            <div className="divider" />
            <p className="sec-body">Rocky River Resort was born from a singular vision — to make the natural grandeur of Kenya's Athi basin your most luxurious address. Here, the falls are your alarm clock and the mountain your eternal horizon.</p>
            <blockquote style={{ fontFamily:'var(--serif)', fontSize:'1.45rem', fontWeight:300, fontStyle:'italic', color:'rgba(26,46,34,.5)', lineHeight:1.65, borderLeft:'2px solid var(--gold)', paddingLeft:'1.4rem', margin:'1.8rem 0' }}>
              "The river does not hurry, yet it arrives. Come, and learn to live by its rhythm."
            </blockquote>
            <p className="sec-body">Perched on the banks of River Athi, minutes from the legendary 14 Falls, wrapped in the emerald embrace of Del Monte plantations — this is not simply a resort. It is a return to yourself.</p>
            <div style={{ display:'flex', gap:'.8rem', marginTop:'1.8rem', flexWrap:'wrap' }}>
              {['Eco-Luxury','River Athi','14 Falls','Kilimambogo','Thika East'].map(p => (
                <div key={p} style={{ fontFamily:'var(--sans)', fontSize:'.62rem', letterSpacing:'.15em', textTransform:'uppercase', padding:'.45rem 1rem', border:'1px solid rgba(58,92,69,.25)', color:'var(--sage-mid)', fontWeight:300, transition:'all .3s', cursor:'default' }}>{p}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
 
      <style>{`
        @media (max-width: 860px) { .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; } }
      `}</style>
    </section>
  )
}