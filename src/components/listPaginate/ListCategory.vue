<script setup lang="ts">
import DetailCategory from '@/components/DetailCategory.vue'
import ListCardPaginate from '@/components/listPaginate/ListCardPaginate.vue'
import ListPaginate from '@/components/listPaginate/ListPaginate.vue'
import type { ICategory } from '@/interfaces/detailInterface'
import { ListService } from '@/services/listService'
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  name: string
  route: string
}>()
const data = ref<IResponseDataStatus>()
const currentPage = ref(1);
function handlePageChange(page: number) {
  currentPage.value = page;
}

const fetchData = async () => {
  const result = await ListService.getCategoryPage(props.route , currentPage.value)
  if (result) data.value = result.data
}

const handleScroll = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  fetchData()
})

watch(() => props.route, () => {
  currentPage.value = 1
  handleScroll()
  fetchData()
})

watch(() => currentPage.value, () => {
  fetchData()
  handleScroll()
})
</script>

<template>
    <div class="status">
      <div class="status-content">
        <div class="body">
          <div class="content">
            <div class="body-content">
              <div class="left">
                <p class="title">{{ props.name }} ❯ {{ data?.data.seoOnPage.titleHead }}</p>
                <ListCardPaginate :data="data" />
                <ListPaginate
                  :totalPages="data?.data.params.pagination.pageRanges"
                  :currentPage="currentPage"
                  :onPageChange="handlePageChange"
                />
              </div>
              <div class="right">
                <DetailCategory :data="[{
                  id: data?.data.type_list,
                  slug: data?.data.type_list,
                  name: data?.data.type_list
                }] as ICategory[]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.status {
  width: 100%;
  padding: 80px 0;
}

.status-content {
  width: 100%;
  position: relative;
}

.body {
  width: 100%;
  position: relative;
}

.body-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.title {
  font-size: 30px;
  color: white;
  font-weight: 600;
}
</style>
