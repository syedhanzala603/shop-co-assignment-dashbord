import React, { useState, useRef, useEffect } from 'react';
import { RotateCcw, ChevronDown } from 'lucide-react';

interface MonthData {
  month: string;
  investment: number;
  loss: number;
  profit: number;
  maintenance: number;
}

const defaultMonthlyData: MonthData[] = [
  { month: 'Jan', investment: 35, loss: 20, profit: 45, maintenance: 15 },
  { month: 'Feb', investment: 50, loss: 30, profit: 55, maintenance: 20 },
  { month: 'Mar', investment: 40, loss: 25, profit: 40, maintenance: 15 },
  { month: 'Apr', investment: 60, loss: 35, profit: 70, maintenance: 25 },
  { month: 'May', investment: 45, loss: 20, profit: 50, maintenance: 20 },
  { month: 'Jun', investment: 70, loss: 40, profit: 80, maintenance: 30 },
  { month: 'Jul', investment: 85, loss: 45, profit: 90, maintenance: 35 },
  { month: 'Aug', investment: 60, loss: 30, profit: 65, maintenance: 25 },
  { month: 'Sep', investment: 75, loss: 35, profit: 80, maintenance: 30 },
  { month: 'Oct', investment: 95, loss: 50, profit: 100, maintenance: 40 },
  { month: 'Nov', investment: 80, loss: 40, profit: 85, maintenance: 35 },
  { month: 'Dec', investment: 110, loss: 55, profit: 115, maintenance: 45 },
];

export const GrowthChartCard: React.FC = () => {
  const [period, setPeriod] = useState<'Today' | 'This Month'>('Today');
  const [animKey, setAnimKey] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const visible =
          rect.top < windowHeight * 0.92 && rect.bottom > windowHeight * 0.05;
        setIsInView(visible);
      }
    };

    const scrollContainer = containerRef.current?.closest('main') || window;
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    let observer: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window && containerRef.current) {
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
      observer.observe(containerRef.current);
    }

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="lg:col-span-8 bg-white border border-slate-100 p-5 sm:p-6 rounded-2xl shadow-xs flex flex-col justify-between"
    >
      {/* Header with Title, Amount, Replay and Period toggle */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <p className="text-xs font-semibold text-slate-400">Total Growth</p>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            $2,324.00
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Replay graph animation button */}
          <button
            onClick={() => setAnimKey((prev) => prev + 1)}
            title="Replay upward graph animation"
            className="p-1.5 rounded-xl border border-slate-200 text-slate-500 hover:text-[#5e35b1] hover:bg-[#ede7f6]/50 transition-all flex items-center justify-center cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Period selector */}
          <div className="relative">
            <button
              onClick={() => {
                setPeriod((prev) => (prev === 'Today' ? 'This Month' : 'Today'));
                setAnimKey((prev) => prev + 1);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
            >
              <span>{period}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Stacked Bar Chart Area */}
      <div className="mt-6 w-full overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
        <div className="h-64 sm:h-72 min-w-[480px] sm:min-w-0 w-full flex flex-col justify-end">
          <div className="h-52 sm:h-56 w-full flex items-end justify-between gap-2 sm:gap-3 px-1 relative">
          {defaultMonthlyData.map((item, idx) => {
            const total =
              item.investment + item.loss + item.profit + item.maintenance;
            // 330 is reference scale divisor
            const totalHeightPercent = (total / 330) * 100;
            const investPercent = (item.investment / total) * 100;
            const lossPercent = (item.loss / total) * 100;
            const profitPercent = (item.profit / total) * 100;
            const maintPercent = (item.maintenance / total) * 100;

            return (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center h-full justify-end group relative"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Floating Tooltip */}
                {hoveredIdx === idx && (
                  <div className="absolute bottom-[calc(100%+8px)] z-40 bg-slate-900/95 text-white text-[11px] p-2.5 rounded-xl shadow-xl backdrop-blur-xs min-w-[125px] pointer-events-none transform -translate-x-1/2 left-1/2 animate-in fade-in zoom-in-95 duration-150">
                    <div className="font-bold border-b border-slate-700 pb-1 mb-1.5 flex justify-between items-center">
                      <span>{item.month}</span>
                      <span className="text-emerald-400 font-bold">${total}</span>
                    </div>
                    <div className="space-y-1 text-[10px]">
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#ede7f6]" />
                          Maint
                        </span>
                        <span className="font-semibold text-white">
                          ${item.maintenance}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#5e35b1]" />
                          Profit
                        </span>
                        <span className="font-semibold text-white">
                          ${item.profit}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#1e88e5]" />
                          Loss
                        </span>
                        <span className="font-semibold text-white">
                          ${item.loss}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#90caf9]" />
                          Invest
                        </span>
                        <span className="font-semibold text-white">
                          ${item.investment}
                        </span>
                      </div>
                    </div>
                    <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                  </div>
                )}

                {/* Animated Stacked Bar */}
                <div
                  key={`${period}-${idx}-${animKey}`}
                  style={{
                    height: isInView ? `${totalHeightPercent}%` : '0%',
                    transitionDelay: `${idx * 30}ms`,
                  }}
                  className="w-full max-w-[28px] rounded-t-md overflow-hidden flex flex-col justify-end transition-all duration-700 ease-out group-hover:scale-y-[1.03] group-hover:shadow-md cursor-pointer"
                >
                  {/* Top segment: Maintenance */}
                  <div
                    className="w-full bg-[#ede7f6]"
                    style={{ height: `${maintPercent}%` }}
                  />
                  {/* Second segment: Profit */}
                  <div
                    className="w-full bg-[#5e35b1]"
                    style={{ height: `${profitPercent}%` }}
                  />
                  {/* Third segment: Loss */}
                  <div
                    className="w-full bg-[#1e88e5]"
                    style={{ height: `${lossPercent}%` }}
                  />
                  {/* Bottom segment: Investment */}
                  <div
                    className="w-full bg-[#90caf9]"
                    style={{ height: `${investPercent}%` }}
                  />
                </div>

                {/* Month label */}
                <span className="text-[11px] font-medium text-slate-400 mt-2 group-hover:text-slate-800 transition-colors">
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>

    {/* Legend */}
    <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs text-slate-600">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className="w-3 h-3 rounded-sm bg-[#90caf9]" />
        <span>Investment</span>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className="w-3 h-3 rounded-sm bg-[#1e88e5]" />
        <span>Loss</span>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className="w-3 h-3 rounded-sm bg-[#5e35b1]" />
        <span>Profit</span>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className="w-3 h-3 rounded-sm bg-[#ede7f6]" />
        <span>Maintenance</span>
      </div>
    </div>
  </div>
);
};
