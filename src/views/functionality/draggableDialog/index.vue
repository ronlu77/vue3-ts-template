<template>
  <div class="container__inner">
    <expand-card title="可拖拽弹窗">
      <el-button type="primary" @click="visibleDialog = true">
        点击出现弹窗
      </el-button>
    </expand-card>

    <el-dialog v-model="visibleDialog" title="title" width="30%" draggable>
      <span>Try to draggabing me !</span>
      <template #footer>
        <el-button @click="visibleDialog = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visibleDialog = ref<boolean>(false)
</script>
