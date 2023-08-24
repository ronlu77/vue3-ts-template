<template>
  <div>dashboard</div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

onMounted(() => {
  console.log('dashboard111', useRoute().path)
})
</script>
<style lang=""></style>
