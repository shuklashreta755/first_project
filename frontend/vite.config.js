import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // proxy: {
    //   '/api': {
    //     target: 'https://first-project-a1ov.onrender.com',
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },
});
