<template>
  <div class="logo">
    <img src="@/assets/images/logo.png" alt="logo" />
    <router-link v-if="!collapse" to="/">Vue-TS-EMS</router-link>
  </div>
</template>
<script setup>
defineProps({
  collapse: Boolean,
})
</script>
<style lang="scss" scoped>
.logo {
  width: 100%;
  height: $base-logo-height;
  display: flex;
  align-items: center;
  padding: 10px;
  overflow: hidden;

  img {
    width: 50px;
    height: 50px;
  }

  a {
    font-size: 1.2rem;
    font-weight: bold;
    text-decoration: none;
    color: $text-color;
    margin-left: 10px;
  }
}
</style>
