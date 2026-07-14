/* ════════════════════════════════
   ACCOMMODATION SECTION
   Receives rooms[] from Server Component via props.
   Falls back to static data when DB is empty.
════════════════════════════════ */
const STATIC_ROOMS = [
    { id:'r1', slug:'riverside-cottage',  name:'Riverside Cottage',   category:'Signature Stay',  desc:'Step out to the river from your private veranda. Earthy luxury finishes, floor-to-ceiling glass, and the perpetual lullaby of flowing water.', price:'KES 18,500', cta:'Reserve This Room' },
    { id:'r2', slug:'falls-view-suite',   name:'Falls View Suite',     category:'Premium Suite',   desc:'Wake to the mist of 14 Falls from your sunrise balcony. The mountain, the falls, the river — all framed exclusively for you.',                 price:'KES 24,000', cta:'Reserve This Suite' },
    { id:'r3', slug:'summit-retreat-villa',name:'Summit Retreat Villa', category:'Exclusive Villa', desc:'A private plunge pool, stargazing terrace, and full 360° panorama. For those who demand total luxury and complete seclusion.',                  price:'KES 45,000', cta:'Reserve This Villa' },
  ]
   
  // Room SVG backgrounds — exact from index.html
  const ROOM_SVGS = [
    <svg key="r1" viewBox="0 0 360 480" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="r1-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1A3A28"/><stop offset="100%" stopColor="#0C1610"/></linearGradient></defs><rect width="360" height="480" fill="url(#r1-bg)"/><rect x="40" y="50" width="280" height="190" fill="#0A1E2A" rx="2"/><rect x="40" y="185" width="280" height="55" fill="#3A7888" opacity=".7"/><polygon points="40,200 80,150 120,170 165,120 210,155 250,135 300,155 320,145 320,200" fill="#1A2E22" opacity=".8"/><circle cx="260" cy="90" r="50" fill="#E8A060" opacity=".2"/><circle cx="260" cy="90" r="30" fill="#E8C060" opacity=".3"/><ellipse cx="55" cy="200" rx="22" ry="35" fill="#0C1610"/><ellipse cx="320" cy="198" rx="20" ry="32" fill="#0C1610"/><rect x="0" y="290" width="360" height="190" fill="#1E3028"/><rect x="55" y="305" width="250" height="145" fill="#2C4636" rx="3"/><rect x="55" y="305" width="250" height="42"  fill="#3A5848" rx="3"/><rect x="65" y="296" width="72" height="50" fill="#F5EFE0" opacity=".85" rx="8"/><rect x="223" y="296" width="72" height="50" fill="#F5EFE0" opacity=".85" rx="8"/><line x1="55" y1="358" x2="305" y2="358" stroke="#3A5848" strokeWidth="1.5" opacity=".5"/></svg>,
    <svg key="r2" viewBox="0 0 360 480" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="r2-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1C2E24"/><stop offset="100%" stopColor="#0A1614"/></linearGradient></defs><rect width="360" height="480" fill="url(#r2-bg)"/><rect x="30" y="40" width="300" height="200" fill="#0A1A2A" rx="2"/><polygon points="30,240 80,140 135,175 185,105 240,148 290,122 330,150 330,240" fill="#1C2E22" opacity=".85"/><rect x="30" y="40" width="300" height="80" fill="#C4724A" opacity=".2"/><circle cx="220" cy="105" r="32" fill="#E8B060" opacity=".4"/><circle cx="220" cy="105" r="20" fill="#F8D060" opacity=".55"/><line x1="185" y1="105" x2="178" y2="240" stroke="#A8D8E8" strokeWidth="10" opacity=".4"/><line x1="192" y1="105" x2="185" y2="240" stroke="#A8D8E8" strokeWidth="5"  opacity=".22"/><ellipse cx="183" cy="244" rx="55" ry="14" fill="#C5E8F0" opacity=".4"/><rect x="30" y="248" width="300" height="10" fill="#7A6A50" opacity=".5"/><rect x="0"  y="325" width="360" height="155" fill="#1A2E22"/><rect x="60" y="338" width="240" height="120" fill="#2C4636" rx="3"/><rect x="60" y="338" width="240" height="40"  fill="#3A5848" rx="3"/><rect x="70" y="328" width="68" height="48" fill="#F5EFE0" opacity=".85" rx="7"/><rect x="222" y="328" width="68" height="48" fill="#F5EFE0" opacity=".85" rx="7"/></svg>,
    <svg key="r3" viewBox="0 0 360 480" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="r3-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#14202A"/><stop offset="100%" stopColor="#08100E"/></linearGradient></defs><rect width="360" height="480" fill="url(#r3-bg)"/><circle cx="80" cy="60" r="1.5" fill="#F5EFE0" opacity=".7"/><circle cx="150" cy="40" r="1" fill="#F5EFE0" opacity=".6"/><circle cx="220" cy="70" r="2" fill="#F5EFE0" opacity=".5"/><circle cx="290" cy="45" r="1.5" fill="#F5EFE0" opacity=".7"/><circle cx="320" cy="80" r="1" fill="#F5EFE0" opacity=".6"/><circle cx="290" cy="60" r="24" fill="#F8E898" opacity=".5"/><circle cx="298" cy="54" r="19" fill="#14202A"/><polygon points="30,240 80,160 130,195 180,130 230,168 275,145 320,170 330,160 330,250 30,250" fill="#0A1614"/><rect x="50" y="210" width="160" height="70" fill="#1A4A5A" opacity=".7" rx="3"/><rect x="0" y="310" width="360" height="170" fill="#141E1A"/><rect x="55" y="325" width="250" height="130" fill="#1C2E22" rx="3"/><rect x="55" y="325" width="250" height="44"  fill="#243828" rx="3"/><rect x="65" y="314" width="72" height="50" fill="#F5EFE0" opacity=".8" rx="8"/><rect x="223" y="314" width="72" height="50" fill="#F5EFE0" opacity=".8" rx="8"/></svg>,
  ]
   
  interface AccommodationProps { rooms: Room[] }
   
  export function AccommodationSection({ rooms }: AccommodationProps) {
    const display = rooms.length > 0 ? rooms : null
    return (
      <section id="accommodation" style={{ background:'var(--ivory)', padding:'7rem 0' }}>
        <div className="sec-inner" style={{ maxWidth:1180, margin:'0 auto', padding:'0 5%' }}>
          <div className="acc-header rv" style={{ textAlign:'center', marginBottom:'4.5rem' }}>
            <div className="eyebrow" style={{ justifyContent:'center' }}>
              <span style={{ display:'none' }} />Accommodations
            </div>
            <h2 className="sec-title">Riverside <em>Sanctuaries</em></h2>
            <p className="sec-body" style={{ margin:'.8rem auto 0', textAlign:'center', maxWidth:460 }}>
              Each room is positioned to dissolve the boundary between the indoors and the wild — where every window frames a masterpiece.
            </p>
          </div>
   
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.4rem' }} className="rooms-grid">
            {STATIC_ROOMS.map((room, i) => (
              <div key={room.id} className="room-card rv" style={{ position:'relative', overflow:'hidden', cursor:'pointer', background:'var(--cream)', transition:'transform .5s var(--ease-out)', transitionDelay: i === 1 ? '.12s' : i === 2 ? '.24s' : '0s' }}>
                <div className="room-img" style={{ aspectRatio:'3/4', overflow:'hidden', position:'relative' }}>
                  {ROOM_SVGS[i]}
                  <div className="room-overlay" style={{ position:'absolute', inset:0, background:'linear-gradient(0deg,rgba(12,22,16,.85) 0%,transparent 55%)', opacity:.7, transition:'opacity .4s' }} />
                </div>
                <div className="room-info" style={{ position:'absolute', bottom:0, left:0, right:0, padding:'1.6rem', transform:'translateY(35%)', transition:'transform .5s var(--ease-out)' }}>
                  <div style={{ fontFamily:'var(--sans)', fontSize:'.57rem', letterSpacing:'.24em', textTransform:'uppercase', color:'var(--gold-warm)', marginBottom:'.4rem', fontWeight:400 }}>{room.category}</div>
                  <div style={{ fontFamily:'var(--serif)', fontSize:'1.35rem', fontWeight:300, color:'var(--ivory)', marginBottom:'.45rem' }}>{room.name}</div>
                  <div style={{ fontFamily:'var(--sans)', fontSize:'.8rem', color:'rgba(247,242,232,.65)', lineHeight:1.65, fontWeight:300, marginBottom:'1rem' }}>{room.desc}</div>
                  <div style={{ display:'flex', alignItems:'baseline', gap:'.4rem' }}>
                    <span style={{ fontFamily:'var(--sans)', fontSize:'.6rem', color:'rgba(247,242,232,.4)', letterSpacing:'.08em' }}>From</span>
                    <span style={{ fontFamily:'var(--serif)', fontSize:'1.5rem', fontWeight:300, color:'var(--gold-warm)' }}>{room.price}</span>
                    <span style={{ fontFamily:'var(--sans)', fontSize:'.6rem', color:'rgba(247,242,232,.4)' }}>/&nbsp;night</span>
                  </div>
                  <Link href="/#booking" style={{ display:'inline-block', marginTop:'.8rem', fontFamily:'var(--sans)', fontSize:'.58rem', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--gold-warm)', borderBottom:'1px solid rgba(196,152,64,.35)', paddingBottom:'.15rem', fontWeight:400, textDecoration:'none' }}>
                    {room.cta} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .room-card:hover { transform: translateY(-6px) !important; }
          .room-card:hover .room-overlay { opacity: 1 !important; }
          .room-card:hover .room-info { transform: translateY(0) !important; }
          .room-card:hover .room-img svg { transform: scale(1.06); }
          .room-img svg { transition: transform .7s var(--ease-out); }
          @media (max-width: 1024px) { .rooms-grid { grid-template-columns: repeat(2,1fr) !important; } }
          @media (max-width: 860px)  { .rooms-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>
    )
  }
   
  /* ════════════════════════════════
     POOL SECTION
  ════════════════════════════════ */
  export function PoolSection() {
    return (
      <section id="pool" style={{ background:'var(--sage-deep)', padding:0 }}>
        <div style={{ position:'relative', overflow:'hidden' }}>
          {/* Pool SVG — exact from index.html */}
          <svg viewBox="0 0 1440 560" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', display:'block', maxHeight:580 }}>
            <defs>
              <linearGradient id="pl-sky"   x1="0" y1="0" x2="0" y2="1"><stop offset="0%"   stopColor="#0C1810"/><stop offset="50%"  stopColor="#182C22"/><stop offset="100%" stopColor="#26484A"/></linearGradient>
              <linearGradient id="pl-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0%"   stopColor="#2A7A8A"/><stop offset="100%" stopColor="#1A5A68"/></linearGradient>
            </defs>
            <rect width="1440" height="560" fill="url(#pl-sky)"/>
            {[{cx:200,cy:70,r:1.5,o:.6},{cx:380,cy:45,r:1,o:.5},{cx:560,cy:60,r:2,o:.4},{cx:740,cy:35,r:1.5,o:.7},{cx:920,cy:55,r:1,o:.55},{cx:1100,cy:40,r:1.5,o:.6},{cx:1300,cy:65,r:1,o:.5}].map((s,i)=><circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="#F5EFE0" opacity={s.o}/>)}
            <polygon points="0,295 120,175 210,215 300,145 395,185 500,150 600,178 700,142 800,168 900,138 1000,162 1100,138 1200,170 1300,152 1400,178 1440,162 1440,320 0,320" fill="#0A1610"/>
            <ellipse cx="80"   cy="322" rx="65" ry="95"  fill="#0C1610"/>
            <ellipse cx="200"  cy="318" rx="58" ry="85"  fill="#121E18"/>
            <ellipse cx="1260" cy="320" rx="60" ry="88"  fill="#0C1610"/>
            <ellipse cx="1380" cy="316" rx="58" ry="85"  fill="#121E18"/>
            <line x1="700" y1="142" x2="692" y2="290" stroke="#A8D8E8" strokeWidth="5" opacity=".25"/>
            <ellipse cx="695" cy="293" rx="40" ry="10" fill="#C5E8F0" opacity=".3"/>
            <circle cx="720" cy="100" r="38" fill="#F8E898" opacity=".4"/>
            <circle cx="732" cy="90"  r="30" fill="#0C1810"/>
            <ellipse cx="720" cy="430" rx="90" ry="14" fill="#F8E898" opacity=".12"/>
            <rect x="80" y="370" width="1280" height="155" fill="url(#pl-water)" rx="3"/>
            <path d="M80,392 Q360,383 640,394 Q920,405 1200,390 Q1330,384 1360,392" stroke="#72BFD0" strokeWidth="1.5" fill="none" opacity=".3"/>
            <path d="M80,415 Q360,407 640,418 Q920,428 1200,413 Q1330,406 1360,415" stroke="#72BFD0" strokeWidth="1"   fill="none" opacity=".2"/>
            <rect x="60"  y="362" width="1320" height="12" fill="#8B7A60" rx="2" opacity=".7"/>
            <rect x="60"  y="518" width="1320" height="10" fill="#8B7A60" rx="2" opacity=".5"/>
            <path d="M0,530 Q360,518 720,526 Q1080,534 1440,520 L1440,560 L0,560Z" fill="#1A3A4A" opacity=".8"/>
            <polygon points="200,525 320,490 400,505 480,480 560,492 640,482 720,490 800,482 880,494 960,484 1040,498 1080,505 1200,490 1250,498 1440,482 1440,530 200,530" fill="#121E18" opacity=".5"/>
          </svg>
   
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,transparent 35%,rgba(26,46,34,.85) 100%)' }} />
          <div className="pool-copy rv" style={{ position:'absolute', bottom:0, left:0, right:0, padding:'3.5rem 5%', zIndex:5 }}>
            <div className="eyebrow" style={{ color:'var(--gold-warm)' }}><span style={{background:'var(--gold-warm)',display:'block',width:22,height:1,flexShrink:0}}/>The Infinity Pool</div>
            <h2 style={{ fontFamily:'var(--serif)', fontSize:'clamp(2rem,5vw,4rem)', fontWeight:300, color:'var(--ivory)', lineHeight:1.1, letterSpacing:'-.015em', maxWidth:700 }}>
              Float beside <em style={{ fontStyle:'italic', color:'var(--gold-warm)' }}>nature</em> in<br />complete serenity.
            </h2>
            <p style={{ fontFamily:'var(--sans)', fontSize:'.95rem', color:'rgba(247,242,232,.6)', fontWeight:300, lineHeight:1.75, maxWidth:420, marginTop:'.8rem' }}>
              Elevated above the Athi, facing the falls, beneath the open sky — our infinity pool is where luxury and wilderness meet.
            </p>
          </div>
        </div>
   
        {/* Stats bar */}
        <div style={{ background:'var(--dark-surface)', display:'grid', gridTemplateColumns:'repeat(4,1fr)', borderTop:'1px solid rgba(247,242,232,.06)' }}>
          {[
            { num:'∞',    label:'Infinity Edge',       ripple: true },
            { num:'14',   label:'Falls in View'                     },
            { num:'360°', label:'Mountain Panorama'                  },
            { num:'24h',  label:'Open Daily'                         },
          ].map((s, i) => (
            <div key={i} className="pool-stat rv" style={{ padding:'2.2rem 5%', textAlign:'center', borderRight: i < 3 ? '1px solid rgba(247,242,232,.06)' : 'none', position:'relative', overflow:'hidden', transitionDelay:`${i*.1}s` }}>
              {s.ripple && (
                <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:'.5rem 0' }}>
                  <div style={{ width:50, height:50, borderRadius:'50%', border:'1px solid rgba(196,152,64,.3)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
                    <span style={{ fontFamily:'var(--serif)', fontSize:'1.4rem', fontWeight:300, color:'var(--gold-warm)' }}>{s.num}</span>
                  </div>
                </div>
              )}
              {!s.ripple && <span style={{ fontFamily:'var(--serif)', fontSize:'2.4rem', fontWeight:300, color:'var(--gold-warm)', display:'block', lineHeight:1 }}>{s.num}</span>}
              <span style={{ fontFamily:'var(--sans)', fontSize:'.6rem', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(247,242,232,.4)', marginTop:'.5rem', fontWeight:300, display:'block' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>
    )
  }
   
  /* ════════════════════════════════
     SCENIC SECTION
  ════════════════════════════════ */
  export function ScenicSection() {
    return (
      <section id="scenic" style={{ background:'var(--cream)', padding:'7rem 0' }}>
        <div className="sec-inner" style={{ maxWidth:1180, margin:'0 auto', padding:'0 5%' }}>
          <div className="scenic-header rv" style={{ marginBottom:'4rem' }}>
            <div className="eyebrow">Nature's Stage</div>
            <h2 className="sec-title">A Landscape That <em>Moves</em> You</h2>
            <p className="sec-body" style={{ marginTop:'.7rem' }}>14 Falls. River Athi. Kilimambogo rising above the treeline. The Del Monte valleys below. Nowhere in Kenya offers this convergence of natural wonder.</p>
          </div>
   
          {/* Main layout: tall falls + 2 tiles */}
          <div style={{ display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:'1.2rem', alignItems:'stretch' }} className="scenic-layout">
            <div className="scenic-main rl" style={{ overflow:'hidden', position:'relative' }}>
              <svg viewBox="0 0 500 520" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'100%', minHeight:480, display:'block' }}>
                <defs><linearGradient id="sc1-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2A5878"/><stop offset="100%" stopColor="#5A9EB0"/></linearGradient></defs>
                <rect width="500" height="520" fill="url(#sc1-sky)"/>
                <polygon points="0,240 70,140 120,175 175,100 225,145 275,115 330,148 380,128 440,160 500,140 500,270 0,270" fill="#1A2E22" opacity=".9"/>
                <line x1="175" y1="100" x2="163" y2="290" stroke="#B8E0F0" strokeWidth="14" opacity=".3"/>
                <line x1="183" y1="100" x2="171" y2="290" stroke="#A8D8E8" strokeWidth="8"  opacity=".22"/>
                <line x1="167" y1="103" x2="155" y2="290" stroke="#98C8D8" strokeWidth="5"  opacity=".16"/>
                <ellipse cx="172" cy="295" rx="80" ry="22" fill="#C5E8F0" opacity=".55"/>
                <ellipse cx="172" cy="304" rx="60" ry="14" fill="#C5E8F0" opacity=".3"/>
                <ellipse cx="110" cy="295" rx="32" ry="18" fill="#2A3A2A"/>
                <ellipse cx="240" cy="298" rx="26" ry="14" fill="#222E22"/>
                <path d="M0,340 Q125,325 250,335 Q375,345 500,328 L500,520 L0,520Z" fill="#3A7888"/>
                <path d="M0,340 Q125,328 250,336 Q375,344 500,330" stroke="#72BFD0" strokeWidth="2.5" fill="none" opacity=".45"/>
                <ellipse cx="30"  cy="340" rx="45" ry="70" fill="#1A2E22"/>
                <ellipse cx="480" cy="338" rx="42" ry="65" fill="#1A2E22"/>
              </svg>
              <div className="scene-caption" style={{ position:'absolute', bottom:'1rem', left:'1rem', fontFamily:'var(--sans)', fontSize:'.6rem', letterSpacing:'.18em', textTransform:'uppercase', color:'var(--ivory)', background:'rgba(12,22,16,.5)', backdropFilter:'blur(4px)', padding:'.3rem .75rem', fontWeight:300 }}>14 Falls · River Athi</div>
            </div>
            <div style={{ display:'grid', gridTemplateRows:'1fr 1fr', gap:'1.2rem' }}>
              {[
                { id:'sc2', caption:'Kilimambogo at sunrise', fill:'linear-gradient(to bottom, #F0D8A8, #E8A868, #C87048)', height:225 },
                { id:'sc3', caption:'River Athi · serene at dawn', fill:'linear-gradient(to bottom, #D8EAE8, #A8C8CC)', height:225 },
              ].map(tile => (
                <div key={tile.id} className="scenic-tile rr" style={{ overflow:'hidden', position:'relative', minHeight:tile.height }}>
                  <div style={{ width:'100%', height:'100%', minHeight:tile.height, background:tile.fill }} />
                  <div className="scene-caption" style={{ position:'absolute', bottom:'1rem', left:'1rem', fontFamily:'var(--sans)', fontSize:'.6rem', letterSpacing:'.18em', textTransform:'uppercase', color:'var(--ivory)', background:'rgba(12,22,16,.5)', backdropFilter:'blur(4px)', padding:'.3rem .75rem', fontWeight:300 }}>{tile.caption}</div>
                </div>
              ))}
            </div>
          </div>
   
          {/* Bottom strip */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.2rem', marginTop:'1.2rem' }}>
            {[
              { caption:'Del Monte plantations',    fill:'linear-gradient(to bottom,#B8D8A8,#88B878)', delay:'0s' },
              { caption:'Resort from above',        fill:'linear-gradient(to bottom,#1A2E22,#0C1610)', delay:'.12s' },
              { caption:'Candlelit riverside dining',fill:'linear-gradient(to bottom,#1A1208,#0A0C08)', delay:'.24s' },
            ].map(tile => (
              <div key={tile.caption} className="strip-tile rv" style={{ overflow:'hidden', position:'relative', minHeight:195, transitionDelay:tile.delay }}>
                <div style={{ width:'100%', height:'100%', minHeight:195, background:tile.fill }} />
                <div className="scene-caption" style={{ position:'absolute', bottom:'1rem', left:'1rem', fontFamily:'var(--sans)', fontSize:'.6rem', letterSpacing:'.18em', textTransform:'uppercase', color:'var(--ivory)', background:'rgba(12,22,16,.5)', backdropFilter:'blur(4px)', padding:'.3rem .75rem', fontWeight:300 }}>{tile.caption}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 860px) { .scenic-layout { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>
    )
  }
   
  
   
  /* ════════════════════════════════
     BOOKING SECTION
  ════════════════════════════════ */
  export function BookingSection() {
    return (
      <section id="booking" style={{ position:'relative', padding:'8rem 5%', background:'linear-gradient(140deg,var(--sage-mid) 0%,var(--sage-deep) 50%,var(--dark) 100%)', overflow:'hidden' }}>
        <div className="bk-orb" style={{ position:'absolute', width:500, height:500, top:-150, left:-100, borderRadius:'50%', background:'radial-gradient(circle,rgba(58,92,69,.25) 0%,transparent 70%)', animation:'orbFloat 9s ease-in-out infinite', pointerEvents:'none' }} />
        <div className="bk-orb" style={{ position:'absolute', width:380, height:380, bottom:-100, right:-80, borderRadius:'50%', background:'radial-gradient(circle,rgba(58,92,69,.25) 0%,transparent 70%)', animation:'orbFloat 11s ease-in-out infinite', animationDelay:'-4s', pointerEvents:'none' }} />
        <div style={{ maxWidth:720, margin:'0 auto', textAlign:'center', position:'relative', zIndex:2 }}>
          <div className="eyebrow rv" style={{ justifyContent:'center', color:'var(--gold-warm)' }}><span style={{background:'var(--gold-warm)',display:'block',width:22,height:1,flexShrink:0}}/>Reserve Your Escape</div>
          <h2 className="bk-title rv" style={{ fontFamily:'var(--serif)', fontSize:'clamp(2.4rem,5.5vw,4.2rem)', fontWeight:300, color:'var(--ivory)', lineHeight:1.1, letterSpacing:'-.02em', marginBottom:'1rem' }}>
            Your <em style={{ fontStyle:'italic', color:'var(--gold-warm)' }}>River Story</em><br />Begins Here
          </h2>
          <p className="rv" style={{ fontFamily:'var(--sans)', fontSize:'.95rem', color:'rgba(247,242,232,.55)', fontWeight:300, lineHeight:1.8, maxWidth:480, margin:'0 auto 2.8rem' }}>
            Choose your dates, select your sanctuary. The rest is nature's gift.
          </p>
          <div className="bk-form rv" style={{ display:'flex', border:'1px solid rgba(196,152,64,.2)', maxWidth:620, margin:'0 auto 1rem', flexWrap:'wrap' }}>
            {['Check-in', 'Check-out', 'Guests'].map(p => (
              <input key={p} placeholder={p} style={{ flex:1, minWidth:140, background:'rgba(247,242,232,.06)', border:'none', borderRight:'1px solid rgba(196,152,64,.15)', padding:'1.1rem 1.3rem', color:'var(--ivory)', fontFamily:'var(--sans)', fontSize:'.82rem', fontWeight:300, outline:'none', maxWidth: p === 'Guests' ? 120 : undefined }} />
            ))}
            <button style={{ background:'var(--gold)', color:'var(--dark)', border:'none', padding:'1.1rem 2rem', fontFamily:'var(--sans)', fontSize:'.68rem', letterSpacing:'.2em', textTransform:'uppercase', cursor:'pointer', transition:'background .3s', whiteSpace:'nowrap', flexShrink:0, fontWeight:400 }}>
              Check Availability
            </button>
          </div>
          <p className="rv" style={{ fontFamily:'var(--sans)', fontSize:'.63rem', letterSpacing:'.1em', color:'rgba(247,242,232,.28)' }}>Free cancellation · Best rate guaranteed · Secure instant booking</p>
          <div className="rv" style={{ display:'flex', gap:'3rem', justifyContent:'center', marginTop:'3rem', flexWrap:'wrap' }}>
            {[{v:'+254',l:'Call to book'},{v:'★★★★★',l:'5-star rated'},{v:'✓',l:'All-inclusive packages'},{v:'💍',l:'Weddings & events'}].map(e=>(
              <div key={e.l} style={{ textAlign:'center' }}>
                <span style={{ fontFamily:'var(--serif)', fontSize:'1.3rem', fontWeight:300, color:'var(--gold-warm)', display:'block', lineHeight:1 }}>{e.v}</span>
                <span style={{ fontFamily:'var(--sans)', fontSize:'.58rem', letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(247,242,232,.3)', marginTop:'.35rem', display:'block' }}>{e.l}</span>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 860px) { .bk-form { flex-direction: column !important; } }
        `}</style>
      </section>
    )
  }
   