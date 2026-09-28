import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useSEO } from '@/hooks/useSEO';

export default function NotFound() {
  useSEO({
    title: 'Page Not Found | Taco Fiesta Saranda',
    description: "The page you're looking for doesn't exist.",
    noindex: true,
  });

  return (
    <div className="min-h-screen bg-[#2D1B0E] flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-7xl w-full mx-auto">
          <p className="text-[#F5E6D0]/60 text-sm mb-3">404</p>
          <h1 className="text-3xl md:text-4xl font-semibold text-[#FFF8F0] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Page not found
          </h1>
          <p className="text-[#F5E6D0]/60 text-base max-w-md mb-8">
            This page doesn't exist or has moved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <a href="/" className="inline-block bg-[#C4532B] hover:bg-[#A3421F] text-white px-8 py-3 rounded-full text-sm font-semibold transition-colors">
              Back to home
            </a>
            <a href="/menu" className="inline-flex items-center gap-1.5 text-[#F5E6D0]/60 hover:text-[#E8A838] text-sm font-medium transition-colors group">
              See the menu <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
