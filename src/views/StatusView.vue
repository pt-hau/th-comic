<script setup lang="ts">
import DetailCategory from '@/components/DetailCategory.vue'
import ListCardPaginate from '@/components/listPaginate/ListCardPaginate.vue'
import ListPaginate from '@/components/listPaginate/ListPaginate.vue'
import { type } from '@/constants/defaultData'
import { ListService } from '@/services/listService'
import { onMounted, ref } from 'vue'

const dataStatus = ref<IResponseDataStatus>()
const currentPage = ref(1);

function handlePageChange(page: number) {
  currentPage.value = page;
}

const fetchDataStatus = async () => {
  const result = await ListService.getType(type.truyenMoi.id)
  if (result) dataStatus.value = result.data
}

onMounted(() => {
  fetchDataStatus()
})
</script>

<template>
  <main>
    <div class="status">
      <div class="status-content">
        <div class="body">
          <div class="content">
            <div class="body-content">
              <div class="left">
                <p class="title">Sắp ra mắt</p>
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
  </main>
</template>

<style scoped>
.status {
  width: 100%;
  padding: 50px 0;
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
