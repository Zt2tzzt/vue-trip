<script setup>
import { useRoute } from 'vue-router';
import TabBar from './components/tab-bar/TabBar.vue';

const route = useRoute() // 返回的 route 对象，是响应式的，可以直接在 template 中使用。
</script>

<template>
  <div class="app">
    <router-view />
    <TabBar v-show="!route.meta.hiddeTabBar" />
  </div>
</template>

<style scoped lang="less">
</style>