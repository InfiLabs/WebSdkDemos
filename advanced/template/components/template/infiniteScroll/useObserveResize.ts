import { useEffect } from 'react';

export function useObserveResize(
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
  effects: any[] = [],
) {
  useEffect(() => {
    if (!ref.current) return;
    window.addEventListener('resize', callback);
    return () => {
      window.removeEventListener('resize', callback);
    };
  }, [ref.current, ...effects]);
}
