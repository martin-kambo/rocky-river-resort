
/**
 * All remaining homepage sections — exact ports from index.html.
 * Each exported individually so page.tsx can import them cleanly.
 */
'use client'
import { useState, useEffect } from 'react'
import Link                    from 'next/link'
import type { Room, Testimonial } from '@/types'
 
/* ════════════════════════════════
   LOCATION RIBBON
════════════════════════════════ */
export function LocationRibbon() {
  const items = [
    '65 km from Nairobi JKIA',
    'Minutes from 14 Falls',
    'Kilimambogo Panorama',
    'River Athi Frontage',
    'Del Monte Surrounds',
  ]
  return (
    <div style={{ background:'var(--sage-deep)', padding:'.9rem 5%', display:'flex', alignItems:'center', justifyContent:'center', gap:'2.8rem', flexWrap:'wrap' }}>
      {items.map(item => (
        <div key={item} style={{ display:'flex', alignItems:'center', gap:'.55rem', fontFamily:'var(--sans)', fontSize:'.62rem', letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(247,242,232,.5)', fontWeight:300 }}>
          <div style={{ width:4, height:4, borderRadius:'50%', background:'var(--gold-warm)', flexShrink:0 }} />
          {item}
        </div>
      ))}
    </div>
  )
}