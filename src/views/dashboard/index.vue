<template>
  <el-card class="box-card">
    <el-button type="primary" icon="Plus">添加品牌</el-button>
    <el-table border strip>
      <el-table-column label="序号" width="80" align="center"></el-table-column>
      <el-table-column label="品牌名称" align="center"></el-table-column>
      <el-table-column label="品牌LOGO" align="center"></el-table-column>
      <el-table-column label="操作" align="center"></el-table-column>
    </el-table>
    <!-- <el-pagination v-model:current-page="currentPage" :page-size="pageSize"></el-pagination> -->
  </el-card>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const currentPage = ref<number>(1)
const pageSize = ref(10)
</script>
<style lang="scss" scoped>
.el-table {
  margin-top: 10px;
}
</style>
