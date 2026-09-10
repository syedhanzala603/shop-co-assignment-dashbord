import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-4 py-2 rounded-xl gap-2',
    lg: 'text-base px-5 py-2.5 rounded-xl gap-2.5',
    icon: 'w-8 h-8 p-1.5 rounded-lg text-sm',
  }[size];

  const variantClasses = {
    primary: 'bg-[#5e35b1] text-white hover:bg-[#4527a0] shadow-xs active:scale-[0.98]',
    secondary: 'bg-[#ede7f6] text-[#5e35b1] hover:bg-[#d1c4e9]',
    outline: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-xs',
    ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
    icon: 'text-slate-500 hover:bg-slate-100 hover:text-slate-800',
    danger: 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-100',
  }[variant];

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
