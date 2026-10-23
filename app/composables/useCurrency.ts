export const useCurrency = () => {
  const formatRupiah = (amount: number | null | undefined): string => {
    if (amount === null || amount === undefined) return 'Dikonfirmasi Penjual';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount).replace('IDR', 'Rp');
  };

  return {
    formatRupiah
  };
};
