// Format angka menjadi string mata uang Rupiah, 2500000 -> "Rp2.500.000"

export function formatRupiah(angka: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(angka);
}