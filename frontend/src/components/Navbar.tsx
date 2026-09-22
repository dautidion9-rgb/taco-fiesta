import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const LOGO_IMAGE = 'https://mgx-backend-cdn.metadl.com/generate/images/1190170/2026-05-05/n522rdqaafnq/logo-taco-fiesta-transparent.png';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '/menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reserve', href: '#reservation' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const scrollPosRef = useRef(0);
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

    const handleScroll = () => {
      const current = sectionIds.find(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom > 120;
      });
      if (current) setActiveSection(current);
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
      window.scrollTo({ top: scrollPosRef.current, left: 0, behavior: 'instant' });
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
      setIsOpen(false);
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } else {
      setIsOpen(false);
    }
  }, [location.pathname]);

  const isLinkActive = (href: string) => {
    if (href === '/menu') return location.pathname === '/menu';
    return location.pathname === '/' && href === '#' + activeSection;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled || isOpen ? 'bg-[#2D1B0E]/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
    }`}>
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between">
          <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }} className="flex items-center gap-3 group relative z-[60]">
            <img src={LOGO_IMAGE} alt="Taco Fiesta" className="h-12 w-auto object-contain drop-shadow-2xl" style={{ filter: 'sepia(0.55) brightness(1.05) saturate(1.4) hue-rotate(-10deg) drop-shadow(0 0 32px rgba(196, 83, 43, 0.45))' }} />
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
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-11 h-11 flex items-center justify-center z-[60] rounded-lg active:bg-white/10 touch-manipulation"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            style={{ touchAction: 'manipulation' }}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" aria-hidden="true" />
            ) : (
              <Menu className={`w-6 h-6 ${scrolled ? 'text-[#FFF8F0]' : 'text-white'}`} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className="md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out"
        style={{ maxHeight: isOpen ? '480px' : '0px', opacity: isOpen ? 1 : 0 }}
      >
        <div className="px-6 pt-2 pb-6">
          <div className="border-t border-[#E8A838]/20 mb-2" />
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(link.href, e)}
              className={`block py-3 text-base font-medium touch-manipulation ${
                isLinkActive(link.href) ? 'text-[#E8A838]' : 'text-[#F5E6D0]'
              }`}
              style={{ touchAction: 'manipulation' }}
            >
              {link.label}
            </a>
          ))}
          <div className="border-t border-[#E8A838]/20 mt-2 pt-4 space-y-1">
            <p className="text-[#F5E6D0]/60 text-sm">Butrinti Street, Saranda 9701</p>
            <a href="tel:+355689797777" className="block text-[#E8A838] text-sm">+355 68 979 7777</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
