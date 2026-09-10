import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { Button } from '../common/Button';

interface DeleteProductModalProps {
  isOpen: boolean;
  productName?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  isOpen,
  productName,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center border border-slate-100 animate-in zoom-in-95 duration-200">
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-100">
          <Trash2 className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900 mb-1">Delete Product</h3>
        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          Are you sure you want to delete{' '}
          <strong className="text-slate-700">"{productName || 'this product'}"</strong>? This
          action cannot be undone.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};
