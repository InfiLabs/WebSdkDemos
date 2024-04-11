import { defineConfig } from "vite";

export default defineConfig(({}) => {
  return {
    server: {
      host: "0.0.0.0",
      port: 3300,
      proxy: {},
    },
  };
});
