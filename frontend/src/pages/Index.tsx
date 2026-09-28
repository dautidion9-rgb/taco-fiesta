import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ArrowRight, ArrowUpRight, MapPin, Clock, Phone, Sparkles, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const HERO_VIDEO = '/assets/hero-video.mp4';
const HERO_COVER = '/assets/hero-cover.webp';
const LOGO_IMAGE = '/assets/logo.webp';
const RESTAURANT_ENTRANCE = '/assets/restaurant-entrance.webp';
const FOOD_SPREAD = '/assets/food-spread.webp';
const INTERIOR_CACTI = '/assets/interior-cacti.webp';
const DINING_AREA = '/assets/dining-area.webp';
const GALLERY_2 = '/assets/gallery-2.webp';
const SOMBRERO_TACOS = '/assets/sombrero-tacos.webp';
const TACOS = '/assets/tacos.webp';
const QUESADILLA = '/assets/quesadilla.webp';
const BURRITO = '/assets/burrito.webp';

const timeSlots = [
  '11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30',
  '15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30',
  '19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30',
  '23:00','23:30','00:00','00:30',
];

/* ───────── HERO ───────── */
function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // index.html starts loading window.heroVideo before React boots; move that element
  // into the hero so playback begins immediately. Create one if it's missing.
  // If the browser still blocks autoplay (e.g. iOS Low Power Mode), start on
  // first interaction.
  useEffect(() => {
    const container = videoContainerRef.current;
    if (!container) return;
    let video = (window as unknown as { heroVideo?: HTMLVideoElement }).heroVideo ?? null;
    if (!video) {
      video = document.createElement('video');
      video.id = 'hero-video';
      video.poster = HERO_COVER;
      video.src = HERO_VIDEO;
    }
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.autoplay = true;
    video.loop = true;
    video.preload = 'auto';
    video.className = 'h-full w-full';
    video.style.cssText = 'object-fit:cover;object-position:center 35%';
    container.appendChild(video);
    const tryPlay = () => { if (video!.paused) video!.play().catch(() => {}); };
    tryPlay();
    video.addEventListener('canplay', tryPlay);
    const events = ['touchstart', 'click', 'scroll'] as const;
    events.forEach(ev => window.addEventListener(ev, tryPlay, { once: true, passive: true }));
    return () => {
      video!.removeEventListener('canplay', tryPlay);
      events.forEach(ev => window.removeEventListener(ev, tryPlay));
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#2D1B0E]">
      <div ref={videoContainerRef} className="absolute inset-0 h-full w-full overflow-hidden bg-cover" aria-hidden="true" style={{ backgroundImage: `url(${HERO_COVER})`, backgroundPosition: 'center 35%', transform: `translate3d(0, ${scrollY * 0.12}px, 0)`, willChange: 'transform' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#2D1B0E]/30 via-[#2D1B0E]/20 to-[#2D1B0E]/55" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <img src={LOGO_IMAGE} alt="Taco Fiesta Logo" className="w-52 sm:w-64 md:w-80 mx-auto mb-6 drop-shadow-2xl" style={{ filter: 'sepia(0.55) brightness(1.05) saturate(1.4) hue-rotate(-10deg) drop-shadow(0 0 32px rgba(196, 83, 43, 0.45))' }} />
        </div>
        <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          <p className="text-white/70 text-sm tracking-[0.25em] uppercase font-medium mb-5">Saranda, Albania</p>
          <h1 className="text-2xl sm:text-3xl text-white/90 mb-10 max-w-xl mx-auto font-light">
            Mexican food on the Ionian coast.
          </h1>
        </div>
        <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
          <a href="/menu" className="inline-block bg-[#C4532B] hover:bg-[#A3421F] text-white px-10 py-4 rounded-full text-base font-semibold tracking-wide transition-all hover:shadow-xl hover:shadow-[#C4532B]/30 hover:-translate-y-0.5">
            See the Menu
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float" aria-hidden="true">
        <ChevronDown className="w-6 h-6 text-white/40" />
      </div>
    </section>
  );
}

/* ───────── ABOUT ───────── */
function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-[#F5E6D0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-[5fr_7fr] gap-10 lg:gap-16 items-center">
          <div>
            <img src={RESTAURANT_ENTRANCE} alt="Taco Fiesta Entrance" className="rounded-xl shadow-lg w-full object-cover aspect-[4/3]" loading="lazy" decoding="async" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#2D1B0E] mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Good tacos deserve<br />a good view.
            </h2>
            <p className="text-[#3D2B1F]/70 text-base leading-relaxed mb-4">
              Taco Fiesta started as a simple idea: bring real Mexican cooking to Saranda. We opened as one of the first Mexican restaurants in Albania, built around the belief that every city deserves a place where the food is made from scratch and the atmosphere makes you want to stay. You'll find us right on Butrinti Street, steps from the waterfront, open every day from 11 AM to 1 AM.
            </p>
            <p className="text-[#3D2B1F]/70 text-base leading-relaxed">
              It's a table for everyone: families in for an early dinner, tourists taking a break from the coastline to try something different, couples staying for the sunset, and friends settling in for cocktails that run long past midnight.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── MENU CTA ───────── */
function MenuCTA() {
  return (
    <section id="menu" className="py-20 md:py-24 bg-[#2D1B0E]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold text-[#FFF8F0] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          What's on the menu
        </h2>
        <p className="text-[#F5E6D0]/60 text-base md:text-lg max-w-md mx-auto mb-8">
          Tacos, quesadillas, fajitas, nachos, churros, and drinks. Everything made fresh, priced honestly.
        </p>
        <a href="/menu" className="inline-flex items-center gap-2.5 bg-[#C4532B] hover:bg-[#A3421F] text-white px-9 py-4 rounded-full text-base font-semibold transition-all hover:shadow-lg hover:shadow-[#C4532B]/25 group">
          View Full Menu
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </a>
        <div className="mt-10 flex flex-wrap justify-center gap-5 text-[#F5E6D0]/60 text-sm">
          <span>Tacos</span><span>Quesadillas</span><span>Appetizers</span>
          <span>Burritos</span><span>Salads</span><span>Desserts</span><span>Drinks</span>
        </div>
      </div>
    </section>
  );
}


/* ───────── GALLERY ───────── */
function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryImages = [
    { src: FOOD_SPREAD, alt: 'Food spread' },
    { src: INTERIOR_CACTI, alt: 'Interior cacti wall' },
    { src: DINING_AREA, alt: 'Dining area booths' },
    { src: QUESADILLA, alt: 'Quesadilla' },
    { src: GALLERY_2, alt: 'Food and drinks' },
    { src: SOMBRERO_TACOS, alt: 'Tacos with sombrero' },
    { src: TACOS, alt: 'Tacos' },
    { src: BURRITO, alt: 'Burrito', position: 'object-bottom' },
  ];

  return (
    <>
      <section id="gallery" className="py-20 md:py-28 bg-[#F5E6D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#2D1B0E]" style={{ fontFamily: 'Poppins, sans-serif' }}>Inside the restaurant</h2>
            <p className="text-[#3D2B1F]/70 text-base mt-2">The arch, the booths, the cactus wall, and the food.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 auto-rows-[180px] sm:auto-rows-[240px]">
            {galleryImages.map((img, i) => (
              <button key={i} type="button" onClick={() => setLightboxIndex(i)} aria-label={`View larger image: ${img.alt}`} className="rounded-xl overflow-hidden relative group cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E8A838] focus-visible:outline-offset-2">
                <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${img.position || 'object-center'}`} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors rounded-xl" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <LightboxCarousel
          images={galleryImages}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}

/* ───────── LIGHTBOX CAROUSEL (infinite swipe) ───────── */
function LightboxCarousel({
  images,
  index,
  onIndexChange,
  onClose,
}: {
  images: { src: string; alt: string }[];
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}) {
  const total = images.length;
  const wrap = (i: number) => (i + total) % total;
  const prevIndex = wrap(index - 1);
  const nextIndex = wrap(index + 1);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ startX: 0, deltaX: 0, dragging: false, width: 0, animating: false, rafId: 0 });

  const setTrackX = (x: number, animate: boolean) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = animate ? 'transform 300ms ease' : 'none';
    track.style.transform = `translateX(${x}px)`;
  };

  const measure = () => {
    drag.current.width = containerRef.current?.offsetWidth || 0;
  };

  useEffect(() => {
    measure();
    setTrackX(-drag.current.width, false);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onIndexChange(prevIndex);
      if (e.key === 'ArrowRight') onIndexChange(nextIndex);
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', handleKey); document.body.style.overflow = ''; };
  }, [prevIndex, nextIndex, onClose, onIndexChange]);

  const animateTo = (targetX: number, after: () => void) => {
    const track = trackRef.current;
    if (!track || drag.current.animating) return;
    drag.current.animating = true;
    track.style.transition = 'transform 300ms ease';
    track.style.transform = `translateX(${targetX}px)`;
    const handle = () => {
      track.removeEventListener('transitionend', handle);
      drag.current.animating = false;
      after();
    };
    track.addEventListener('transitionend', handle);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (drag.current.animating) return;
    drag.current.dragging = true;
    drag.current.startX = e.clientX;
    drag.current.deltaX = 0;
    measure();
    if (trackRef.current) trackRef.current.style.transition = 'none';
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.dragging) return;
    drag.current.deltaX = e.clientX - drag.current.startX;
    if (!drag.current.rafId) {
      drag.current.rafId = requestAnimationFrame(() => {
        drag.current.rafId = 0;
        const track = trackRef.current;
        if (track) track.style.transform = `translateX(${-drag.current.width + drag.current.deltaX}px)`;
      });
    }
  };

  const onPointerUp = () => {
    if (!drag.current.dragging) return;
    drag.current.dragging = false;
    if (drag.current.rafId) {
      cancelAnimationFrame(drag.current.rafId);
      drag.current.rafId = 0;
    }
    const { deltaX, width } = drag.current;
    const threshold = Math.max(50, width * 0.2);
    if (deltaX > threshold) {
      animateTo(0, () => onIndexChange(prevIndex));
    } else if (deltaX < -threshold) {
      animateTo(-2 * width, () => onIndexChange(nextIndex));
    } else {
      animateTo(-width, () => {});
    }
  };

  const goPrev = () => {
    if (drag.current.animating) return;
    measure();
    setTrackX(-drag.current.width, false);
    requestAnimationFrame(() => animateTo(0, () => onIndexChange(prevIndex)));
  };
  const goNext = () => {
    if (drag.current.animating) return;
    measure();
    setTrackX(-drag.current.width, false);
    requestAnimationFrame(() => animateTo(-2 * drag.current.width, () => onIndexChange(nextIndex)));
  };

  const slides = [images[prevIndex], images[index], images[nextIndex]];

  return (
    <div role="dialog" aria-modal="true" aria-label={images[index].alt} className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <button type="button" onClick={onClose} aria-label="Close image" className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10">
        <X className="w-8 h-8" aria-hidden="true" />
      </button>

      <button type="button" onClick={(e) => { e.stopPropagation(); goPrev(); }} aria-label="Previous image" className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10 p-2">
        <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden="true" />
      </button>
      <button type="button" onClick={(e) => { e.stopPropagation(); goNext(); }} aria-label="Next image" className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10 p-2">
        <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden="true" />
      </button>

      <div
        ref={containerRef}
        className="relative w-[90vw] h-[85vh] max-w-5xl overflow-hidden select-none"
        style={{ touchAction: 'none' }}
        onClick={e => e.stopPropagation()}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div ref={trackRef} className="flex h-full" style={{ width: '300%', transform: 'translateX(-100%)', willChange: 'transform' }}>
          {slides.map((img, i) => (
            <div key={i} className="h-full flex items-center justify-center px-2" style={{ width: `${100 / 3}%` }}>
              <img src={img.src} alt={img.alt} className="max-h-full max-w-full object-contain rounded-xl shadow-2xl" draggable={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


/* ───────── RESERVATION ───────── */
function Reservation() {
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', size: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  // 00:00 and 00:30 belong to the night of the selected date, not the morning.
  const isLateNight = form.time.startsWith('00');
  const isLargeGroup = form.size === '10+';
  const prettyDate = form.date
    ? new Date(`${form.date}T12:00`).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
    : '';
  const timeLabel = isLateNight ? `${form.time} (late night, after the evening of ${prettyDate})` : form.time;

  const whatsappGroupText = [
    "Hi, I'd like to book a table at Taco Fiesta for a group of more than 10.",
    form.name && `Name: ${form.name}`,
    prettyDate && `Date: ${prettyDate}`,
    form.time && `Time: ${timeLabel}`,
    form.notes && `Notes: ${form.notes}`,
  ].filter(Boolean).join('\n');
  const whatsappGroupUrl = `https://wa.me/355689797777?text=${encodeURIComponent(whatsappGroupText)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLargeGroup) return;
    if (!form.name || !form.phone || !form.date || !form.time || !form.size) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setSending(true);
    try {
      const emailjs = await import('@emailjs/browser');
      emailjs.init('AVyZffgF0OjGIbCXr');
      await emailjs.send('service_lmvwh2m', 'template_e31gt1n', {
        name: form.name,
        phone: form.phone,
        date: form.date,
        time: timeLabel,
        guests: form.size,
        notes: form.notes || '—',
      });
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or call us directly.');
    } finally {
      setSending(false);
    }
  };

  const inputClass = "w-full h-11 px-3.5 rounded-lg border border-[#2D1B0E]/15 text-sm text-[#2D1B0E] placeholder:text-[#2D1B0E]/30 focus:outline-none focus:border-[#C4532B] transition-colors bg-white appearance-none";

  return (
    <section id="reservation" className="pt-8 pb-8 md:pt-10 md:pb-10 bg-[#2D1B0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#FFF8F0] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Book a table</h2>
            <p className="text-[#F5E6D0]/60 text-base mb-8">Reserve your spot and we'll confirm within an hour by phone or WhatsApp.</p>
            <div className="space-y-3 text-sm text-[#F5E6D0]/60">
              <p>Open every day — 11:00 AM to 1:00 AM</p>
              <p>+355 68 979 7777</p>
              <p>Butrinti Street, Saranda</p>
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="bg-[#3D2B1F] rounded-xl p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-900/40 flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-[#FFF8F0] font-bold text-lg mb-2" style={{ fontFamily: 'Poppins, sans-serif' }} role="status">Request received!</h3>
                <p className="text-[#F5E6D0]/60 text-sm">We'll confirm your reservation for {form.size} {parseInt(form.size) === 1 ? 'person' : 'people'} on {prettyDate} at {timeLabel}.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', date: '', time: '', size: '', notes: '' }); }} className="mt-5 text-[#E8A838] text-sm font-medium hover:underline">
                  Make another reservation
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[#3D2B1F] rounded-xl p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="res-name" className="block text-xs font-semibold text-[#F5E6D0]/60 uppercase tracking-wider mb-1.5">Name *</label>
                    <input id="res-name" type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="res-phone" className="block text-xs font-semibold text-[#F5E6D0]/60 uppercase tracking-wider mb-1.5">Phone *</label>
                    <input id="res-phone" type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+355..." className={inputClass} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="res-date" className="block text-xs font-semibold text-[#F5E6D0]/60 uppercase tracking-wider mb-1.5">Date *</label>
                    <input id="res-date" type="date" value={form.date} min={new Date().toLocaleDateString('en-CA')} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="res-time" className="block text-xs font-semibold text-[#F5E6D0]/60 uppercase tracking-wider mb-1.5">Time *</label>
                    <select id="res-time" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} className={inputClass}>
                      <option value="">Time</option>
                      {timeSlots.map(t => <option key={t} value={t}>{t.startsWith('00') ? `${t} (late night)` : t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="res-size" className="block text-xs font-semibold text-[#F5E6D0]/60 uppercase tracking-wider mb-1.5">Guests *</label>
                    <select id="res-size" value={form.size} onChange={e => setForm(f => ({ ...f, size: e.target.value }))} className={inputClass}>
                      <option value="">Guests</option>
                      {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>)}
                      <option value="10+">10+ (contact us)</option>
                    </select>
                  </div>
                </div>
                {isLateNight && prettyDate && (
                  <p className="text-[#F5E6D0]/60 text-xs -mt-1">
                    {form.time} is late night: just after midnight at the end of {prettyDate}.
                  </p>
                )}
                <div>
                  <label htmlFor="res-notes" className="block text-xs font-semibold text-[#F5E6D0]/60 uppercase tracking-wider mb-1.5">Special requests</label>
                  <textarea id="res-notes" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Allergies, celebrations, seating preferences..." rows={3} className={`${inputClass} resize-none`} />
                </div>
                {error && <p role="alert" className="text-red-400 text-xs">{error}</p>}
                {isLargeGroup ? (
                  <div className="space-y-3">
                    <p className="text-[#F5E6D0]/60 text-xs">For groups larger than 10, message us on WhatsApp so we can arrange the seating.</p>
                    <a href={whatsappGroupUrl} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-[#C4532B] hover:bg-[#A3421F] text-white py-3 rounded-lg text-sm font-semibold transition-colors">
                      Continue on WhatsApp
                    </a>
                  </div>
                ) : (
                  <button type="submit" disabled={sending} className="w-full bg-[#C4532B] hover:bg-[#A3421F] disabled:opacity-60 text-white py-3 rounded-lg text-sm font-semibold transition-colors">
                    {sending ? 'Sending...' : 'Request Reservation'}
                  </button>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── REVIEWS ───────── */
const reviews = [
  { name: 'Kymberly Traveler', stars: 5, wide: true,
    text: 'Delicious authentic Mexican food. I had juicy shredded beef tacos. The meat was flavorful, seasoned well and moist. The staff were friendly and the food is all delicious. It\'s on the sea so you have the best view. Go at sunset for a wonderful dinner.' },
  { name: 'Соломія Ільків', stars: 5, wide: false,
    text: 'Sooo tasty, very comfortable, very good tacos and so friendly service. Guys are really good in their job.' },
  { name: 'Doug Mitchell', stars: 4, wide: false,
    text: 'Came across this place on a walk up Rruga Butrinti, pleasantly surprised. Had pork carnitas and pollo del fuego, very tasty with nice spicing on the meat. Salsa was good. A decent addition to Sarandë.' },
  { name: 'Zdi Camebo', stars: 5, wide: true,
    text: 'A perfect blend of ambiance, flavor, and service. Every dish was thoughtfully prepared with fresh ingredients and bold flavors. The staff was incredibly welcoming and made great recommendations. We left full, happy, and already planning our next visit!' },
  { name: 'Jash Gada', stars: 5, wide: false,
    text: 'Wonderful food and one of the best cuisines to have in Sarande! Chefs and staff very friendly, must visit!' },
  { name: 'Ilsa Capari', stars: 5, wide: true,
    text: 'Such a fun spot in Sarandë. It\'s so rare to find a good Mexican place in a Mediterranean beach city. I went with my friends from Switzerland after a beach day and they loved it. The tacos were full of flavor, everything tasted fresh, and the atmosphere was very warm. Perfect place to eat after the beach.' },
  { name: 'Paula Dini', stars: 5, wide: false,
    text: 'Great food, friendly service, and a really nice vibe. The tacos were tasty and fresh, portions were good, and everything came out quickly. Casual, fun, and perfect for a relaxed meal with friends.' },
  { name: 'Jasmine Kaur', stars: 5, wide: false,
    text: 'Lovely service! Gave food even after closing time, great people.' },
  { name: 'Amina Braimi', stars: 5, wide: true,
    text: 'Wow, what great Mexican food! The waiter was super friendly and professional, almost no waiting time. It was so good we came back on our last night and ended with fantastic drinks. 10/10, highly recommended. It won\'t be the last time I visit Taco Fiesta!' },
  { name: 'Roy Pijpker', stars: 5, wide: false,
    text: 'The food is delicious and the portions are generous and filling. My girlfriend and I both had the tacos, both were delicious.' },
  { name: 'KayJay Schreefel', stars: 5, wide: false,
    text: 'The food was delicious and the service was excellent. Friendly staff and food was ready quickly. You also have a view of the sea if you sit at the front.' },
  { name: 'Burkay Sener', stars: 5, wide: true,
    text: 'Great shrimp tacos. Fantastic atmosphere with a great ocean view and very well decorated. The service was exceptionally good — we were served by Klevi, a very cheerful guy who really knows how to treat guests. High praise.' },
  { name: 'Jolanda Myftari', stars: 5, wide: true,
    text: 'Taco Fiesta was a super pleasant surprise! The beef tacos and spicy salsa were top notch. Fast service, very friendly staff, and the warm colorful atmosphere puts you right in the Mexican mood. If you want something different and full of flavor, this is the place.' },
  { name: 'Alex Gozdaris', stars: 5, wide: false,
    text: 'Great atmosphere, great food and super tasty. Highly recommended.' },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${count} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} aria-hidden="true" className={`w-4 h-4 ${i <= count ? 'text-[#E8A838]' : 'text-[#FFF8F0]/10'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Reviews() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.querySelector('div');
    const cardWidth = card ? card.offsetWidth + 16 : 320;
    scrollRef.current.scrollBy({ left: dir === 'right' ? cardWidth : -cardWidth, behavior: 'smooth' });
  };

  return (
    <section className="pt-16 pb-8 md:pt-20 md:pb-10 bg-[#2D1B0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#FFF8F0]" style={{ fontFamily: 'Poppins, sans-serif' }}>What our guests say</h2>
            <p className="text-[#F5E6D0]/60 text-base mt-2">Real reviews from Google</p>
          </div>
          <div className="hidden sm:flex gap-2">
            <button onClick={() => scroll('left')} aria-label="Previous reviews" className="w-10 h-10 rounded-full border border-[#FFF8F0]/15 hover:border-[#C4532B] hover:text-[#C4532B] flex items-center justify-center text-[#F5E6D0]/60 transition-colors">
              <ArrowRight className="w-4 h-4 rotate-180" strokeWidth={2} aria-hidden="true" />
            </button>
            <button onClick={() => scroll('right')} aria-label="Next reviews" className="w-10 h-10 rounded-full border border-[#FFF8F0]/15 hover:border-[#C4532B] hover:text-[#C4532B] flex items-center justify-center text-[#F5E6D0]/60 transition-colors">
              <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {reviews.map((r, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[300px] sm:w-[340px] bg-[#3D2B1F] rounded-2xl p-6 flex flex-col gap-3"
              style={{ scrollSnapAlign: 'start' }}
            >
              <Stars count={r.stars} />
              <p className="text-[#F5E6D0]/80 text-sm leading-relaxed flex-1">"{r.text}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#FFF8F0] font-semibold text-sm">{r.name}</p>
                </div>
                <svg viewBox="0 0 24 24" width="20" height="20" role="img" aria-label="Google review">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a href="https://www.google.com/maps/search/Taco+Fiesta+Saranda+Albania" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#F5E6D0]/60 hover:text-[#E8A838] text-xs font-medium transition-colors">
            Read more on Google <ArrowUpRight className="w-3 h-3" strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────── MAP EMBED ───────── */
function MapEmbed() {
  const [active, setActive] = useState(false);
  return (
    <div className="relative rounded-xl overflow-hidden h-[320px] md:h-[400px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1496.3!2d20.015612695644467!3d39.867565236370936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDUyJzAzLjIiTiAyMMKwMDAnNTYuMiJF!5e0!3m2!1sen!2s!4v1"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        allow="fullscreen"
        title="Taco Fiesta Location"
      />
      {!active && (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label="Activate map to interact"
          className="absolute inset-0 w-full h-full cursor-pointer"
        >
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#2D1B0E]/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
            Tap to interact with map
          </span>
        </button>
      )}
    </div>
  );
}

/* ───────── LOCATION & CONTACT ───────── */
function Location() {
  return (
    <section id="contact" className="pt-8 pb-20 md:pt-10 md:pb-28 bg-[#2D1B0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#FFF8F0]" style={{ fontFamily: 'Poppins, sans-serif' }}>Where to find us</h2>
          <p className="text-[#F5E6D0]/60 text-base mt-2">On the waterfront in Saranda, a short walk from the beach.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="order-2 md:order-1">
            <MapEmbed />
          </div>
          <div className="order-1 md:order-2 space-y-7">
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-[#C4532B] flex-shrink-0 mt-1" strokeWidth={1.5} aria-hidden="true" />
              <div>
                <h3 className="text-[#FFF8F0] font-medium mb-1">Address</h3>
                <p className="text-[#F5E6D0]/60 text-sm">Butrinti Street, Saranda 9701, Albania</p>
                <a href="https://www.google.com/maps/dir/?api=1&destination=39.867565236370936,20.015612695644467&destination_place_id=&travelmode=driving" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-2.5 text-[#C4532B] hover:text-[#E8A838] text-sm font-medium transition-colors group">
                  Get Directions <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 text-[#C4532B] flex-shrink-0 mt-1" strokeWidth={1.5} aria-hidden="true" />
              <div>
                <h3 className="text-[#FFF8F0] font-medium mb-1">Hours</h3>
                <p className="text-[#F5E6D0]/60 text-sm">Every day, 11:00 AM – 1:00 AM</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-[#C4532B] flex-shrink-0 mt-1" strokeWidth={1.5} aria-hidden="true" />
              <div>
                <h3 className="text-[#FFF8F0] font-medium mb-1">Contact</h3>
                <p className="text-[#F5E6D0]/60 text-sm">+355 68 979 7777</p>
                <p className="text-[#F5E6D0]/60 text-sm">tacofiestasaranda@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Sparkles className="w-5 h-5 text-[#C4532B] flex-shrink-0 mt-1" strokeWidth={1.5} aria-hidden="true" />
              <div>
                <h3 className="text-[#FFF8F0] font-medium mb-1">Private Events</h3>
                <p className="text-[#F5E6D0]/60 text-sm">We host birthday dinners and group events. Get in touch to book.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://www.instagram.com/tacofiestasarande/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-[#FFF8F0]/8 hover:bg-[#C4532B] flex items-center justify-center text-[#F5E6D0]/60 hover:text-white transition-all" aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.tripadvisor.com/Restaurant_Review-g303165-d33303359-Reviews-Taco_Fiesta-Saranda_Vlore_County.html" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-[#FFF8F0]/8 hover:bg-[#C4532B] flex items-center justify-center text-[#F5E6D0]/60 hover:text-white transition-all" aria-label="TripAdvisor">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.43 5.976 5.976 0 0 0 4.075-1.6L12 19.705l1.922-2.09a5.972 5.972 0 0 0 4.072 1.598 6 6 0 0 0 6-5.998 5.982 5.982 0 0 0-1.957-4.432L24 6.648h-4.35a13.573 13.573 0 0 0-7.644-2.353zM12 6.255c1.531 0 3.063.303 4.504.903C13.943 8.138 12 10.43 12 13.1c0-2.671-1.942-4.962-4.504-5.942A11.72 11.72 0 0 1 12 6.256zM6.002 9.157a4.059 4.059 0 1 1 0 8.118 4.059 4.059 0 0 1 0-8.118zm11.992.002a4.057 4.057 0 1 1 .003 8.115 4.057 4.057 0 0 1-.003-8.115zm-11.992 1.93a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256zm11.992 0a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256z"/></svg>
              </a>
              <a href="https://wa.me/355689797777?text=Hi%2C%20I%27d%20like%20to%20book%20a%20table%20at%20Taco%20Fiesta." target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-[#FFF8F0]/8 hover:bg-[#C4532B] flex items-center justify-center text-[#F5E6D0]/60 hover:text-white transition-all" aria-label="WhatsApp">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── MAIN PAGE ───────── */
export default function Index() {
  // Links like /#about from other pages arrive before React has rendered the
  // sections, so the browser can't jump to them. Scroll once they exist.
  useEffect(() => {
    const { hash } = window.location;
    if (hash.length > 1) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <MenuCTA />

      <Gallery />
      <Reviews />
      <Reservation />
      <Location />
      <Footer />
    </div>
  );
}
