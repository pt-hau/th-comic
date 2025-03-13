<script setup lang="ts">
import DetailBanner from '@/components/detail/DetailBanner.vue'
import DetailCategory from '@/components/detail/DetailCategory.vue'
import DetailChapter from '@/components/detail/DetailChapter.vue'
import IconLineBg from '@/components/icons/IconLineBg.vue'
import type { IItem } from '@/interfaces/detailInterface'
import { DetailServices } from '@/services/detailServices'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const detailData = ref<IItem | null>(null)
const route = useRoute()
const id = route.params.id as string
const fetchDetail = async () => {
  const result = await DetailServices.getDetail(id)
  if (result) detailData.value = result.data.data.item
}

onMounted(() => {
  fetchDetail()
})
</script>

<template>
  <main>
    <div class="detail">
      <div class="detail-content">
        <div class="content">
          <DetailBanner :data="detailData" />
          <IconLineBg />
          <div class="detail-body">
            <div class="left">
              <DetailChapter :data="detailData?.chapters" />
            </div>
            <div class="right">
              <DetailCategory :data="detailData?.category" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.detail {
  width: 100%;
}

.detail-content {
  width: 100%;
  position: relative;
}

.detail-body {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 20px;
}
</style>
