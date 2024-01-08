<template>
  <transition>
    <div class="shroud">
      <!--* 阻止点击事件冒泡,不需要回调操作 -->
      <div class="appsearch__container" @click.stop>
        <el-input
          class="input"
          v-model="keyword"
          placeholder="搜索"
          clearable
          :prefix-icon="Search"
          @keyup.enter="goPage"
        ></el-input>
        <div class="blur-search__container">
          <!-- todo 滚动条 -->
          <template v-if="searchList.length">
            <div
              class="blur-search__item"
              :class="{ active: item.active }"
              v-for="item in searchList"
              :key="item.path"
            >
              <router-link :to="item.path">这是一条测试数据</router-link>
            </div>
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
import { useEventListener } from '@/hooks/event/useEventListener'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { Search } from '@element-plus/icons-vue'

const keyword = ref('')
const searchList = ref([
  //   {
  //     path: '/',
  //     title: '这是一条测试数据',
  //     active: true,
  //   },
  //   {
  //     path: '/',
  //     title: '这是一条测试数据',
  //     active: false,
  //   },
])
const { toggleSearch } = useHeaderSetting()

function goPage() {}

onMounted(() => {
  useEventListener({
    name: 'click',
    listener: () => {
      toggleSearch()
    },
  })

  useEventListener({
    name: 'keyup',
    listener: (event) => {
      event.key === 'Escape' && toggleSearch()
    },
  })
})
</script>
<style lang="scss" scoped>
.shroud {
  position: absolute;
  top: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-item: center;
  width: 100%;
  height: 100vh;
  background: rgba($color: #000000, $alpha: 0.6);
}

.appsearch__container {
  display: flex;
  flex-direction: column;
  align-item: center;
  width: 30%;
  min-width: 300px;
  max-height: 300px;
  border-radius: 12px;
  background: $background-color;
  margin-top: 50px;
  overflow: hidden; // maybe will remove

  .input.el-input {
    margin: 12px;
    width: 96%;
    height: 42px;
    border-radius: 6px;
    font-size: 22px;
  }
}

.blur-search__container {
  flex: 1;
  width: 96%;
  display: flex;
  flex-direction: column;
  align-item: center;
  text-align: center;

  .blur-search__item {
    flex: 1;
    width: 100%;
    height: 42px;
    line-height: 42px;
    margin: 15px;
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
  }
}

.appsearch-tip {
  flex-basis: 30px;
  max-height: 30px;
  line-height: 30px;
  border-top: 1px solid $border-color;
  padding-left: 12px;
  font-size: 12px;
}

// box-shadow: inset 0 -2px #cdcde6, inset 0 0 1px 1px #fff, 0 1px 2px 1px #1e235a66
</style>
