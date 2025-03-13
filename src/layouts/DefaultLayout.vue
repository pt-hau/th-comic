<script setup lang="ts">
  import HeaderBar from '@/components/header/HeaderBar.vue';
  import FooterBar from '@/components/footer/FooterBar.vue';
import { provide, ref } from 'vue';
import ModalSearch from '@/components/modals/ModalSearch.vue';
  const showSearch = ref(false)
  provide('showSearch',showSearch);
</script>

<template>
  <div class="layout">
    <HeaderBar />
    <main class="layout-content">
      <slot />
    </main>
    <FooterBar />
    <ModalSearch />
  </div>
</template>

<style scoped>
.layout {
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
}
</style>