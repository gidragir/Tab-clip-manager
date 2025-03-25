/** @type {import('vite').UserConfig} */

import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default {
  plugins: [tsconfigPaths(), react(), tailwindcss()],
  clearScreen: false,
}
