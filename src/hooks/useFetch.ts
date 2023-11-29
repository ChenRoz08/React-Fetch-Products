import { useEffect, useState } from "react";

export function useFetch<T>(apiRequest: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(true);

  useEffect(() => {
    apiRequest()
      .then((res) => {
        setData(res);
        setIsError(false);
      })
      .catch(() => {
        setData(null);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { data, isLoading, isError };
}
