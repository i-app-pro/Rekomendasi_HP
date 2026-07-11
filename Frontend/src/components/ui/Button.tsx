import React from 'react';

interface ButtonProps { 
  label: string; 
  variant?: 'primary' | 'outline'; 
  type?: 'button' | 'submit' | 'reset'; 
  className?: string; 
  onClick?: () => void;
  disabled?: boolean;
} 
 
export const Button: React.FC<ButtonProps> = ({ 
  label, 
  variant = 'primary', 
  type = 'button', 
  className = '', 
  onClick, 
  disabled = false 
}) => { 

  // Menggunakan rounded-2xl dan padding besar agar mirip tombol REGISTRASI tebal di gambar 2
  const baseStyle = "w-full md:w-auto px-10 md:px-16 py-3.5 md:py-4 rounded-2xl font-bold text-xl md:text-2xl uppercase tracking-wide transition-all duration-200 text-center inline-flex items-center justify-center select-none active:scale-98 shadow-md"; 
  
  const variants = { 
    primary: disabled 
      ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none" 
      : "bg-[#d62828] text-white hover:bg-[#b71c1c] hover:shadow-lg cursor-pointer", 
    
    outline: disabled
      ? "border-2 border-gray-300 text-gray-400 cursor-not-allowed shadow-none"
      : "border-2 border-[#d62828] text-[#d62828] hover:bg-red-50 cursor-pointer"
  }; 
 
  return ( 
    <button 
      type={type} 
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    > 
      {label} 
    </button> 
  ); 
}; 

export default Button;