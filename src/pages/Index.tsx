import { useState, useEffect } from 'react';
import { ChevronDown, ArrowRight, ArrowUpRight, MapPin, Clock, Phone, Sparkles, X } from 'lucide-react';
import Navbar from '@/components/Navbar';

const HERO_IMAGE = '/assets/dining-area.png';
const LOGO_IMAGE = 'https://mgx-backend-cdn.metadl.com/generate/images/1190170/2026-05-05/n522rdqaafnq/logo-taco-fiesta-transparent.png';
const RESTAURANT_ENTRANCE = '/assets/restaurant-entrance.png';
const FOOD_SPREAD = '/assets/food-spread.png';
const INTERIOR_CACTI = '/assets/interior-cacti.png';
const DINING_AREA = '/assets/dining-area.png';
const GALLERY_1 = '/assets/gallery-1.png';
const GALLERY_2 = '/assets/gallery-2.png';

const timeSlots = [
  '11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30',
  '15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30',
  '19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30',
  '23:00','23:30','00:00','00:30','01:00','01:30','02:00','02:30',
];

/* ───────── WHATSAPP BUTTON ───────── */
function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);
  return (
    <a
      href="https://wa.me/355695424532?text=Hi%2C%20I%27d%20like%20to%20book%20a%20table%20at%20Taco%20Fiesta."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] shadow-xl flex items-center justify-center transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

/* ───────── HERO ───────── */
function Hero() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 scale-110" style={{ backgroundImage: `url(${HERO_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(28px) brightness(0.45) saturate(0.7)' }} />
      <img src={HERO_IMAGE} alt="Taco Fiesta interior" className="absolute inset-0 h-full w-full" style={{ objectFit: 'cover', objectPosition: 'center 35%', transform: `translate3d(0, ${scrollY * 0.12}px, 0)`, willChange: 'transform' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#2D1B0E]/30 via-[#2D1B0E]/20 to-[#2D1B0E]/55" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <img src={LOGO_IMAGE} alt="Taco Fiesta Logo" className="w-52 sm:w-64 md:w-80 mx-auto mb-6 drop-shadow-2xl" style={{ filter: 'brightness(1.15) saturate(0.9)' }} />
        </div>
        <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          <p className="text-black text-sm tracking-[0.25em] uppercase font-medium mb-5">Saranda, Albania</p>
          <p className="text-2xl sm:text-3xl text-white/90 mb-10 max-w-xl mx-auto" style={{ fontFamily: 'Caveat, cursive' }}>
            Mexican food on the Ionian coast.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
          <a href="/menu" className="bg-[#C4532B] hover:bg-[#A3421F] text-white px-8 py-4 rounded-full text-base font-semibold transition-all hover:shadow-xl hover:shadow-[#C4532B]/30">
            See the Menu
          </a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="border border-white/50 hover:border-white text-white/80 hover:text-white px-8 py-4 rounded-full text-base font-medium transition-all">
            Find Us
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
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
            <img src={RESTAURANT_ENTRANCE} alt="Taco Fiesta Entrance" className="rounded-xl shadow-lg w-full object-cover aspect-[4/3]" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D1B0E] mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>
              Born in Saranda,<br />made in Mexico.
            </h2>
            <p className="text-[#3D2B1F]/70 text-base leading-relaxed mb-4">
              Taco Fiesta started as a simple idea: bring real Mexican cooking to Saranda. We're right off the waterfront on Butrinti Street, open every day from 11 in the morning to 3 at night.
            </p>
            <p className="text-[#3D2B1F]/70 text-base leading-relaxed">
              Everything is made fresh: the tortillas, the salsas, the guacamole. Come in for a taco before the beach or stay late with a margarita and enjoy the view.
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
        <h2 className="text-3xl md:text-5xl font-bold text-[#FFF8F0] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
          What's on the menu
        </h2>
        <p className="text-[#F5E6D0]/60 text-base md:text-lg max-w-md mx-auto mb-8">
          Tacos, quesadillas, fajitas, nachos, churros, and drinks. Everything made fresh, priced honestly.
        </p>
        <a href="/menu" className="inline-flex items-center gap-2.5 bg-[#C4532B] hover:bg-[#A3421F] text-white px-9 py-4 rounded-full text-base font-semibold transition-all hover:shadow-lg hover:shadow-[#C4532B]/25 group">
          View Full Menu
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
        <div className="mt-10 flex flex-wrap justify-center gap-5 text-[#F5E6D0]/35 text-sm">
          <span>Tacos</span><span>Quesadillas</span><span>Appetizers</span>
          <span>Specialties</span><span>Salads</span><span>Desserts</span><span>Drinks</span>
        </div>
      </div>
    </section>
  );
}


