 /* ════════════════════════════════
     EXPERIENCES SECTION
  ════════════════════════════════ */
  const EXPERIENCES = [
    { n:'01', title:'14 Falls Excursions',  body:'Guided walks through riverine forest to Kenya\'s most dramatic cascade. Let the roar fill your lungs.' },
    { n:'02', title:'River Kayaking',        body:'Paddle the serpentine Athi at sunrise past weeping willows and kingfishers. Unhurried freedom on water.' },
    { n:'03', title:'Kilimambogo Hiking',    body:'Summit Ol Donyo Sabuk and stretch your gaze from Nairobi\'s skyline to Mount Kenya\'s distant crown.' },
    { n:'04', title:'Riverside Dining',      body:'Farm-to-table cuisine under the stars, with the Athi\'s flowing soundtrack and tropical blossoms in the air.' },
    { n:'05', title:'Plantation Tours',      body:'Explore the legendary Del Monte pineapple estates — a fragrant journey through East Africa\'s iconic greenery.' },
    { n:'06', title:'Spa & Wellness',        body:'Indigenous botanical treatments, riverside yoga, and deep-healing massage. Restoration that honors the body and the land.' },
    { n:'07', title:'Birdwatching',          body:'200+ species in the Athi basin. From malachite kingfishers to African fish eagles — a living aviary at your window.' },
    { n:'08', title:'Romantic Retreats',     body:'Sunset dinners at the falls. Couples\' spa rituals. Stargazing from your private balcony. Romance in its most breathtaking form.' },
  ]
   
  export function ExperiencesSection() {
    return (
      <section id="experiences" style={{ background:'var(--ivory)', padding:'7rem 0' }}>
        <div className="sec-inner" style={{ maxWidth:1180, margin:'0 auto', padding:'0 5%' }}>
          <div className="exp-header rv" style={{ textAlign:'center', marginBottom:'4.5rem' }}>
            <div className="eyebrow" style={{ justifyContent:'center' }}><span style={{display:'none'}}/>Curated Experiences</div>
            <h2 className="sec-title">Every Day a New <em>Story</em></h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1px', background:'rgba(58,92,69,.1)' }} className="exp-grid">
            {EXPERIENCES.map((e, i) => (
              <div key={e.n} className="exp-item rv" style={{ background:'var(--ivory)', padding:'2.5rem 2rem', position:'relative', overflow:'hidden', transition:'background .4s', cursor:'default', transitionDelay:`${(i%4)*.08}s` }}>
                <div style={{ fontFamily:'var(--serif)', fontSize:'3.5rem', fontWeight:300, color:'rgba(58,92,69,.1)', lineHeight:1, marginBottom:'1.4rem' }}>{e.n}</div>
                <div style={{ fontFamily:'var(--serif)', fontSize:'1.2rem', fontWeight:400, color:'var(--sage-deep)', marginBottom:'.7rem' }}>{e.title}</div>
                <div style={{ fontFamily:'var(--sans)', fontSize:'.82rem', color:'var(--sage-mid)', lineHeight:1.75, fontWeight:300 }}>{e.body}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .exp-item:hover { background: var(--cream) !important; }
          .exp-item::after { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; background:var(--gold); transform:scaleX(0); transform-origin:left; transition:transform .4s var(--ease-out); }
          .exp-item:hover::after { transform: scaleX(1); }
          @media (max-width: 1024px) { .exp-grid { grid-template-columns: repeat(2,1fr) !important; } }
          @media (max-width: 860px)  { .exp-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>
    )
  }
