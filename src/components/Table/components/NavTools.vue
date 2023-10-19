<template>
  <div class="table-nav">
    <div class="table-nav-option option_item">
      <el-popover trigger="click" :hide-on-click="false" teleported>
        <template #reference>
          <svg-icon class="svg-icon__item" name="setting" :size="14"></svg-icon>
        </template>
        <nav-tool-setting-card
          :list="schemaList"
          @update="resetLtable"
        ></nav-tool-setting-card>
      </el-popover>
    </div>
  </div>
</template>
<script setup lang="ts">
import NavToolSettingCard from './NavToolSettingCard.vue'
import { ref } from 'vue'
import { cloneDeep } from 'lodash-es'

interface Props {
  schema: object | any
}

const props = defineProps<Props>()
const schemaList = ref(cloneDeep(Object.values(props.schema.properties)))

function resetLtable(newSortList) {
  const formatList = {}
  for (let i = 0; i < newSortList.length; i++) {
    formatList[newSortList[i].dataIndex] = newSortList[i]
  }
  props.schema.properties = formatList
}
</script>
<style lang="scss">
.table-nav {
  display: flex;
  justify-content: flex-end;
  min-height: 32px;
}

.el-popover.el-popper {
  padding: 0;
}

.svg-icon__item {
  cursor: pointer;
}
</style>
