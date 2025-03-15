<script setup lang="ts">
import type { ICategory } from '@/interfaces/detailInterface'
import router from '@/router';
import { ListService } from '@/services/listService'
import { onMounted, ref } from 'vue'

defineProps<{
  data: ICategory[] | null | undefined
}>()

const categories = ref<IResponseDataCategory[] | null>(null)

const fetchCategories = async () => {
  const result = await ListService.getCategories()
  categories.value = result.data.data.items
}

onMounted(() => {
  fetchCategories()
})
</script>

<template>
  <div class="category">
    <div class="category-content">
      <p class="title">Thể loại</p>
      <div class="title-line"></div>
      <div class="category-items">
        <div
        @click="router.push(`/the-loai/${item.slug}`)"
          :class="['category-item', { some: data?.some((i) => i.id === item._id) }]"
          v-for="(item, index) in categories"
          :key="index"
        >
          <span>{{ item?.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category {
  width: 100%;
  position: relative;
}

.category-content {
  width: 100%;
  position: relative;
}

.title {
  display: inline-block;
  font-size: 32px;
  font-weight: 700;
  position: relative;
  color: white;
}

.title-line {
  background-color: #4d4c4c;
  width: 100%;
  height: 1px;
}

.category-items {
  margin-top: 20px;
  width: 100%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.category-item {
  padding: 5px 10px;
  margin-bottom: 1px;
  background-color: #4b4a4a81;
  color: white;
  cursor: pointer;
  position: relative;
  transition: 0.3s;
  border-radius: 4px;
}

.some {
  background-color: goldenrod;
}

.category-item:hover {
  color: #3c8bc6;
  background-color: #ffffff;
}

.chapter-item:hover::before {
  transform: scaleY(1);
}
</style>