/* ───────── GALLERY ───────── */
function Gallery() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    if (lightbox) {
      window.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { window.removeEventListener('keydown', handleKey); document.body.style.overflow = ''; };
  }, [lightbox]);

  const galleryImages = [
    { src: FOOD_SPREAD, alt: 'Food spread', span: 'sm:col-span-2 sm:row-span-2' },
    { src: INTERIOR_CACTI, alt: 'Interior cacti wall', span: '' },
    { src: DINING_AREA, alt: 'Dining area booths', span: '' },
    { src: RESTAURANT_ENTRANCE, alt: 'Restaurant entrance', span: '' },
    { src: GALLERY_1, alt: 'Food and atmosphere', span: '' },
    { src: GALLERY_2, alt: 'Food and drinks', span: '' },
  ];

  return (
    <>
      <section id="gallery" className="py-20 md:py-28 bg-[#F5E6D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D1B0E]" style={{ fontFamily: 'Playfair Display, serif' }}>Inside the restaurant</h2>
            <p className="text-[#3D2B1F]/50 text-base mt-2">The arch, the booths, the cactus wall, and the food.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 auto-rows-[180px] md:auto-rows-[260px]">
            {galleryImages.map((img, i) => (
              <div key={i} onClick={() => setLightbox(img)} className={`rounded-xl overflow-hidden relative group cursor-pointer ${img.span}`}>
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors">
            <X className="w-8 h-8" />
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}


/* ───────── RESERVATION ───────── */
function Reservation() {
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', size: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date || !form.time || !form.size) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const inputClass = "w-full h-11 px-3.5 rounded-lg border border-[#2D1B0E]/15 text-sm text-[#2D1B0E] placeholder:text-[#2D1B0E]/30 focus:outline-none focus:border-[#C4532B] transition-colors bg-white appearance-none";

  return (
    <section id="reservation" className="py-16 md:py-20 bg-[#2D1B0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#FFF8F0] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Book a table</h2>
            <p className="text-[#F5E6D0]/60 text-base mb-8">Reserve your spot and we'll confirm within an hour by phone or WhatsApp.</p>
            <div className="space-y-3 text-sm text-[#F5E6D0]/50">
              <p>Open every day — 11:00 AM to 3:00 AM</p>
              <p>+355 69 542 4532</p>
              <p>Butrinti Street, Saranda</p>
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="bg-[#3D2B1F] rounded-xl p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-900/40 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-[#FFF8F0] font-bold text-lg mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Request received!</h3>
                <p className="text-[#F5E6D0]/60 text-sm">We'll confirm your reservation for {form.size} {parseInt(form.size) === 1 ? 'person' : 'people'} on {form.date} at {form.time}.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', date: '', time: '', size: '', notes: '' }); }} className="mt-5 text-[#E8A838] text-sm font-medium hover:underline">
                  Make another reservation
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[#3D2B1F] rounded-xl p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#F5E6D0]/50 uppercase tracking-wider mb-1.5">Name *</label>
                    <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#F5E6D0]/50 uppercase tracking-wider mb-1.5">Phone *</label>
                    <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+355..." className={inputClass} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#F5E6D0]/50 uppercase tracking-wider mb-1.5">Date *</label>
                    <input type="date" value={form.date} min={new Date().toISOString().split('T')[0]} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#F5E6D0]/50 uppercase tracking-wider mb-1.5">Time *</label>
                    <select value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} className={inputClass}>
                      <option value="">Time</option>
                      {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#F5E6D0]/50 uppercase tracking-wider mb-1.5">Guests *</label>
                    <select value={form.size} onChange={e => setForm(f => ({ ...f, size: e.target.value }))} className={inputClass}>
                      <option value="">Guests</option>
                      {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>)}
                      <option value="10+">10+ (contact us)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#F5E6D0]/50 uppercase tracking-wider mb-1.5">Special requests</label>
                  <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Allergies, celebrations, seating preferences..." rows={3} className={`${inputClass} resize-none`} />
                </div>
                {error && <p className="text-red-400 text-xs">{error}</p>}
                <button type="submit" className="w-full bg-[#C4532B] hover:bg-[#A3421F] text-white py-3 rounded-lg text-sm font-semibold transition-colors">
                  Request Reservation
                </button>
              </form>
            )}
          </div>
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
        src="https://maps.google.com/maps?q=39.867565236370936,20.015612695644467&t=&z=17&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Taco Fiesta Location"
      />
      {!active && (
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={() => setActive(true)}
        >
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#2D1B0E]/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm pointer-events-none">
            Tap to interact with map
          </div>
        </div>
      )}
    </div>
  );
}

