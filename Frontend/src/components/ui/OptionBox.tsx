// Struktur objek untuk tiap opsi item listbox
export interface OptionItem<T extends string> {
  value: T;
  label: string;
}

interface OptionBoxProps<T extends string> {
  label?: string;                     // Label judul filter (bisa diganti-ganti, default: Filter)
  options: OptionItem<T>[];           // List data opsi yang dikirim dari file luar
  currentValue: T;                    // Nilai yang aktif saat ini
  onValueChange: (value: T) => void;  // Fungsi callback ketika pilihan berubah
  placeholder?: string;               // Teks baris paling atas
}

export const OptionBox = <T extends string>({
  label = 'Filter:',
  options,
  currentValue,
  onValueChange,
  placeholder = '-- PILIH PILIHAN --',
}: OptionBoxProps<T>) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 font-mono">
      {/* Label Box */}
      <span className="text-black font-bold uppercase tracking-wider text-xs bg-yellow-300 border-2 border-black px-2 py-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        {label}
      </span>
      
      {/* Dropdown Select Box */}
      <select
        value={currentValue}
        onChange={(e) => onValueChange(e.target.value as T)}
        className="w-full sm:w-auto bg-white border-4 border-black px-3 py-1.5 font-bold uppercase text-xs tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
      >
        <option value="">{placeholder}</option>
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OptionBox;