export function getDefaultColor(relyString: string) {
  const themeColor = {
    defaultCoverColor: ["#eea5a5", "#f5cd83", "#9abaee", "#74c5e6", "#54d1c0"],
  };
  let number;
  number = relyString.match(/(\d|[a-f]|[A-F])/g)?.join("") || "0";
  if (number) {
    return themeColor.defaultCoverColor[
      parseInt(number, 16) % themeColor.defaultCoverColor.length
    ];
  } else {
    return "#ccc";
  }
}

/**
 * 获取指定步长下的 时分 数据列表
 * @param delta unit: minute
 * @returns 格式为 【时:分】 的字符串数组
 */
export default function getTimeGap(delta: number) {
  const f = (n: any) => `${n}`.padStart(2, '0');
  const result: string[] = [],
    date = new Date();
  date.setHours(0);
  date.setMinutes(delta);
  const day = date.getDate();
  while (date.getDate() === day) {
    const h = date.getHours();
    const m = date.getMinutes();
    result.push(`${f(h)}:${f(m)}`);
    date.setMinutes(m + delta);
  }
  result.unshift('00:00');
  return result;
}
