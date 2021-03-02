import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
// import ts from 'rollup-plugin-typescript2'
import { defineConfig } from 'vite'
// const copyPlugin = copy({
//   targets: [{ src: 'example/**/*', dest: 'dist/example' }],
// })
// const tsPlugin = ts({
//   tsconfig: path.resolve(__dirname, 'tsconfig.json'),
//   tsconfigOverride: {
//     compilerOptions: {
//       declaration: true,
//       declarationMap: false,
//       skipLibCheck: true,
//     },
//     exclude: ['**/__tests__', '**/*.spec', 'example'],
//   },
//   clean: true,
//   abortOnError: false,
//   rollupCommonJSResolveHack: false,
// })
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '#': path.resolve(__dirname, 'example/src'),
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
    // include: ['@ant-design/icons-vue'],
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.ts'),
      name: 'vuefer',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      plugins: [],
      output: {
        dir: './dist',
        // // Provide global variables to use in the UMD build
        // // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
