<template>
  <div class="analysis-cards__container">
    <GroupCard
      class="group-card"
      v-for="item in dataCardList"
      :item="item"
      :key="item.id"
    ></GroupCard>
  </div>
</template>

<script setup lang="ts" name="Dashboard">
import GroupCard from './components/GroupCard.vue'
import { ref } from 'vue'

const dataCardList = ref([
  {
    id: 1,
    title: '访问量',
    type: 'success',
    rangeStr: '月',
    rangeNum: '2000',
    totalNum: '30000',
  },
  {
    id: 2,
    title: '成交额',
    type: 'primary',
    rangeStr: '月',
    rangeNum: '1259',
    totalNum: '54220',
  },
  {
    id: 3,
    title: '下载量',
    type: 'warning',
    rangeStr: '月',
    rangeNum: '5263',
    totalNum: '77758',
  },
  {
    id: 4,
    title: '成交量',
    type: 'info',
    rangeStr: '月',
    rangeNum: '2525',
    totalNum: '42351',
  },
])
</script>

<style lang="scss" scoped>
.analysis-cards__container {
  display: flex;
  flex-wrap: wrap;

  .group-card {
    flex: calc((100% - 15px) / 4);
    min-width: calc((100% - 15px) / 4);
  }

  @media screen and (width < 900px) {
    .group-card {
      flex: 1;
      min-width: 300px;
    }
  }
}
</style>
