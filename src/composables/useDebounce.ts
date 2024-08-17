export function useDebounce<T extends (...args: any[]) => any>(func: T, delay: number) {
  let timeout: ReturnType<typeof setTimeout>;

  const debouncedFunction = (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };

  return debouncedFunction;
}
