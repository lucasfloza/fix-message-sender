import { useState } from 'react';
import { AxiosError } from 'axios';

/**
 * Hook for handling async operations with loading and error states
 */
export function useAsync<T, Args extends unknown[]>() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (
    asyncFunction: (...args: Args) => Promise<T>,
    ...args: Args
  ): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await asyncFunction(...args);
      return result;
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.message ||
        'An error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
  };

  return { execute, loading, error, reset };
}
