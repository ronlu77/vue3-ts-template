<template>
  <div class="container">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <!-- <keep-alive> -->
        <component :is="Component" :key="key"></component>
        <!-- </keep-alive> -->
      </transition>
    </router-view>
    <div class="copyright">
      <p>2023&nbsp;-&nbsp;{{ currentYear }}&nbsp; EMS by ron</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const key = computed(() => useRoute().path)
const currentYear = computed(() => new Date().getFullYear())
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 16px;
}
.copyright {
  position: fixed;
  bottom: 10px;
  left: 0;
  right: 0;
  text-align: center;
  color: $text-color;
}
</style>
