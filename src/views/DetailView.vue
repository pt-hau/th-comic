<script setup lang="ts">
import DetailBanner from '@/components/detail/DetailBanner.vue'
import DetailCategory from '@/components/DetailCategory.vue'
import DetailChapter from '@/components/detail/DetailChapter.vue'
import DetailOther from '@/components/detail/DetailOther.vue'
import IconLineBg from '@/components/icons/IconLineBg.vue'
import { type } from '@/constants/defaultData'
import type { IItem } from '@/interfaces/detailInterface'
import { DetailServices } from '@/services/detailServices'
import { ListService } from '@/services/listService'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import LoadingView from '@/components/LoadingView.vue'

const detailData = ref<IItem | null>(null)
const route = useRoute()
const id = route.params.id as string
const dataOther = ref([])
const isLoad = ref(false)

const fetchOther = async () => {
  const result = await ListService.getType(type.truyenMoi.id)
  if (result) dataOther.value = result.data.data.items
}

const fetchDetail = async () => {
  isLoad.value = false
  const result = await DetailServices.getDetail(id)
  if (result) detailData.value = result.data.data.item
  setTimeout(()=>(isLoad.value = true),500)
}

onMounted(() => {
  fetchDetail()
  fetchOther()
})
</script>

<template>
  <main>
    <div class="detail">
      <div class="load" v-if="!isLoad">
        <LoadingView />
      </div>
      <div class="detail-content">
        <DetailBanner :data="detailData" />
        <IconLineBg />
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
        <DetailOther :data="dataOther" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.detail {
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
  position: relative;
}

.load {
  width: 100vw;
  height: 100vh;
  padding-top: 50px;
  position: fixed;
  z-index: 2;
}

.detail-content {
  width: 100%;
  position: relative;
}

.body {
  width: 100%;
  position: relative;
}

.body-content {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 20px;
}
</style>
