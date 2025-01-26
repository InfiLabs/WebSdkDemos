import { type InfiWebsdkInstanceType } from '@plaso-infi/whiteboard-sdk';

declare global {
  declare module '*.module.less' {
    const classes: { [key: string]: string };
    export default classes;
  }
  interface Window {
    websdkIns: InfiWebsdkInstanceType;
  }
}
