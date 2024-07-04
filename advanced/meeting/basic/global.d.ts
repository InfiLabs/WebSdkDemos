declare module '*.less' {
    const resource: { [key: string]: string };
    export = resource;
  }
  
  declare module '*.css' {
    const resource: { [key: string]: string };
    export = resource;
  }
  
  declare module '*.png';
  declare module '*.jpg';
  declare module '*.gif';
  declare module '*.svg';