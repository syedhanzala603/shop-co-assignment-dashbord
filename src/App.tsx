import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { CustomerListPage } from './pages/CustomerListPage';
import { OrderListPage } from './pages/OrderListPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { ProductProvider } from './context/ProductContext';

export default function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <Routes>
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
        </Routes>
      </BrowserRouter>
    </ProductProvider>
  );
}
