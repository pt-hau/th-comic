<script setup lang="ts">
</script>

<template>
  <div class="layout">
    <main class="layout-content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: column;
  flex-grow: 1;
}

.layout-content {
  display: flex;
  flex-grow: 1;
}
</style>