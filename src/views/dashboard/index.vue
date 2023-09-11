<template>
  <el-card class="box-card">
    <el-button icon="Plus">添加品牌</el-button>
    <el-table :data="brandDataList" border strip height="400">
      <el-table-column
        type="index"
        label="序号"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="brand"
        label="品牌名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="image"
        label="品牌LOGO"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template #default>
          <el-button>edit</el-button>
          <el-button>delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="100"
      @restart-data="gainCurrentPaginationData"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { gainBrandList } from '@/api/brand'

const currentPage = ref(1)
const pageSize = ref(10)
const brandDataList = ref([])

// 根据新的 current-page 和 page-size 重新拉取数据
async function gainCurrentPaginationData() {
  // todo 调用接口请求数据
  const params = {
    pageSize: pageSize.value,
    page: currentPage.value,
  }
  const { data } = await gainBrandList(params)
  brandDataList.value = data
}
</script>

<style lang="scss" scoped>
.el-table {
  margin: 10px 0;
}
</style>
