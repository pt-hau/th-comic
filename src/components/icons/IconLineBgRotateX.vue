<template>
  <div class="wave-container">
    <svg
      class="wave wave-flipped"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 200"
      preserveAspectRatio="none"
    >
      <path
        d="M 0 200 H 800 V 80 Q 700 -50 600 80 Q 500 160 400 80 Q 300 -50 200 80 Q 100 160 0 80 Z"
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
  transform: rotateY(180deg);
}

.wave {
  width: 200%;
  height: 100%;
  animation: wave-animation-reverse 5s linear infinite;
}

/* Animation ngược chiều để tạo hiệu ứng zic-zac */
@keyframes wave-animation-reverse {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0%);
  }
}
</style>
