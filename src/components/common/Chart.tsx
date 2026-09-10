import React, { useState } from 'react';
import { GrowthDataPoint } from '../../types';

interface GrowthChartProps {
  data: GrowthDataPoint[];
  period?: 'Today' | 'This Month' | 'This Year';
}

export const StackedBarChart: React.FC<GrowthChartProps> = ({ data }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Colors matching Berry UI
  const colors = {
    investment: '#ede7f6', // Light Purple
    loss: '#b39ddb',       // Medium Purple
    profit: '#5e35b1',     // Deep Berry Purple
    maintenance: '#7e57c2',// Accent Purple
  };

  const maxTotal = 260; // Max stacked height for scaling

  return (
    <div className="w-full flex flex-col justify-between">
      {/* Chart Canvas Area */}
      <div className="h-64 sm:h-72 w-full flex items-end justify-between gap-1.5 sm:gap-3 px-2 pt-6 relative select-none">
        {data.map((item, idx) => {
          const total = item.investment + item.loss + item.profit + item.maintenance;
          const totalHeightPercent = Math.min(100, (total / maxTotal) * 100);

          const invPct = (item.investment / total) * 100;
          const lossPct = (item.loss / total) * 100;
          const profitPct = (item.profit / total) * 100;
          const maintPct = (item.maintenance / total) * 100;

          const isHovered = hoveredIdx === idx;

          return (
            <div
              key={item.month}
              className="flex-1 flex flex-col items-center h-full justify-end group relative"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Tooltip */}
              {isHovered && (
                <div className="absolute bottom-[calc(100%+8px)] z-40 bg-slate-900/95 text-white text-[11px] p-2.5 rounded-xl shadow-xl backdrop-blur-xs min-w-[130px] pointer-events-none transform -translate-x-1/2 left-1/2 transition-all">
                  <div className="font-bold border-b border-slate-700 pb-1 mb-1.5 flex justify-between items-center text-xs">
                    <span>{item.month}</span>
                    <span className="text-purple-300 font-medium">${total}</span>
                  </div>
                  <div className="space-y-1 text-[10px]">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-xs bg-[#5e35b1]" />
                        Profit:
                      </span>
                      <span className="font-semibold text-white">${item.profit}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-xs bg-[#7e57c2]" />
                        Maintenance:
                      </span>
                      <span className="font-semibold text-white">${item.maintenance}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-xs bg-[#b39ddb]" />
                        Loss:
                      </span>
                      <span className="font-semibold text-white">${item.loss}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-xs bg-[#ede7f6]" />
                        Investment:
                      </span>
                      <span className="font-semibold text-white">${item.investment}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Stacked Bar */}
              <div
                className={`w-full max-w-[28px] rounded-t-md overflow-hidden flex flex-col justify-end transition-all duration-300 ${
                  isHovered ? 'scale-y-[1.03] shadow-md ring-2 ring-purple-400' : 'hover:opacity-90'
                }`}
                style={{ height: `${totalHeightPercent}%` }}
              >
                {/* Top: Maintenance */}
                <div
                  style={{ height: `${maintPct}%`, backgroundColor: colors.maintenance }}
                  className="w-full transition-colors"
                />
                {/* Profit */}
                <div
                  style={{ height: `${profitPct}%`, backgroundColor: colors.profit }}
                  className="w-full transition-colors"
                />
                {/* Loss */}
                <div
                  style={{ height: `${lossPct}%`, backgroundColor: colors.loss }}
                  className="w-full transition-colors"
                />
                {/* Bottom: Investment */}
                <div
                  style={{ height: `${invPct}%`, backgroundColor: colors.investment }}
                  className="w-full transition-colors"
                />
              </div>

              {/* Month Label */}
              <span className={`text-[11px] font-medium mt-2 transition-colors ${
                isHovered ? 'text-[#5e35b1] font-bold' : 'text-slate-400'
              }`}>
                {item.month}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-xs bg-[#ede7f6] border border-slate-300" />
          <span>Investment</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-xs bg-[#b39ddb]" />
          <span>Loss</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-xs bg-[#5e35b1]" />
          <span>Profit</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-xs bg-[#7e57c2]" />
          <span>Maintenance</span>
        </div>
      </div>
    </div>
  );
};

export const MiniSparkline: React.FC<{
  color?: string;
  fill?: string;
  className?: string;
  trend?: 'up' | 'down';
}> = ({ color = '#ffffff', fill = 'rgba(255,255,255,0.2)', className = 'w-24 h-8', trend = 'up' }) => {
  const points = trend === 'up' 
    ? '0,24 15,20 30,22 45,15 60,18 75,8 90,12 100,4'
    : '0,6 15,10 30,8 45,18 60,14 75,22 90,20 100,26';

  const fillPoints = trend === 'up'
    ? '0,24 15,20 30,22 45,15 60,18 75,8 90,12 100,4 100,32 0,32'
    : '0,6 15,10 30,8 45,18 60,14 75,22 90,20 100,26 100,32 0,32';

  return (
    <svg viewBox="0 0 100 32" className={className} preserveAspectRatio="none">
      <polygon points={fillPoints} fill={fill} />
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

export const StockAreaChart: React.FC<{ className?: string }> = ({ className = 'w-full h-12' }) => {
  return (
    <svg viewBox="0 0 200 40" className={className} preserveAspectRatio="none">
      <defs>
        <linearGradient id="stockGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5e35b1" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#5e35b1" stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <polygon
        points="0,32 20,28 40,30 60,18 80,24 100,12 120,16 140,8 160,14 180,6 200,10 200,40 0,40"
        fill="url(#stockGradient)"
      />
      <polyline
        fill="none"
        stroke="#5e35b1"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="0,32 20,28 40,30 60,18 80,24 100,12 120,16 140,8 160,14 180,6 200,10"
      />
    </svg>
  );
};
