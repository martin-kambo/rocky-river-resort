/* ════════════════════════════════
     TESTIMONIALS — animated carousel
  ════════════════════════════════ */
  const TESTIMONIALS_DATA = [
    { q: '"Waking to the sound of 14 Falls, watching mist lift over Kilimambogo from our bed — Rocky River Resort redefined what luxury in nature truly means."', a: 'Amina & David K. — Nairobi' },
    { q: '"The infinity pool, the mountain, the river, the silence. This is what the soul craves when the city becomes too loud. We never wanted to leave."',        a: 'James M. — Mombasa'        },
    { q: '"Every detail felt considered — from the sunrise orientation of our suite to the sound of falling water at night. A masterpiece of nature-integrated luxury."', a: 'Sarah & Tom L. — London' },
  ]
   
  export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
    // Use DB data if available, otherwise fall back to static
    const data = testimonials.length > 0
      ? testimonials.map(t => ({ q: `"${t.content}"`, a: t.guest_name }))
      : TESTIMONIALS_DATA
   
    const [idx, setIdx]           = useState(0)
    const [visible, setVisible]   = useState(true)
   
    const setT = (i: number) => {
      setVisible(false)
      setTimeout(() => { setIdx(i); setVisible(true) }, 300)
    }
   
    useEffect(() => {
      const timer = setInterval(() => setT((idx + 1) % data.length), 5000)
      return () => clearInterval(timer)
    }, [idx, data.length])
   
    return (
      <section id="testimonials" style={{ background:'var(--sage-deep)', padding:'7rem 0' }}>
        <div style={{ maxWidth:820, margin:'0 auto', textAlign:'center', padding:'0 5%' }}>
          <div className="test-stars rv" style={{ color:'var(--gold-warm)', fontSize:'.95rem', letterSpacing:'.3em', marginBottom:'1.5rem' }}>★ ★ ★ ★ ★</div>
          <div className="test-quote rv" style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.4rem,3vw,2rem)', fontWeight:300, fontStyle:'italic', color:'rgba(247,242,232,.85)', lineHeight:1.65, marginBottom:'1.8rem', opacity: visible ? 1 : 0, transition:'opacity .4s' }}>
            {data[idx].q}
          </div>
          <div className="test-author rv" style={{ fontFamily:'var(--sans)', fontSize:'.65rem', letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(247,242,232,.35)', fontWeight:300 }}>
            {data[idx].a}
          </div>
          <div style={{ display:'flex', gap:'.5rem', justifyContent:'center', marginTop:'2rem' }}>
            {data.map((_, i) => (
              <button key={i} onClick={() => setT(i)} style={{ width: i === idx ? 20 : 6, height:6, borderRadius: i === idx ? 3 : '50%', background: i === idx ? 'var(--gold-warm)' : 'rgba(247,242,232,.2)', cursor:'pointer', border:'none', transition:'all .3s' }} />
            ))}
          </div>
        </div>
      </section>
    )
  }