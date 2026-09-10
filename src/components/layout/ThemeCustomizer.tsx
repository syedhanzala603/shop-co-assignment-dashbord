import React from 'react';
import { X, Sliders, Check, RotateCcw } from 'lucide-react';
import { ThemeConfig } from '../../types';

interface ThemeCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  themeConfig: ThemeConfig;
  setThemeConfig: React.Dispatch<React.SetStateAction<ThemeConfig>>;
}

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({
  isOpen,
  onClose,
  themeConfig,
  setThemeConfig,
}) => {
  if (!isOpen) return null;

  const colorOptions = [
    { name: 'Berry Royal Purple', hex: '#5e35b1' },
    { name: 'Berry Indigo', hex: '#3949ab' },
    { name: 'Vibrant Blue', hex: '#1e88e5' },
    { name: 'Teal Forest', hex: '#00897b' },
    { name: 'Sunset Amber', hex: '#e65100' },
  ];

  const radiusOptions = [4, 8, 12, 16, 24];

  const fontOptions = [
    { label: 'Plus Jakarta Sans', value: "'Plus Jakarta Sans', sans-serif" },
    { label: 'Roboto (MUI Default)', value: "'Roboto', sans-serif" },
    { label: 'Inter', value: "'Inter', sans-serif" },
  ];

  const handleReset = () => {
    setThemeConfig({
      primaryColor: '#5e35b1',
      primaryColorName: 'Berry Royal Purple',
      borderRadius: 12,
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      navCollapsed: false,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none animate-in fade-in duration-200">
      {/* Dimmed Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div className="w-screen max-w-sm sm:max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#5e35b1] flex items-center justify-center">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Berry Theme Customizer</h3>
                <p className="text-[11px] text-slate-400">Live UI layout settings</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Settings Body */}
          <div className="p-6 space-y-6 flex-1 overflow-y-auto">
            {/* Primary Color Palette */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Primary Color Tone
              </label>
              <div className="grid grid-cols-5 gap-2.5">
                {colorOptions.map((c) => {
                  const isSelected = themeConfig.primaryColor === c.hex;
                  return (
                    <button
                      key={c.hex}
                      onClick={() =>
                        setThemeConfig((prev) => ({
                          ...prev,
                          primaryColor: c.hex,
                          primaryColorName: c.name,
                        }))
                      }
                      className="group flex flex-col items-center gap-1.5 cursor-pointer"
                      title={c.name}
                    >
                      <div
                        style={{ backgroundColor: c.hex }}
                        className={`w-10 h-10 rounded-xl shadow-xs flex items-center justify-center transition-all ${
                          isSelected ? 'ring-2 ring-offset-2 ring-slate-800 scale-105' : 'hover:scale-105'
                        }`}
                      >
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Active: <span className="font-semibold text-slate-600">{themeConfig.primaryColorName}</span>
              </p>
            </div>

            {/* Font Family Selection */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Font Family
              </label>
              <div className="space-y-2">
                {fontOptions.map((font) => {
                  const isSelected = themeConfig.fontFamily === font.value;
                  return (
                    <div
                      key={font.value}
                      onClick={() =>
                        setThemeConfig((prev) => ({ ...prev, fontFamily: font.value }))
                      }
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#5e35b1] bg-purple-50/50 text-[#5e35b1] font-semibold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-xs" style={{ fontFamily: font.value }}>
                        {font.label}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-[#5e35b1]" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Border Radius */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Corner Radius: {themeConfig.borderRadius}px
              </label>
              <div className="grid grid-cols-5 gap-2">
                {radiusOptions.map((radius) => {
                  const isSelected = themeConfig.borderRadius === radius;
                  return (
                    <button
                      key={radius}
                      onClick={() =>
                        setThemeConfig((prev) => ({ ...prev, borderRadius: radius }))
                      }
                      className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#5e35b1] text-white border-[#5e35b1]'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {radius}px
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer with Reset */}
          <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors font-medium cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Defaults
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#5e35b1] text-white text-xs font-semibold rounded-xl hover:bg-[#4527a0] transition-colors cursor-pointer"
            >
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
