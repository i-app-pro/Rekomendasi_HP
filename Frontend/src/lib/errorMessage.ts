// Ambil pesan error yang enak dibaca dari AxiosError (fallback ke pesan default).
export function getErrorMessage(err: any, fallback: string): string {
  return err?.response?.data?.message || fallback;
}
