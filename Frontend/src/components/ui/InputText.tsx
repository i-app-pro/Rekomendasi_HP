import React from 'react';

interface InputTextProps {
  label: string;
  nama: string;
  error?: string;
  register: any;
  placeholder?: string; 
}

export const InputText: React.FC<InputTextProps> = ({ label, nama, error, register, placeholder }) => {
  return (
    <div className="flex flex-col gap-2 mb-4 w-full">
      {/* Label besar adaptif: text-xl di mobile, text-2xl di desktop */}
      <label className="text-xl md:text-2xl font-semibold text-black tracking-wide pl-1 select-none">
        {label}
      </label>
      <input 
        type="text" 
        {...register(nama)}
        placeholder={placeholder || ""}
        className={`w-full px-4 py-3 md:py-3.5 text-base md:text-lg bg-white rounded-xl outline-none transition-all duration-200 border
          ${error 
            ? "border-red-600 focus:ring-1 focus:ring-red-600 bg-red-50/30" 
            : "border-[#e53935] focus:ring-1 focus:ring-[#e53935]"
          }`} 
      />
      {error && <p className="text-red-600 text-xs md:text-sm font-semibold mt-0.5 pl-1">{error}</p>}
    </div>
  );
};

export default InputText;