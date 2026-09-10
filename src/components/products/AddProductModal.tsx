import React, { useState } from 'react';
import { X, Sparkles, Plus } from 'lucide-react';
import { Button } from '../common/Button';
import { ProductItem } from '../../types';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: Omit<ProductItem, 'id'>) => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    brand: '',
    price: '',
    originalPrice: '',
    stock: '25',
    rating: '4.8',
    sku: '',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
    description: '',
  });

  const categories = [
    'Electronics',
    'Audio',
    'Wearables',
    'Laptops',
    'Cameras',
    'Accessories',
    'Footwear',
  ];

  const sampleImages = [
    { label: 'Headphones', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80' },
    { label: 'Smartwatch', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80' },
    { label: 'Laptop', url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80' },
    { label: 'Camera', url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80' },
    { label: 'Shoes', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80' },
  ];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) return;

    const priceNum = parseFloat(formData.price) || 99.99;
    const origPriceNum = formData.originalPrice
      ? parseFloat(formData.originalPrice)
      : priceNum * 1.15;
    const stockNum = parseInt(formData.stock, 10) || 15;
    const imgUrl = formData.image || sampleImages[0].url;

    const newProd: Omit<ProductItem, 'id'> = {
      name: formData.name.trim(),
      category: formData.category,
      brand: formData.brand.trim() || 'Berry Official',
      sku: formData.sku.trim() || `SKU-${Math.floor(100000 + Math.random() * 900000)}`,
      price: priceNum,
      originalPrice: origPriceNum,
      rating: parseFloat(formData.rating) || 4.8,
      reviewsCount: 1,
      stock: stockNum,
      status: stockNum > 10 ? 'In Stock' : stockNum > 0 ? 'Low Stock' : 'Out of Stock',
      image: imgUrl,
      gallery: [imgUrl, sampleImages[1].url, sampleImages[2].url],
      description:
        formData.description.trim() ||
        'Modern high-performance device with cutting-edge engineering, premium durability, and manufacturer warranty.',
      features: [
        'Built with premium aerospace-grade materials',
        'Long-lasting energy efficiency & battery standby',
        'Intuitive interface and ergonomic design',
        'Comprehensive 1-year product warranty',
      ],
      specifications: [
        { label: 'Brand', value: formData.brand || 'Berry Official' },
        { label: 'Category', value: formData.category },
        { label: 'SKU', value: formData.sku || `SKU-${Date.now().toString().slice(-6)}` },
        { label: 'Condition', value: 'Brand New (Sealed)' },
        { label: 'Warranty', value: '1 Year Manufacturer' },
      ],
      colors: [
        { name: 'Obsidian Black', hex: '#1e293b' },
        { name: 'Berry Purple', hex: '#5e35b1' },
        { name: 'Silver Slate', hex: '#94a3b8' },
      ],
    };

    onAdd(newProd);
    onClose();
    // Reset form
    setFormData({
      name: '',
      category: 'Electronics',
      brand: '',
      price: '',
      originalPrice: '',
      stock: '25',
      rating: '4.8',
      sku: '',
      image: sampleImages[0].url,
      description: '',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-slate-100 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#ede7f6] text-[#5e35b1] flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">Add New Product</h2>
              <p className="text-xs text-slate-400">Add a new item to your e-commerce catalog</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Product Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Sony WH-1000XM5 Headphones"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5e35b1]/20 focus:border-[#5e35b1] text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5e35b1]/20 focus:border-[#5e35b1] text-slate-800"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Brand</label>
              <input
                type="text"
                placeholder="e.g. Sony, Apple, Nike"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5e35b1]/20 focus:border-[#5e35b1] text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Price ($) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                required
                placeholder="299.99"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5e35b1]/20 focus:border-[#5e35b1] text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Original Price ($)</label>
              <input
                type="number"
                step="0.01"
                placeholder="349.99"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5e35b1]/20 focus:border-[#5e35b1] text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Initial Stock</label>
              <input
                type="number"
                placeholder="25"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5e35b1]/20 focus:border-[#5e35b1] text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Image URL</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5e35b1]/20 focus:border-[#5e35b1] text-slate-800"
            />
            {/* Presets */}
            <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1">
              <span className="text-[11px] text-slate-400 shrink-0">Quick presets:</span>
              {sampleImages.map((s) => (
                <button
                  type="button"
                  key={s.label}
                  onClick={() => setFormData({ ...formData, image: s.url })}
                  className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-slate-100 hover:bg-purple-100 hover:text-[#5e35b1] transition-colors whitespace-nowrap"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
            <textarea
              rows={3}
              placeholder="Brief overview of product features and highlights..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5e35b1]/20 focus:border-[#5e35b1] text-slate-800 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <Button variant="outline" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Create Product</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
