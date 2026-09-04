import React, { useState, useEffect, useRef } from 'react';
import PhotoSlideshow from '../components/PhotoSlideshow.jsx';
import '../index.css';

// ─── Data ───────────────────────────────────────────────────────────────────
const ME = {
  name: 'Sam Ivere',
  bio: 'Curious guy building cool stuffs. I build Transcending Mobile Apps, Stunning Websites, and Production SaaS for African Communities.',
  company: 'HSPR Technologies',
  email: 'samuelivere92@gmail.com',
  quote: 'There is a developer in Nigeria right now — coding by generator light, buying data 1GB at a time. Still opening their laptop tomorrow morning. That is not desperation. That is the most elite form of discipline on earth.',
  twitter:   'https://twitter.com/Hsprafrique',
  youtube:   'https://youtube.com/@hsprafrique',
  instagram: 'https://instagram.com/Hsprafrique',
};

const PHOTOS_A = ['/photos/sam-desk.jpeg', '/photos/sam-mic.jpeg'];
const PHOTOS_B = ['/photos/sam-mic.jpeg',  '/photos/sam-desk.jpeg'];

const PRODUCTS = [
  { name: '9jaTax',        domain: '9jatax.app',      desc: 'Bookkeeping & tax platform for Nigerian businesses.',  url: 'https://9jatax.app',      status: 'live',     tag: 'FINTECH'     },
  { name: 'Campus Market', domain: 'campusmarket.cc', desc: 'Marketplace built for students across Nigeria.',       url: 'https://campusmarket.cc', status: 'live',     tag: 'MARKETPLACE' },
  { name: 'HP Autos',      domain: 'hpautos.cc',      desc: 'Automobile marketplace across Africa.',                url: 'https://hpautos.cc',      status: 'live',     tag: 'AUTOS'       },
  { name: 'Peng Stays',    domain: 'pengstays.homes', desc: 'Real estate & short-let booking platform.',            url: 'https://pengstays.homes', status: 'live',     tag: 'REAL ESTATE' },
  { name: 'Event Masters', domain: 'eventmasters.live', desc:  'Ticket Reselling Platform.',                        url: 'https://eventmasters.live', status:'live',    tag: 'TICKET RESELLER' },
  { name: 'Pascaqueen',    domain: 'pascaqueen.shop', desc: 'Herbal formula foods e-commerce store.',               url: 'https://pascaqueen.shop', status: 'live',     tag: 'E-COMMERCE'  },
  { name: 'HP Xchange',    domain: '',                desc: 'Digital asset exchange platform.',                     url: '#',                       status: 'building', tag: 'EXCHANGE'    },
  { name: 'EdgewiseTX',    domain: '',                desc: 'Community platform for African developers.',           url: '#',                       status: 'building', tag: 'COMMUNITY'   },
  { name: 'Pulse Logix',   domain: '',                desc: 'Logistics & delivery operations platform.',            url: '#',                       status: 'building', tag: 'LOGISTICS'   },
  { name: 'Talon Media',   domain: '',                desc: 'Media company.',                                       url: '#',                       status: 'building', tag: 'MEDIA'       },
];

const STACK = ['React', 'Node.js', 'Express', 'Supabase', 'PostgreSQL', 'Vite', 'Railway', 'Vercel', 'Cloudinary', 'Flutterwave', 'Paystack', 'TypeScript'];

