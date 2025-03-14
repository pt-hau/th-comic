<script setup lang="ts">
import type { IResponseDataRead } from '@/interfaces/readInterface'

const props = defineProps<{
  isVertical: boolean
  isPage: number
  isTwoPage: boolean
  data: IResponseDataRead | null
}>()
</script>

<template>
  <div class="Read">
    <div v-if="isVertical" class="read-content vertical">
      <div v-for="(item, index) in data?.data.item.chapter_image" :key="index" class="box-image">
        <img
          :src="`${data?.data.domain_cdn}/${data?.data.item.chapter_path}/${item.image_file}`"
          slt="image"
        />
      </div>
    </div>
    <div v-else class="read-content horizontal">
      <div class="box-image">
        <img
          :src="`${data?.data.domain_cdn}/${data?.data.item.chapter_path}/${
            data?.data.item.chapter_image.find((item) => item.image_page === isPage)?.image_file
          }`"
          slt="image"
        />
        <img v-if="isTwoPage"
          :src="`${data?.data.domain_cdn}/${data?.data.item.chapter_path}/${
            data?.data.item.chapter_image.find((item) => item.image_page === isPage+1)?.image_file
          }`"
          slt="image"
        />
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
}

.read-content {
  padding: 0 20px;
}

.read-content.vertical {
  flex-grow: 1;
  overflow-x: auto;
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
  max-width: 50%;
  width: auto;
  object-fit: contain;
}
</style>
