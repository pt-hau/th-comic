<script setup lang="ts">
import { inject } from 'vue';

const props = defineProps<{
  background?: string
}>();
const isDarkMode = inject('isDarkMode')
</script>

<template>
  <div class="loading" :style="`background-color: ${props.background ?? (isDarkMode ? '#111111' : '#F5F0E1')}`">
    <div class="box-img">
      <img src="/images/image-load.png" alt="load img" />
    </div>
  </div>
</template>

<style scoped>
.loading {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box-img {
  height: 30%;
  aspect-ratio: 3/4;
  perspective: 1000px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform-style: preserve-3d;
  animation: rotate360 2s infinite;
  border-radius: 4px;
  border: 2px solid white;
}

@keyframes rotate360 {
  0% {
    transform: rotateY(0deg);
  }

  100% {
    transform: rotateY(360deg);
  }
}
</style>
