<template>
  <div class="menu-icon" @click="toggleMenu">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <line x1="4" y1="12" x2="21" y2="12"></line>
      <line x1="4" y1="6" x2="21" y2="6"></line>
      <line x1="4" y1="18" x2="21" y2="18"></line>
    </svg>
  </div>
</template>

<script setup lang="ts">
const toggleMenu = () => {
  console.log("Clicked menu icon!")
}
</script>

<style scoped>
.menu-icon {
  cursor: pointer;
  color: var(--text-color-1);
  transition: color 0.3s;
  display: flex;
}
</style>
