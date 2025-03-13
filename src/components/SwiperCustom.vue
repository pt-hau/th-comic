<script setup lang="ts">
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import { ref } from 'vue'
import type { Swiper as SwiperType } from 'swiper'

const props = defineProps<{ name: string, numberShow: number; data: IDataItem[] }>()

const swiperRef = ref<SwiperType | null>(null)

const onSwiper = (swiper: SwiperType) => {
  swiperRef.value = swiper
}

const slideNext = () => swiperRef.value?.slideNext()
const slidePrev = () => swiperRef.value?.slidePrev()
</script>

<template>
  <div class="swiper-content">
    <div class="title"><p>{{ props.name }}</p></div>
    <div class="swiper-buttons">
      <div class="swiper-button" @click="slidePrev">❮</div>
      <div class="swiper-button" @click="slideNext">❯</div>
    </div>
    <swiper
      :slides-per-view="props.numberShow"
      :space-between="10"
      :loop="true"
      :grab-cursor="true"
      @swiper="onSwiper"
      class="swiper-swiper"
    >
      <swiper-slide v-for="(item,index) in props.data" :key="index">
        <slot :item="item" :index="index" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>
.swiper-content {
  position: relative;
}

.swiper-buttons {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  gap: 5px;
}

.swiper-swiper {
  width: 100%;
  padding: 20px 0;
}

.custom-prev-btn:hover,
.custom-next-btn:hover {
  background-color: #555;
}

.swiper-content .title p {
  font-size: 24px;
  font-weight: 600;
  color: white;
}

.swiper-swiper {
  margin-top: 10px;
}

.swiper-item {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
}

.swiper-item .item-left {
  position: absolute;
  display: flex;
  align-items: center;
  bottom: 0;
  left: 40px;
  height: 40px;
  width: 100%;
  transform: rotate(-90deg);
  transform-origin: bottom left;
}

.swiper-item .item-left span:first-child {
  font-size: 30px;
  line-height: 1.3em;
  color: white;
  font-weight: 700;
  min-width: 60px;
}

.swiper-item .item-left span:nth-child(2) {
  font-size: 14px;
  color: white;
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  line-height: normal;
  text-overflow: ellipsis;
}

.swiper-item .item-right {
  position: absolute;
  bottom: 0;
  left: 40px;
  top: 0;
  right: 0;
  height: 100%;
}
</style>
