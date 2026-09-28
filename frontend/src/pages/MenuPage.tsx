import { useState, useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSEO } from '@/hooks/useSEO';

interface MenuItem {
  name: string;
  description: string;
  price: string;
  tag?: string;
}

const foodCategories: { title: string; items: MenuItem[] }[] = [
  {
    title: 'Tacos',
    items: [
      { name: 'Beef Taco', description: 'Seasoned beef, cilantro, caramelized onion and house salsa.', price: '1200 L' },
      { name: 'Adobada Taco (Pork)', description: 'Marinated pork shoulder, cilantro, caramelized onion and beans.', price: '1100 L' },
      { name: 'Chicken Taco', description: 'Crispy fried chicken, shredded lettuce, pickled onion and salsa.', price: '1000 L' },
      { name: 'Shrimp Taco', description: 'Tempura shrimp, slaw, pickled onion and salsa. Squeeze of lemon.', price: '1350 L', tag: 'Baja Style' },
      { name: 'Barbacoa Taco', description: 'Braised beef barbacoa, caramelized onion and fresh cucumber.', price: '1300 L' },
      { name: 'Mushrooms Taco', description: 'Sautéed mushrooms, avocado, crema and house salsa.', price: '850 L' },
    ],
  },
  {
    title: 'Quesadillas',
    items: [
      { name: 'Quesabirria', description: 'Barbacoa and melted cheese in a flour tortilla, griddled until crispy. Cilantro and onion on top.', price: '900 L', tag: 'Signature' },
      { name: 'Cheese Quesadilla', description: 'Mozzarella, lettuce, tomato, avocado and crema in a flour tortilla.', price: '800 L' },
      { name: 'Beef Quesadilla', description: 'Grilled beef with mozzarella, avocado, pickled onion and crema.', price: '1000 L' },
      { name: 'Marinated Pork Quesadilla', description: 'Marinated pork with mozzarella, avocado, pickled onion and crema.', price: '950 L' },
      { name: 'Chicken Quesadilla', description: 'Grilled chicken with mozzarella, avocado, pickled onion and crema.', price: '1000 L' },
    ],
  },
  {
    title: 'Burritos',
    items: [
      { name: 'Beef Burrito', description: 'Grilled beef, bacon, mozzarella, avocado, lettuce and caramelized onion.', price: '1100 L' },
      { name: 'Chicken Burrito', description: 'Grilled chicken, bacon, mozzarella, avocado, lettuce and caramelized onion.', price: '1000 L' },
    ],
  },
  {
    title: 'Other Dishes',
    items: [
      { name: 'Chicken Fajitas', description: 'Sizzling chicken strips with roasted peppers and onion. Comes with flour tortillas.', price: '1450 L', tag: 'Signature' },
      { name: 'Sopes', description: 'Thick corn cakes topped with ground meat, beans, lettuce, crema and pickled onion.', price: '1200 L' },
      { name: 'Chimichangas', description: 'Deep-fried tortilla stuffed with ground meat, mozzarella, salsa and jalapeños.', price: '1100 L' },
      { name: 'Nachos El Torro', description: 'Corn chips loaded with ground beef, cheddar, corn, pickles and house salsa.', price: '800 L' },
    ],
  },
  {
    title: 'Salads',
    items: [
      { name: 'Strawberry Salad', description: 'Lettuce, fresh strawberries, goat cheese and a cranberry dressing.', price: '750 L' },
      { name: 'Sweet and Sour Salad', description: 'Baby spinach, dried cranberry, raisins, mixed nuts and a honey-lemon dressing.', price: '700 L' },
      { name: 'Fiesta Salad', description: 'Mixed greens, walnuts, pomegranate, pear, halloumi and sesame with balsamic.', price: '800 L' },
    ],
  },
  {
    title: 'Appetizers',
    items: [
      { name: 'Guacamole', description: 'Made fresh to order. Served with chips.', price: '550 L' },
      { name: 'Queso Fundido', description: 'Mozzarella baked until bubbling, served with warm tortillas.', price: '550 L' },
      { name: 'Queso Fundido with Mushrooms', description: 'Same as above with sautéed mushrooms.', price: '600 L' },
      { name: 'French Fries', description: 'Thin-cut and fried until golden.', price: '350 L' },
      { name: 'Chips', description: 'House tortilla chips.', price: '300 L' },
      { name: 'Pickled Jalapenos', description: 'Pickled in-house.', price: '250 L' },
    ],
  },
  {
    title: 'Desserts',
    items: [
      { name: 'Churros', description: 'Fried and dusted with cinnamon sugar, served with chocolate.', price: '500 L' },
      { name: 'Flan Napolitano', description: 'Baked custard with caramel. A proper Mexican classic.', price: '450 L' },
      { name: 'Lemon Charlotte', description: 'Ladyfingers layered with lemon cream. Light and not too sweet.', price: '450 L' },
    ],
  },
];

