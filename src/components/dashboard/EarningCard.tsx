import React, { useState } from 'react';
import { CreditCard, MoreHorizontal, ArrowUpRight } from 'lucide-react';

export const EarningCard: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      id="berry-card-earning"
      className="lg:col-span-4 relative overflow-hidden bg-gradient-to-br from-[#5e35b1] to-[#4527a0] text-white p-5 rounded-2xl shadow-xs flex flex-col justify-between h-[200px]"
    >
      {/* Decorative background circles */}
      <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/10 pointer-events-none" />
      <div className="absolute -right-4 -bottom-10 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />

      {/* Top bar: icon & action menu */}
      <div className="flex items-center justify-between relative z-10">
        <div className="w-10 h-10 rounded-xl bg-[#4527a0]/80 flex items-center justify-center text-white shadow-xs">
          <CreditCard className="w-5 h-5" />
        </div>

        <div className="relative">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="w-8 h-8 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-all cursor-pointer"
            title="Options"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-30 text-xs text-slate-700 animate-in fade-in">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-left px-3 py-1.5 hover:bg-purple-50 text-slate-700 cursor-pointer"
              >
                Import Card
              </button>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-left px-3 py-1.5 hover:bg-purple-50 text-slate-700 cursor-pointer"
              >
                Copy Data
              </button>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-left px-3 py-1.5 hover:bg-purple-50 text-slate-700 cursor-pointer"
              >
                Export
              </button>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-left px-3 py-1.5 hover:bg-rose-50 text-rose-600 cursor-pointer"
              >
                Archive
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom info: Amount, Trend arrow, Subtitle */}
      <div className="relative z-10 space-y-1 mt-auto">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold tracking-tight">$500.00</span>
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
        <p className="text-xs font-medium text-purple-200">Total Earning</p>
      </div>
    </div>
  );
};
