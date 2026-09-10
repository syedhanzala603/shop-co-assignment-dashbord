import React, { useRef, useState, useEffect } from 'react';
import { MoreHorizontal, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StockItem {
  name: string;
  price: string;
  change: string;
  isGain: boolean;
}

const defaultStocks: StockItem[] = [
  { name: 'Bajaj Finserv', price: '$1839.00', change: '10% Profit', isGain: true },
  { name: 'TTML', price: '$100.00', change: '10% Loss', isGain: false },
  { name: 'Reliance', price: '$200.00', change: '10% Profit', isGain: true },
  { name: 'TTML', price: '$189.00', change: '10% Loss', isGain: false },
  { name: 'Stolon', price: '$189.00', change: '10% Loss', isGain: false },
];

export const PopularStocksCard: React.FC = () => {
  const stockRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      if (stockRef.current) {
        const rect = stockRef.current.getBoundingClientRect();
        const visible =
          rect.top < windowHeight * 0.95 && rect.bottom > windowHeight * 0.05;
        setIsInView(visible);
      }
    };

    const scrollContainer = stockRef.current?.closest('main') || window;
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    let observer: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window && stockRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
            }
          });
        },
        { threshold: 0.15 }
      );
      observer.observe(stockRef.current);
    }

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <div className="lg:col-span-4 bg-white border border-slate-100 p-5 sm:p-6 rounded-2xl shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-800">Popular Stocks</h2>
          <button className="text-slate-400 hover:text-slate-600 cursor-pointer">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Highlight Banner with Stock Wave */}
        <div
          ref={stockRef}
          className="mt-4 p-4 rounded-xl bg-[#ede7f6] relative overflow-hidden"
        >
          <div className="flex items-center justify-between relative z-10">
            <div>
              <h3 className="text-xs font-bold text-[#5e35b1]">Bajaj Finery</h3>
              <span className="inline-block text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded mt-0.5">
                10% Profit
              </span>
            </div>
            <span className="text-sm font-bold text-[#5e35b1]">$1839.00</span>
          </div>

          <div className="mt-3 h-10 w-full relative z-10">
            <svg
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
              viewBox="0 0 100 30"
            >
              <path
                d="M 0,25 Q 25,5 50,20 T 100,10 L 100,30 L 0,30 Z"
                fill="rgba(94, 53, 177, 0.2)"
                className="transition-opacity duration-700"
              />
              <path
                d="M 0,25 Q 25,5 50,20 T 100,10"
                fill="none"
                stroke="#5e35b1"
                strokeWidth="2"
                strokeLinecap="round"
                className="transition-all duration-700"
              />
            </svg>
          </div>
        </div>

        {/* Stocks Ticker List */}
        <div className="divide-y divide-slate-100 mt-2">
          {defaultStocks.map((stock, idx) => (
            <div
              key={idx}
              className="py-2.5 flex items-center justify-between transition-colors hover:bg-slate-50/50 rounded-lg px-1 -mx-1"
            >
              <div>
                <p className="text-xs font-semibold text-slate-800">
                  {stock.name}
                </p>
                <span
                  className={`inline-flex items-center gap-0.5 text-[10px] font-semibold ${
                    stock.isGain ? 'text-emerald-600' : 'text-rose-500'
                  }`}
                >
                  {stock.isGain ? (
                    <ArrowUpRight className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 text-rose-500" />
                  )}
                  {stock.change}
                </span>
              </div>
              <span className="text-xs font-bold text-slate-800">
                {stock.price}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action */}
      <div className="mt-4 pt-3 border-t border-slate-100 text-center">
        <button className="text-xs font-semibold text-[#1e88e5] hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer">
          <span>View All</span>
          <span>&gt;</span>
        </button>
      </div>
    </div>
  );
};
