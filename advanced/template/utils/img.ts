/** 获取svg stirng */
export const getSvgXMLText = (url: string) => {
  return new Promise<string | null>((resolve) => {
    fetch(url)
      .then((res) => res.text())
      .then((svgStr) => {
        resolve(svgStr);
      })
      .catch((e) => {
        resolve(null);
      });
  });
};
