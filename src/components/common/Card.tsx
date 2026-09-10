import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'gradient-purple' | 'gradient-blue' | 'solid-blue' | 'subtle';
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  id,
  style,
}) => {
  const variantStyles = {
    default: 'bg-white border border-slate-100 shadow-xs text-slate-800',
    'gradient-purple': 'bg-gradient-to-br from-[#5e35b1] to-[#4527a0] text-white shadow-xs overflow-hidden relative',
    'gradient-blue': 'bg-gradient-to-br from-[#1e88e5] to-[#1565c0] text-white shadow-xs overflow-hidden relative',
    'solid-blue': 'bg-[#1e88e5] text-white shadow-xs overflow-hidden relative',
    subtle: 'bg-[#ede7f6] text-slate-800 relative overflow-hidden',
  }[variant];

  return (
    <div
      id={id}
      style={style}
      className={`rounded-2xl transition-all duration-200 ${variantStyles} ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}> = ({ title, subtitle, action, className = '' }) => (
  <div className={`flex items-center justify-between pb-4 border-b border-slate-100 ${className}`}>
    <div>
      {title && (typeof title === 'string' ? <h3 className="font-bold text-slate-800 text-base">{title}</h3> : title)}
      {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
    </div>
    {action && <div className="flex items-center gap-2">{action}</div>}
  </div>
);

export const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`p-5 sm:p-6 ${className}`}>{children}</div>
);
