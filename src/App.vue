<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import DefaultLayout from './layouts/DefaultLayout.vue';
import { computed } from 'vue';
import ReadLayout from './layouts/ReadLayout.vue';

const route = useRoute();
const layout = computed(() => {
  return route.meta.layout === 'ReadLayout' ? ReadLayout : DefaultLayout;
});
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

