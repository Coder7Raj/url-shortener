import { create } from "zustand";
import qrApi from "../api/qr.api.js";

const useQrStore = create((set) => ({
  qrCode: null,
  isLoading: false,
  isGenerating: false,
  isRegenerating: false,
  isDeleting: false,
  isDownloading: false,

  error: null,

  // Get QR

  fetchQr: async (urlId) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const result = await qrApi.get(urlId);

      set({
        qrCode: result.data?.qrCode || null,
        isLoading: false,
        error: null,
      });

      return {
        success: true,
        data: result.data,
      };
    } catch (error) {
      const status = error.response?.status;

      if (status === 404) {
        set({
          qrCode: null,
          isLoading: false,
          error: null,
        });

        return {
          success: false,
          notFound: true,
        };
      }

      const message =
        error.response?.data?.message || "Failed to fetch QR code.";

      set({
        qrCode: null,
        isLoading: false,
        error: message,
      });

      return {
        success: false,
        message,
      };
    }
  },

  // Generate QR

  generateQr: async (urlId) => {
    set({
      isGenerating: true,
      error: null,
    });

    try {
      const result = await qrApi.generate(urlId);

      set({
        qrCode: result.data?.qrCode || null,
        isGenerating: false,
        error: null,
      });

      return {
        success: true,
        data: result.data,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to generate QR code.";

      set({
        isGenerating: false,
        error: message,
      });

      return {
        success: false,
        message,
      };
    }
  },

  // Regenerate QR

  regenerateQr: async (urlId) => {
    set({
      isRegenerating: true,
      error: null,
    });

    try {
      const result = await qrApi.regenerate(urlId);

      set({
        qrCode: result.data?.qrCode || null,
        isRegenerating: false,
        error: null,
      });

      return {
        success: true,
        data: result.data,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to regenerate QR code.";

      set({
        isRegenerating: false,
        error: message,
      });

      return {
        success: false,
        message,
      };
    }
  },

  // Delete QR

  deleteQr: async (urlId) => {
    set({
      isDeleting: true,
      error: null,
    });

    try {
      const result = await qrApi.delete(urlId);

      set({
        qrCode: null,
        isDeleting: false,
        error: null,
      });

      return {
        success: true,
        data: result.data,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete QR code.";

      set({
        isDeleting: false,
        error: message,
      });

      return {
        success: false,
        message,
      };
    }
  },

  downloadQr: async (urlId) => {
    set({
      isDownloading: true,
      error: null,
    });

    try {
      const result = await qrApi.download(urlId);

      const downloadUrl = result.data?.downloadUrl;

      if (!downloadUrl) {
        throw new Error("Download URL not found");
      }

      // Create temporary download link
      const link = document.createElement("a");

      link.href = downloadUrl;
      link.download = `qr-code-${urlId}.png`;
      link.target = "_blank";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      set({
        isDownloading: false,
      });

      return {
        success: true,
        data: result.data,
      };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to download QR code";

      set({
        isDownloading: false,
        error: message,
      });

      return {
        success: false,
        message,
      };
    }
  },

  clearQr: () => {
    set({
      qrCode: null,
      error: null,
      isLoading: false,
      isGenerating: false,
      isRegenerating: false,
      isDeleting: false,
      isDownloading: false,
    });
  },

  clearError: () => {
    set({
      error: null,
    });
  },
}));

export default useQrStore;
