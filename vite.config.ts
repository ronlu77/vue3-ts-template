// https://vitejs.dev/config/
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// 引入 svg 所需要用到的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// mock 插件提供的方法
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve', // 保证开发阶段可以使用mock接口
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'), // 配置相对路径别名使用 @ 来代替 src
      },
    },
    //scss 全局变量配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
  }
})
