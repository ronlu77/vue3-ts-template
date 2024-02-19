<template>
  <!-- todo 路由模糊查询弹窗的动画效果 -->
  <transition name="blur-search">
    <div class="shroud">
      <!--! 阻止点击事件冒泡,不需要回调操作 -->
      <div class="appsearch__container" @click.stop>
        <el-input
          ref="blurSearchRef"
          class="input"
          v-model.trim="keyword"
          placeholder="搜索"
          clearable
          :prefix-icon="Search"
          @keyup.enter="goPage"
          @input="blurSearch"
        ></el-input>
        <div class="blur-search__container" v-loading="loading">
          <template v-if="searchList.length">
            <el-scrollbar>
              <div class="blur-search__wrapper">
                <div
                  class="blur-search__item"
                  :class="{ active: item.active }"
                  v-for="item in searchList"
                  :key="item.path"
                >
                  <router-link :to="item.path">{{ item.title }}</router-link>
                </div>
              </div>
            </el-scrollbar>
          </template>
          <div v-else><span>暂无搜索结果</span></div>
        </div>
        <div class="appsearch-tip">Enter 确认、↑↓ 切换、 Esc 关闭</div>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useEventListener } from '@/hooks/event/useEventListener'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { Search } from '@element-plus/icons-vue'
import { findIndex } from 'lodash-es'

const { toggleSearchScreen } = useHeaderSetting()
const router = useRouter()
const blurSearchRef = ref(null)
const searchList = ref([])
const keyword = ref('')
const loading = ref(false)

// todo 防抖获取模糊查询搜索结果, 本地mock，将路由扁平化
function blurSearch(key: string) {
  console.log('key is', key)
  //* 模拟接口获取模糊搜索结果
  if (!loading.value) {
    loading.value = true
    setTimeout(() => {
      const mockList = [
        { path: '/', title: '测试数据01', active: true },
        {
          path: '/functionality/draggableDialog',
          title: '测试数据02',
          active: false,
        },
        {
          path: '/functionality/watermark',
          title: '测试数据03',
          active: false,
        },
        {
          path: '/functionality/watermark',
          title: '测试数据04',
          active: false,
        },
        {
          path: '/functionality/watermark',
          title: '测试数据05',
          active: false,
        },
      ]
      searchList.value = mockList
      loading.value = false
    }, 900)
  }
}

function goPage() {
  const activeRoutePath = searchList.value.filter((item) => item.active)[0].path
  router.push({ path: activeRoutePath })
  toggleSearchScreen()
}

function updateActiveBlurSearchItem(code: number) {
  const index = findIndex(searchList.value, (item: any) => item.active === true)
  const dir = code === 38 ? -1 : 1

  if (index === -1 || index + dir > searchList.value.length || index + dir < 0)
    return
  searchList.value[index].active = false
  searchList.value[index + dir].active = true
}

onMounted(() => {
  blurSearchRef.value.focus()
  useEventListener({
    name: 'click',
    listener: () => {
      toggleSearchScreen()
    },
  })

  useEventListener({
    name: 'keyup',
    listener: (event: KeyboardEvent) => {
      switch (event.keyCode) {
        case 38:
        case 40:
          updateActiveBlurSearchItem(event.keyCode)
          break
        case 27:
          toggleSearchScreen()
          break
        default:
          return ''
      }
    },
  })
})
</script>
<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
  width: 100%;
}

.shroud {
  position: absolute;
  top: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: rgba($color: #000000, $alpha: 0.6);
}

.appsearch__container {
  display: flex;
  flex-direction: column;
  width: 30%;
  min-width: 300px;
  max-height: 300px;
  border-radius: 12px;
  background: $background-color;
  margin-top: 50px;

  .input.el-input {
    margin: 12px;
    width: 96%;
    height: 42px;
    border-radius: 6px;
    font-size: 22px;
  }
}

.blur-search__container {
  height: calc(100% - 52px - 30px);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;

  .blur-search__wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 300px;
  }

  .blur-search__item {
    width: 96%;
    height: 42px;
    line-height: 42px;
    margin: 6px;
    background: $normal-color;
    border: 1px solid $border-color;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba($color: #000, $alpha: 0.3);
    color: $normal-color;
    padding-left: 12px;
    cursor: pointer;
  }

  .active {
    background: $active-color;
    color: #fff !important;
  }
}

.appsearch-tip {
  align-self: flex-end;
  flex-basis: 30px;
  width: 100%;
  max-height: 30px;
  line-height: 30px;
  border-top: 1px solid $border-color;
  padding-left: 12px;
  font-size: 12px;
}

// box-shadow: inset 0 -2px #cdcde6, inset 0 0 1px 1px #fff, 0 1px 2px 1px #1e235a66
</style>
