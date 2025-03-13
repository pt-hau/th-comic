<template>
  <!-- Nền mờ -->
  <transition name="fade">
    <div v-show="showSearch" class="modal-search" @click.self="closeModal">
      <!-- Nội dung modal -->
      <transition name="slide-up">
        <div v-show="showSearch" class="modal-search-content">
          <h2>Search</h2>
          <p>Đây là phần nội dung của Modal</p>
          <button @click="closeModal">Đóng</button>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { inject, type Ref } from 'vue';

const showSearch = inject('showSearch') as Ref<boolean>;

const closeModal = () => {
  if (showSearch) showSearch.value = false;
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave-from {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: transform 0.3s, opacity 0.3s;
}
.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}
.slide-up-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.modal-search {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.267);
  z-index: 1000;
}

.modal-search-content {
  backdrop-filter: blur(5px);
  border-radius: 8px;
  border: 1px solid rgb(226, 219, 219);
  background-color: rgba(255, 255, 255, 0.055);
  padding: 20px;
  max-width: 600px;
  width: 100%;
}
</style>
