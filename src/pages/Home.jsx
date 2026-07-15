import React, { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { profile, projects, books, channel, photos } from '../portfolio.config.js';
import './Home.css';

// ── Magnetic button wrapper ──────────────────────────────────────────────
function Magnetic({ children, className, href, target, rel }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();

  const handleMove = (e) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.25;
    const y = (e.clientY - r.top - r.height / 2) * 0.25;
    setPos({ x, y });
  };
  const reset = () => setPos({ x: 0, y: 0 });

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
    >
      {children}
    </a>
  );
}

// ── Live clock ───────────────────────────────────────────────────────────
function useClock(tz) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-US', {
      timeZone: 'Africa/Lagos', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    }));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

// ── Terminal mock — typed deploy log ───────────────────────────────────
function TerminalMock() {
  const liveProjects = projects.filter(p => p.status === 'live');
  const lines = [
    { type: 'cmd', text: 'whoami' },
    { type: 'out', text: 'sam ivere — SoftWare Engineer | Fullstack Developer' },
    { type: 'gap' },
    { type: 'cmd', text: './deploy.sh --target=all' },
    ...liveProjects.map(p => ({ type: 'ok', text: `✓ ${p.domain}` })),
    { type: 'gap' },
    { type: 'out', text: `${liveProjects.length} systems deployed` },
  ];

  return (
    <motion.div
      className="terminal"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="terminal-bar">
        <span className="r" /><span className="y" /><span className="g" />
        <span className="terminal-label">hspr — zsh</span>
      </div>
      <div className="terminal-body">
        {lines.map((line, i) => {
          if (line.type === 'gap') return <div key={i} style={{ height: '10px' }} />;
          return (
            <motion.div
              key={i}
              className="terminal-line"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.13, duration: 0.3 }}
            >
              {line.type === 'cmd' && <><span className="terminal-prompt">❯ </span>{line.text}</>}
              {line.type === 'out' && <span className="terminal-comment">{line.text}</span>}
              {line.type === 'ok' && <span className="terminal-ok">{line.text}</span>}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ── Reveal on scroll wrapper ─────────────────────────────────────────────
function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const time = useClock();
  const liveCount = projects.filter(p => p.status === 'live').length;
  const buildingCount = projects.filter(p => p.status === 'building').length;

  return (
    <div className="page">
      <div className="container">

        {/* ── Nav ── */}
        <nav className="nav">
          <div className="nav-brand">
            <span className="nav-brand-mark">SI</span>
            HSPR
          </div>
          <div className="nav-links">
            <a href="#systems">Work</a>
            <a href="#writing">Writing</a>
            <a href={`mailto:${profile.email}`}>Contact</a>
          </div>
          <div className="nav-region">
            <span className="dot dot-live" />
            {profile.region} · {time}
          </div>
        </nav>

        {/* ── Hero ── */}
        <section className="hero">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="hero-name">
              {profile.name.split(' ')[0]}<br />
              <span className="accent">{profile.name.split(' ')[1]}</span>
            </h1>
            <p className="hero-role">{profile.role}</p>
            <p className="hero-tagline">{profile.tagline}</p>
            <p className="hero-founder">
              Founder, <a href="https://samivere.cc">{profile.company}</a>
            </p>

            <div className="hero-ctas">
              <Magnetic className="btn btn-primary" href="#systems">
                View the work →
              </Magnetic>
              <Magnetic className="btn btn-secondary" href={`mailto:${profile.email}`}>
                Get in touch
              </Magnetic>
            </div>

            <div className="hero-readout">
              <span className="readout-item"><span className="dot dot-live" /> {liveCount} LIVE</span>
              <span className="readout-item"><span className="dot dot-building" /> {buildingCount} BUILDING</span>
            </div>
          </motion.div>

          <TerminalMock />
        </section>

        {/* ── Systems (signature) ── */}
        <section className="section" id="systems">
          <Reveal>
            <div className="eyebrow">PRODUCTION FLEET</div>
          </Reveal>
          <div className="systems-grid">
            {projects.map((p, i) => {
              const isLive = p.status === 'live';
              return (
                <Reveal key={i} delay={i * 0.05}>
                  <a
                    href={isLive ? p.url : undefined}
                    target={isLive ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className={`system-card ${isLive ? 'is-live' : 'is-building'}`}
                    style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
                  >
                    <div className={`system-status-row ${isLive ? 'live' : 'building'}`}>
                      <span className={`dot ${isLive ? 'dot-live' : 'dot-building'}`} />
                      {isLive ? 'LIVE' : 'BUILDING'}
                    </div>
                    <div className="system-name">{p.name}</div>
                    {p.domain && <span className="system-domain">{p.domain}</span>}
                    <p className="system-desc">{p.description}</p>

                    <div className="system-terminal">
                      <div className="cmd"><span className="sym">$ </span>curl -I {p.domain || `${p.name.toLowerCase().replace(/\s/g, '')}.app`}</div>
                      {isLive
                        ? <div className="out-live">HTTP/1.1 200 OK</div>
                        : <div className="out-building">connection: building...</div>
                      }
                      {isLive && <div className="visit">open {p.domain} <span className="arrow">↗</span></div>}
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ── Writing ── */}
        <section className="section" id="writing">
          <Reveal>
            <div className="eyebrow">WRITING</div>
            <div className="writing-row">
              <a href={books.selar} target="_blank" rel="noopener noreferrer" className="writing-link">
                Selar ↗
              </a>
              <a href={books.gumroad} target="_blank" rel="noopener noreferrer" className="writing-link">
                Gumroad ↗
              </a>
            </div>
          </Reveal>
        </section>

        {/* ── Channel ── */}
        <section className="section">
          <Reveal>
            <div className="eyebrow">{channel.name.toUpperCase()}</div>
            {channel.videos.map((v, i) => (
              <a key={i} href={`https://youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="video-card" style={{ marginBottom: '12px' }}>
                <div className="video-thumb">
                  <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} />
                </div>
                <div>
                  <p className="video-title">{v.title}</p>
                  <span className="video-cta">Watch on YouTube →</span>
                </div>
              </a>
            ))}
          </Reveal>
        </section>

        {/* ── Photos ── */}
        {photos.length > 0 && (
          <section className="section">
            <Reveal>
              <div className="eyebrow">FIELD NOTES</div>
              <div className="photos-grid">
                {photos.map((src, i) => (
                  <div key={i} className="photo-tile">
                    <img src={src} alt={`field note ${i + 1}`} />
                  </div>
                ))}
              </div>
            </Reveal>
          </section>
        )}

        {/* ── Footer ── */}
        <footer className="footer">
          <span className="footer-brand">© {new Date().getFullYear()} HSPR TECHNOLOGIES</span>
          <div className="footer-links">
            {profile.socials.twitter && <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>}
            {profile.socials.youtube && <a href={profile.socials.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>}
            {profile.socials.instagram && <a href={profile.socials.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
          <span className="footer-status"><span className="dot dot-live" /> ONLINE</span>
        </footer>

      </div>
    </div>
  );
}
