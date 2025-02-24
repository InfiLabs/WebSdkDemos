export const MIN_WIDTH = 1280;
export const GAP = 20;

/**
 * 计算卡片宽度
 * @param minCardWidth 最小卡片宽度
 * @param bodyWidth 父容器宽度
 * @param gap 间距
 * @param windowOffset 基于窗口偏移
 * @param minBodyWidth 最小窗口大小
 * @returns
 */
export const getCardWidth = (
  minCardWidth: number,
  bodyWidth?: number,
  gap = GAP,
  windowOffset = 0,
  minBodyWidth = 0,
) => {
  const realBodyWidth = Math.max(
    (bodyWidth || window.innerWidth) - windowOffset,
    minBodyWidth - windowOffset,
  );

  const count = Math.floor((realBodyWidth + gap) / (minCardWidth + gap));

  let maxItems = count;

  while (maxItems > 0 && maxItems * minCardWidth + (maxItems - 1) * gap > realBodyWidth) {
    maxItems--;
  }

  const totalGap = (maxItems - 1) * gap;
  const availableWidth = realBodyWidth - totalGap;

  return availableWidth / maxItems;
};
