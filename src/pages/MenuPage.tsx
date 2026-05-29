import { useState, useRef, useCallback } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Leaf } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface MenuItem {
  name: string;
  description: string;
  price: string;
  vegetarian?: boolean;
  tag?: string;
}

const menuCategories: { title: string; items: MenuItem[] }[] = [
  {
    title: 'Tacos',
    items: [
      { name: 'Beef Taco', description: 'Cilantro, caramelized onion, lemon, Mexican sauce.', price: '1200 L' },
      { name: 'Adobada Taco (Pork)', description: 'Cilantro, caramelized onion, lemon, beans.', price: '1100 L' },
      { name: 'Chicken Taco', description: 'Crispy chicken, lettuce, pickled onion and Mexican sauce.', price: '1000 L' },
      { name: 'Shrimp Taco', description: 'Tempura shrimp, coleslaw, pickled onion, Mexican sauce and lemon.', price: '1350 L', tag: 'Baja Style' },
      { name: 'Barbacoa Taco', description: 'Barbacoa, caramelized onion, cucumber salad and lemon.', price: '1300 L' },
      { name: 'Mushrooms Taco', description: 'Mexican sauce, avocado, cream and lemon.', price: '850 L', vegetarian: true },
    ],
  },
  {
    title: 'Quesadillas',
    items: [
      { name: 'Quesabirria', description: 'Cilantro, onion, barbacoa, flour tortilla and cheese.', price: '900 L', tag: 'Signature' },
      { name: 'Cheese Quesadilla', description: 'Flour tortilla, mozzarella, lettuce, tomato, pickled onion, avocado and cream.', price: '800 L', vegetarian: true },
      { name: 'Beef Quesadilla', description: 'Beef steak, flour tortilla, mozzarella, lettuce, tomato, pickled onion, avocado and cream.', price: '1000 L' },
      { name: 'Marinated Pork Quesadilla', description: 'Pork meat, flour tortilla, mozzarella, lettuce, tomato, pickled onion, avocado and cream.', price: '950 L' },
      { name: 'Chicken Quesadilla', description: 'Chicken, flour tortilla, mozzarella, lettuce, tomato, pickled onion, avocado and cream.', price: '1000 L' },
    ],
  },
  {
    title: 'Other Dishes',
    items: [
      { name: 'Chicken Fajitas', description: 'Chicken, peppers, onion and flour tortillas.', price: '1450 L', tag: 'Signature' },
      { name: 'Sopes', description: 'Ground meat, beans, lettuce, cream and pickled onion.', price: '1200 L' },
      { name: 'Chimichangas', description: 'Ground meat, mozzarella, Mexican sauce and jalapeños.', price: '1100 L' },
      { name: 'Nachos El Torro', description: 'Ground beef, cheddar cheese, pickles, corn and Mexican sauce.', price: '800 L' },
    ],
  },
  {
    title: 'Appetizers',
    items: [
      { name: 'Guacamole', description: 'Fresh guacamole.', price: '550 L', vegetarian: true },
      { name: 'Queso Fundido', description: 'Melted mozzarella cheese and tortillas.', price: '550 L', vegetarian: true },
      { name: 'Queso Fundido with Mushrooms', description: 'Melted mozzarella cheese, mushrooms and tortillas.', price: '600 L', vegetarian: true },
      { name: 'French Fries', description: 'Crispy golden fries.', price: '350 L', vegetarian: true },
      { name: 'Chips', description: 'Tortilla chips.', price: '300 L', vegetarian: true },
      { name: 'Pickled Jalapenos', description: 'House pickled jalapeños.', price: '250 L', vegetarian: true },
    ],
  },
  {
    title: 'Burritos',
    items: [
      { name: 'Beef Burrito', description: 'Beef steak, bacon, mozzarella, avocado, lettuce, tomato and caramelized onion.', price: '1100 L' },
      { name: 'Chicken Burrito', description: 'Chicken, bacon, mozzarella, avocado, lettuce, tomato and caramelized onion.', price: '1000 L' },
    ],
  },
  {
    title: 'Salads',
    items: [
      { name: 'Strawberry Salad', description: 'Lettuce, strawberry, goat cheese and cranberry vinaigrette.', price: '750 L', vegetarian: true },
      { name: 'Sweet and Sour Salad', description: 'Spinach, cranberry, raisins, nut mix and honey-lemon vinaigrette.', price: '700 L', vegetarian: true },
      { name: 'Fiesta Salad', description: 'Mixed greens, walnuts, pomegranate, pear, sesame seeds, halloumi cheese and balsamic sauce.', price: '800 L', vegetarian: true },
    ],
  },
  {
    title: 'Desserts',
    items: [
      { name: 'Churros', description: 'With cinnamon, sugar and chocolate.', price: '500 L', vegetarian: true },
      { name: 'Flan Napolitano', description: 'Classic Mexican creamy dessert.', price: '450 L', vegetarian: true },
      { name: 'Lemon Charlotte', description: 'Cookies layered with smooth lemon cream.', price: '450 L', vegetarian: true },
    ],
  },
  {
    title: 'Cocktails',
    items: [
      { name: 'Mojito', description: 'Rum, lime, mint, sugar, soda.', price: '900 L' },
      { name: 'Aperol Spritz', description: 'Aperol, prosecco, soda.', price: '800 L' },
      { name: 'Margarita', description: 'Tequila, lime juice, triple sec.', price: '800 L' },
      { name: 'Pina Colada', description: 'Rum, coconut cream, pineapple juice.', price: '900 L' },
      { name: 'Caipirinha', description: 'Cachaça, lime, sugar.', price: '800 L' },
      { name: 'Vodka Sour', description: 'Vodka, lemon juice, sugar syrup.', price: '900 L' },
      { name: 'Lemon', description: 'Fresh lemonade.', price: '500 L' },
      { name: 'Horchata', description: 'Traditional sweet rice milk drink with cinnamon.', price: '450 L' },
      { name: 'Tamarindo', description: 'Sweet and tangy tamarind drink.', price: '450 L' },
    ],
  },
  {
    title: 'Beer',
    items: [
      { name: 'Corona', description: 'Mexican lager.', price: '500 L' },
      { name: 'Heineken', description: 'Dutch pale lager.', price: '300 L' },
      { name: 'Peja', description: 'Kosovo lager.', price: '300 L' },
      { name: 'Korça (0.33L)', description: 'Albanian lager, small.', price: '300 L' },
      { name: 'Korça (0.5L)', description: 'Albanian lager, large.', price: '400 L' },
      { name: 'Alfa', description: 'Greek lager.', price: '400 L' },
      { name: 'Stella Artois', description: 'Belgian pale lager.', price: '350 L' },
    ],
  },
  {
    title: 'Coffee',
    items: [
      { name: 'Espresso', description: 'Short black.', price: '100 L' },
      { name: 'Machiato', description: 'Espresso with a dash of milk.', price: '100 L' },
      { name: 'Frappe', description: 'Iced blended coffee.', price: '250 L' },
      { name: 'Freddo Espresso', description: 'Iced espresso.', price: '200 L' },
      { name: 'Freddo Cappucino', description: 'Iced cappuccino.', price: '250 L' },
      { name: 'Cappucino', description: 'Espresso with steamed milk foam.', price: '200 L' },
      { name: 'Americano', description: 'Espresso with hot water.', price: '200 L' },
    ],
  },
  {
    title: 'Soft Drinks',
    items: [
      { name: 'Coca Cola / Coca Cola 0', description: 'Classic or zero sugar.', price: '200 L', vegetarian: true },
      { name: 'Lemon / Orange Soda', description: 'Sparkling lemon or orange.', price: '200 L', vegetarian: true },
      { name: 'Sprite', description: 'Lemon-lime soda.', price: '200 L', vegetarian: true },
      { name: 'Fanta Exotic / Orange', description: 'Tropical or orange flavor.', price: '200 L', vegetarian: true },
      { name: 'Tonic', description: 'Tonic water.', price: '200 L', vegetarian: true },
      { name: 'Sola', description: 'Albanian soft drink.', price: '200 L', vegetarian: true },
      { name: 'Peach / Lemon Ice Tea', description: 'Iced tea, peach or lemon.', price: '200 L', vegetarian: true },
      { name: 'Water', description: 'Still water.', price: '100 L', vegetarian: true },
      { name: 'Sparkling Water', description: 'Carbonated water.', price: '100 L', vegetarian: true },
    ],
  },
  {
    title: 'Spirits',
    items: [
      { name: "Gordon's Gin", description: 'Classic London dry gin.', price: '600 L' },
      { name: 'Johnnie Walker Red Label', description: 'Scotch blended whisky.', price: '700 L' },
      { name: 'Jack Daniels', description: 'Tennessee whiskey.', price: '600 L' },
      { name: 'Absolut Vodka', description: 'Swedish premium vodka.', price: '600 L' },
      { name: 'Amaro Montenegro', description: 'Italian herbal liqueur.', price: '600 L' },
      { name: 'Metaxa', description: 'Greek brandy.', price: '600 L' },
      { name: 'Skanderbeg Cognac', description: 'Albanian cognac.', price: '400 L' },
      { name: 'Tequila Sierra', description: 'Mexican silver tequila.', price: '600 L' },
      { name: 'Shots', description: 'Ask your server.', price: '300 L' },
      { name: 'Wine (1L)', description: 'House wine, red or white.', price: '1500 L' },
      { name: 'Glass Wine', description: 'House wine by the glass.', price: '300 L' },
    ],
  },
];

