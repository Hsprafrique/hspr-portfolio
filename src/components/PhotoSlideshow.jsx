import React, { useState, useEffect } from 'react';

export default function PhotoSlideshow({ photos, style }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (photos.length < 2) return;
    const t = setInterval(() => {
      setCurrent(prev => (prev + 1) % photos.length);
    }, 2000);
    return () => clearInterval(t);
  }, [photos.length]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      background: '#1a1a20',
      ...style,
    }}>
      {photos.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`Sam Ivere ${i + 1}`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            opacity: current === i ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            willChange: 'opacity',
          }}
        />
      ))}
    </div>
  );
}
