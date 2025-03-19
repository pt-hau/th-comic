<script setup lang="ts">
defineProps<{
  page: number
  isTwoPage: boolean
  total: number | null | undefined
  isVertical: boolean
  handlePrev: () => void
  handleNext: () => void
  handleChangeVertical: (value: boolean) => void
  handleChangeIsTwoPage: (value: boolean) => void
}>()
</script>

<template>
  <div class="bottom">
    <div class="bottom-content">
      <div class="action">
        <div
          :class="`action-span tooltip-container ${isTwoPage ? 'active' : ''}`"
          @click="() => handleChangeIsTwoPage(true)"
        >
        <div class="tooltip-text">Hiển thị hai trang</div>
          <span></span><span></span>
        </div>
        <div
          :class="`action-span tooltip-container ${!isTwoPage ? 'active' : ''}`"
          @click="() => handleChangeIsTwoPage(false)"
        >
        <div class="tooltip-text tooltip-text-center">Hiển thị một trang</div>
          <span></span>
        </div>
      </div>
      <div class="button" @click="handlePrev">
        <span class="icon">❮</span><span class="text">Trang trước</span>
      </div>
      <div class="page">
        <span
          >{{ page < 10 ? '0' : '' }}{{ page }} {{ isTwoPage ? (page < 9 ? '- 0' : '- ') : null
          }}{{ isTwoPage ? page + 1 : null }} {{ '/' }} {{ total && total < 10 ? '0' : ''
          }}{{ total ? total : "..." }}</span
        >
      </div>
      <div class="button" @click="handleNext">
        <span class="text">Trang sau</span><span class="icon">❯</span>
      </div>
      <div class="action"></div>
    </div>
  </div>
</template>

<style scoped>
.bottom {
  height: 50px;
  min-height: 50px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 0 20px;
  box-sizing: border-box;
}

.dark .bottom {
  background-color: rgba(0, 0, 0, 0.5);
}

.bottom-content {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin: auto;
}

.button {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.icon {
  color: var(--title-color);
  font-size: 26px;
  font-weight: 600;
}

.text {
  color: var(--text-color-1);
  font-weight: 600;
  font-size: 18px;
  transition: 0.3s;
}

.text:hover {
  color: var(--title-color);
}

.page span {
  color: var(--text-color-2);
  font-weight: 700;
  font-size: 18px;
}

.action {
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.action-span {
  display: flex;
  justify-content: center;
  gap: 2px;
  width: 22px;
  position: relative;
  padding-bottom: 5px;
  transition: 0.3s;
  cursor: pointer;
}

.action-span::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 22px;
  height: 2px;
  border-radius: 2px;
  background-color: var(--title-color);
  transform: scaleX(0);
  transition: 0.3s;
}

.action-span:hover::before {
  transform: scaleX(1);
}

.action-span span {
  width: 10px;
  height: 16px;
  border-radius: 2px;
  background-color: rgba(172, 169, 169, 0.322);
  transition: 0.3s;
}

.action-span.active span {
  background-color: var(--title-color);
}

@media (max-width: 768px) {
.icon {
  font-size: 22px;
}

.text {
  font-size: 16px;
}

.page span {
  font-size: 16px;
}
}

@media (max-width: 640px) {
.icon {
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text {
  display: none;
}

}
</style>
