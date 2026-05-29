import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const LOGO_IMAGE = 'https://mgx-backend-cdn.metadl.com/generate/images/1190170/2026-05-05/n522rdqaafnq/logo-taco-fiesta-transparent.png';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '/menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const scrollPosRef = useRef(0);
  const navigatingRef = useRef(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section by scroll position
  useEffect(() => {
    if (location.pathname !== '/') return;
    const sectionIds = ['home', 'about', 'menu', 'gallery', 'reservation', 'contact'];
    const navSectionMap: Record<string, string> = { reservation: 'contact' };

    const handleScroll = () => {
      const current = sectionIds.find(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom > 120;
      });
      if (current) setActiveSection(navSectionMap[current] ?? current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open (iOS Safari compatible)
  useEffect(() => {
    if (isOpen) {
      scrollPosRef.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosRef.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      if (!navigatingRef.current) window.scrollTo(0, scrollPosRef.current);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) setIsOpen(false); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleNavClick = useCallback((href: string, e?: React.MouseEvent) => {
    if (href.startsWith('#')) {
      e?.preventDefault();
      if (location.pathname !== '/') {
        window.location.href = '/' + href;
        return;
      }
      navigatingRef.current = true;
      setIsOpen(false);
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        navigatingRef.current = false;
      }, 500);
    } else {
      setIsOpen(false);
    }
  }, [location.pathname]);

  const isLinkActive = (href: string) => {
    if (href === '/menu') return location.pathname === '/menu';
    return location.pathname === '/' && href === '#' + activeSection;
  };

  const barColor = isOpen ? 'bg-white' : scrolled ? 'bg-[#FFF8F0]' : 'bg-white';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled || isOpen ? 'bg-[#2D1B0E]/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
    }`}>
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between">
          <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }} className="flex items-center gap-3 group relative z-[60]">
            <img src={LOGO_IMAGE} alt="Taco Fiesta" className="h-12 w-auto object-contain" style={{ filter: 'brightness(1.15) saturate(0.9)' }} />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(link.href, e)}
                className={`nav-link text-base font-medium tracking-wide uppercase transition-colors ${
                  isLinkActive(link.href)
                    ? 'text-[#E8A838]'
                    : scrolled
                    ? 'text-[#F5E6D0] hover:text-[#E8A838]'
                    : 'text-white/90 hover:text-[#E8A838]'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a href="/menu" className="bg-[#C4532B] hover:bg-[#A3421F] text-white px-6 py-2.5 rounded-full text-base font-semibold tracking-wide transition-all hover:shadow-lg hover:shadow-[#C4532B]/30">
              Order Now
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-11 h-11 flex flex-col items-center justify-center gap-[5px] z-[60] rounded-lg active:bg-white/10 transition-colors touch-manipulation"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            style={{ touchAction: 'manipulation' }}
          >
            <span className={`block w-6 h-[2px] rounded-full transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-[7px] bg-white' : barColor}`} />
            <span className={`block w-6 h-[2px] rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 scale-x-0' : barColor}`} />
            <span className={`block w-6 h-[2px] rounded-full transition-all duration-300 origin-center ${isOpen ? '-rotate-45 -translate-y-[7px] bg-white' : barColor}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed left-0 right-0 bottom-0 md:hidden transition-all duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ top: 0, height: '100dvh', backgroundColor: '#2D1B0E', zIndex: 55 }}
      >
        <div className="relative flex flex-col h-full overflow-y-auto">
          <div className="h-[57px] shrink-0" />
          <div className="mx-4 border-t border-[#E8A838]/20 shrink-0" />

          <div className="flex-1 flex flex-col items-center justify-center gap-7 px-4 py-6">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(link.href, e)}
                className={`text-2xl transition-colors font-medium py-2 px-4 touch-manipulation ${
                  isLinkActive(link.href) ? 'text-[#E8A838]' : 'text-[#F5E6D0] hover:text-[#E8A838] active:text-[#E8A838]'
                }`}
                style={{
                  fontFamily: 'Playfair Display, serif',
                  touchAction: 'manipulation',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.4s ease ${0.15 + i * 0.08}s`,
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/menu"
              onClick={() => setIsOpen(false)}
              className="mt-4 bg-[#C4532B] hover:bg-[#A3421F] active:bg-[#A3421F] text-white px-10 py-3.5 rounded-full text-lg font-semibold transition-all touch-manipulation"
              style={{ touchAction: 'manipulation', opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.4s ease 0.55s' }}
            >
              Order Now
            </a>
          </div>

          <div className="px-6 pb-8 pt-4 shrink-0" style={{ opacity: isOpen ? 1 : 0, transition: 'opacity 0.4s ease 0.6s' }}>
            <div className="border-t border-[#E8A838]/20 mb-6" />
            <div className="text-center space-y-2 mb-6">
              <p className="text-[#F5E6D0]/60 text-sm">Butrinti Street, Saranda 9701</p>
              <a href="tel:+355695424532" className="text-[#E8A838] text-sm hover:underline active:underline">+355 69 542 4532</a>
            </div>
            <div className="flex items-center justify-center gap-4">
              <a href="https://www.instagram.com/tacofiestasarande/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-[#FFF8F0]/10 hover:bg-[#C4532B] active:bg-[#C4532B] flex items-center justify-center text-[#F5E6D0] transition-all touch-manipulation" aria-label="Instagram" style={{ touchAction: 'manipulation' }}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" className="w-11 h-11 rounded-full bg-[#FFF8F0]/10 hover:bg-[#C4532B] active:bg-[#C4532B] flex items-center justify-center text-[#F5E6D0] transition-all touch-manipulation" aria-label="Facebook" style={{ touchAction: 'manipulation' }}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="w-11 h-11 rounded-full bg-[#FFF8F0]/10 hover:bg-[#C4532B] active:bg-[#C4532B] flex items-center justify-center text-[#F5E6D0] transition-all touch-manipulation" aria-label="WhatsApp" style={{ touchAction: 'manipulation' }}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
