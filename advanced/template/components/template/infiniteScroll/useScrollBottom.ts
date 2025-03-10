import { useEffect, type RefObject } from 'react';

/**
 * 基于 wheel 事件而非 scroll 事件来探知用户滚动至底部的行为，即便 target 元素本身不能滚动，
 * 也可以使用这个 hook 来检测用户的滚动尝试
 */
export const useScrollBottom = (
  targetRef: RefObject<HTMLElement>,
  threshold: number,
  callback?: () => void,
) => {
  useEffect(() => {
    const handleScroll = (event: WheelEvent | TouchEvent) => {
      const target = targetRef.current;

      if (target) {
        const isScrolledToBottom =
          target.scrollHeight - target.scrollTop - target.clientHeight <= threshold;
        /**  对于 wheel 事件，仅当向下滚动时才触发回调 */
        if (event instanceof WheelEvent && event.deltaY > 0 && isScrolledToBottom) {
          callback?.();
        } else if (event instanceof TouchEvent && isScrolledToBottom) {
          /** 对于 touchmove 事件，直接检查是否滚动到底部 */
          callback?.();
        }
      }
    };

    const target = targetRef.current;
    if (target) {
      target.addEventListener('wheel', handleScroll);
      target.addEventListener('touchmove', handleScroll);
    }

    return () => {
      if (target) {
        target.removeEventListener('wheel', handleScroll);
        target.removeEventListener('touchmove', handleScroll);
      }
    };
  }, [targetRef, callback]);
};
