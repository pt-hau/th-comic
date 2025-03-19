<script setup lang="ts">
import HeaderBar from '@/components/header/HeaderBar.vue'
import FooterBar from '@/components/footer/FooterBar.vue'
import { provide, ref, watch } from 'vue'
import ModalSearch from '@/components/modals/ModalSearch.vue'
import HeaderMenu from '@/components/header/HeaderMenu.vue'
import { useRoute } from 'vue-router'
const showSearch = ref(false)
const showMenu = ref(false)
const route = useRoute()

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}
provide('showSearch', showSearch)
provide('showMenu', showMenu)
provide('toggleMenu', toggleMenu)

watch(
  () => route.fullPath,
  () => {
    showMenu.value = false
  }
)
</script>

<template>
  <div class="layout">
    <HeaderBar />
    <HeaderMenu />
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
  position: relative;
}

.layout-content {
  margin: 0 auto;
  width: 100%;
  flex-grow: 1;
}
</style>
