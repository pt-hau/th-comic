<script setup lang="ts">
import router from '@/router'
import LoginButton from '../buttons/ButtonLogin.vue'
import SearchButton from '../buttons/ButtonSearch.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { ListService } from '@/services/listService'

let hoverTimeout: ReturnType<typeof setTimeout>
const isOpen = ref(false)

const categories = ref<IResponseDataCategory[] | null>(null)

const fetchCategories = async () => {
  const result = await ListService.getCategories()
  categories.value = result.data.data.items
}

const openDropdown = () => {
  clearTimeout(hoverTimeout)
  isOpen.value = true
}

const closeDropdown = () => {
  hoverTimeout = setTimeout(() => {
    isOpen.value = false
  }, 200)
}

const handleMouseLeave = (event: MouseEvent) => {
  const relatedTarget = event.relatedTarget as HTMLElement;
  if (
    !relatedTarget?.closest('.dropdown-menu') &&
    !relatedTarget?.closest('.dropdown-container')
  ) {
    closeDropdown();
  }
};


onMounted(() => {
  fetchCategories()
})
</script>

<template>
  <header>
    <div class="header-content">
      <div class="header-logo" @click="router.push('/')">
        <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="50" />
        <span>Manga</span>
      </div>
      <div class="header-wrapper">
        <nav class="header-nav">
          <RouterLink to="/truyen-moi">Truyện mới</RouterLink>
          <RouterLink to="/dang-phat-hanh">Đang phát hành</RouterLink>
          <RouterLink to="/hoan-thanh">Hoàn thành</RouterLink>

          <a
            class="dropdown-container relative inline-block menu-link"
            @mouseenter="openDropdown"
            @mouseleave="handleMouseLeave"
          >
            <span>Thể loại</span>
            <div
              :class="{ 'dropdown-menu': true, show: isOpen }"
              @mouseenter="openDropdown"
              @mouseleave="handleMouseLeave"
            >
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
          </a>
        </nav>
      </div>
      <div class="header-button">
        <SearchButton />
        <LoginButton />
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  line-height: 1.5;
  top: 0;
  width: 100%;
  height: 50px;
  backdrop-filter: blur(5px);
  border-bottom: 1px solid #4d4c4c;
  background-color: var(--bg-banner)/70;
  z-index: 50;
}

.header-content {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1280px;
  height: 100%;
  margin: 0 auto;
  flex-grow: 1;
  padding: 0 2rem;
}

.header-logo {
  display: flex;
  gap: 5px;
  margin-right: 20px;
  cursor: pointer;
}

.header-logo span {
  font-weight: 700;
  font-size: 18px;
  color: var(--vt-c-white);
}

.header-wrapper {
  flex-grow: 1;
  position: relative;
}

.header-nav {
  display: flex;
  gap: 20px;
  flex-grow: 1;
  position: relative;
}

.header-nav a {
  position: relative;
}

.header-nav a::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background-color: rgb(37, 105, 207);
  transform: scaleX(0);
  transition: transform 0.3s;
}

.header-nav a:hover::after {
  transform: scaleX(1);
}

.header-nav a.router-link-active {
  color: var(--vt-c-white);
}

.header-nav a {
  color: var(--vt-c-white-mute);
}

.header-button {
  display: flex;
  gap: 10px;
}

.menu-link {
  cursor: pointer;
  color: white;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  padding: 10px;
  left: 50%;
  transform: translate(-50%);
  z-index: 10;
  opacity: 0;
  transition: 0.3s;
  max-width: clamp(300px, 50vw, 1000px);
  margin: 0 auto;
  visibility: hidden;
}

.dropdown-menu.show {
  opacity: 1;
  visibility:initial;
  transform: translate(-50%);
}

.dropdown-menu .menu {
  border-radius: 8px;
  border: 1px solid rgb(141, 141, 141);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  background-color: rgb(47, 47, 47);
  max-width: 50vw;
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(150px,1fr));
  max-height: 80vh;
  overflow-y: auto;
}

.dropdown-menu .menu .category-item {
  padding: 3px 10px;
  color: white;
  transition: 0.3s;
  font-size: 14px;
}

.dropdown-menu .menu .category-item:hover {
  background-color: white;
  color: #3c8bc6;
}
</style>
