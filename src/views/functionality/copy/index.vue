<template>
  <div class="container__inner">
    <expand-card title="复制示例">
      <el-row :gutter="10">
        <el-col :span="10">
          <el-input
            v-model="inputText"
            placeholder="请输入所需复制内容"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="handleCopy">复制</el-button>
        </el-col>
        <el-col :span="24" style="margin-top: 8px">
          <el-input v-model="showText" type="textarea"></el-input>
        </el-col>
      </el-row>
    </expand-card>
  </div>
</template>
<script setup lang="ts" name="Copy">
import { ref } from 'vue'
import { copyContent } from '@/utils/copyToClipboard'
import { ElMessage } from 'element-plus'

const inputText = ref('')
const showText = ref('')

function handleCopy() {
  if (inputText.value === '') {
    return ElMessage.warning('请输入所需复制内容!')
  }
  copyContent(inputText.value)
}
</script>
