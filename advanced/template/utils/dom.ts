/** 将元素全屏模式化 */
export const fullscreenElement = (element: HTMLElement) => {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
};

export const checkFullScreen = (dom = document) =>
  !!dom.fullscreenElement || !!dom.webkitFullscreenElement;

export const exitFullScreen = (dom = document) => {
  console.log(checkFullScreen(dom));
  if (!checkFullScreen(dom)) return;
  if (dom.exitFullscreen) {
    dom.exitFullscreen();
  } else if (dom.msExitFullscreen) {
    dom.msExitFullscreen();
  } else if (dom.mozCancelFullScreen) {
    dom.mozCancelFullScreen();
  } else if (dom.webkitCancelFullScreen) {
    dom.webkitCancelFullScreen();
  }
};

export function isChild(parent: Node, child: Node) {
  while (child != parent) {
    if (!child.parentNode) return false;
    child = child.parentNode;
  }
  return true;
}
