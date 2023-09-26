<template>
  <div class="logo">
    <div class="logo-wrapper">
      <img src="@/assets/images/logo.png" alt="logo" />
      <router-link v-if="!collapse" to="/">{{ title }}</router-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

defineProps<{
  collapse: boolean
}>()

const title = computed(() => import.meta.env.VITE_APP_TITLE)
</script>
<style lang="scss" scoped>
.logo {
  width: 100%;
  height: $base-logo-height;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  overflow: hidden;

  .logo-wrapper {
    flex: 1;
    width: 90%;
    display: flex;
    align-items: center;

    img {
      width: 40px;
      height: 40px;
    }

    a {
      font-size: 1.2rem;
      font-weight: bold;
      text-decoration: none;
      color: $text-color;
      margin-left: 10px;
    }
  }
}
</style>
