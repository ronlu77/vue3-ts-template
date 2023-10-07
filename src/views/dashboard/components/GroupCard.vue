<template>
  <div class="group-card__container">
    <el-card class="group-card__item">
      <template #header>
        <div class="group-card__header">
          <span class="group-card__title">{{ item.title }}</span>
          <el-tag :type="item.type">{{ item.rangeStr }}</el-tag>
        </div>
      </template>
      <section class="group-card__main">
        <span class="rangeNum">{{ item.rangeNum }}</span>
        <img :src="item.imgUrl" alt="logo" />
      </section>
      <div class="group-card__footer">
        <span>总{{ item.title }}</span>
        <span>{{ item.totalNum }}</span>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
interface CardItem {
  title: string
  type: 'primary' | 'success' | 'danger' | 'warning' | 'info'
  rangeStr: string
  rangeNum: number
  imgUrl: string
  totalNum: number
}

defineProps<{
  item: CardItem
}>()
</script>

<style lang="scss" scoped>
.group-card__container {
  padding: 5px;

  .group-card__header,
  .group-card__main,
  .group-card__footer {
    display: flex;
    justify-content: space-between;
  }

  .group-card__main {
    margin: 10px 0;

    .rangeNum {
      font-size: 24px;
    }
  }
}
</style>
