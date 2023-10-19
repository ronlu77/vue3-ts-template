# 注意事项
## 引入components下未注册全局组件引起vite报错
在vite中，components 下的组件只能被注册成全局组件使用，不能引入路由组件进行局部注册。如果需要使用 components 下未被注册成全局组件的组件，可以通过一下两种方法:
1. 通过指定引用组件的相对路径
``` js
  import Foo from '../src/components/Foo'
```
2. 通过`components`将其注册成局部组件