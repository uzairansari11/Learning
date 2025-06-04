// src/components/TimelineBoxes.js
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function TimelineBoxes() {
  const box1 = useRef(null)
  const box2 = useRef(null)
  const box3 = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.8, ease: 'power1.out' },
    })

    tl.from(box1.current, { x: -200, opacity: 0 })
      .from(box2.current, { y: -200, opacity: 0 })
      .from(box3.current, { scale: 0, opacity: 0 })

    // You can also add delays: .from(..., "+=0.5")
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '100px',
      }}
    >
      <div ref={box1} style={styles.box}>
        1
      </div>
      <div ref={box2} style={styles.box}>
        2
      </div>
      <div ref={box3} style={styles.box}>
        3
      </div>
    </div>
  )
}

const styles = {
  box: {
    width: '100px',
    height: '100px',
    backgroundColor: '#3498db',
    color: 'white',
    fontSize: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
  },
}
