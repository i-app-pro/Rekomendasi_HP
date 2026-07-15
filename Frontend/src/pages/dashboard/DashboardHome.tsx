import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../api/users';
import { getBrands } from '../../api/brands';
import { getProducts } from '../../api/products';
import { getCriteria, getAllCriteriaValues } from '../../api/criteria';
import { getFounders } from '../../api/founders';
import { getSessions } from '../../api/sessions';

interface SummaryCard {
  label: string;
  path: string;
  count: number | null; // null = gagal/belum dimuat
}

const CARD_DEFS: { label: string; path: string; loader: () => Promise<number> }[] = [
  { label: 'User', path: '/dashboard/user', loader: async () => (await getUsers()).length },
  { label: 'Brand', path: '/dashboard/brand', loader: async () => (await getBrands()).length },
  { label: 'Product', path: '/dashboard/product', loader: async () => (await getProducts()).length },
  { label: 'Sesi Perhitungan SPK', path: '/dashboard/pembobotan', loader: async () => (await getSessions()).length },
  { label: 'Criteria', path: '/dashboard/criteria', loader: async () => (await getCriteria()).length },
  { label: 'Criteria Value', path: '/dashboard/criteria-value', loader: async () => (await getAllCriteriaValues()).length },
  { label: 'Founder', path: '/dashboard/founder', loader: async () => (await getFounders()).length },
];

// Halaman overview admin (index "/dashboard"). Menampilkan jumlah data riil per resource,
// diambil langsung dari backend (bukan dummy lagi). Tiap kartu bisa diklik untuk
// langsung berpindah ke halaman CRUD resource terkait.
export default function DashboardHome() {
  const navigate = useNavigate();
  const [cards, setCards] = useState<SummaryCard[]>(
    CARD_DEFS.map((c) => ({ label: c.label, path: c.path, count: null }))
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      setIsLoading(true);
      const results = await Promise.allSettled(CARD_DEFS.map((c) => c.loader()));
      if (!mounted) return;

      setCards(
        CARD_DEFS.map((c, i) => ({
          label: c.label,
          path: c.path,
          count: results[i].status === 'fulfilled' ? (results[i] as PromiseFulfilledResult<number>).value : null,
        }))
      );
      setIsLoading(false);
    })();

    return () => { mounted = false; };
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
      {cards.map((item) => (
        <button
          key={item.label}
          onClick={() => navigate(item.path)}
          className="bg-white border-2 md:border-4 border-slate-500 rounded-xl md:rounded-2xl p-4 h-36 md:h-48 flex flex-col items-center justify-between shadow-sm hover:shadow-md hover:border-[#1e2530] transition-all text-left cursor-pointer"
        >
          <h3 className="font-black text-base md:text-lg mb-2 text-slate-700 self-start">{item.label}</h3>

          <div className="w-full flex-1 flex flex-col items-center justify-center bg-slate-50 rounded-lg border border-slate-200">
            {isLoading ? (
              <span className="text-sm font-medium text-slate-400">Memuat...</span>
            ) : item.count === null ? (
              <span className="text-xs font-bold text-red-500">Gagal memuat</span>
            ) : (
              <span className="text-3xl md:text-4xl font-black text-[#1e2530]">{item.count}</span>
            )}
          </div>

          <span className="self-end text-xs font-bold text-slate-400 mt-2">Lihat detail &rarr;</span>
        </button>
      ))}
    </div>
  );
}
