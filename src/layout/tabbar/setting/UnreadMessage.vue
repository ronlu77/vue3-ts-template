<template>
  <div class="unread-message_container">
    <el-popover placement="bottom" trigger="click" :width="280">
      <template #reference>
        <el-badge is-dot>
          <SvgIcon lass="svg-icon__item" name="message" :size="22"></SvgIcon>
        </el-badge>
      </template>
      <el-tabs v-model="activeTab" @tab-change="handleActiveTabChange">
        <el-tab-pane
          :label="`通知(${noticationList.length})`"
          name="notication"
        >
          <div class="notication-box">
            <div>
              <Notication
                class="notication_item"
                v-for="(item, index) in noticationList"
                :key="index"
                :avatar="item.avatar"
                :content="item.content"
                :date="item.date"
              ></Notication>
            </div>
            <el-pagination
              class="notication-box-pagination"
              :page-size="5"
              small
              background
              layout="prev, pager, next"
              :total="noticationList.length"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane :label="`消息(${messageList.length})`" name="message">
          <div class="notication-box">
            <div>
              <Notication
                class="notication_item"
                v-for="(item, index) in messageList"
                :key="index"
                :title="item.title"
                :avatar="item.avatar"
                :content="item.content"
                :date="item.date"
              ></Notication>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="代办(4)" name="todo"></el-tab-pane>
      </el-tabs>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import Notication from './components/Notication.vue'
import { ref } from 'vue'

const activeTab = ref('notication')
const noticationList = ref([
  {
    avatar: '',
    content: '你收到了 14 份新周报',
    date: '2023-08-21',
  },
  {
    avatar: '',
    content: '你推荐的 曲妮妮 已通过第三轮面试',
    date: '2023-08-31',
  },
  {
    avatar: '',
    content: '这种模板可以区分多种通知类型',
    date: '2023-09-12',
  },
  {
    avatar: '',
    content: '左侧图标用于区分不同的类型',
    date: '2023-09-15',
  },
  {
    avatar: '',
    content:
      '标题可以设置自动显示省略号，本例中标题行数已设为1行，如果内容超过1行将自动截断并支持tooltip显示完整标题。',
    date: '2023-09-30',
  },
])
const messageList = ref([
  {
    title: '曲丽丽 评论了你',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    content: '描述信息描述信息描述信息',
    date: '2023-08-21',
  },
  {
    title: '朱偏右 回复了你',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    content: '这种模板用于提醒谁与你发生了互动',
    date: '2023-08-31',
  },
  {
    title: '标题',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    content: '这种模板可以区分多种通知类型',
    date: '2023-09-12',
  },
])

function handleActiveTabChange(tab: string) {
  activeTab.value = tab
}
</script>

<style lang="scss" scoped>
.el-badge {
  height: 100%;

  :deep(.el-badge__content.is-fixed.is-dot) {
    right: 6px;
    top: 10px;
  }
}

.unread-message_container {
  position: relative;
  height: 100%;
  padding: 0 6px;
  cursor: pointer;

  &:hover {
    background: $hover-color;
  }
}

.notication-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid var(--el-border-color);
  .notication_item + .notication_item {
    border-top: 1px solid var(--el-border-color);
  }

  .notication-box-pagination {
    padding: 10px;
  }
}
</style>
