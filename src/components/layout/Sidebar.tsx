import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart2,
  Receipt,
  Users2,
  BookOpen,
  TrendingUp,
  Database,
  PieChart,
  Users,
  ShoppingBag,
  MessageSquare,
  Kanban,
  Mail,
  Calendar,
  PhoneCall,
  Package,
  Layers,
  Puzzle,
  Columns,
  Table2,
  Grid,
  BarChart3,
  MapPin,
  FileCheck,
  Wand2,
  Component,
  Sparkles,
  Lock,
  Wrench,
  HelpCircle,
  Shield,
  ListTree,
  FileText,
  Compass,
  LifeBuoy,
  ChevronRight,
  ChevronDown,
  X,
  Eye,
} from 'lucide-react';
import { ThemeConfig } from '../../types';

interface SidebarProps {
  themeConfig: ThemeConfig;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  themeConfig,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const location = useLocation();
  const isCollapsed = themeConfig.navCollapsed;

  // Submenu toggle states
  const [isCustomerOpen, setIsCustomerOpen] = useState(true);
  const [isOrderOpen, setIsOrderOpen] = useState(true);
  const [isEcommerceOpen, setIsEcommerceOpen] = useState(true);

  // Auto-expand submenus if user navigates to their routes
  useEffect(() => {
    if (location.pathname.includes('customer')) {
      setIsCustomerOpen(true);
    }
    if (location.pathname.includes('order')) {
      setIsOrderOpen(true);
    }
    if (location.pathname.includes('product') || location.pathname.includes('e-commerce')) {
      setIsEcommerceOpen(true);
    }
  }, [location.pathname]);

  const isDefaultActive =
    location.pathname === '/' || location.pathname === '/dashboard';
  const isCustomerActive = location.pathname.includes('customer');
  const isOrderActive = location.pathname.includes('order');
  const isProductsActive =
    location.pathname === '/e-commerce/products' ||
    location.pathname === '/products';
  const isProductDetailsActive = location.pathname.includes('product-details');
  const isEcommerceActive = isProductsActive || isProductDetailsActive;

