<script setup lang="ts">
import router from '@/router'
import { inject, onMounted, onUnmounted, ref } from 'vue'
import { ListService } from '@/services/listService'
import { useRoute } from 'vue-router'

const isOpen = ref(false)
const route = useRoute()
const categories = ref<IResponseDataCategory[] | null>(null)
const showMenu = inject('showMenu')
const toggleMenu = inject('toggleMenu') as () => void
const menuRef = ref<HTMLElement | null>(null)
const fetchCategories = async () => {
  const result = await ListService.getCategories()
  categories.value = result.data.data.items
}

const openDropdown = () => {
  isOpen.value = !isOpen.value
}

const handleClickOutside = (event: MouseEvent) => {
  if(menuRef.value && !menuRef.value.contains(event.target as Node)) {
    toggleMenu()
  }
}

onMounted(() => {
  fetchCategories()
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div
    :class="[
      'header-menu',
      {
        show: showMenu
      }
    ]"
  >
    <div class="header-menu-content" ref="menuRef">
        <nav class="header-menu-nav">
          <RouterLink to="/truyen-moi">Truyện mới</RouterLink>
          <RouterLink to="/dang-phat-hanh">Đang phát hành</RouterLink>
          <RouterLink to="/hoan-thanh">Hoàn thành</RouterLink>
          <a @click="openDropdown" :class="`name ${route.name == 'the-loai' ? 'active' : ''}`"
            >Thể loại <span :class="['icon',{ open: isOpen }]">❮</span></a
          >
        </nav>
        <div v-show="isOpen" class="dropdown-menu">
          <div class="menu">
            <div
              @click="router.push(`/the-loai/${item.slug}`)"
              class="category-item"
              v-for="(item, index) in categories"
              :key="index"
            >
              <span>{{ item?.name }}</span>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-menu {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100vh;
  z-index: 40;
  padding-top: 50px;
  box-sizing: border-box;
  visibility: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}

.header-menu-content {
  width: 0px;
  height: 100%;
  flex-grow: 1;
  background-color: var(--bg-banner);
  transition: 0.5s;
  flex-grow: 1;
    display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header-menu-nav {
  display: flex;
  flex-direction: column;
  min-width: 300px;
  position: relative;
}

.header-menu-nav a {
  padding: 5px 10px;
  font-size: 20px;
  font-weight: 600;
  color: var(--text-color-1);
  position: relative;
  cursor: pointer;
}

.header-menu-nav a::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 4px;
  background-color: #3c8bc6;
  transform: scaleY(0);
  transition: transform 0.3s;
}

.header-menu-nav a:hover::before {
  transform: scaleY(1);
}

.header-menu-nav a.router-link-active::before,
.header-menu-nav .name.active::before {
  transform: scaleY(1);
  background-color: var(--text-color-1);
}
.header-menu-nav a:hover {
  color: #3c8bc6;
  background-color: #ffffff;
}

.header-menu-nav a.router-link-active,
.header-menu-nav .name.active {
  background-color: goldenrod;
  color: var(--text-color-1);
}

.dropdown-menu {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
}

.menu {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
}

.menu .category-item {
  padding: 3px 10px;
  color: var(--text-color-1);
  transition: 0.3s;
  font-size: 14px;
  cursor: pointer;
}

.menu .category-item:hover {
  background-color: white;
  color: #3c8bc6;
}

.name .icon {
  margin-left: 5px;
  display: inline-block;
  transition: transform 0.3s;
}

.name .icon.open {
  transform: rotate(-90deg);
}

@media (max-width: 868px) {
  .header-menu.show {
    visibility: initial;
  }

  .header-menu.show .header-menu-content {
    width: 300px;
  }
}
</style>
