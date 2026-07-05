import React from 'react';

interface SliderItemProps {
  id: string;
  label: string;
  value: number;
  onChange: (id: string, value: number) => void;
}

export const SliderBobot: React.FC<SliderItemProps> = ({ id, label, value, onChange }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full font-mono">
      <div className="flex justify-between items-center text-sm font-semibold text-slate-700">
        <span className="uppercase tracking-wider">⚡ {label}</span>
        <span className="text-black font-black bg-white border border-black px-1.5 shadow-[1px_1px_0px_rgba(0,0,0,1)]">
          {value}
        </span>
      </div>
      <div className="relative flex items-center">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(id, Number(e.target.value))}
          className="w-full h-2 bg-stone-200 border border-black appearance-none cursor-pointer accent-black"
        />
      </div>
      {/* Efek Garis Merah Brutalism di bawahnya */}
      <div 
        className="h-1 bg-[#e53935] border-x border-b border-black rounded-b-sm transition-all duration-75" 
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

export default SliderBobot;