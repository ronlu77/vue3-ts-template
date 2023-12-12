<template>
  <div class="expand-card__wrapper" :class="{ expand: expand }">
    <div class="expand-card__header">
      <slot name="header">
        <h2 class="title">{{ title }}</h2>
      </slot>
      <svg-icon
        class="svg-icon-dropdown"
        name="dropdown"
        size="12"
        @click="toggleExpandCard"
      ></svg-icon>
    </div>
    <el-divider></el-divider>
    <div class="expand-card__content">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, withDefaults } from 'vue'

interface Props {
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: '',
})

const expand = ref(true)

function toggleExpandCard() {
  expand.value = !expand.value
}
</script>
<style lang="scss" scoped>
.expand-card__wrapper {
  display: flex;
  flex-direction: column;
  min-height: 120px;
  border: 1px solid $border-color;
  border-radius: 6px;
  background: $normal-color;
  margin: 10px 0;

  .expand-card__header {
    flex-basis: 30px;
    max-height: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 6px;

    .title {
      padding: 0 6px;
      font-weight: bold !important;
    }

    .svg-icon-dropdown {
      cursor: pointer;
      transform: rotate(-0.5turn);
      transition: transform 300ms ease;
    }
  }

  .expand-card__content {
    height: 0;
    overflow: hidden;
    transition: height 500ms ease;
  }
}

.expand-card__wrapper.expand {
  .svg-icon-dropdown {
    transform: rotate(0deg);
    transition: transform 300ms ease;
  }

  .expand-card__content {
    flex: 1;
    transition: height 500ms ease;
    padding: 4px 8px;
    overflow: visible;
  }
}
</style>
