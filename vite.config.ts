// https://vitejs.dev/config/
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入vuejsx支持插件
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
// 引入 svg 所需要用到的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// mock 插件提供的方法
import { viteMockServe } from 'vite-plugin-mock'
// 引入setup 设置组件名插件
import vueSetupExtend from 'vite-plugin-vue-setup-extend'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    // 前端跨域代理
    server: {
      host: '127.0.0.1',
      port: '5050',
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_SERVER_URL,
          // 支持跨域
          changeOrigin: true,
          // todo 用全局环境变量替换掉!!!
          rewrite: (path) => path.replace(/^\/dev-api/, ''),
        },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
        // 指定svg图标的格式
        symbolId: 'icon-[name]',
      }),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve', // 保证开发阶段可以使用mock接口
      }),
      // 处理使用setup无法设置name问题
      vueSetupExtend(),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'), // 配置相对路径别名使用 @ 来代替 src
        '#': path.resolve('/types/'),
      },
    },
    //scss 全局变量配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/global.scss";',
        },
      },
    },
  }
})
