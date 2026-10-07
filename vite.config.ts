import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";

import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import neon from "./neon-vite-plugin.ts";

const config = defineConfig({
  ssr: {
    // The ESM .js export lacks "type": "module"; bundle it for Netlify SSR.
    noExternal: ["use-sound"],
  },
  plugins: [
    devtools(),
    neon,
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart(),
    // See https://www.npmx.dev/package/@netlify/vite-plugin.
    netlify({
      dev: {
        edgeFunctions: {
          enabled: false,
        },
      },
    }),
    viteReact({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
  ],
});

export default config;
