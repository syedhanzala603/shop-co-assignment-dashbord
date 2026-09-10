import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  Search,
  SlidersHorizontal,
  Wifi,
  Globe,
  Bell,
  Maximize,
  Minimize,
  Settings,
  User,
  LogOut,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { ThemeConfig } from '../../types';

interface NavbarProps {
  themeConfig: ThemeConfig;
  toggleSidebar: () => void;
  openCustomizer: () => void;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  toggleSidebar,
  openCustomizer,
  searchValue = '',
  onSearchChange,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setShowLanguageMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <header
      id="berry-header"
      className="sticky top-0 z-30 bg-white border-b border-slate-100 px-4 sm:px-6 py-2.5 transition-all duration-200"
    >
      <div className="flex items-center justify-between gap-4">
        {/* Left: Brand Logo, Sidebar Toggle, and Global Search */}
        <div className="flex items-center gap-4">
          {/* Logo Area */}
          <Link to="/" className="flex items-center gap-2 mr-2 cursor-pointer select-none">
            <div className="w-8 h-8 rounded-full bg-[#ede7f6] flex items-center justify-center text-[#5e35b1] shadow-xs">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="14" r="7" fill="#5e35b1" />
                <circle cx="9" cy="12" r="1.5" fill="#7e57c2" />
                <circle cx="14" cy="12" r="1.5" fill="#7e57c2" />
                <circle cx="12" cy="15" r="1.5" fill="#7e57c2" />
                <path d="M12 7 C12 4, 15 3, 17 4 C15 6, 14 7, 12 7 Z" fill="#43a047" />
                <path d="M12 7 C12 4, 9 3, 7 4 C9 6, 10 7, 12 7 Z" fill="#66bb6a" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tight text-slate-800 font-sans">
              BERRY
            </span>
          </Link>

          {/* Sidebar Toggle Button */}
          <button
            id="sidebar-toggle-btn"
            onClick={toggleSidebar}
            className="w-8 h-8 rounded-lg bg-[#ede7f6] text-[#5e35b1] hover:bg-[#5e35b1] hover:text-white transition-all flex items-center justify-center focus:outline-none cursor-pointer"
            title="Toggle Navigation Drawer"
            aria-label="Toggle Navigation Drawer"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Global Search with Filter Button */}
          <div className="relative hidden md:block w-72 lg:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              id="berry-global-search"
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`w-full pl-10 pr-10 py-2 text-xs bg-[#f8fafc] border rounded-xl transition-all text-slate-700 placeholder-slate-400 focus:bg-white focus:outline-none ${
                isSearchFocused
                  ? 'border-[#5e35b1] ring-2 ring-[#5e35b1]/20'
                  : 'border-slate-200/80'
              }`}
            />
            <button
              type="button"
              className="w-7 h-7 absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#ede7f6] text-[#5e35b1] hover:bg-[#5e35b1] hover:text-white rounded-lg flex items-center justify-center transition-all cursor-pointer"
              title="Filter"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Quick Action Controls & User Profile */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Mobile Search Toggle Button */}
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="w-8 h-8 rounded-lg bg-[#ede7f6] text-[#5e35b1] hover:bg-[#5e35b1] hover:text-white transition-all flex md:hidden items-center justify-center cursor-pointer"
            title="Search"
            aria-label="Toggle Mobile Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Live Connection Button (Tablet / Desktop) */}
          <button
            className="w-8 h-8 rounded-lg bg-[#ede7f6] text-[#5e35b1] hover:bg-[#5e35b1] hover:text-white transition-all hidden sm:flex items-center justify-center cursor-pointer"
            title="Live Connection Status: Active"
          >
            <Wifi className="w-4 h-4" />
          </button>

          {/* Language Selector */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="w-8 h-8 rounded-lg bg-[#e3f2fd] text-[#1e88e5] hover:bg-[#1e88e5] hover:text-white transition-all flex items-center justify-center cursor-pointer"
              title={`Language: ${selectedLanguage}`}
            >
              <Globe className="w-4 h-4" />
            </button>

            {showLanguageMenu && (
              <div className="absolute right-0 mt-2 w-44 max-w-[calc(100vw-32px)] bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-2 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Select Language
                </div>
                {['English', 'Français', 'Español', 'Deutsch', '日本語'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setShowLanguageMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      selectedLanguage === lang
                        ? 'bg-[#e3f2fd] text-[#1e88e5] font-semibold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{lang}</span>
                    {selectedLanguage === lang && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1e88e5]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Button */}
          <div className="relative" ref={notifRef}>
            <button
              id="berry-notification-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-8 h-8 rounded-lg bg-[#fff8e1] text-[#ffb300] hover:bg-[#ffb300] hover:text-white transition-all flex items-center justify-center cursor-pointer relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 max-w-[calc(100vw-32px)] bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="text-xs font-bold text-slate-800">All Notifications</h4>
                  <span className="text-[10px] bg-[#ede7f6] text-[#5e35b1] px-2 py-0.5 rounded-full font-semibold">
                    02 New
                  </span>
                </div>
                <div className="py-2 space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50/80 hover:bg-purple-50/50 transition-colors cursor-pointer border border-transparent hover:border-purple-100">
                    <p className="font-semibold text-slate-800">New Order Placed</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Order #790967 from Charlotte White ($260.00)
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                      5 mins ago
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50/80 hover:bg-purple-50/50 transition-colors cursor-pointer border border-transparent hover:border-purple-100">
                    <p className="font-semibold text-slate-800">Low Stock Alert</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Fujifilm X-T5 Mirrorless Camera reached 8 units threshold
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                      1 hr ago
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="w-8 h-8 rounded-lg bg-[#e3f2fd] text-[#1e88e5] hover:bg-[#1e88e5] hover:text-white transition-all flex items-center justify-center hidden sm:flex cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* User Profile Area & Settings */}
          <div className="flex items-center gap-1.5 sm:gap-2 pl-1 sm:pl-2 relative" ref={profileRef}>
            <div
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-slate-100 shadow-xs cursor-pointer hover:ring-2 hover:ring-[#5e35b1]/30 transition-all"
              title="User Account"
            >
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
                alt="User profile"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <button
              id="berry-header-settings-btn"
              onClick={openCustomizer}
              className="w-8 h-8 rounded-lg bg-[#e3f2fd] text-[#1e88e5] hover:bg-[#1e88e5] hover:text-white transition-all flex items-center justify-center cursor-pointer"
              title="Settings"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 top-12 sm:top-14 w-64 max-w-[calc(100vw-32px)] bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
                      alt="User avatar"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-800">John Doe</h5>
                    <p className="text-[11px] text-[#5e35b1] font-semibold">Administrator</p>
                    <p className="text-[10px] text-slate-400">john.doe@berry.io</p>
                  </div>
                </div>

                <div className="py-2 space-y-1 text-xs">
                  <button
                    onClick={() => {
                      openCustomizer();
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer text-left"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>Account Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      openCustomizer();
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer text-left"
                  >
                    <ShieldCheck className="w-4 h-4 text-slate-400" />
                    <span>Security & Privacy</span>
                  </button>
                  <div className="pt-2 border-t border-slate-100">
                    <button
                      onClick={() => setShowProfileMenu(false)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar Expansion */}
      {showMobileSearch && (
        <div className="pt-2 pb-1 md:hidden flex items-center gap-2 animate-in fade-in slide-in-from-top-1 border-t border-slate-100 mt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              autoFocus
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5e35b1]/20 focus:border-[#5e35b1] text-slate-800"
            />
          </div>
          <button
            onClick={() => setShowMobileSearch(false)}
            className="px-2.5 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </header>
  );
};
