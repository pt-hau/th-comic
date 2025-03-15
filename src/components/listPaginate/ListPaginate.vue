<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  totalPages: number | undefined | null;
  currentPage: number;
  onPageChange: (value: number) => void;
}

const props = defineProps<Props>();

const getPagination = (totalPages: number, currentPage: number, maxVisiblePages = 5) => {
  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => (i + 1));
  }

  const pagination: string[] = [];
  pagination.push("1");

  if (currentPage > 3) {
    pagination.push("...");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);
  for (let i = start; i <= end; i++) {
    pagination.push(i.toString());
  }

  if (currentPage < totalPages - 2) {
    pagination.push("...");
  }

  pagination.push(totalPages.toString());

  return pagination;
};

const pagination = computed(() => getPagination(props.totalPages ? props.totalPages : 1, props.currentPage));
</script>

<template>
  <div class="pagination">
    <div
      v-for="(page, index) in pagination"
      :key="index"
      :class="[
        'pagination-item',
        page === props.currentPage ? 'pagination-active' : '',
        page === '...' ? 'pagination-dots' : ''
      ]"
      @click="page !== '...' && props.onPageChange(Number(page))"
    >
      {{ page }}
    </div>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.pagination-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid #e5e7eb;
  color: #d1d5db;
  transition: background-color 0.3s, color 0.3s;
}

.pagination-active, .pagination-item:hover {
  background-color: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

.pagination-dots {
  cursor: default;
  color: #6b7280;
}
</style>
