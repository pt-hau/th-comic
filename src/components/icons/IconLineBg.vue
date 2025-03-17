<script setup lang="ts">
import { inject } from 'vue'
const isDarkMode = inject('isDarkMode')

</script>

<template>
  <div class="wave-container">
    <svg
      class="wave"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 200"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="wave-gradient-light" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#e9dbc7" />
          <stop offset="100%" stop-color="#F5F0E1" />
        </linearGradient>

        <linearGradient id="wave-gradient-dark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#1f1f1f" />
          <stop offset="100%" stop-color="#2c2c2c" />
        </linearGradient>

        <mask id="wave-mask">
          <path
            d="M 0 0 H 800 V 120 Q 700 250 600 120 Q 500 40 400 120 Q 300 250 200 120 Q 100 40 0 120 Z"
            fill="white"
          />
        </mask>
      </defs>
      <rect
        width="800"
        height="200"
        :fill="isDarkMode ? 'url(#wave-gradient-dark)' : 'url(#wave-gradient-light)'"
        mask="url(#wave-mask)"
      />
    </svg>
  </div>
</template>

<style scoped>
.wave-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100px;
  background: transparent;
}

.wave {
  width: 200%;
  height: 100%;
  animation: wave-animation 5s linear infinite;
}

@keyframes wave-animation {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
