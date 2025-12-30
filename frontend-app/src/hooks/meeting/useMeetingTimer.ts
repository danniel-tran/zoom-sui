import { useRef, useEffect, useState } from 'react';

/**
 * Custom hook for meeting elapsed time
 * Uses ref to avoid unnecessary re-renders, only updates display once per second
 */
export function useMeetingTimer() {
  const startTimeRef = useRef<number>(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setElapsedSeconds(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const reset = () => {
    startTimeRef.current = Date.now();
    setElapsedSeconds(0);
  };

  return { elapsedSeconds, reset };
}
