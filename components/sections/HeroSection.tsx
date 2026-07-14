/**
 * components/sections/HeroSection.tsx  — Server Component
 * Exact port of #hero from index.html.
 * All SVG, animations, mist bands, river shimmer preserved 1:1.
 */
import Link from 'next/link'
a
export function HeroSection() {
  return (
    <section id="hero" style={{ position: 'relative', height: '100vh', minHeight: 640, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

      {/* Layered gradient background */}
      <div className="hero-bg" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#E8E0CC 0%,#C8DAC8 25%,#96BCBA 55%,#72A8B0 75%,#5A9098 100%)' }} />

      {/* Cinematic landscape SVG — exact from index.html */}
      <svg className="hero-svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
        <defs>
          <linearGradient id="hg-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#E8E0CC"/>
            <stop offset="30%"  stopColor="#CCDAC8"/>
            <stop offset="65%"  stopColor="#96B8B8"/>
            <stop offset="100%" stopColor="#72A0A8"/>
          </linearGradient>
          <linearGradient id="hg-mt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#3A5C45" stopOpacity=".9"/>
            <stop offset="100%" stopColor="#1A2E22" stopOpacity=".95"/>
          </linearGradient>
          <linearGradient id="hg-mt2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#527A62"/>
            <stop offset="100%" stopColor="#2C4636"/>
          </linearGradient>
          <linearGradient id="hg-riv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#5A9EB0"/>
            <stop offset="100%" stopColor="#3A7888"/>
          </linearGradient>
        </defs>
        <rect width="1440" height="900" fill="url(#hg-sky)"/>
        <circle cx="1060" cy="195" r="120" fill="#F8E488" opacity=".28"/>
        <circle cx="1060" cy="195" r="72"  fill="#F5D870" opacity=".45"/>
        <circle cx="1060" cy="195" r="40"  fill="#F0CC50" opacity=".7"/>
        <g stroke="#F5D870" strokeWidth="1" opacity=".15">
          <line x1="1060" y1="95"  x2="1060" y2="50"/>
          <line x1="1060" y1="295" x2="1060" y2="340"/>
          <line x1="960"  y1="195" x2="915"  y2="195"/>
          <line x1="1160" y1="195" x2="1205" y2="195"/>
          <line x1="990"  y1="125" x2="958"  y2="93"/>
          <line x1="1130" y1="265" x2="1162" y2="297"/>
          <line x1="1130" y1="125" x2="1162" y2="93"/>
          <line x1="990"  y1="265" x2="958"  y2="297"/>
        </g>
        <polygon points="0,600 100,440 180,490 260,360 340,420 430,320 520,395 600,305 680,370 760,285 840,345 920,290 1010,340 1100,275 1180,325 1260,295 1340,340 1440,310 1440,620 0,620" fill="url(#hg-mt)"/>
        <polygon points="0,630 120,490 200,530 290,420 380,470 460,390 550,445 640,375 720,420 800,360 880,400 970,355 1060,395 1150,350 1230,385 1320,358 1440,390 1440,650 0,650" fill="url(#hg-mt2)" opacity=".65"/>
        <line x1="760" y1="285" x2="750" y2="460" stroke="#A8D8E8" strokeWidth="12" opacity=".3"/>
        <line x1="770" y1="285" x2="760" y2="460" stroke="#A8D8E8" strokeWidth="6"  opacity=".18"/>
        <line x1="750" y1="288" x2="740" y2="460" stroke="#A8D8E8" strokeWidth="4"  opacity=".14"/>
        <line x1="780" y1="288" x2="770" y2="460" stroke="#A8D8E8" strokeWidth="3"  opacity=".12"/>
        <ellipse cx="757" cy="465" rx="80" ry="18" fill="#C5E8F0" opacity=".45"/>
        <ellipse cx="757" cy="472" rx="55" ry="10" fill="#C5E8F0" opacity=".25"/>
        <ellipse cx="60"   cy="650" rx="80"  ry="115" fill="#1A2E22"/>
        <ellipse cx="160"  cy="638" rx="70"  ry="100" fill="#2C4636"/>
        <ellipse cx="260"  cy="645" rx="75"  ry="108" fill="#1A2E22"/>
        <ellipse cx="360"  cy="648" rx="65"  ry="95"  fill="#2C4636"/>
        <ellipse cx="1090" cy="642" rx="72"  ry="105" fill="#1A2E22"/>
        <ellipse cx="1200" cy="638" rx="78"  ry="112" fill="#2C4636"/>
        <ellipse cx="1310" cy="645" rx="68"  ry="100" fill="#1A2E22"/>
        <ellipse cx="1410" cy="648" rx="60"  ry="92"  fill="#2C4636"/>
        <ellipse cx="0"    cy="680" rx="50"  ry="75"  fill="#0C1610"/>
        <ellipse cx="420"  cy="672" rx="55"  ry="78"  fill="#0C1610"/>
        <ellipse cx="1040" cy="670" rx="52"  ry="75"  fill="#0C1610"/>
        <ellipse cx="1440" cy="675" rx="55"  ry="78"  fill="#0C1610"/>
        <rect x="850" y="555" width="190" height="6" fill="#4A7A5A" opacity=".35" rx="3"/>
        <rect x="850" y="568" width="190" height="5" fill="#3A6248" opacity=".3"  rx="3"/>
        <rect x="850" y="579" width="190" height="5" fill="#4A7A5A" opacity=".28" rx="3"/>
        <rect x="850" y="589" width="190" height="5" fill="#3A6248" opacity=".25" rx="3"/>
        <path d="M0,790 Q180,768 360,782 Q540,796 720,770 Q900,748 1080,768 Q1260,784 1440,760 L1440,900 L0,900Z" fill="url(#hg-riv)"/>
        <path d="M0,790 Q180,772 360,784 Q540,796 720,773 Q900,752 1080,770 Q1260,786 1440,762" stroke="#9CD8E8" strokeWidth="2" fill="none" opacity=".45"/>
        <rect x="180" y="740" width="320" height="85" fill="#4A9EB0" opacity=".5" rx="3"/>
        <path d="M180,760 Q340,753 500,764" stroke="#8FCEDD" strokeWidth="2"   fill="none" opacity=".4"/>
        <path d="M180,778 Q340,770 500,782" stroke="#8FCEDD" strokeWidth="1.5" fill="none" opacity=".3"/>
        <rect x="170" y="733" width="340" height="10" fill="#8B7A60" opacity=".6" rx="2"/>
        <path d="M620,250 Q626,244 632,250" stroke="#2C4636" strokeWidth="1.5" fill="none" opacity=".4"/>
        <path d="M640,238 Q647,232 654,238" stroke="#2C4636" strokeWidth="1.5" fill="none" opacity=".35"/>
        <path d="M660,255 Q665,250 670,255" stroke="#2C4636" strokeWidth="1"   fill="none" opacity=".25"/>
        <rect x="0" y="580" width="1440" height="40" fill="#E0EAD8" opacity=".07"/>
        <rect x="0" y="600" width="1440" height="30" fill="#E0EAD8" opacity=".05"/>
      </svg>

      {/* Warm sun glow */}
      <div className="hero-sun" style={{ position:'absolute', top:'12%', right:'28%', width:240, height:240, background:'radial-gradient(circle,rgba(248,224,140,.7) 0%,rgba(240,200,100,.35) 35%,transparent 70%)', borderRadius:'50%', animation:'sunPulse 7s ease-in-out infinite' }} />

      {/* Mist bands */}
      <div className="mist" style={{ position:'absolute', left:'-15%', right:'-15%', height:70, background:'rgba(247,242,232,.22)', borderRadius:'50%', filter:'blur(18px)', top:'62%', animation:'mistSlide 14s ease-in-out infinite' }} />
      <div className="mist" style={{ position:'absolute', left:'-15%', right:'-15%', height:70, background:'rgba(247,242,232,.22)', borderRadius:'50%', filter:'blur(18px)', top:'70%', animation:'mistSlide 18s ease-in-out infinite', animationDelay:'-7s', opacity:.5 }} />

      {/* River shimmer */}
      <div className="hero-river" style={{ position:'absolute', bottom:0, left:0, right:0, height:'30%', background:'linear-gradient(0deg,rgba(72,140,155,.75) 0%,rgba(90,160,170,.5) 40%,transparent 100%)' }}>
        {[{dur:'5s',b:'68%'},{dur:'7.5s',b:'55%',delay:'-2.5s'},{dur:'10s',b:'42%',delay:'-5s'}].map((r,i) => (
          <div key={i} className="riv-line" style={{ position:'absolute', left:0, right:0, height:1, background:'rgba(255,255,255,.2)', bottom:r.b, animation:`rivLine ${r.dur} ease-in-out infinite`, animationDelay: r.delay ?? '0s' }} />
        ))}
      </div>

      {/* Foreground gradient */}
      <div className="hero-grad" style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,transparent 40%,rgba(12,22,16,.5) 100%), linear-gradient(to right,rgba(12,22,16,.15) 0%,transparent 50%)' }} />

      {/* Floating stat cards */}
      <HeroCard cls="hc1" label="Kilimambogo" value="2,145 m" note="In your sightline" style={{ top:'24%', left:'4%', animationDuration:'6.5s' }} />
      <HeroCard cls="hc2" label="14 Falls"    value="2 min"   note="From your room"   style={{ top:'32%', right:'4%', animationDuration:'8s', animationDelay:'-3s' }} />

      {/* Hero content */}
      <div className="hero-content" style={{ position:'relative', zIndex:10, textAlign:'center', maxWidth:860, padding:'0 6%' }}>
        <div className="hero-tag" style={{ fontFamily:'var(--sans)', fontSize:'.62rem', letterSpacing:'.38em', textTransform:'uppercase', color:'rgba(247,242,232,.8)', marginBottom:'1.4rem', display:'flex', alignItems:'center', justifyContent:'center', gap:'.9rem', animation:'riseUp .9s var(--ease-out) .2s both' }}>
          <span style={{ display:'block', width:25, height:1, background:'rgba(247,242,232,.5)' }} />
          River Athi · 14 Falls · Thika East, Kenya
          <span style={{ display:'block', width:25, height:1, background:'rgba(247,242,232,.5)' }} />
        </div>
        <h1 className="hero-h1" style={{ fontFamily:'var(--serif)', fontSize:'clamp(3rem,7.5vw,6.2rem)', fontWeight:300, lineHeight:1.08, letterSpacing:'-.015em', color:'var(--ivory)', animation:'riseUp 1.1s var(--ease-out) .4s both' }}>
          Where Serenity<br />
          <span>Meets the <em style={{ fontStyle:'italic', color:'var(--gold-warm)' }}>River</em></span>
        </h1>
        <p className="hero-sub" style={{ fontFamily:'var(--sans)', fontSize:'clamp(.88rem,1.8vw,1.05rem)', color:'rgba(247,242,232,.7)', fontWeight:300, lineHeight:1.75, maxWidth:480, margin:'1.3rem auto 0', letterSpacing:'.03em', animation:'riseUp 1.1s var(--ease-out) .6s both' }}>
          A luxury riverside escape overlooking 14 Falls and the timeless silhouette of Kilimambogo — where nature is not the backdrop, but the experience.
        </p>
        <div className="hero-btns" style={{ display:'flex', gap:'1rem', justifyContent:'center', marginTop:'2.5rem', flexWrap:'wrap', animation:'riseUp 1.1s var(--ease-out) .8s both' }}>
          <Link href="/#booking" className="btn-gold">Book Your Stay</Link>
          <Link href="/#about"   className="btn-ghost-light">Explore the Experience</Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll" style={{ position:'absolute', bottom:'2rem', left:'50%', transform:'translateX(-50%)', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:'.5rem', animation:'riseUp .9s var(--ease-out) 1.2s both' }}>
        <div className="scroll-bar" style={{ width:1, height:44, background:'linear-gradient(180deg,transparent,rgba(247,242,232,.5))', animation:'scrollPulse 2s ease-in-out infinite' }} />
        <span style={{ fontFamily:'var(--sans)', fontSize:'.52rem', letterSpacing:'.3em', textTransform:'uppercase', color:'rgba(247,242,232,.45)' }}>Scroll</span>
      </div>
    </section>
  )
}

function HeroCard({ label, value, note, style, cls }: {
  label: string; value: string; note: string;
  style: React.CSSProperties; cls: string
}) {
  return (
    <div className={`h-card ${cls}`} style={{
      position:'absolute', zIndex:10,
      background:'rgba(247,242,232,.1)', backdropFilter:'blur(14px)',
      border:'1px solid rgba(247,242,232,.2)', padding:'.9rem 1.1rem',
      animation:'floatCard ease-in-out infinite',
      ...style,
    }}>
      <div style={{ fontFamily:'var(--sans)', fontSize:'.55rem', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(247,242,232,.6)', marginBottom:'.3rem' }}>{label}</div>
      <div style={{ fontFamily:'var(--serif)', fontSize:'1.15rem', fontWeight:300, color:'var(--ivory)' }}>{value}</div>
      <div style={{ fontFamily:'var(--sans)', fontSize:'.6rem', color:'rgba(247,242,232,.5)', marginTop:'.15rem' }}>{note}</div>
    </div>
  )
}