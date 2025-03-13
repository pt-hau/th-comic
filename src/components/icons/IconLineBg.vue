<template>
  <div class="wave-container">
    <svg
      class="wave"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 200"
      preserveAspectRatio="none"
    >
      <path
        d="M 0 0 H 800 V 120 Q 700 250 600 120 Q 500 40 400 120 Q 300 250 200 120 Q 100 40 0 120 Z"
        fill="#111111c5"
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
