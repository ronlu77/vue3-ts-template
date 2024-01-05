<template>
  <div class="l-switch__wrapper">
    <label class="l-size label">
      {{ title }}
    </label>
    <el-switch
      v-model="useBindValue"
      inline-prompt
      active-text="ON"
      inactive-text="OFF"
      width="48"
      size="default"
      @change="handleChange"
    ></el-switch>
  </div>
</template>
<script setup lang="ts">
import { ref, PropType } from 'vue'
import { HandlerEnum } from '../enum'
import { baseHandler } from '../handler'

const props = defineProps({
  event: {
    //* 运行 props 声名时，PropType 标注一个更为具体的类型
    type: Number as PropType<HandlerEnum>,
  },
  disabled: {
    type: Boolean,
  },
  title: { type: String },
  bindValue: { type: Boolean },
})

const useBindValue = ref(props.bindValue ? props.bindValue : false)

// todo 当系统配置更改时，需要更新示图
function handleChange(val: boolean) {
  baseHandler(props.event, val)
}
</script>
<style lang="scss" scoped>
.l-switch__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  line-height: 30px;
  width: 100%;
  margin: 0 6px;
  padding: 8px 6px;
}
</style>
