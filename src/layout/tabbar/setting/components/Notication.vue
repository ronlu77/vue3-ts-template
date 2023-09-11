<template>
  <div class="notication-container">
    <div class="notication-left">
      <el-avatar :src="avatar"></el-avatar>
    </div>
    <div class="notication-right">
      <slot name="header">
        <p v-if="title" class="title">{{ title }}</p>
      </slot>
      <slot>
        <p v-if="content" class="content">{{ content }}</p>
      </slot>
      <slot name="footer">
        <p v-if="date" class="date">{{ date }}</p>
      </slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  title?: string
  avatar: string
  content: string
  date: string
}>()
</script>

<style lang="scss" scoped>
.notication-container {
  flex: 1;
  display: flex;
  align-items: center;
  min-height: 36px;
  padding: 8px;
  .notication-left {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    .el-avatar {
      width: 46px;
      height: 46px;
    }
  }

  .notication-right {
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
}

.notication-right {
  .content {
    padding: 6px;
    cursor: pointer;
  }

  .date,
  .title {
    padding: 6px;
    color: $text-color;
  }
}
</style>
