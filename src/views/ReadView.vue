<script setup lang="ts">
import ReadContent from '@/components/read/ReadContent.vue'
import ReadMenu from '@/components/read/ReadMenu.vue'
import ReadMenuBottom from '@/components/read/ReadMenuBottom.vue'
import type { IItem } from '@/interfaces/detailInterface'
import type { IResponseDataRead } from '@/interfaces/readInterface'
import { DetailServices } from '@/services/detailServices'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const detailData = ref<IItem | null>(null)
const detailDataRead = ref<IResponseDataRead | null>(null)
const route = useRoute()
const slug = route.params.slug as string
const id = computed(() => route.params.id as string)
const total = ref<number | null | undefined>(null)
const isVertical = ref(false)
const page = ref(1)
const isTwoPage = ref(false)


const fetchDetail = async () => {
  const result = await DetailServices.getDetail(slug)
  if (result) {
    detailData.value = result.data.data.item
  }
}

const fetchDataRead = async (url: string) => {
  page.value = 1
  const result = await DetailServices.getDataRead(url)
  if (result) {
    detailDataRead.value = result.data
    total.value = detailDataRead.value?.data.item.chapter_image.length
  }
}

onMounted(() => {
  fetchDetail()
})

//action
const handlePrev = () => {
  if(page.value > 2 && isTwoPage.value) {
    page.value = page.value -2
  }
  if (page.value > 1 && !isTwoPage.value) {
    page.value--
  }
}

const handleNext = () => {
  if(total.value && page.value < (total.value - 1) && isTwoPage.value) {
    page.value = page.value +2
  }
  if (total.value && page.value < total.value && !isTwoPage.value) {
    page.value++
  }
}

const handleChangeIsTwoPage = (value: boolean) => {
  isTwoPage.value = value
  if(page.value % 2 === 0) {
    page.value --
  }
}

const handleChangeVertical = (value: boolean) => {
  isVertical.value = value
}

watch([() => route.params.id, () => detailData.value], ([newId, newDetailData]) => {
  if (newDetailData) {
    const url = newDetailData.chapters[0].server_data.find((item) => item.chapter_name === newId)
    if (url) {
      fetchDataRead(url.chapter_api_data)
    }
  }
})
</script>

<template>
  <main class="read">
    <div class="read-content">
      <ReadMenu :id="id" :slug="slug" :name="detailData?.name" :data="detailData?.chapters" :isVertical="isVertical" :handleChangeVertical="handleChangeVertical"/>
      <div class="body">
        <ReadContent :isPage="page" :isVertical="isVertical" :data="detailDataRead" :isTwoPage="isTwoPage"/>
        <ReadMenuBottom
          v-if="!isVertical"
          :page="page"
          :isTwoPage="isTwoPage"
          :total="total"
          :handlePrev="handlePrev"
          :handleNext="handleNext"
          :isVertical="isVertical"
          :handleChangeVertical="handleChangeVertical"
          :handleChangeIsTwoPage="handleChangeIsTwoPage"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
.read {
  flex-grow: 1;
}

.read-content {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
}

.body {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