const total = menuCategories.length;
const FLIP_DURATION = 650;

function PageContent({ cat, pageNum }: { cat: (typeof menuCategories)[0]; pageNum: number }) {
  return (
    <div className="px-7 pt-7 pb-5 md:px-10 md:pt-9 md:pb-6 h-full flex flex-col">
      {/* Heading */}
      <div className="text-center mb-5">
        <p className="text-[#C4532B]/40 text-[10px] tracking-[0.3em] uppercase mb-1.5">{pageNum} / {total}</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#2D1B0E]" style={{ fontFamily: 'Playfair Display, serif' }}>
          {cat.title}
        </h2>
        <div className="mt-2.5 h-px w-12 bg-[#C4532B]/25 mx-auto" />
      </div>

      {/* Items */}
      <div className="flex-1 space-y-3.5 overflow-auto">
        {cat.items.map((item) => (
          <div key={item.name} className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-[#2D1B0E] text-sm md:text-base leading-snug" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {item.name}
                </span>
                {item.vegetarian && <Leaf className="w-3 h-3 text-emerald-600 shrink-0" strokeWidth={2} />}
                {item.tag && (
                  <span className="text-[9px] font-bold tracking-widest uppercase text-[#C4532B] bg-[#C4532B]/10 px-1.5 py-0.5 rounded-full shrink-0">
                    {item.tag}
                  </span>
                )}
              </div>
              <p className="text-[#3D2B1F]/40 text-xs mt-0.5 leading-relaxed italic">{item.description}</p>
            </div>
            <span className="text-[#C4532B] font-bold text-sm md:text-base shrink-0" style={{ fontFamily: 'Playfair Display, serif' }}>
              {item.price}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-[#2D1B0E]/8 flex justify-between items-center">
        <p className="text-[#3D2B1F]/20 text-[10px] italic" style={{ fontFamily: 'Playfair Display, serif' }}>
          {pageNum > 1 ? menuCategories[pageNum - 2].title : ''}
        </p>
        <p className="text-[#3D2B1F]/25 text-[10px]" style={{ fontFamily: 'Playfair Display, serif' }}>— {pageNum} —</p>
        <p className="text-[#3D2B1F]/20 text-[10px] italic" style={{ fontFamily: 'Playfair Display, serif' }}>
          {pageNum < total ? menuCategories[pageNum].title : ''}
        </p>
      </div>
    </div>
  );
}

export default function MenuPage() {
  const [frontIdx, setFrontIdx] = useState(0);
  const [backIdx, setBackIdx] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  const flip = useCallback((dir: 'fwd' | 'bwd') => {
    if (isFlipping) return;
    const nextFront = dir === 'fwd'
      ? (frontIdx + 1) % total
      : (frontIdx - 1 + total) % total;
    const nextBack = dir === 'fwd'
      ? (nextFront + 1) % total
      : (nextFront - 1 + total) % total;

    // Pre-load back face with next content
    setBackIdx(nextFront);
    setIsFlipping(true);

    // Start flip animation
    requestAnimationFrame(() => {
      if (wrapperRef.current) {
        wrapperRef.current.style.transition = `transform ${FLIP_DURATION}ms cubic-bezier(0.4, 0.0, 0.2, 1)`;
        wrapperRef.current.style.transform = dir === 'fwd' ? 'rotateY(-180deg)' : 'rotateY(180deg)';
      }
    });

    // After animation: swap front content and reset
    setTimeout(() => {
      setFrontIdx(nextFront);
      setBackIdx(nextBack);
      if (wrapperRef.current) {
        wrapperRef.current.style.transition = 'none';
        wrapperRef.current.style.transform = 'rotateY(0deg)';
      }
      setIsFlipping(false);
    }, FLIP_DURATION + 20);
  }, [frontIdx, isFlipping]);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) flip(diff > 0 ? 'fwd' : 'bwd');
  };

  return (
    <div className="min-h-screen bg-[#3D2B1F]">
      <Navbar />

      <div className="min-h-screen flex flex-col items-center justify-start pt-24 pb-12 px-4">
        {/* Title */}
        <div className="text-center mb-6">
          <p className="text-[#E8A838]/50 text-[10px] tracking-[0.3em] uppercase mb-1">Taco Fiesta · Saranda</p>
          <h1 className="text-2xl md:text-3xl font-bold text-[#FFF8F0]" style={{ fontFamily: 'Playfair Display, serif' }}>
            Menu
          </h1>
        </div>

        {/* Book */}
        <div className="w-full max-w-md">
          {/* Perspective container */}
          <div style={{ perspective: '1800px' }}>
            {/* Page shadow stack */}
            <div className="relative">
              <div className="absolute inset-0 translate-x-2 translate-y-2 bg-black/20 rounded-xl blur-sm" />
              <div className="absolute inset-0 translate-x-1 translate-y-1 bg-black/15 rounded-xl" />

              {/* Flip wrapper */}
              <div
                ref={wrapperRef}
                style={{ transformStyle: 'preserve-3d', position: 'relative' }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {/* FRONT FACE */}
                <div
                  style={{ backfaceVisibility: 'hidden' }}
                  className="bg-[#FEF9F2] rounded-xl overflow-hidden cursor-pointer select-none"
                  onClick={() => flip('fwd')}
                >
                  {/* Left spine shadow */}
                  <div className="absolute left-0 top-0 bottom-0 w-5 bg-gradient-to-r from-black/10 to-transparent pointer-events-none z-10 rounded-l-xl" />
                  {/* Right edge shadow */}
                  <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-l from-black/8 to-transparent pointer-events-none z-10 rounded-r-xl" />
                  {/* Inner border */}
                  <div className="absolute inset-3 border border-[#2D1B0E]/6 rounded-lg pointer-events-none z-10" />
                  <PageContent cat={menuCategories[frontIdx]} pageNum={frontIdx + 1} />
                </div>

                {/* BACK FACE — pre-loaded with next page */}
                <div
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(-180deg)',
                    position: 'absolute',
                    inset: 0,
                  }}
                  className="bg-[#FEF9F2] rounded-xl overflow-hidden"
                >
                  {/* Spine shadow (now on right since back face is mirrored in X) */}
                  <div className="absolute right-0 top-0 bottom-0 w-5 bg-gradient-to-l from-black/10 to-transparent pointer-events-none z-10 rounded-r-xl" />
                  <div className="absolute inset-3 border border-[#2D1B0E]/6 rounded-lg pointer-events-none z-10" />
                  <PageContent cat={menuCategories[backIdx]} pageNum={backIdx + 1} />
                </div>
              </div>
            </div>
          </div>

          {/* Click hint */}
          <p className="text-center text-[#F5E6D0]/25 text-xs mt-3">
            Tap the page or use arrows to flip
          </p>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-4 px-2">
            <button
              onClick={() => flip('bwd')}
              disabled={isFlipping}
              className="flex items-center gap-1.5 text-[#F5E6D0]/50 hover:text-[#E8A838] text-sm font-medium transition-colors disabled:opacity-30"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2} />
              <span className="hidden sm:inline">Prev</span>
            </button>

            {/* Dots */}
            <div className="flex gap-1.5">
              {menuCategories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (i > frontIdx) flip('fwd');
                    else if (i < frontIdx) flip('bwd');
                  }}
                  className={`rounded-full transition-all ${
                    i === frontIdx
                      ? 'w-4 h-2 bg-[#E8A838]'
                      : 'w-2 h-2 bg-[#F5E6D0]/20 hover:bg-[#F5E6D0]/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => flip('fwd')}
              disabled={isFlipping}
              className="flex items-center gap-1.5 text-[#F5E6D0]/50 hover:text-[#E8A838] text-sm font-medium transition-colors disabled:opacity-30"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>

          <div className="text-center mt-5">
            <a href="/" className="inline-flex items-center gap-2 text-[#F5E6D0]/25 hover:text-[#E8A838] text-sm font-medium transition-colors group">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" strokeWidth={2} />
              Back to home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
