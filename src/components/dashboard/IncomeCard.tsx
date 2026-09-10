import React from 'react';
import { Store } from 'lucide-react';

export const IncomeCard: React.FC = () => {
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-col sm:flex-row lg:flex-col justify-between gap-4 min-h-[200px] lg:h-[200px]">
      {/* Top Card: Blue Total Income */}
      <div className="bg-[#1e88e5] text-white p-4.5 rounded-2xl shadow-xs flex items-center justify-between flex-1 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />
        <div className="flex items-center gap-3.5 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-[#1565c0] flex items-center justify-center text-white shadow-xs shrink-0">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight leading-tight block">
              $203k
            </span>
            <p className="text-xs text-blue-100 font-medium">Total Income</p>
          </div>
        </div>
      </div>

      {/* Bottom Card: White Total Income with amber store icon */}
      <div className="bg-white border border-slate-100 p-4.5 rounded-2xl shadow-xs flex items-center justify-between flex-1 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-[#fff8e1]/60 pointer-events-none" />
        <div className="flex items-center gap-3.5 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-[#fff8e1] flex items-center justify-center text-[#ffa000] shadow-xs shrink-0">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800 leading-tight block">
              $203k
            </span>
            <p className="text-xs text-slate-400 font-medium">Total Income</p>
          </div>
        </div>
      </div>
    </div>
  );
};
