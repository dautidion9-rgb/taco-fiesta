const LOGO_IMAGE = 'https://mgx-backend-cdn.metadl.com/generate/images/1190170/2026-05-05/n522rdqaafnq/logo-taco-fiesta-transparent.png';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#2D1B0E] flex flex-col items-center justify-center px-4 text-center">
      <img src={LOGO_IMAGE} alt="Taco Fiesta" className="w-44 mb-8 opacity-80" />
      <h1
        className="text-8xl font-bold text-[#C4532B] mb-4"
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        404
      </h1>
      <p className="text-[#F5E6D0]/60 text-lg mb-8 max-w-sm">
        This page doesn't exist. Maybe it ran off to get tacos.
      </p>
      <a
        href="/"
        className="bg-[#C4532B] hover:bg-[#A3421F] text-white px-8 py-3 rounded-full font-semibold transition-colors"
      >
        Back to Home
      </a>
    </div>
  );
}