const drinkCategories: { title: string; items: MenuItem[] }[] = [
  {
    title: 'Cocktails',
    items: [
      { name: 'Mojito', description: 'Rum, lime, mint, sugar, soda.', price: '900 L' },
      { name: 'Aperol Spritz', description: 'Aperol, prosecco, soda.', price: '800 L' },
      { name: 'Margarita', description: 'Tequila, lime juice, triple sec.', price: '800 L' },
      { name: 'Pina Colada', description: 'Rum, coconut cream, pineapple juice.', price: '900 L' },
      { name: 'Caipirinha', description: 'Cachaça, lime, sugar.', price: '800 L' },
      { name: 'Vodka Sour', description: 'Vodka, lemon juice, sugar syrup.', price: '900 L' },
    ],
  },
  {
    title: 'Fresh Drinks',
    items: [
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
      { name: 'Coca Cola / Coca Cola 0', description: 'Classic or zero sugar.', price: '200 L' },
      { name: 'Lemon / Orange Soda', description: 'Sparkling lemon or orange.', price: '200 L' },
      { name: 'Sprite', description: 'Lemon-lime soda.', price: '200 L' },
      { name: 'Fanta Exotic / Orange', description: 'Tropical or orange flavor.', price: '200 L' },
      { name: 'Tonic', description: 'Tonic water.', price: '200 L' },
      { name: 'Sola', description: 'Albanian soft drink.', price: '200 L' },
      { name: 'Peach / Lemon Ice Tea', description: 'Iced tea, peach or lemon.', price: '200 L' },
      { name: 'Water', description: 'Still water.', price: '100 L' },
      { name: 'Sparkling Water', description: 'Carbonated water.', price: '100 L' },
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

const allCategories = [...foodCategories, ...drinkCategories];

const menuJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Menu',
  name: 'Taco Fiesta Saranda Menu',
  url: 'https://tacofiesta.al/menu',
  inLanguage: 'en',
  hasMenuSection: allCategories.map((cat) => ({
    '@type': 'MenuSection',
    name: cat.title,
    hasMenuItem: cat.items.map((item) => ({
      '@type': 'MenuItem',
      name: item.name,
      description: item.description,
      offers: {
        '@type': 'Offer',
        price: item.price.replace(/[^\d.]/g, ''),
        priceCurrency: 'ALL',
      },
    })),
  })),
};

export default function MenuPage() {
  useSEO({
    title: 'Menu | Taco Fiesta Saranda — Tacos, Burritos & Cocktails',
    description: 'Full menu at Taco Fiesta Saranda: beef, chicken, shrimp & barbacoa tacos, quesadillas, burritos, fajitas, salads, cocktails and more. Prices in Lek. Open daily 11AM–1AM.',
    canonicalPath: '/menu',
    jsonLd: menuJsonLd,
  });

  const [activeIdx, setActiveIdx] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const isManualScrolling = useRef(false);
  const scrollTimer = useRef<ReturnType<typeof setTimeout>>();
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observers = allCategories.map((_, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting && !isManualScrolling.current) setActiveIdx(i);


          
          
         },
        { rootMargin: '-20% 0px -75% 0px' }
      );
      if (sectionRefs.current[i]) observer.observe(sectionRefs.current[i]!);
      return observer;
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  useEffect(() => {
    const el = tabsRef.current?.children[activeIdx] as HTMLElement;
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeIdx]);

  const scrollTo = (i: number) => {
    setActiveIdx(i);
    isManualScrolling.current = true;
    clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => { isManualScrolling.current = false; }, 1000);
    const el  = sectionRefs.current[i];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 130;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F5E6D0]">
      <Navbar />

      {/* Header */}
      <div className="pt-24 pb-5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-black text-[#2D1B0E] tracking-tight">Menu</h1>
      </div>

      {/* Mobile tabs */}
      <div className="lg:hidden sticky top-16 z-20 bg-[#F5E6D0] border-b border-[#2D1B0E]/10">
        <div ref={tabsRef} className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-3">
          {allCategories.map((cat, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeIdx === i ? 'bg-[#C4532B] text-white' : 'bg-[#2D1B0E]/8 text-[#2D1B0E]/65 hover:text-[#2D1B0E]'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-16">

        {/* Sidebar */}
        <aside className="hidden lg:block w-44 flex-shrink-0">
          <div className="sticky top-28 pt-10 pb-10">
            <nav>
              {allCategories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  className={`w-full text-left py-2 text-sm border-l-2 pl-3 transition-all ${
                    activeIdx === i
                      ? 'text-[#2D1B0E] border-[#C4532B] font-medium'
                      : 'text-[#2D1B0E]/65 border-transparent hover:text-[#2D1B0E]/70'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </nav>
            <div className="mt-8 pl-3">
              <a href="/" className="inline-flex items-center gap-1.5 text-[#2D1B0E]/65 hover:text-[#C4532B] text-xs transition-colors group">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" strokeWidth={2} />
                Back to home
              </a>
            </div>
          </div>
        </aside>

        {/* Menu content */}
        <main className="flex-1 pt-10 pb-24 max-w-4xl">
          {allCategories.map((cat, i) => (
            <section
              key={i}
              ref={el => { sectionRefs.current[i] = el; }}
              className="mb-12 scroll-mt-40"
            >
              <h2 className="text-3xl font-semibold text-[#2D1B0E] mb-8 tracking-tight">{cat.title}</h2>
              <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-10 lg:gap-y-7">
                {cat.items.map((item) => (
                  <div key={item.name} className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <p className="text-[#2D1B0E] text-base font-semibold leading-snug">{item.name}</p>
                      <p className="text-[#2D1B0E]/65 text-xs mt-1 leading-relaxed">{item.description}</p>
                    </div>
                    <p className="text-[#C4532B] text-sm font-semibold flex-shrink-0 tabular-nums">{item.price}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <div className="lg:hidden pt-4 border-t border-[#2D1B0E]/10">
            <a href="/" className="inline-flex items-center gap-1.5 text-[#2D1B0E]/65 hover:text-[#C4532B] text-sm transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" strokeWidth={2} />
              Back to home
            </a>
          </div>
        </main>
      </div>

      <Footer />

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 left-6 z-50 w-10 h-10 rounded-full bg-[#C4532B] hover:bg-[#A3421F] text-white flex items-center justify-center shadow-lg transition-all duration-300 ${showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        aria-label="Back to top"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}
