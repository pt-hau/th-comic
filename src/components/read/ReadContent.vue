<script setup lang="ts">
import type { IResponseDataRead } from '@/interfaces/readInterface'
import { nextTick, onMounted, watch, ref } from 'vue'
import LoadingView from '@/components/LoadingView.vue'
import { useRoute } from 'vue-router';

const props = defineProps<{
  isVertical: boolean
  page: number
  isTwoPage: boolean
  data: IResponseDataRead | null
  updatePage: (value: number) => void
}>()

const route = useRoute()

const loadingStatus = ref<{ [key: number]: boolean }>({})

const handleImageLoad = (index: number) => {
  loadingStatus.value[index] = true
}

const handleScroll = (e: Event) => {
  if (!props.isTwoPage) return

  const readContent = e.target as HTMLElement
  const images = readContent.querySelectorAll<HTMLImageElement>('box-image img')

  let closestImageIndex = 0
  let closestDistance = Infinity

  images.forEach((img, index) => {
    const rect = img.getBoundingClientRect()
    const distance = Math.abs(rect.top)

    if (distance < closestDistance) {
      closestDistance = distance
      closestImageIndex = index
    }
  })

  props.updatePage(closestImageIndex + 1)
}

const scrollToCurrentPage = () => {
  if (props.isVertical && props.page) {
    nextTick(() => {
      const targetElement = document.getElementById(`image-${props.page}`)

      if (targetElement) {
        const img = targetElement.querySelector('img')

        if (img && img.complete) {
          targetElement.scrollIntoView({ behavior: 'auto', block: 'start' })
        } else {
          setTimeout(scrollToCurrentPage, 100)
        }
      }
    })
  }
}

onMounted(scrollToCurrentPage)

watch(
  () => props.isVertical,
  (newVal) => {
    if (newVal) {
      scrollToCurrentPage()
    }
  }
)

watch(
  () => route.params.id,
  () => {
    scrollToCurrentPage
  }
)
</script>

<template>
  <div class="Read">
    <div v-if="isVertical" class="read-content vertical" @scroll="handleScroll">
      <div
        v-for="(item, index) in data?.data.item.chapter_image"
        :key="index"
        class="box-image"
        :id="`image-${index + 1}`"
      >
        <LoadingView v-if="!loadingStatus[index]" />
        <img
          v-show="loadingStatus[index]"
          :src="`${data?.data.domain_cdn}/${data?.data.item.chapter_path}/${item.image_file}`"
          alt="image"
          @load="handleImageLoad(index)"
        />
      </div>
    </div>

    <div v-else class="read-content horizontal">
      <div :class="`box-image ${props.isTwoPage ? 'two-page' : ''}`">
        <template v-if="props.isTwoPage">
          <LoadingView v-if="!loadingStatus[props.page]" />
          <img
            v-show="loadingStatus[props.page]"
            :src="`${data?.data.domain_cdn}/${data?.data.item.chapter_path}/${
              data?.data.item.chapter_image.find((item) => item.image_page === props.page)
                ?.image_file
            }`"
            alt="image"
            @load="handleImageLoad(props.page)"
          />

          <LoadingView v-if="!loadingStatus[props.page + 1]" />
          <img
            v-show="loadingStatus[props.page + 1]"
            :src="`${data?.data.domain_cdn}/${data?.data.item.chapter_path}/${
              data?.data.item.chapter_image.find((item) => item.image_page === props.page + 1)
                ?.image_file
            }`"
            alt="image"
            @load="handleImageLoad(props.page + 1)"
          />
        </template>

        <template v-else>
          <LoadingView v-if="!loadingStatus[props.page]" />
          <img
            v-show="loadingStatus[props.page]"
            :src="`${data?.data.domain_cdn}/${data?.data.item.chapter_path}/${
              data?.data.item.chapter_image.find((item) => item.image_page === props.page)
                ?.image_file
            }`"
            alt="image"
            @load="handleImageLoad(props.page)"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.Read {
  flex-grow: 1;
  position: relative;
  min-height: 0;
  min-width: 0;
  display: flex;
  overflow-y: hidden;
}

.read-content {
  flex: 1;
  padding: 0 20px;
}

.read-content.vertical {
  flex-grow: 1;
  overflow-x: auto;
  overflow-x: hidden;
  height: 100vh;
}

.read-content.vertical .box-image {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.read-content.vertical img {
  width: 100%;
  max-width: 700px;
  object-fit: contain;
}

.read-content.horizontal {
  flex-grow: 1;
}

.read-content.horizontal .box-image {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: auto;
  gap: 10px;
}

.read-content.horizontal img {
  height: 100%;
  width: auto;
  object-fit: contain;
}

.read-content.horizontal .two-page img {
  max-width: 40%;
}
</style>
