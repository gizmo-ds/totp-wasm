import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    svgLoader(),
    AutoImport({
      resolvers: [NaiveUiResolver()],
      dts: path.resolve("src/auto-imports.d.ts"),
    }),
    Components({
      resolvers: [NaiveUiResolver()],
      dts: path.resolve("src/components.d.ts"),
    }),
  ],
});
