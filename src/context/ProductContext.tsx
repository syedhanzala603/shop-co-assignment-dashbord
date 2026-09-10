import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ProductItem } from '../types';
import { mockProducts } from '../data/mockData';

interface ProductContextType {
  products: ProductItem[];
  selectedProductId: string;
  setSelectedProductId: (id: string) => void;
  addProduct: (product: Omit<ProductItem, 'id'>) => string;
  deleteProduct: (id: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductItem[]>(mockProducts);
  const [selectedProductId, setSelectedProductId] = useState<string>(mockProducts[0]?.id || 'prod-1');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addProduct = (newProd: Omit<ProductItem, 'id'>): string => {
    const id = `prod-${Date.now()}`;
    const fullProduct: ProductItem = {
      ...newProd,
      id,
    };
    setProducts((prev) => [fullProduct, ...prev]);
    setSelectedProductId(id);
    showToast(`"${newProd.name}" added successfully!`);
    return id;
  };

  const deleteProduct = (id: string) => {
    const target = products.find((p) => p.id === id);
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    showToast(`"${target?.name || 'Product'}" has been deleted.`);

    if (selectedProductId === id && updated.length > 0) {
      setSelectedProductId(updated[0].id);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        selectedProductId,
        setSelectedProductId,
        addProduct,
        deleteProduct,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
