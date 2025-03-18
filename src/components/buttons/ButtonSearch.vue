<script setup lang="ts">
import { inject } from 'vue';
import IconSearch from '../icons/IconSearch.vue';
const showSearch = inject('showSearch');
</script>

<template>
  <button class="search-button" @click="showSearch=!showSearch">
    <IconSearch />
  </button>
</template>

<style scoped>
.search-button {
  width: 40px;
  height: 30px;
  background-color: transparent;
  border-radius: 4px;
  border: 1px solid var(--title-color);
  color: var(--title-color);
  transition: 0.3s;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-button:hover {
  background-color: var(--title-color);
  color: var(--tex1-color-1);
}

.search-button span {
  color: var(--vt-c-white);
  font-weight: 500;
}
</style>
