export const deviceInfo = {
  isAndroid: false,
  mobile: false,
  isIOS: false,
  isPad: false,
  isPhone: false,
  firefox: false,
  safari: false,
  chrome: false,
  browserVersion: "",
  isMac: false,
  isWindows: false,
  isTablet: false,
  desktop: false,
  isTouchSupported: false,
  isWeixin: false,
};

const ua = typeof navigator !== "undefined" ? navigator.userAgent || "" : "";
if (ua.indexOf("Mobile") >= 0) {
  deviceInfo.mobile = true;
  deviceInfo.isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  deviceInfo.isPad = !!ua.match(/Pad\b/i); //匹配pad端
}
if (ua.indexOf("Android") >= 0) {
  deviceInfo.mobile = true;
}
deviceInfo.chrome = ua.indexOf("Chrome") > -1 || ua.indexOf("CriOS") > -1;
deviceInfo.safari = /safari|applewebkit/i.test(ua) && !deviceInfo.chrome;

const windowsphone = /windows phone/i.test(ua);
deviceInfo.isWindows =
  !deviceInfo.mobile && !windowsphone && /windows/i.test(ua);

deviceInfo.isAndroid = /(?:Android)/.test(ua);
deviceInfo.isMac = !deviceInfo.mobile && /macintosh/i.test(ua);
deviceInfo.firefox = /firefox|fxios/i.test(ua);
deviceInfo.isTablet =
  /(?:iPad|PlayBook)/.test(ua) ||
  (deviceInfo.isAndroid && !/(?:Mobile)/.test(ua)) ||
  (deviceInfo.firefox && /(?:Tablet)/.test(ua));

const checkOnTouchStart = "ontouchstart" in document;
const checkMaxTouchPoints =
  typeof navigator !== "undefined" && navigator.maxTouchPoints > 0;

// fix for iPadOS (safari on iPad with iPadOS sends mac ua)
if (deviceInfo.isMac && checkMaxTouchPoints) {
  deviceInfo.isMac = false;
  deviceInfo.mobile = true;
  deviceInfo.isTablet = true;
  deviceInfo.isIOS = true;
  deviceInfo.isPad = true;
}

function isMobileDevice() {
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const pixelRatio = window.devicePixelRatio;
  return pixelRatio > 1 && (screenWidth < 640 || screenHeight < 640);
}

deviceInfo.isPhone =
  !deviceInfo.isTablet && deviceInfo.mobile && isMobileDevice();
deviceInfo.desktop = !deviceInfo.mobile && !deviceInfo.isTablet;
deviceInfo.isTouchSupported = checkOnTouchStart || checkMaxTouchPoints;
deviceInfo.isWeixin = /micromessenger/i.test(ua);

export const supportScreenOriApi = screen?.orientation?.angle !== undefined;
