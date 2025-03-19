<script setup lang="ts">
import DetailCategory from '@/components/DetailCategory.vue'
import ListCardPaginate from '@/components/listPaginate/ListCardPaginate.vue'
import ListPaginate from '@/components/listPaginate/ListPaginate.vue'
import { ListService } from '@/services/listService'
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  name: string
  route: string
}>()
const dataStatus = ref<IResponseDataStatus>()
const currentPage = ref(1);

function handlePageChange(page: number) {
  currentPage.value = page;
}

const fetchDataStatus = async () => {
  const result = await ListService.getTypePage(props.route , currentPage.value)
  if (result) dataStatus.value = result.data
  handleScroll()
}

const handleScroll = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  fetchDataStatus()
})

watch(() => currentPage.value, () => {
  fetchDataStatus()
})
</script>

<template>
    <div class="status">
      <div class="status-content">
        <div class="body">
          <div class="content">
            <div class="body-content">
              <div class="left">
                <p class="title-content">{{ props.name }}</p>
                <ListCardPaginate :data="dataStatus" />
                <ListPaginate
                  :totalPages="dataStatus?.data.params.pagination.pageRanges"
                  :currentPage="currentPage"
                  :onPageChange="handlePageChange"
                />
              </div>
              <div class="right">
                <DetailCategory :data="null" />
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
  color: var(--title-color);
  font-weight: 700;
}

@media (max-width: 768px) {
  .body-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
}
</style>
