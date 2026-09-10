import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  Star,
  Trash2,
  Eye,
  Home,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { Footer } from '../components/layout/Footer';
import { useProducts } from '../context/ProductContext';
import { AddProductModal } from '../components/products/AddProductModal';
import { DeleteProductModal } from '../components/products/DeleteProductModal';

export const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    products,
    setSelectedProductId,
    addProduct,
    deleteProduct,
    toastMessage,
  } = useProducts();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const categories = [
    'All',
    'Audio',
    'Wearables',
    'Laptops',
    'Cameras',
    'Accessories',
    'Footwear',
  ];

  const targetDeleteProduct = products.find((p) => p.id === deleteTargetId);

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' ||
      p.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleDeleteConfirm = () => {
    if (deleteTargetId) {
      deleteProduct(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1600px] mx-auto transition-all">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Products</h1>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-1">
            <Home className="w-3.5 h-3.5 text-[#5e35b1]" />
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-600">E-commerce</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#5e35b1] font-semibold">Products</span>
          </div>
        </div>

        {/* View Toggle & Add Product */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5">
          <div className="flex items-center bg-white border border-slate-200 p-1 rounded-xl shadow-xs">
            <button
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#ede7f6] text-[#5e35b1] transition-all cursor-pointer"
            >
              All Products ({products.length})
            </button>
            <button
              onClick={() => {
                if (products.length > 0) {
                  setSelectedProductId(products[0].id);
                  navigate(`/e-commerce/product-details/${products[0].id}`);
                } else {
                  navigate('/e-commerce/product-details');
                }
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
            >
              Product Details
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-[#1e88e5] hover:bg-[#1565c0] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Filter Bar & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search products by name, brand, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-700 placeholder-slate-400"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-[#5e35b1] text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-xs">
          <p className="text-sm font-semibold text-slate-700">No products match your search or filter.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-3 text-xs font-semibold text-[#5e35b1] hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden flex flex-col hover:shadow-md transition-all duration-200 group"
            >
              {/* Product Image Container */}
              <div className="h-52 w-full bg-slate-50 p-4 relative overflow-hidden flex items-center justify-center border-b border-slate-50">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span
                  className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs ${
                    prod.status === 'In Stock'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : prod.status === 'Low Stock'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}
                >
                  {prod.status} ({prod.stock} left)
                </span>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#5e35b1] bg-[#ede7f6] px-2 py-0.5 rounded-md">
                      {prod.category}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">{prod.brand}</span>
                  </div>

                  <h3
                    onClick={() => {
                      setSelectedProductId(prod.id);
                      navigate(`/e-commerce/product-details/${prod.id}`);
                    }}
                    className="font-bold text-slate-800 text-sm line-clamp-2 mt-1 cursor-pointer hover:text-[#5e35b1] transition-colors"
                  >
                    {prod.name}
                  </h3>
                </div>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-1.5 text-xs">
                  <div className="flex items-center text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span className="font-bold text-slate-700">{prod.rating.toFixed(1)}</span>
                  <span className="text-slate-400 text-[11px]">
                    ({prod.reviewsCount ?? 1} reviews)
                  </span>
                </div>

                {/* Price & Actions */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-base font-extrabold text-slate-900">
                      ${prod.price.toFixed(2)}
                    </span>
                    {prod.originalPrice && prod.originalPrice > prod.price && (
                      <span className="text-xs text-slate-400 line-through ml-2">
                        ${prod.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setSelectedProductId(prod.id);
                        navigate(`/e-commerce/product-details/${prod.id}`);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-purple-50 text-[#5e35b1] hover:bg-[#5e35b1] hover:text-white text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                      title="View Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                    <button
                      onClick={() => setDeleteTargetId(prod.id)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={(newP) => {
          addProduct(newP);
        }}
      />

      {/* Delete Product Modal */}
      <DeleteProductModal
        isOpen={!!deleteTargetId}
        productName={targetDeleteProduct?.name}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleDeleteConfirm}
      />

      <Footer />
    </div>
  );
};
