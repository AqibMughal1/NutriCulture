"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ManualLoadingBar } from "@/components/global-loading-bar";

interface LoadingContextType {
  loading: boolean;
  progress: number;
  startLoading: () => void;
  setProgress: (progress: number) => void;
  finishLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const startLoading = () => {
    setLoading(true);
    setProgress(0);
  };

  const finishLoading = () => {
    setProgress(100);
    setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 200);
  };

  return (
    <LoadingContext.Provider
      value={{
        loading,
        progress,
        startLoading,
        setProgress,
        finishLoading,
      }}
    >
      <ManualLoadingBar loading={loading} progress={progress} />
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

// Utility hook for async operations
export const useAsyncLoading = () => {
  const { startLoading, finishLoading, setProgress } = useLoading();

  const withLoading = async <T,>(
    asyncFn: () => Promise<T>,
    onProgress?: (progress: number) => void
  ): Promise<T> => {
    startLoading();
    
    try {
      // Simulate progress if no custom progress handler
      if (!onProgress) {
        const progressInterval = setInterval(() => {
          setProgress((prev) => Math.min(prev + Math.random() * 10 + 5, 90));
        }, 100);
        
        const result = await asyncFn();
        clearInterval(progressInterval);
        finishLoading();
        return result;
      } else {
        const result = await asyncFn();
        finishLoading();
        return result;
      }
    } catch (error) {
      finishLoading();
      throw error;
    }
  };

  return { withLoading };
}; 