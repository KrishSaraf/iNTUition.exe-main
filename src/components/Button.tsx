import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  disabled = false,
  ...props 
}: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-colors duration-200';
  const variants = {
    primary: `bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white hover:opacity-90 ${
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    }`,
    secondary: 'bg-blue-50 text-blue-700 hover:bg-blue-100'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}