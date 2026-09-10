import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Home,
  ChevronRight,
  Plus,
  ArrowLeft,
  Trash2,
  Star,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { Footer } from '../components/layout/Footer';
import { useProducts } from '../context/ProductContext';
import { AddProductModal } from '../components/products/AddProductModal';
import { DeleteProductModal } from '../components/products/DeleteProductModal';

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const {
    products,
    selectedProductId,
    setSelectedProductId,
    addProduct,
    deleteProduct,
    toastMessage,
    showToast,
  } = useProducts();

  // Determine current active product
  const activeProduct =
    (id ? products.find((p) => p.id === id) : null) ||
    products.find((p) => p.id === selectedProductId) ||
    products[0];

  const [activeImage, setActiveImage] = useState<string>(activeProduct?.image || '');
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  useEffect(() => {
    if (activeProduct) {
      setActiveImage(activeProduct.image);
      setSelectedColorIndex(0);
      setQuantity(1);
      setSelectedProductId(activeProduct.id);
    }
  }, [activeProduct?.id]);

  if (!activeProduct) {
    return (
      <div className="p-8 text-center space-y-4 max-w-md mx-auto my-12 bg-white rounded-2xl border border-slate-100 shadow-xs">
        <p className="text-sm font-semibold text-slate-700">No product found or catalog is empty.</p>
        <button
          onClick={() => navigate('/e-commerce/products')}
          className="px-4 py-2 bg-[#5e35b1] text-white text-xs font-semibold rounded-xl"
        >
          Go to All Products
        </button>
      </div>
    );
  }

  const handleDeleteConfirm = () => {
    if (deleteTargetId) {
      deleteProduct(deleteTargetId);
      setDeleteTargetId(null);
      navigate('/e-commerce/products');
    }
  };

  const colors = activeProduct.colors || [
    { name: 'Obsidian Black', hex: '#1e293b' },
    { name: 'Berry Purple', hex: '#5e35b1' },
    { name: 'Silver Slate', hex: '#94a3b8' },
  ];

  const gallery = activeProduct.gallery || [activeProduct.image];

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1600px] mx-auto transition-all">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Product Details</h1>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-1">
            <Home className="w-3.5 h-3.5 text-[#5e35b1]" />
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-600">E-commerce</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#5e35b1] font-semibold">Product Details</span>
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5">
          {/* View Toggle */}
          <div className="flex items-center bg-white border border-slate-200 p-1 rounded-xl shadow-xs">
            <button
              onClick={() => navigate('/e-commerce/products')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
            >
              All Products ({products.length})
            </button>
            <button
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#ede7f6] text-[#5e35b1] transition-all cursor-pointer"
            >
              Product Details
            </button>
          </div>

          {/* Add Product Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-[#1e88e5] hover:bg-[#1565c0] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Subheader Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/e-commerce/products')}
            className="p-2 rounded-xl text-slate-500 hover:text-[#5e35b1] hover:bg-[#ede7f6] transition-all cursor-pointer"
            title="Back to Products List"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <p className="text-xs font-medium text-slate-400">SKU: {activeProduct.sku}</p>
            <h2 className="text-sm font-bold text-slate-800 line-clamp-1">{activeProduct.name}</h2>
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
          <button
            onClick={() => setDeleteTargetId(activeProduct.id)}
            className="px-3.5 py-2 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 hover:border-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            title="Delete this product"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Product</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-[#5e35b1] hover:bg-[#4527a0] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Another</span>
          </button>
        </div>
      </div>

      {/* Main Details Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden p-5 sm:p-7">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Product Image & Gallery */}
          <div className="lg:col-span-5 space-y-4">
            <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center p-4 relative group">
              <img
                src={activeImage || activeProduct.image}
                alt={activeProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
              />
              <span
                className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full shadow-xs ${
                  activeProduct.status === 'In Stock'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : activeProduct.status === 'Low Stock'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}
              >
                {activeProduct.status} ({activeProduct.stock} left)
              </span>
            </div>

            {/* Thumbnails */}
            {gallery.length > 0 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 rounded-xl border-2 p-1 bg-slate-50 shrink-0 transition-all cursor-pointer ${
                      activeImage === img
                        ? 'border-[#5e35b1] shadow-xs'
                        : 'border-slate-100 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumb ${idx}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain mix-blend-multiply rounded-lg"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info & Buy Box */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#5e35b1] bg-[#ede7f6] px-2.5 py-1 rounded-lg">
                {activeProduct.category}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Brand: <strong className="text-slate-800">{activeProduct.brand}</strong>
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {activeProduct.name}
            </h1>

            {/* Ratings */}
            <div className="flex items-center gap-3">
              <div className="flex items-center text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.floor(activeProduct.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-700">
                {activeProduct.rating.toFixed(1)}
              </span>
              <span className="text-xs text-slate-400">
                ({activeProduct.reviewsCount ?? 1} customer reviews)
              </span>
            </div>

            {/* Price & Discount */}
            <div className="flex items-baseline gap-3 py-2 border-y border-slate-100">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                ${activeProduct.price.toFixed(2)}
              </span>
              {activeProduct.originalPrice && activeProduct.originalPrice > activeProduct.price && (
                <>
                  <span className="text-sm font-medium text-slate-400 line-through">
                    ${activeProduct.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    Save ${(activeProduct.originalPrice - activeProduct.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Colors */}
            {colors.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-700">
                  Color:{' '}
                  <span className="font-normal text-slate-500">
                    {colors[selectedColorIndex]?.name}
                  </span>
                </p>
                <div className="flex items-center gap-2.5">
                  {colors.map((col, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                        selectedColorIndex === idx
                          ? 'ring-2 ring-offset-2 ring-[#5e35b1]'
                          : 'opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    >
                      {selectedColorIndex === idx && (
                        <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description Preview */}
            <p className="text-xs text-slate-600 leading-relaxed">{activeProduct.description}</p>

            {/* Quantity & CTA */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-slate-700 font-bold hover:bg-slate-100 shadow-xs cursor-pointer"
                >
                  -
                </button>
                <span className="w-9 text-center text-xs font-bold text-slate-800">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-slate-700 font-bold hover:bg-slate-100 shadow-xs cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                onClick={() =>
                  showToast(`Added ${quantity} item(s) of "${activeProduct.name}" to cart.`)
                }
                className="px-5 py-2.5 rounded-xl bg-[#5e35b1] hover:bg-[#4527a0] text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <span>Add to Cart</span>
              </button>

              <button
                onClick={() => setDeleteTargetId(activeProduct.id)}
                className="px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                title="Delete product"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-[11px] text-slate-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#1e88e5]" />
                <span>Free Delivery across country</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#5e35b1]" />
                <span>1 Year Official Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-emerald-600" />
                <span>30-Day Hassle Free Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Details Tabs */}
        <div className="mt-10 border-t border-slate-100 pt-6">
          <div className="flex items-center gap-4 sm:gap-6 border-b border-slate-100 pb-3 overflow-x-auto whitespace-nowrap">
            <button
              onClick={() => setActiveTab('description')}
              className={`text-xs font-bold pb-1 transition-all cursor-pointer ${
                activeTab === 'description'
                  ? 'text-[#5e35b1] border-b-2 border-[#5e35b1]'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              Features & Details
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`text-xs font-bold pb-1 transition-all cursor-pointer ${
                activeTab === 'specifications'
                  ? 'text-[#5e35b1] border-b-2 border-[#5e35b1]'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`text-xs font-bold pb-1 transition-all cursor-pointer ${
                activeTab === 'reviews'
                  ? 'text-[#5e35b1] border-b-2 border-[#5e35b1]'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              Reviews ({activeProduct.reviewsCount ?? 1})
            </button>
          </div>

          {/* Tab 1: Description & Key Highlights */}
          {activeTab === 'description' && (
            <div className="pt-4 space-y-4 text-xs text-slate-600">
              <p>{activeProduct.description}</p>
              {activeProduct.features && activeProduct.features.length > 0 && (
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Key Highlights:</h4>
                  <ul className="space-y-1.5 list-disc list-inside text-slate-600">
                    {activeProduct.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Specifications Table */}
          {activeTab === 'specifications' && (
            <div className="pt-4 overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse max-w-2xl">
                <tbody className="divide-y divide-slate-100">
                  {(activeProduct.specifications || []).map((spec, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-2.5 pr-4 font-semibold text-slate-500 w-1/3">
                        {spec.label}
                      </td>
                      <td className="py-2.5 pl-4 font-medium text-slate-800">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab 3: Reviews */}
          {activeTab === 'reviews' && (
            <div className="pt-4 space-y-4">
              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl max-w-md">
                <span className="text-3xl font-extrabold text-[#5e35b1]">
                  {activeProduct.rating.toFixed(1)}
                </span>
                <div>
                  <div className="flex items-center text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Based on {activeProduct.reviewsCount ?? 1} verified reviews
                  </p>
                </div>
              </div>

              <div className="space-y-3 max-w-xl text-xs">
                <div className="p-3 border border-slate-100 rounded-xl bg-white space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">Alexander Hayes</span>
                    <span className="text-[10px] text-slate-400">2 days ago</span>
                  </div>
                  <p className="text-slate-600">
                    Exceeded expectations! Build quality is top notch and the delivery was fast.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={(newP) => {
          const newId = addProduct(newP);
          navigate(`/e-commerce/product-details/${newId}`);
        }}
      />

      {/* Delete Product Modal */}
      <DeleteProductModal
        isOpen={!!deleteTargetId}
        productName={activeProduct.name}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleDeleteConfirm}
      />

      <Footer />
    </div>
  );
};
