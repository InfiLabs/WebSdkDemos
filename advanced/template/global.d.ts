declare module "*.less" {
  const resource: { [key: string]: string };
  export = resource;
}

declare module "*.css" {
  const resource: { [key: string]: string };
  export = resource;
}

declare module "*.png";
declare module "*.jpg";
declare module "*.gif";
declare module "*.svg";

interface HTMLElement {
  msRequestFullscreen?(): void;
  mozRequestFullScreen?(): void;
  webkitRequestFullScreen?(): void;
}

interface Document {
  msExitFullscreen?(): void;
  mozCancelFullScreen?(): void;
  webkitCancelFullScreen?(): void;
  /** ref: https://developer.mozilla.org/en-US/docs/Web/API/Document/fullscreenElement */
  webkitFullscreenElement: Element | null;
}

declare type PageParams = {
  pageIndex: number;
  pageSize: number;
};

declare type TableResponse<T = undefined> = {
  total: number;
  list: T[];
};
