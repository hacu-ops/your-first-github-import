import { useState, useEffect } from 'react';

export const useDataLoading = (delay: number = 600) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Pre-load phase - simulate data fetching
    const preloadTimer = setTimeout(() => {
      setIsLoading(false);
    }, delay * 0.7); // Faster initial load

    // Content reveal phase - coordinated animations
    const revealTimer = setTimeout(() => {
      setShowContent(true);
    }, delay);

    return () => {
      clearTimeout(preloadTimer);
      clearTimeout(revealTimer);
    };
  }, [delay]);

  return { isLoading, showContent };
};