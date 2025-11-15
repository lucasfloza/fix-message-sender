import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';

/**
 * Generic hook for API calls with loading and error states
 */
export function useApi<T>(
  apiFunction: () => Promise<T>,
  dependencies: unknown[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction();
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          const axiosError = err as AxiosError<{ message?: string }>;
          setError(
            axiosError.response?.data?.message ||
              axiosError.message ||
              'An error occurred'
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, loading, error, refetch: () => apiFunction() };
}
