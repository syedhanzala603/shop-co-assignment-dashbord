export interface ThemeConfig {
  primaryColor: string;
  primaryColorName: string;
  borderRadius: number;
  fontFamily: string;
  navCollapsed: boolean;
}

export interface GrowthDataPoint {
  month: string;
  investment: number;
  loss: number;
  profit: number;
  maintenance: number;
}

export interface StockItem {
  id: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
}

export interface CustomerData {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: 'Active' | 'Inactive' | 'Pending';
  avatar: string;
  ordersCount?: number;
  spent?: string;
}

export interface OrderData {
  id: string;
  customerName: string;
  branch: string;
  paymentType: string;
  quantity: number;
  orderDate: string;
  status: 'Complete' | 'Pending' | 'Cancel' | 'Hold';
  amount?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  brand: string;
  sku: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount?: number;
  stock: number;
  status: string;
  image: string;
  description?: string;
  gallery?: string[];
  features?: string[];
  specifications?: { label: string; value: string }[];
  colors?: { name: string; hex: string }[];
}
