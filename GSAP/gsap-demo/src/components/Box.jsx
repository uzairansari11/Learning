// src/components/Box.js
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Box() {
  const boxRef = useRef(null) // 1️⃣ Create a reference

  useEffect(() => {
    // 2️⃣ Animate when component is mounted
    gsap.to(boxRef.current, { rotate: 360, duration: 2 })
  }, [])

  return (
    <div
      ref={boxRef}
      style={{
        width: '200px',
        height: '200px',
        background: 'tomato',
        margin: '100px auto',
        textAlign: 'center',
        lineHeight: '200px',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '10px',
      }}
    >
      Hello GSAP
    </div>
  )
}
