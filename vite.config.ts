import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
  },
  optimizeDeps: {
    include: [
      "@emotion/react",
      "@emotion/styled",
      "@mui/material",
      "@mui/material/Tooltip",
      // FUCKING BIG BUG
      // https://github.com/vitejs/vite/issues/12423
      // https://github.com/mui/material-ui/issues/32727
    ],
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
});
