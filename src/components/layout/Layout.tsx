import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { ThemeCustomizer } from './ThemeCustomizer';
import { ThemeConfig } from '../../types';

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>({
    primaryColor: '#5e35b1',
    primaryColorName: 'Berry Royal Purple',
    borderRadius: 12,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    navCollapsed: false,
  });

  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsMobileSidebarOpen((prev) => !prev);
    } else {
      setThemeConfig((prev) => ({
        ...prev,
        navCollapsed: !prev.navCollapsed,
      }));
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 transition-colors"
      style={{
        fontFamily: themeConfig.fontFamily,
      }}
    >
      {/* Top Navbar */}
      <Navbar
        themeConfig={themeConfig}
        toggleSidebar={toggleSidebar}
        openCustomizer={() => setIsCustomizerOpen(true)}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Container (Sidebar + Content) */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          themeConfig={themeConfig}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden min-h-[calc(100vh-57px)] w-full">
          {children || <Outlet />}
        </main>
      </div>

      {/* Floating Theme Customizer Button (Matching Reference Berry Dashboard) */}
      <button
        id="berry-floating-settings-tab"
        onClick={() => setIsCustomizerOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-[#5e35b1] hover:bg-[#4527a0] text-white p-2.5 rounded-l-xl shadow-lg transition-all z-40 flex items-center justify-center cursor-pointer active:scale-95"
        title="Settings & Customization"
        aria-label="Settings & Customization"
      >
        <Settings className="w-5 h-5 animate-[spin_6s_linear_infinite]" />
      </button>

      {/* Slide-over Theme Customizer Drawer */}
      <ThemeCustomizer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        themeConfig={themeConfig}
        setThemeConfig={setThemeConfig}
      />
    </div>
  );
};