/* ───────── LOCATION & CONTACT ───────── */
function Location() {
  return (
    <section id="contact" className="py-20 md:py-28 bg-[#2D1B0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#FFF8F0]" style={{ fontFamily: 'Playfair Display, serif' }}>Where to find us</h2>
          <p className="text-[#F5E6D0]/50 text-base mt-2">On the waterfront in Saranda, a short walk from the beach.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          <MapEmbed />
          <div className="space-y-7">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#C4532B]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-4 h-4 text-[#C4532B]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-[#FFF8F0] font-medium mb-1">Address</h3>
                <p className="text-[#F5E6D0]/60 text-sm">Butrinti Street, Saranda 9701, Albania</p>
                <a href="https://www.google.com/maps/dir/?api=1&destination=39.867565236370936,20.015612695644467&destination_place_id=&travelmode=driving" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-2.5 text-[#C4532B] hover:text-[#E8A838] text-sm font-medium transition-colors group">
                  Get Directions <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#1A8A7D]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="w-4 h-4 text-[#1A8A7D]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-[#FFF8F0] font-medium mb-1">Hours</h3>
                <p className="text-[#F5E6D0]/60 text-sm">Every day, 11:00 AM – 3:00 AM</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#E8A838]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Phone className="w-4 h-4 text-[#E8A838]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-[#FFF8F0] font-medium mb-1">Contact</h3>
                <p className="text-[#F5E6D0]/60 text-sm">+355 69 542 4532</p>
                <p className="text-[#F5E6D0]/60 text-sm">tacofiesta@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#C4532B]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-[#C4532B]" strokeWidth={1.5} />
              </div>
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
              <a href="https://wa.me/355695424532?text=Hi%2C%20I%27d%20like%20to%20book%20a%20table%20at%20Taco%20Fiesta." target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-[#FFF8F0]/8 hover:bg-[#C4532B] flex items-center justify-center text-[#F5E6D0]/60 hover:text-white transition-all" aria-label="WhatsApp">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── FOOTER ───────── */
function Footer() {
  return (
    <footer className="bg-[#1A1008] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="text-[#F5E6D0]/30 text-xs uppercase tracking-widest mb-3">Links</p>
            <div className="flex flex-col gap-2">
              {[{ label: 'Home', href: '#home' }, { label: 'About', href: '#about' }, { label: 'Menu', href: '/menu' }, { label: 'Gallery', href: '#gallery' }, { label: 'Contact', href: '#contact' }].map((link) => (
                <a key={link.label} href={link.href} onClick={link.href.startsWith('#') ? (e) => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }); } : undefined} className="text-[#F5E6D0]/45 hover:text-[#F5E6D0] text-sm transition-colors w-fit">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[#F5E6D0]/30 text-xs uppercase tracking-widest mb-3">Hours</p>
            <p className="text-[#F5E6D0]/45 text-sm">Every day</p>
            <p className="text-[#F5E6D0]/45 text-sm">11:00 AM – 3:00 AM</p>
          </div>
          <div>
            <p className="text-[#F5E6D0]/30 text-xs uppercase tracking-widest mb-3">Location</p>
            <p className="text-[#F5E6D0]/45 text-sm leading-relaxed">Butrinti Street<br />Saranda 9701, Albania</p>
          </div>
        </div>
        <div className="border-t border-[#FFF8F0]/8 pt-6">
          <p className="text-[#F5E6D0]/25 text-xs">&copy; {new Date().getFullYear()} Taco Fiesta Saranda</p>
        </div>
      </div>
    </footer>
  );
}

/* ───────── MAIN PAGE ───────── */
export default function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <MenuCTA />

      <Gallery />
      <Reservation />
      <Location />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
