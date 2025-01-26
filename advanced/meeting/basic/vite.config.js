import { defineConfig } from "vite";

export default defineConfig(({}) => {
  return {
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    server: {
      host: "0.0.0.0",
      port: 3000,
      proxy: {},
    },
  };
});
