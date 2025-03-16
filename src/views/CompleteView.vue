<script setup lang="ts">
import ListStatus from '@/components/listPaginate/ListStatus.vue'
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <main>
    <ListStatus name="Hoàn thành" :route="route.name as string" />
  </main>
</template>

<style scoped>

</style>
