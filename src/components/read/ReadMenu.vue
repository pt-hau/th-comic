<script setup lang="ts">
import type { IChapter } from '@/interfaces/detailInterface'
import router from '@/router'
import { onMounted, onUnmounted, ref } from 'vue'
import IconSearch from '../icons/IconSearch.vue'

const props = defineProps<{
  id: string
  slug: string
  isShowMenu: boolean
  name: string | null | undefined
  data: IChapter[] | null | undefined
  isVertical: boolean
  handleChangeVertical: (value: boolean) => void
  handleIsShowMenu: (value: boolean) => void
}>()

const searchQuery = ref('')
const menuRef = ref<HTMLElement | null>(null)

const handleSearch = () => {
  const chapterId = document.getElementById(searchQuery.value)
  if (chapterId) {
    chapterId.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const handleClickOutside = (event: MouseEvent) => {
  
  if (menuRef.value && !menuRef.value.contains(event.target as Node) && props.isShowMenu == true && props.isShowMenu) {
    props.handleIsShowMenu(false)
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div :class="`menu ${isShowMenu ? 'show' : ''}`" ref="menuRef">
    <div class="menu-content">
      <div class="header-logo" @click="router.push('/')">
      <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="70" />
      <span>Manga</span>
    </div>
    <div class="line"></div>
    <div class="tooltip-container name" @click="router.push(`/chi-tiet/${slug}`)">
      <p>❮</p>
      <p>{{ name }} {{ name }} {{ name }}</p>
      <div class="tooltip-text">Quay lại trang chi tiết</div>
    </div>
    <div class="reading-mode">
      <span :class="`${isVertical ? 'active' : ''}`" @click="() => handleChangeVertical(true)"
        >Hiển thị dọc</span
      >
      <span :class="`${!isVertical ? 'active' : ''}`" @click="() => handleChangeVertical(false)"
        >Hiển thị ngang</span
      >
    </div>
    <div class="chapters">
      <p class="title">Chương: {{ id }}</p>
      <div class="chapters-line"></div>
      <div class="search">
        <input
          class="search-input"
          v-model="searchQuery"
          @input="handleSearch"
          placeholder="Tìm chương, ví dụ: 124"
        />
        <div class="search-icon"><IconSearch /></div>
      </div>
      <div class="chapter-items">
        <div v-if="data && data.length > 0">
          <div
            :id="item.chapter_name"
            :class="`chapter-item ${searchQuery === item.chapter_name ? 'isSearch' : ''}`"
            v-for="(item, index) in data[0].server_data"
            :key="index"
            @click="() => router.push('/doc/' + slug + '/chuong/' + item.chapter_name)"
          >
            <p>Chương {{ item?.chapter_name }}: {{ item?.filename }}</p>
          </div>
        </div>
        <div v-else>
          <div
            class="chapter-item-null"
          >
            <p>Dữ liệu đang được cập nhật!</p>
          </div>
        </div>
      </div>
      <div class="chapters-line"></div>
    </div>
    </div>
  </div>
</template>

<style scoped>
.menu {
  width: max-content;
  height: 100dvh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color);
}

.menu-content {
  width: 250px;
  min-width: 250px;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color);
}

.header-logo {
  display: flex;
  gap: 5px;
  margin-right: 20px;
  cursor: pointer;
  position: relative;
}

.line {
  margin-top: 5px;
  width: 100%;
  min-height: 1px;
  background-color: var(--title-color);
  margin-bottom: 10px;
}

.header-logo span {
  font-weight: 700;
  font-size: 24px;
  color: var(--title-color);
}

.name {
  display: flex;
  gap: 5px;
  justify-content: center;
}
.name p {
  font-weight: 600;
  font-size: 16px;
  min-width: 10px;
  color: var(--title-color);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  line-height: 1.3em;
}

.name p:nth-child(2):hover {
  text-decoration: underline;
}

.chapters {
  flex-grow: 1;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  min-height: 0;
  position: relative;
}

.title {
  width: fit-content;
  display: inline-block;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 500;
  position: relative;
  color: white;
  border-radius: 8px 8px 0 0;
  background-color: var(--title-color);
}

.chapters-line {
  background-color: var(--title-color);
  width: 100%;
  min-height: 4px;
}

.reading-mode {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.reading-mode span {
  font-size: 14px;
  color: var(--text-color-1);
  font-weight: 500;
  padding: 5px;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;
}

.reading-mode span.active {
  background-color: goldenrod !important;
  color: var(--text-color-1) !important;
}

.reading-mode span:hover {
  color: #3c8bc6;
  background-color: #ffffff;
}

.chapter-items {
  overflow-y: auto;
  flex-grow: 1;
  min-height: 0;
  max-height: max-content;
}

.chapter-item {
  padding: 10px;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 1px;
  background-color: var(--bg-banner);
  color: var(--text-color-1);
  cursor: pointer;
  position: relative;
  transition: 0.3s;
}

.chapter-item-null {
  padding: 10px;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 1px;
  background-color: var(--bg-banner);
  color: var(--text-color-1);
}

.chapter-item p {
  display: -webkit-box;
  display: box;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  line-clamp: 1;
}

.chapter-item::before {
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

.chapter-item:hover,
.chapter-item.isSearch {
  background-color: #ffffff;
  color: #3c8bc6;
}

.chapter-item:hover::before,
.chapter-item.isSearch::before {
  transform: scaleY(1);
}

.search {
  padding: 10px;
  box-sizing: border-box;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 1px;
  background-color: #ffffff7e;
  width: 100%;
  transition: 0.3s;
  position: relative;
  padding-right: 40px;
}

.search-input {
  border: none;
  outline: none;
  color: var(--text-color-1);
  width: 100%;
  background-color: transparent;
}

.search-input::placeholder {
  color: var(--text-color-2);
}

.search:hover {
  background-color: #ffffff;
}

.dark .search:hover {
  background-color: #505050;
}

.search-icon {
  width: 40px;
  color: var(--text-color-1);
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 1024px) {
  .menu {
    position: fixed;
    overflow: hidden;
    top: 0;
    left: 0;
    bottom: 0;
    transition: 0.3s;
    width: 0;
    z-index: 50;
  }

  .menu.show {
    width: 250px;
  }
}
</style>
