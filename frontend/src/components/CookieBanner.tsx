import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookie_consent')) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setVisible(false);
    // Enable GA now that consent is given
    (window as any)['ga-disable-G-1VHTE9RKTB'] = false;
    (window as any).gtag?.('js', new Date());
    (window as any).gtag?.('config', 'G-1VHTE9RKTB');
  };

  const decline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] bg-[#1A1008] border-t border-[#FFF8F0]/10 px-4 py-4 md:py-5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-[#F5E6D0]/70 text-sm leading-relaxed max-w-2xl">
          We use cookies to improve your experience and analyze website traffic. You can accept or manage your preferences at any time.
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={decline}
            className="text-[#F5E6D0]/50 hover:text-[#F5E6D0] text-sm font-medium transition-colors px-4 py-2"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="bg-[#C4532B] hover:bg-[#A3421F] text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
