<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps<{
  data: IDataItem[];
}>();
const itemIndex = ref(0)
const autoSlideInterval = ref<number | null>(null)

const nextSlide = () => {
  itemIndex.value = (itemIndex.value + 1) % props.data.length
  resetAutoSlide()
}

const prevSlide = () => {
  itemIndex.value = (itemIndex.value - 1 + props.data.length) % props.data.length
  resetAutoSlide()
}

const startAutoSlide = () => {
  autoSlideInterval.value = window.setInterval(() => {
    nextSlide();
  }, 4000);
}

const stopAutoSlide = () => {
  if(autoSlideInterval.value != null) {
    clearInterval(autoSlideInterval.value);
    autoSlideInterval.value = null;
  }
}

const resetAutoSlide = () => {
  stopAutoSlide()
  startAutoSlide()
}

onMounted(() => {
  startAutoSlide()
})

onBeforeUnmount(() => {
  stopAutoSlide()
})

</script>

<template>
  <div class="banner">
    <div class="content">
      <div class="banner-items">
      <div
        v-for="(item, index) in props.data"
        :key="index"
        :class="['banner-item', { active: index === itemIndex }]"
      >
        <img
          :src="`https://otruyen.cc/_next/image?url=https://img.otruyenapi.com/uploads/comics/${item.thumb_url}&w=1200&q=100`"
          alt="image"
          class="banner-image-bg"
        />
        <div class="overlay">
          <div
            v-if="index === itemIndex"
            class="banner-poster"
            :class="{ animate: index === itemIndex }"
          >
            <div class="banner-poster-shadow"></div>
            <div class="banner-poster-content">
              <img
                :src="`https://otruyen.cc/_next/image?url=https://img.otruyenapi.com/uploads/comics/${item.thumb_url}&w=1200&q=100`"
                alt="image"
              />
            </div>
          </div>
        </div>
        <div class="banner-info">
          <p>Chương: {{ item.chaptersLatest[0].chapter_name }}</p>
          <p>{{ item.name }}</p>
          <p>
            {{ item.origin_name.join(", ") }}
          </p>
          <div class="banner-categories">
            <span v-for="(value, index) in item.category" :key="index" class="banner-category">{{ value.name }}</span>
          </div>
          <div class="banner-buttons">
            <a href="/" class="banner-button">Đọc truyện</a>
            <a :href="'/detail/' + item.slug" class="banner-button">Xem thông tin</a>
          </div>
        </div>
      </div>
      <div class="swiper-buttons">
          <div class="swiper-button" @click="prevSlide">❮</div>
          <div class="swiper-button" @click="nextSlide">❯</div>
        </div>
    </div>
    <div class="banner-description">
      <span>"Website cung cấp truyện tranh miễn phí nhanh chất lượng cao. Nguồn truyện tranh chất lượng cao cập nhật nhanh nhất. API truyện tranh, Data truyện tranh miễn phí"</span>
    </div>
    </div>
  </div>
</template>

<style scoped>
.banner {
  position: relative;
  padding: 100px 0 50px 0;
  width: 100%;
  background-color: var(--bg-banner);
}

.banner-items {
  position: relative;
  width: 100%;
  aspect-ratio: 3;
}

.banner-item {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  opacity: 0;
  transition: 0.5s ease;
  visibility: hidden;
  z-index: 0;
}

.banner-item.active {
  opacity: 1;
  visibility: visible;
  z-index: 1;
}

.banner-image-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(8px);
}

.overlay {
  position: absolute;
  overflow: hidden;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.banner-info {
  position: absolute;
  width: 100%;
  max-width: 600px;
  top: 50%;
  left: 30px;
  color: white;
  transform: translateY(-50%);
}

.banner-info p:first-child {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
}

.banner-info p {
  display: -webkit-box;
  display: box;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.banner-info p:nth-child(2) {
  font-size: 30px;
  font-weight: 600;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  margin-bottom: 15px;
}

.banner-info p:nth-child(3) {
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 10px;
  -webkit-line-clamp: 3;
  line-clamp: 3;
}

.banner-categories {
  display: block;
}

.banner-categories .banner-category {
  margin: 0 3px 6px 0;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 0.3rem 0.5rem;
  line-height: 1;
  border-radius: 0.2rem;
  font-size: 0.8em;
}

.banner-buttons {
  display: block;
  margin-top: 20px;
}

.banner-buttons .banner-button {
  font-weight: 500;
  font-size: 14px;
  line-height: 40px;
  padding: 8px 20px;
  border-radius: 4px;
  margin-right: 10px;
}

.banner-buttons .banner-button:first-child {
  background: #ffd702;
  color: #111;
}

.banner-buttons .banner-button:nth-child(2) {
  background: #fff;
  color: #111;
}

.banner-poster {
  position: absolute;
  top: -70px;
  left: 660px;
  width: 350px;
}

.banner-poster-shadow {
  position: absolute;
  width: 100%;
  top: 0;
  padding-bottom: 148%;
  overflow: hidden;
  background: #eee;
  transform: rotate(15deg);
  border: 20px solid #fff;
  box-shadow: 0 30px 30px rgba(0, 0, 0, 0.2);
}

.banner-poster.animate .banner-poster-content {
  animation: zoomInOut 0.3s linear;
}

.banner-poster.animate .banner-poster-shadow {
  animation: zoomInOutDelay 0.3s linear;
}

.banner-poster-content {
  position: absolute;
  width: 100%;
  padding-bottom: 148%;
  overflow: hidden;
  background: #eee;
  transform: rotate(15deg);
  border: 20px solid #fff;
  box-shadow: 0 30px 30px rgba(0, 0, 0, 0.2);
}

.banner-poster-content img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.banner-description {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.banner-description span{
  color: #fff;
}

@keyframes zoomInOut {
  0% {
    transform: scale(1.1) rotate(15deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.05) rotate(15deg);
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(15deg);
    opacity: 1;
  }
}

@keyframes zoomInOutDelay {
  0% {
    transform: scale(1) rotate(15deg);
    opacity: 0;
  }
  70% {
    transform: scale(1.05) rotate(15deg);
    opacity: 0.2;
  }
  100% {
    transform: scale(1.1) rotate(15deg);
    opacity: 0.1;
  }
}
</style>
