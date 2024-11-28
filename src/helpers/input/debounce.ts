type debounceFunction = (...args: string[]) => void
export const debounce = (func: debounceFunction, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;

  return function executedFunction(...args: string[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
