import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { join, resolve } from 'path'
import typescript from 'rollup-plugin-typescript2'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': join(__dirname, 'example/'),
    },
  },
  root: './example',
  plugins: [
    vue(),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
  ],
  optimizeDeps: {
    include: ['@ant-design/icons-vue'],
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'vuefer',
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'example/index.html'),
      },
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      plugins: [
        typescript({
          rollupCommonJSResolveHack: false,
          clean: true,
        }),
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
