import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { CustomerListPage } from './pages/CustomerListPage';
import { OrderListPage } from './pages/OrderListPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { SignInPage } from './pages/SignInPage';
import { ProductProvider } from './context/ProductContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, PublicOnlyRoute } from './components/auth/RouteGuards';

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <BrowserRouter>
        <Routes>
          {/* Public-only authentication routes (redirect to dashboard if already signed in) */}
          <Route element={<PublicOnlyRoute />}>
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/login" element={<SignInPage />} />
            <Route path="/authentication/sign-in" element={<SignInPage />} />
          </Route>

          {/* Protected dashboard routes (redirect unauthenticated users to /sign-in) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
            {/* Dashboard routes */}
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />

            {/* Customer routes */}
            <Route path="customer/customer-list" element={<CustomerListPage />} />
            <Route path="customer-list" element={<CustomerListPage />} />
            <Route path="customers" element={<CustomerListPage />} />

            {/* Order routes */}
            <Route path="order/order-list" element={<OrderListPage />} />
            <Route path="order-list" element={<OrderListPage />} />
            <Route path="orders" element={<OrderListPage />} />

            {/* E-commerce Products routes */}
            <Route path="e-commerce/products" element={<ProductsPage />} />
            <Route path="products" element={<ProductsPage />} />

            {/* E-commerce Product Details routes */}
            <Route path="e-commerce/product-details" element={<ProductDetailsPage />} />
            <Route path="e-commerce/product-details/:id" element={<ProductDetailsPage />} />
            <Route path="product-details" element={<ProductDetailsPage />} />
            <Route path="product-details/:id" element={<ProductDetailsPage />} />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ProductProvider>
    </AuthProvider>
  );
}
