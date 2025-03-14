<script setup lang="ts">
import DetailBanner from '@/components/detail/DetailBanner.vue'
import DetailCategory from '@/components/detail/DetailCategory.vue'
import DetailChapter from '@/components/detail/DetailChapter.vue'
import DetailOther from '@/components/detail/DetailOther.vue'
import IconLineBg from '@/components/icons/IconLineBg.vue'
import { type } from '@/constants/defaultData'
import type { IItem } from '@/interfaces/detailInterface'
import { DetailServices } from '@/services/detailServices'
import { ListService } from '@/services/listService'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const detailData = ref<IItem | null>(null)
const route = useRoute()
const id = route.params.id as string
const dataOther = ref([])

const fetchOther = async () => {
  const result = await ListService.getType(type.truyenMoi.id)
  if (result) dataOther.value = result.data.data.items
}

const fetchDetail = async () => {
  const result = await DetailServices.getDetail(id)
  if (result) detailData.value = result.data.data.item
}

onMounted(() => {
  fetchDetail()
  fetchOther()
})
</script>

<template>
  <main>
    <div class="detail">
      <div class="detail-content">
        <DetailBanner :data="detailData" />
        <div class="body">
          <div class="content">
          <div class="body-content">
            <div class="left">
              <DetailChapter :slug="id" :data="detailData?.chapters" />
            </div>
            <div class="right">
              <DetailCategory :data="detailData?.category" />
            </div>
          </div>
        </div>
        </div>
        <IconLineBg />
        <DetailOther :data="dataOther" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.detail {
  width: 100%;
  padding-bottom: 50px;
}

.detail-content {
  width: 100%;
  position: relative;
}

.body {
  width: 100%;
  position: relative;
  background-color: var(--bg-banner);
}

.body-content {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 20px;
}
</style>
