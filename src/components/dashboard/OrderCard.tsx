import React, { useState } from 'react';
import { ShoppingBag, ArrowDownRight } from 'lucide-react';

export const OrderCard: React.FC = () => {
  const [period, setPeriod] = useState<'month' | 'year'>('month');

  return (
    <div
      id="berry-card-order"
      className="lg:col-span-4 relative overflow-hidden bg-gradient-to-br from-[#1e88e5] to-[#1565c0] text-white p-5 rounded-2xl shadow-xs flex flex-col justify-between h-[200px]"
    >
      {/* Decorative background circles */}
      <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-white/10 pointer-events-none" />
      <div className="absolute -right-4 -top-10 w-28 h-28 rounded-full bg-white/10 pointer-events-none" />

      {/* Top bar: icon & period buttons */}
      <div className="flex items-center justify-between relative z-10">
        <div className="w-10 h-10 rounded-xl bg-[#1565c0]/80 flex items-center justify-center text-white shadow-xs">
          <ShoppingBag className="w-5 h-5" />
        </div>

        <div className="flex items-center bg-white/10 p-1 rounded-xl">
          <button
            onClick={() => setPeriod('month')}
            className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              period === 'month'
                ? 'bg-[#1565c0] text-white shadow-xs'
                : 'text-blue-100 hover:text-white'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setPeriod('year')}
            className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              period === 'year'
                ? 'bg-[#1565c0] text-white shadow-xs'
                : 'text-blue-100 hover:text-white'
            }`}
          >
            Year
          </button>
        </div>
      </div>

      {/* Bottom info: Amount, Trend arrow, Animated wave sparkline, Subtitle */}
      <div className="relative z-10 space-y-1 mt-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold tracking-tight">
              {period === 'month' ? '$961' : '$10,480'}
            </span>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white">
              <ArrowDownRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="w-24 h-8">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 30"
              preserveAspectRatio="none"
            >
              <path
                key={period}
                d="M 0,25 Q 25,5 50,18 T 100,5"
                fill="none"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
          </div>
        </div>

        <p className="text-xs font-medium text-blue-100">Total Order</p>
      </div>
    </div>
  );
};
