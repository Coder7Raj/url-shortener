import useQrStore from "../store/qr.store.js";

const useQr = () => {
  const qrCode = useQrStore((state) => state.qrCode);

  const isLoading = useQrStore((state) => state.isLoading);
  const isGenerating = useQrStore((state) => state.isGenerating);
  const isRegenerating = useQrStore((state) => state.isRegenerating);
  const isDeleting = useQrStore((state) => state.isDeleting);
  const isDownloading = useQrStore((state) => state.isDownloading);

  const error = useQrStore((state) => state.error);

  const fetchQr = useQrStore((state) => state.fetchQr);
  const generateQr = useQrStore((state) => state.generateQr);
  const regenerateQr = useQrStore((state) => state.regenerateQr);
  const deleteQr = useQrStore((state) => state.deleteQr);
  const downloadQr = useQrStore((state) => state.downloadQr);

  const clearQr = useQrStore((state) => state.clearQr);
  const clearError = useQrStore((state) => state.clearError);

  return {
    qrCode,

    isLoading,
    isGenerating,
    isRegenerating,
    isDeleting,
    isDownloading,

    error,

    fetchQr,
    generateQr,
    regenerateQr,
    deleteQr,
    downloadQr,

    clearQr,
    clearError,
  };
};

export default useQr;
