<script setup lang="ts">
import ListCategory from '@/components/listPaginate/ListCategory.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <main>
    <ListCategory name="Thể loại" :route="route.params.id as string" />
  </main>
</template>

<style scoped>

</style>
