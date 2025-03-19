<script setup lang="ts">
import type { IChapter } from '@/interfaces/detailInterface'
import router from '@/router'
import { ref } from 'vue'
import IconSearch from '../icons/IconSearch.vue'

defineProps<{
  slug: string
  data: IChapter[] | null | undefined
}>()

const searchQuery = ref('')

const handleSearch = () => {
  const chapterContainer = document.querySelector('.chapter-items') as HTMLElement | null
  if (!chapterContainer) return

  const chapterItems = Array.from(
    chapterContainer.querySelectorAll('.chapter-item')
  ) as HTMLElement[]
  const targetItem = chapterItems.find((item) => item.id.includes(searchQuery.value.trim()))

  if (targetItem) {
    chapterContainer.scrollTo({
      top: targetItem.offsetTop,
      behavior: 'smooth'
    })
  }
}
</script>

<template>
  <div class="chapter">
    <div class="chapter-content">
      <p class="title">Danh sách chương</p>
      <div class="title-line"></div>
      <div class="search">
        <input
          class="search-input"
          v-model="searchQuery"
          @input="handleSearch"
          placeholder="Tìm chương, ví dụ: 124"
        />
        <div class="search-icon"><IconSearch /></div>
      </div>
      <div v-if="data && data.length > 0">
        <div class="chapter-items">
          <div
            :id="item.chapter_name"
            :class="`chapter-item ${searchQuery === item.chapter_name ? 'isSearch' : ''}`"
            v-for="(item, index) in data[0].server_data"
            :key="index"
            @click="() => router.push('/doc/' + slug + '/chuong/' + item.chapter_name)"
          >
            <span>Chương {{ item?.chapter_name }}: {{ item?.filename }}</span>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="chapter-items">
          <div class="chapter-item-null">Dữ liệu đang được cập nhật!</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chapter {
  width: 100%;
  position: relative;
}

.chapter-content {
  width: 100%;
  position: relative;
}

.title {
  display: inline-block;
  padding: 5px 20px;
  font-size: 22px;
  font-weight: 600;
  position: relative;
  color: white;
  border-radius: 8px 8px 0 0;
  background-color: var(--title-color);
}

.title-line {
  background-color: var(--title-color);
  border-radius: 0 8px 0 0;
  width: 100%;
  height: 4px;
}

.chapter-items {
  width: 100%;
  max-height: 500px;
  overflow-y: auto;
  position: relative;
}

.chapter-item {
  padding: 10px;
  margin-bottom: 1px;
  background-color: var(--bg-banner);
  color: var(--text-color-1);
  cursor: pointer;
  position: relative;
  min-height: 25px;
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
  color: #3c8bc6;
  background-color: #ffffff;
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
</style>