// ─── Hooks ──────────────────────────────────────────────────────────────────
function useClock() {
  const [t, setT] = useState('');
  useEffect(() => {
    const tick = () => setT(new Date().toLocaleTimeString('en-US', {
      timeZone: 'Africa/Lagos', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function useScrolled(threshold = 30) {
  const [s, setS] = useState(false);
  useEffect(() => {
    const h = () => setS(window.scrollY > threshold);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, [threshold]);
  return s;
}

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ─── Sub components ──────────────────────────────────────────────────────────
function Dot({ color = '#32D74B', size = 7 }) {
  return <span className="dot" style={{ width: size, height: size, background: color, color }} />;
}

function Reveal({ children, delay = 0 }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

function ProductCard({ p }) {
  const live = p.status === 'live';
  const El = live ? 'a' : 'div';
  return (
    <El
      href={live ? p.url : undefined}
      target={live ? '_blank' : undefined}
      rel="noopener noreferrer"
      className={`product-card ${live ? 'live' : 'building'}`}
    >
      <div className="product-card-glow" />
      <div className="product-top">
        <div className="product-status">
          <Dot color={live ? '#32D74B' : '#FF9F0A'} size={6} />
          <span className="product-status-text" style={{ color: live ? '#32D74B' : '#FF9F0A' }}>
            {live ? 'LIVE' : 'BUILDING'}
          </span>
        </div>
        <span className="product-tag">{p.tag}</span>
      </div>
      <div className="product-name">{p.name}</div>
      {p.domain && <span className="product-domain">{p.domain}</span>}
      <p className="product-desc">{p.desc}</p>
      {live && <div className="product-visit">visit →</div>}
    </El>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Home() {
  const clock = useClock();
  const scrolled = useScrolled();
  const liveCount = PRODUCTS.filter(p => p.status === 'live').length;

  return (
    <>
      <div className="orb-teal" />
      <div className="orb-amber" />
      <div className="grain" />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>

      {/* ── Nav ── */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <div className="nav-brand">
            <div className="nav-logo">SI</div>
            <span className="nav-name">samivere.cc</span>
          </div>
          <div className="nav-links">
            <a href="#products">Products</a>
            <a href="#about">About</a>
            <a href="#writing">Writing</a>
          </div>
          <div className="nav-clock">
            <Dot color="#32D74B" size={6} />
            NG · {clock}
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">

            {/* Left */}
            <div>
              <div className="hero-badge" style={{ animation: 'fadeUp 0.6s ease 0s both' }}>
                <Dot color="#32D74B" size={6} />
                {liveCount} PRODUCTS LIVE · HSPR TECHNOLOGIES
              </div>
              <h1 className="hero-name" style={{ animation: 'fadeUp 0.6s ease 0.1s both' }}>
                Sam<br /><span className="accent">Ivere.</span>
              </h1>
              <p className="hero-bio" style={{ animation: 'fadeUp 0.6s ease 0.2s both' }}>{ME.bio}</p>
              <div className="hero-ctas" style={{ animation: 'fadeUp 0.6s ease 0.3s both' }}>
                <a href="#products" className="btn-primary">View the work →</a>
                <a href={`mailto:${ME.email}`} className="btn-secondary">Get in touch</a>
              </div>
              <div className="hero-socials" style={{ animation: 'fadeUp 0.6s ease 0.4s both' }}>
                <a href={ME.twitter}   target="_blank" rel="noopener noreferrer">Twitter</a>
                <a href={ME.youtube}   target="_blank" rel="noopener noreferrer">YouTube</a>
                <a href={ME.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href={`mailto:${ME.email}`}>Email</a>
              </div>
            </div>

            {/* Right — Photo stack */}
            <div style={{ position: 'relative', height: 480, animation: 'fadeUp 0.6s ease 0.2s both' }}>

              {/* Back card — rotated, explicit pixel size */}
              <div style={{
                position: 'absolute',
                top: 32, right: -10,
                width: 240, height: 340,
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)',
                transform: 'rotate(4.5deg)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.55)',
                zIndex: 1,
              }}>
                {/* Explicit height on slideshow container */}
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                  <PhotoSlideshow photos={PHOTOS_B} />
                </div>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(13,13,15,0.6) 100%)', zIndex: 2 }} />
              </div>

              {/* Front — macOS window, explicit pixel size */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0,
                width: 272, height: 390,
                background: 'rgba(26,26,32,0.82)',
                backdropFilter: 'blur(32px)',
                WebkitBackdropFilter: 'blur(32px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
                zIndex: 2,
              }}>
                {/* Titlebar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '11px 14px', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
                  <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FF453A', display: 'block' }} />
                  <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FFD60A', display: 'block' }} />
                  <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#32D74B', display: 'block' }} />
                  <span style={{ marginLeft: 8, fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>sam-ivere.jpg</span>
                </div>

                {/* Photo area — explicit pixel height = total - titlebar */}
                <div style={{ position: 'relative', width: '100%', height: 352 }}>
                  <PhotoSlideshow photos={PHOTOS_A} />
                  {/* Name overlay */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: '20px 16px',
                    background: 'linear-gradient(0deg, rgba(13,13,15,0.96) 0%, transparent 100%)',
                    zIndex: 3,
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#F2F2F7' }}>Sam Ivere</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: '#30D5C8', marginTop: 3 }}>
                      Founder · HSPR Technologies ·
                    </div>
                  </div>
                </div>
              </div>

              {/* Status widget */}
              <div style={{
                position: 'absolute', bottom: 20, right: -4, zIndex: 3,
                background: 'rgba(18,18,24,0.92)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12, padding: '12px 16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
                minWidth: 158,
              }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--faint)', letterSpacing: '0.14em', marginBottom: 10 }}>
                  SYSTEM STATUS
                </div>
                {['9jatax.app', 'hpautos.cc', 'pengstays.homes', 'eventmasters.live', 'campusmarket.cc'].map(d => (
                  <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
                    <Dot color="#32D74B" size={6} />
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--dim)' }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...STACK, ...STACK].map((s, i) => (
            <span key={i} className="marquee-item">
              {s}<span style={{ color: '#30D5C8', marginLeft: 6 }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Products ── */}
      <section id="products" className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-label">PRODUCTION FLEET</div>
            <div className="section-intro">
              <h2>Things I've built / building</h2>
              <p>Every product is live, maintained, and built for African users — from Bookkeeping to Car Marketplaces, Real Estate, Digital Exchange & Ticket Reselling.</p>
            </div>
          </Reveal>
          <div className="products-grid">
            {PRODUCTS.map((p, i) => (
              <Reveal key={i} delay={i * 0.055}>
                <ProductCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal><div className="section-label">ABOUT</div></Reveal>
          <div className="two-col">
            <Reveal>
              <div className="card-window" style={{ height: '100%' }}>
                <div className="card-window-bar">
                  <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FF453A', display: 'block' }} />
                  <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FFD60A', display: 'block' }} />
                  <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#32D74B', display: 'block' }} />
                  <span className="card-window-title">tweet · @hsprafrique · 62.7K views</span>
                </div>
                <div className="card-body">
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#30D5C8', letterSpacing: '0.12em', marginBottom: 18 }}>// @hsprafrique</div>
                  <blockquote className="quote">"{ME.quote}"</blockquote>
                  <div className="quote-meta">
                    <div>
                      <div className="quote-name">Sam Ivere</div>
                      <div className="quote-views">62.7K views · Mar 2026</div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="glass-card" style={{ height: '100%' }}>
                <div className="section-label" style={{ marginBottom: 16 }}>HSPR TECHNOLOGIES</div>
                <h3 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 14 }}>Building for Africa</h3>
                <p style={{ fontSize: 14, color: 'var(--dim)', lineHeight: 1.72, marginBottom: 14 }}>
                  HSPR Technologies is a Nigerian tech company building SaaS products and marketplaces for African communities. Every product is built to work on slow networks, priced in Naira, and designed for how African businesses actually operate.
                </p>
                <p style={{ fontSize: 14, color: 'var(--dim)', lineHeight: 1.72 }}>
                  From bookkeeping for Lagos SMEs to car marketplaces and real estate spanning the continent — HSPR ships real production softwares, not prototypes.
                </p>
                <div className="stats-grid">
                  {[{ n: `${liveCount}`, l: 'Live products' }, { n: '9+', l: 'Apps shipped' }, { n: '2026', l: 'Incorporated' }, { n: 'NG', l: 'Nigeria' }].map(({ n, l }) => (
                    <div key={l} className="stat-box">
                      <div className="stat-num">{n}</div>
                      <div className="stat-label">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Writing ── */}
      <section id="writing" className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal><div className="section-label">WRITING & CONTENT</div></Reveal>
          <div className="two-col">
            <Reveal>
              <div className="glass-card" style={{ height: '100%' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: '#FF9F0A', letterSpacing: '0.14em', marginBottom: 14 }}>BOOKS</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10, letterSpacing: '-0.015em' }}>Books I've written</h3>
                <p style={{ fontSize: 14, color: 'var(--dim)', lineHeight: 1.65 }}>
                  Practical guides built from real experience shipping products across Africa.
                </p>
                <div className="book-links">
                  <a href="https://selar.com/m/samuel-ivere1" target="_blank" rel="noopener noreferrer" className="book-link">Selar →</a>
                  <a href="https://hspr.gumroad.com" target="_blank" rel="noopener noreferrer" className="book-link">Gumroad →</a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <a href="https://youtube.com/@hsprafrique" target="_blank" rel="noopener noreferrer" style={{ display: 'block', height: '100%' }}>
                <div className="glass-card" style={{ height: '100%' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: '#FF453A', letterSpacing: '0.14em', marginBottom: 14 }}>YOUTUBE</div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 14, letterSpacing: '-0.015em' }}>Tech Afrique</h3>
                  <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', marginBottom: 14 }}>
                    <img src="https://i.ytimg.com/vi/R9L-ZOrzxBE/hqdefault.jpg" alt="Video" style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500, lineHeight: 1.4, marginBottom: 8 }}>
                    3 underrated apps every student should try
                  </p>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--teal)' }}>Watch on YouTube →</span>
                </div>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-inner">
            <div className="footer-brand">
              <div className="nav-logo" style={{ width: 26, height: 26, fontSize: 10 }}>SI</div>
              <span className="footer-copy">© {new Date().getFullYear()} HSPR TECHNOLOGIES LTD</span>
            </div>
            <div className="footer-links">
              <a href={ME.twitter}   target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href={ME.youtube}   target="_blank" rel="noopener noreferrer">YouTube</a>
              <a href={ME.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href={`mailto:${ME.email}`}>Email</a>
            </div>
            <div className="footer-status">
              <Dot color="#32D74B" size={6} />
              ALL SYSTEMS LIVE
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
