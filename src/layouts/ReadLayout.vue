<script setup lang="ts">
import { provide, ref } from 'vue';
  const showSearch = ref(false)
  provide('showSearch',showSearch);
</script>

<template>
  <div class="layout">
    <main class="layout-content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
/* .layout {
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: column;
  min-height: 100%;
}

.layout-content {
  margin: 0 auto;
  width: 100%;
  flex-grow: 1;
} */
</style>