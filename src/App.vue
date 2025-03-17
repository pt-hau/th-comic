<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import DefaultLayout from './layouts/DefaultLayout.vue';
import { computed, provide, ref, watch, watchEffect } from 'vue';
import ReadLayout from './layouts/ReadLayout.vue';

const route = useRoute();
const layout = computed(() => {
  return route.meta.layout === 'ReadLayout' ? ReadLayout : DefaultLayout;
});

const isDarkMode = ref(localStorage.getItem('theme') === 'dark')

watchEffect(() => {
  document.documentElement.classList.toggle('dark', isDarkMode.value)
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
})

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
}

provide('isDarkMode', isDarkMode)
provide('toggleTheme', toggleTheme)

</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

