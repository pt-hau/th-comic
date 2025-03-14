<script setup lang="ts">
import type { IChapter } from '@/interfaces/detailInterface'
import router from '@/router';

defineProps<{
  slug: string
  data: IChapter[] | null | undefined
}>()

// const chapterRef = ref<HTMLElement | null>(null)
// const indicatorRef = ref<HTMLSpanElement | null>(null)

// onMounted(() => {
//   const chapter = chapterRef.value
//   const indicator = indicatorRef.value
//   if (!chapter || !indicator) return

//   const links = chapter.querySelectorAll<HTMLDivElement>('.chapter-item')
//   if (!links.length) return

//   const handleMouseEnter = (event: MouseEvent) => {
//     const link = event.currentTarget as HTMLDivElement
//     const { top } = link.getBoundingClientRect()
//     const chapterTop = chapter.getBoundingClientRect().top
//     const linkHeight = link.scrollHeight

//     const scrollOffset = chapter.scrollTop

//     indicator.style.height = `${linkHeight}px`
//     indicator.style.top = `${top - chapterTop + scrollOffset}px`
//     indicator.style.opacity = '1'
//   }

//   const handleMouseLeave = () => {
//     indicator.style.opacity = '0'
//   }

//   links.forEach((link) => link.addEventListener('mouseenter', handleMouseEnter))
//   chapter.addEventListener('mouseleave', handleMouseLeave)

//   return () => {
//     links.forEach((link) => link.removeEventListener('mouseenter', handleMouseEnter))
//     chapter.removeEventListener('mouseleave', handleMouseLeave)
//   }
// })
</script>

<template>
  <div class="chapter">
    <div class="chapter-content">
      <p class="title">Danh sách chương</p>
      <div class="title-line"></div>
      <div v-if="data && data.length > 0">
        <div class="chapter-items">
          <div class="chapter-item" v-for="(item, index) in data[0].server_data" :key="index"   @click="() => router.push('/read/' + slug + '/chapter/' + item.chapter_name)">
            <span>Chương {{ item?.chapter_name }}: {{ item?.filename }}</span>
          </div>
          <!-- <span ref="indicatorRef" class="indicator"></span> -->
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
  background-color: #3c8bc6;
}

.title-line {
  background-color: #3c8bc6;
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
  background-color: #4b4a4a81;
  color: white;
  cursor: pointer;
  position: relative;
  transition: 0.3s;
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

.chapter-item:hover {
  color: #3c8bc6;
  background-color: #ffffff;
}

.chapter-item:hover::before {
  transform: scaleY(1);
}

/* .indicator {
  position: absolute;
  left: 0;
  background-color: #3c8bc6;
  width: 4px;
  transition:
    top 0.3s,
    height 0.3s,
    opacity 0.3s;
  opacity: 0;
} */
</style>
