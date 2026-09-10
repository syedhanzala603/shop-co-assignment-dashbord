import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="pt-6 pb-2 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p>
        © All rights reserved{' '}
        <span className="text-[#5e35b1] font-semibold cursor-pointer hover:underline">
          CodedThemes
        </span>
      </p>

      <div className="flex items-center gap-4 sm:gap-6">
        <a href="#license" className="hover:text-slate-800 transition-colors">
          License
        </a>
        <a href="#hire" className="hover:text-slate-800 transition-colors">
          Hire us
        </a>
        <a href="#terms" className="hover:text-slate-800 transition-colors">
          Terms
        </a>
        <a href="#figma" className="hover:text-slate-800 transition-colors">
          Figma Design System
        </a>
      </div>
    </footer>
  );
};

