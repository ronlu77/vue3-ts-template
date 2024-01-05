/**
 * xx.d.ts 文件 用来定义全局类型或类型声明，使用时可不需要显示导入
 */
export interface SystemConfig {
  headerSetting: HeaderSetting // 顶栏
  showBreadcrumb: boolean // 面包屑功能
  showTagger: boolean // 标签栏
  showLogo: boolean // logo
  menuSetting: MenuSetting
  showFooter: boolean // 页脚
  fullScreen: boolean // 全屏2
}

export interface HeaderSetting {
  show: boolean // 顶栏
  showSearch: boolean // 搜索功能
  showNotice: boolean // 消息提示功能
  showFullScreen: boolean // 全屏功能
  showTransilate: boolean // 语言切换
  showToggleSidebarBtn: boolean // 侧边栏折叠功能
}

export interface MenuSetting {
  show: boolean // 侧边栏
  collapsed: boolean // 折叠状态
}
