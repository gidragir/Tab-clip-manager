/** @type {import('vite').UserConfig} */

import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

export default {
  plugins: [tsconfigPaths(), react()],
  clearScreen: false,
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
}