  // ==================== COLLAPSED VIEW (Desktop) ====================
  const collapsedContent = (
    <div className="space-y-3">
      <NavLink
        to="/"
        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
          isDefaultActive
            ? 'bg-[#ede7f6] text-[#5e35b1]'
            : 'text-slate-500 hover:bg-slate-50'
        }`}
        title="Default Dashboard"
      >
        <LayoutDashboard className="w-5 h-5" />
      </NavLink>

      <NavLink
        to="/customer/customer-list"
        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
          isCustomerActive
            ? 'bg-[#ede7f6] text-[#5e35b1]'
            : 'text-slate-500 hover:bg-slate-50'
        }`}
        title="Customer List"
      >
        <Users className="w-5 h-5" />
      </NavLink>

      <NavLink
        to="/order/order-list"
        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
          isOrderActive
            ? 'bg-[#ede7f6] text-[#5e35b1]'
            : 'text-slate-500 hover:bg-slate-50'
        }`}
        title="Order List"
      >
        <ShoppingBag className="w-5 h-5" />
      </NavLink>

      <NavLink
        to="/e-commerce/products"
        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
          isProductsActive
            ? 'bg-[#ede7f6] text-[#5e35b1]'
            : 'text-slate-500 hover:bg-slate-50'
        }`}
        title="Products"
      >
        <Package className="w-5 h-5" />
      </NavLink>

      <NavLink
        to="/e-commerce/product-details"
        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
          isProductDetailsActive
            ? 'bg-[#ede7f6] text-[#5e35b1]'
            : 'text-slate-500 hover:bg-slate-50'
        }`}
        title="Product Details"
      >
        <Eye className="w-5 h-5" />
      </NavLink>
    </div>
  );

  // ==================== EXPANDED & MOBILE VIEW ====================
  const sidebarContent = (
    <div className="p-3.5 space-y-5 flex-1 select-none">
      {/* SECTION 1: DASHBOARD */}
      <div className="space-y-1">
        <p className="px-3 text-xs font-bold tracking-tight text-slate-800">
          Dashboard
        </p>
        <div className="space-y-0.5 pt-1">
          <NavLink
            to="/"
            onClick={onCloseMobile}
            className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-xl transition-all ${
              isDefaultActive
                ? 'bg-[#ede7f6] text-[#5e35b1] font-semibold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Default</span>
          </NavLink>

          <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <BarChart2 className="w-4 h-4" />
            <span>Analytics</span>
          </div>

          <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <Receipt className="w-4 h-4" />
            <span>Invoice</span>
          </div>

          <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <Users2 className="w-4 h-4" />
            <span>CRM</span>
          </div>

          <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <BookOpen className="w-4 h-4" />
            <span>Blog</span>
          </div>
        </div>
      </div>

      {/* SECTION 2: WIDGET */}
      <div className="space-y-1">
        <p className="px-3 text-xs font-bold tracking-tight text-slate-800">
          Widget
        </p>
        <div className="space-y-0.5 pt-1">
          <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <TrendingUp className="w-4 h-4" />
            <span>Statistics</span>
          </div>
          <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <Database className="w-4 h-4" />
            <span>Data</span>
          </div>
          <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <PieChart className="w-4 h-4" />
            <span>Chart</span>
          </div>
        </div>
      </div>

      {/* SECTION 3: APPLICATION */}
      <div className="space-y-1">
        <p className="px-3 text-xs font-bold tracking-tight text-slate-800">
          Application
        </p>
        <div className="space-y-1 pt-1">
          {/* Users item */}
          <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <Users2 className="w-4 h-4" />
              <span>Users</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>

          {/* Customer (Collapsible) */}
          <div>
            <button
              onClick={() => setIsCustomerOpen(!isCustomerOpen)}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                isCustomerOpen || isCustomerActive
                  ? 'bg-[#ede7f6] text-[#5e35b1]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>Customer</span>
              </div>
              {isCustomerOpen ? (
                <ChevronDown className="w-3.5 h-3.5 text-[#5e35b1]" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            {isCustomerOpen && (
              <div className="pl-6 pt-1 space-y-0.5 border-l border-slate-100 ml-4">
                <NavLink
                  to="/customer/customer-list"
                  onClick={onCloseMobile}
                  className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    isCustomerActive
                      ? 'bg-[#e3f2fd] text-[#1e88e5] font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  <span>List</span>
                </NavLink>
                <div className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  <span>Create</span>
                </div>
                <div className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  <span>Edit</span>
                </div>
                <div className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  <span>Details</span>
                </div>
              </div>
            )}
          </div>

          {/* Order (Collapsible) */}
          <div>
            <button
              onClick={() => setIsOrderOpen(!isOrderOpen)}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                isOrderOpen || isOrderActive
                  ? 'bg-[#ede7f6] text-[#5e35b1]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Order</span>
              </div>
              {isOrderOpen ? (
                <ChevronDown className="w-3.5 h-3.5 text-[#5e35b1]" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            {isOrderOpen && (
              <div className="pl-6 pt-1 space-y-0.5 border-l border-slate-100 ml-4">
                <NavLink
                  to="/order/order-list"
                  onClick={onCloseMobile}
                  className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    isOrderActive
                      ? 'bg-[#e3f2fd] text-[#1e88e5] font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  <span>List</span>
                </NavLink>
                <div className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  <span>Create</span>
                </div>
                <div className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  <span>Edit</span>
                </div>
                <div className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  <span>Details</span>
                </div>
              </div>
            )}
          </div>

          {/* Chat */}
          <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <MessageSquare className="w-4 h-4" />
            <span>Chat</span>
          </div>

          {/* Kanban */}
          <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <Kanban className="w-4 h-4" />
            <span>Kanban</span>
          </div>

          {/* Mail */}
          <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <Mail className="w-4 h-4" />
            <span>Mail</span>
          </div>

          {/* Calendar */}
          <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <Calendar className="w-4 h-4" />
            <span>Calendar</span>
          </div>

          {/* Contact */}
          <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <PhoneCall className="w-4 h-4" />
              <span>Contact</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>

          {/* E-commerce (Collapsible) */}
          <div>
            <button
              onClick={() => setIsEcommerceOpen(!isEcommerceOpen)}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                isEcommerceOpen || isEcommerceActive
                  ? 'bg-[#ede7f6] text-[#5e35b1]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span>E-commerce</span>
              </div>
              {isEcommerceOpen ? (
                <ChevronDown className="w-3.5 h-3.5 text-[#5e35b1]" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            {isEcommerceOpen && (
              <div className="pl-6 pt-1 space-y-0.5 border-l border-slate-100 ml-4">
                <NavLink
                  to="/e-commerce/products"
                  onClick={onCloseMobile}
                  className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    isProductsActive
                      ? 'bg-[#e3f2fd] text-[#1e88e5] font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  <span>Products</span>
                </NavLink>
                <NavLink
                  to="/e-commerce/product-details"
                  onClick={onCloseMobile}
                  className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    isProductDetailsActive
                      ? 'bg-[#e3f2fd] text-[#1e88e5] font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  <span>Product Details</span>
                </NavLink>
                <div className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  <span>Checkout</span>
                </div>
              </div>
            )}
          </div>

          {/* Invoice with Chevron */}
          <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <Receipt className="w-4 h-4" />
              <span>Invoice</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>

          {/* CRM with Chevron */}
          <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <Users2 className="w-4 h-4" />
              <span>CRM</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* SECTION 4: FORMS */}
      <div className="space-y-1">
        <p className="px-3 text-xs font-bold tracking-tight text-slate-800">
          Forms
        </p>
        <div className="space-y-0.5 pt-1">
          <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <Layers className="w-4 h-4" />
              <span>Components</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <Puzzle className="w-4 h-4" />
              <span>Plugins</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <Columns className="w-4 h-4" />
              <span>Layouts</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <Table2 className="w-4 h-4" />
              <span>Table</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <Grid className="w-4 h-4" />
              <span>Data Grid</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-4 h-4" />
              <span>Charts</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <MapPin className="w-4 h-4" />
            <span>Map</span>
          </div>

          <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <FileCheck className="w-4 h-4" />
            <span>Forms Validation</span>
          </div>

          <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <Wand2 className="w-4 h-4" />
            <span>Forms Wizard</span>
          </div>
        </div>
      </div>

      {/* SECTION 5: UI ELEMENT */}
      <div className="space-y-1">
        <p className="px-3 text-xs font-bold tracking-tight text-slate-800">
          UI Element
        </p>
        <div className="space-y-0.5 pt-1">
          <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <Component className="w-4 h-4" />
              <div>
                <p className="font-semibold text-slate-700">Basic</p>
                <p className="text-[10px] text-slate-400">8+ Basic Components</p>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4" />
              <div>
                <p className="font-semibold text-slate-700">Advance</p>
                <p className="text-[10px] text-slate-400">Custom Elements</p>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* SECTION 6: PAGES */}
      <div className="space-y-1">
        <p className="px-3 text-xs font-bold tracking-tight text-slate-800">
          Pages
        </p>
        <div className="space-y-0.5 pt-1">
          <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <Lock className="w-4 h-4" />
              <span>Authentication</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <Wrench className="w-4 h-4" />
              <span>Maintenance</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <Mail className="w-4 h-4" />
            <span>Contact Us</span>
          </div>

          <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <HelpCircle className="w-4 h-4" />
            <span>FAQs</span>
          </div>

          <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <Shield className="w-4 h-4" />
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>

      {/* SECTION 7: OTHERS */}
      <div className="space-y-1">
        <p className="px-3 text-xs font-bold tracking-tight text-slate-800">
          Others
        </p>
        <div className="space-y-0.5 pt-1">
          <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <ListTree className="w-4 h-4" />
              <span>Menu Levels</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <FileText className="w-4 h-4" />
            <span>Documentation</span>
          </div>

          <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <Compass className="w-4 h-4" />
            <span>Roadmap</span>
          </div>

          <div className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer">
            <LifeBuoy className="w-4 h-4" />
            <span>Support</span>
          </div>
        </div>
      </div>

      {/* Berry Pro Upgrade Box */}
      <div className="pt-2 px-1">
        <div className="bg-gradient-to-br from-[#ede7f6] to-[#d1c4e9]/50 p-3.5 rounded-2xl border border-purple-100 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#5e35b1] font-bold text-xs">
            <Layers className="w-4 h-4" />
            <span>Berry Pro v3.6</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Unlock 45+ enterprise components and advanced analytics features.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Drawer Overlay Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden animate-in fade-in"
          onClick={onCloseMobile}
        />
      )}

      {/* Mobile Slide-out Drawer */}
      <aside
        id="berry-mobile-sidebar"
        className={`fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-white z-50 shadow-2xl flex flex-col h-full overflow-y-auto lg:hidden transition-transform duration-300 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Header with Logo & Close button */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
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
          </div>

          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {sidebarContent}
      </aside>

      {/* Desktop Sticky Sidebar (Collapsed or Expanded) */}
      {isCollapsed ? (
        <aside
          id="berry-sidebar-collapsed"
          className="w-16 bg-white border-r border-slate-100 hidden lg:flex flex-col items-center py-3 transition-all duration-300 z-20 shrink-0 select-none h-[calc(100vh-57px)] sticky top-[57px] overflow-y-auto"
        >
          {collapsedContent}
        </aside>
      ) : (
        <aside
          id="berry-sidebar"
          className="w-64 bg-white border-r border-slate-100 hidden lg:flex flex-col h-[calc(100vh-57px)] sticky top-[57px] transition-all duration-300 z-20 shrink-0 select-none overflow-y-auto"
        >
          {sidebarContent}
        </aside>
      )}
    </>
  );
};
