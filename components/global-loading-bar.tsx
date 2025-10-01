"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

export const GlobalLoadingBar = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;

    const startLoading = () => {
      setLoading(true);
      setProgress(0);
      
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 10 + 5;
        });
      }, 100);
    };

    const finishLoading = () => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 200);
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };

    // Start loading on path change
    startLoading();
    
    // Simulate loading completion after a short delay
    const timer = setTimeout(() => {
      finishLoading();
    }, 800);

    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
      clearTimeout(timer);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 h-1"
        >
          <div className="h-full bg-gradient-to-r from-transparent via-purple-100/20 to-transparent">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 shadow-lg"
              style={{
                boxShadow: "0 0 10px rgba(168, 85, 247, 0.5), 0 0 20px rgba(168, 85, 247, 0.3)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// For manual control of the loading bar
export const useGlobalLoading = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const startLoading = () => {
    setLoading(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.random() * 10 + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  };

  const finishLoading = () => {
    setProgress(100);
    setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 200);
  };

  return {
    loading,
    progress,
    startLoading,
    finishLoading,
  };
};

// Manual Loading Bar Component
export const ManualLoadingBar = ({ 
  loading, 
  progress 
}: { 
  loading: boolean; 
  progress: number; 
}) => {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 h-1"
        >
          <div className="h-full bg-gradient-to-r from-transparent via-purple-100/20 to-transparent">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 shadow-lg"
              style={{
                boxShadow: "0 0 10px rgba(168, 85, 247, 0.5), 0 0 20px rgba(168, 85, 247, 0.3)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 