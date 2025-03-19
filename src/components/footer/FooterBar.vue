<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer>
    <span>© {{ currentYear }} TH Comic. All Rights Reserved.</span>
  </footer>
</template>

<style scoped>
footer {
  width: 100%;
  backdrop-filter: blur(5px);
  border-top: 1px solid;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-banner);
  box-shadow: 0 0 20px var(--shadow);
}

footer span {
  color: var(--text-color-1);
}
</style>
