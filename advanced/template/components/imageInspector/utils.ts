import { deviceInfo } from "../../utils/deviceInfo";

export const checkTouchpadScale = (e: WheelEvent) => {
  if (!e.metaKey && !e.ctrlKey) return false;
  if (deviceInfo.isWindows) {
    return (
      0 === (e as any).wheelDelta ||
      (0 !== e.deltaY && Math.abs(e.deltaY) < 100)
    );
  }
  return true;
};

export const checkTouchpad = (e: WheelEvent) => {
  if (deviceInfo.firefox && e.deltaMode !== WheelEvent.DOM_DELTA_LINE)
    return true;
  if (checkTouchpadScale(e)) {
    console.log("[checkTouchpad]", "pinch zoom. touchpad detected");
    return true;
  } else if (e.deltaX === 0 || e.shiftKey) {
    return false;
  }
  return true;
};
