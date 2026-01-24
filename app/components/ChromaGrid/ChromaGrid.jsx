import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './ChromaGrid.css';

export default function ChromaGrid({
  items,
  radius = 220,
  damping = 0.35,
  fadeOut = 0.6,
  ease = 'power3.out'
}) {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);

  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  const [openIndex, setOpenIndex] = useState(null);

  /* ============================= */
  /* INIT GRID SPOTLIGHT */
  /* ============================= */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    setX.current = gsap.quickSetter(el, '--x', 'px');
    setY.current = gsap.quickSetter(el, '--y', 'px');
    el.style.setProperty('--r', `${radius}px`);

    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };

    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, [radius]);

  /* ============================= */
  /* MOUSE MOVE GRID */
  /* ============================= */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const onMove = e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(pos.current, {
        x,
        y,
        duration: damping,
        ease,
        overwrite: 'auto',
        onUpdate: () => {
          setX.current(pos.current.x);
          setY.current(pos.current.y);
        }
      });
    };

    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, [damping, ease]);

  /* ============================= */
  /* CARD MOUSE TRACK */
  /* ============================= */
  const handleCardMove = e => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - card.left) / card.width) * 100;
    const y = ((e.clientY - card.top) / card.height) * 100;

    e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
  };

  /* ============================= */
  /* RENDER */
  /* ============================= */
  return (
    <section
      ref={rootRef}
      className="chroma-grid"
      aria-label="Chroma interactive grid"
    >
      {items.map((c, i) => {
        const isOpen = openIndex === i;

        return (
          <article
            key={i}
            className={`chroma-card ${isOpen ? 'open' : ''}`}
            onMouseMove={handleCardMove}
            onClick={() => setOpenIndex(isOpen ? null : i)}
            style={{
              /* accent per card */
              '--card-accent': c.accentColor || '#60a5fa',
              '--card-border': c.borderColor || 'var(--border-card)',

              /* optional gradient overlay */
              '--card-gradient': c.gradient || 'none'
            }}
          >
            {/* IMAGE */}
            <div className="chroma-img-wrapper">
              <img src={c.image} alt={c.title} loading="lazy" />
            </div>

            {/* INFO */}
            <footer className="chroma-info">
              <h3>{c.title}</h3>
              <span className="handle">{c.handle}</span>
            </footer>

            {/* DROPDOWN */}
            <div
              className="chroma-dropdown"
              onClick={e => e.stopPropagation()}
            >
              <p>{c.subtitle}</p>

              {c.url && (
                <a href={c.url} target="_blank" rel="noreferrer">
                  Visit →
                </a>
              )}
            </div>
          </article>
        );
      })}

      {/* GLOBAL EFFECT */}
      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />
    </section>
  );
}
