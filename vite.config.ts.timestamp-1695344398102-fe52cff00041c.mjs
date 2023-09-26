// vite.config.ts
import { defineConfig, loadEnv } from "file:///E:/Codefiles/Code_Co/vue3-ts-template/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/Codefiles/Code_Co/vue3-ts-template/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import { createSvgIconsPlugin } from "file:///E:/Codefiles/Code_Co/vue3-ts-template/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { viteMockServe } from "file:///E:/Codefiles/Code_Co/vue3-ts-template/node_modules/vite-plugin-mock/dist/index.js";
console.log("git", process.env);
var vite_config_default = defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    // 前端跨域代理
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_SERVER_URL,
          // 支持跨域
          changeOrigin: true,
          // todo 用全局环境变量替换掉!!!
          rewrite: (path2) => path2.replace(/^\/dev-api/, "")
        }
      }
    },
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
        symbolId: "icon-[name]"
      }),
      viteMockServe({
        mockPath: "mock",
        localEnabled: command === "serve"
        // 保证开发阶段可以使用mock接口
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src")
        // 配置相对路径别名使用 @ 来代替 src
      }
    },
    //scss 全局变量配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";'
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxDb2RlZmlsZXNcXFxcQ29kZV9Db1xcXFx2dWUzLXRzLXRlbXBsYXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxDb2RlZmlsZXNcXFxcQ29kZV9Db1xcXFx2dWUzLXRzLXRlbXBsYXRlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9Db2RlZmlsZXMvQ29kZV9Dby92dWUzLXRzLXRlbXBsYXRlL3ZpdGUuY29uZmlnLnRzXCI7Ly8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcbi8vIFx1NUYxNVx1NTE2NSBzdmcgXHU2MjQwXHU5NzAwXHU4OTgxXHU3NTI4XHU1MjMwXHU3Njg0XHU2M0QyXHU0RUY2XHJcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJ1xyXG4vLyBtb2NrIFx1NjNEMlx1NEVGNlx1NjNEMFx1NEY5Qlx1NzY4NFx1NjVCOVx1NkNENVxyXG5pbXBvcnQgeyB2aXRlTW9ja1NlcnZlIH0gZnJvbSAndml0ZS1wbHVnaW4tbW9jaydcclxuY29uc29sZS5sb2coJ2dpdCcsIHByb2Nlc3MuZW52KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUgfSkgPT4ge1xyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSlcclxuICByZXR1cm4ge1xyXG4gICAgLy8gXHU1MjREXHU3QUVGXHU4REU4XHU1N0RGXHU0RUUzXHU3NDA2XHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgcHJveHk6IHtcclxuICAgICAgICBbZW52LlZJVEVfQVBQX0JBU0VfQVBJXToge1xyXG4gICAgICAgICAgdGFyZ2V0OiBlbnYuVklURV9BUFBfU0VSVkVSX1VSTCxcclxuICAgICAgICAgIC8vIFx1NjUyRlx1NjMwMVx1OERFOFx1NTdERlxyXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgLy8gdG9kbyBcdTc1MjhcdTUxNjhcdTVDNDBcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0ZcdTY2RkZcdTYzNjJcdTYzODkhISFcclxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9kZXYtYXBpLywgJycpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICB2dWUoKSxcclxuICAgICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xyXG4gICAgICAgIC8vIFx1NjMwN1x1NUI5QVx1OTcwMFx1ODk4MVx1N0YxM1x1NUI1OFx1NzY4NFx1NTZGRVx1NjgwN1x1NjU4N1x1NEVGNlx1NTkzOVxyXG4gICAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL3N2ZycpXSxcclxuICAgICAgICBzeW1ib2xJZDogJ2ljb24tW25hbWVdJyxcclxuICAgICAgfSksXHJcbiAgICAgIHZpdGVNb2NrU2VydmUoe1xyXG4gICAgICAgIG1vY2tQYXRoOiAnbW9jaycsXHJcbiAgICAgICAgbG9jYWxFbmFibGVkOiBjb21tYW5kID09PSAnc2VydmUnLCAvLyBcdTRGRERcdThCQzFcdTVGMDBcdTUzRDFcdTk2MzZcdTZCQjVcdTUzRUZcdTRFRTVcdTRGN0ZcdTc1Mjhtb2NrXHU2M0E1XHU1M0UzXHJcbiAgICAgIH0pLFxyXG4gICAgXSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZSgnLi9zcmMnKSwgLy8gXHU5MTREXHU3RjZFXHU3NkY4XHU1QkY5XHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXHU0RjdGXHU3NTI4IEAgXHU2NzY1XHU0RUUzXHU2NkZGIHNyY1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIC8vc2NzcyBcdTUxNjhcdTVDNDBcdTUzRDhcdTkxQ0ZcdTkxNERcdTdGNkVcclxuICAgIGNzczoge1xyXG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgICAgc2Nzczoge1xyXG4gICAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogJ0BpbXBvcnQgXCIuL3NyYy9zdHlsZXMvdmFyaWFibGUuc2Nzc1wiOycsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsU0FBUyxjQUFjLGVBQWU7QUFDdEMsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUVqQixTQUFTLDRCQUE0QjtBQUVyQyxTQUFTLHFCQUFxQjtBQUM5QixRQUFRLElBQUksT0FBTyxRQUFRLEdBQUc7QUFFOUIsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxTQUFTLEtBQUssTUFBTTtBQUNqRCxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBQ3ZDLFNBQU87QUFBQTtBQUFBLElBRUwsUUFBUTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsQ0FBQyxJQUFJLGlCQUFpQixHQUFHO0FBQUEsVUFDdkIsUUFBUSxJQUFJO0FBQUE7QUFBQSxVQUVaLGNBQWM7QUFBQTtBQUFBLFVBRWQsU0FBUyxDQUFDQSxVQUFTQSxNQUFLLFFBQVEsY0FBYyxFQUFFO0FBQUEsUUFDbEQ7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsSUFBSTtBQUFBLE1BQ0oscUJBQXFCO0FBQUE7QUFBQSxRQUVuQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGdCQUFnQixDQUFDO0FBQUEsUUFDeEQsVUFBVTtBQUFBLE1BQ1osQ0FBQztBQUFBLE1BQ0QsY0FBYztBQUFBLFFBQ1osVUFBVTtBQUFBLFFBQ1YsY0FBYyxZQUFZO0FBQUE7QUFBQSxNQUM1QixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxLQUFLLFFBQVEsT0FBTztBQUFBO0FBQUEsTUFDM0I7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLEtBQUs7QUFBQSxNQUNILHFCQUFxQjtBQUFBLFFBQ25CLE1BQU07QUFBQSxVQUNKLG1CQUFtQjtBQUFBLFVBQ25CLGdCQUFnQjtBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
