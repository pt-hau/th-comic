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
  border: 1px solid white;
  color: var(--vt-c-white);
  transition: 0.3s;
  cursor: pointer;
}

.search-button:hover {
  background-color:rgba(255, 255, 255, 0.205);
}

.search-button span {
  color: var(--vt-c-white);
  font-weight: 500;
}
</style>
