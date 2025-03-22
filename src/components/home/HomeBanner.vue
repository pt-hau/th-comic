<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import LoadingView from '../LoadingView.vue'

const props = defineProps<{
  data: IDataItem[]
}>()
const itemIndex = ref(0)
const aaa = reactive({})
const autoSlideInterval = ref<number | null>(null)
const loadedImages = ref<boolean[]>([])

const onImageLoad = (index: number) => {
  loadedImages.value[index] = true
}

watch(
  () => props.data,
  (newData) => {
    loadedImages.value = new Array(newData.length).fill(false)
  },
  { immediate: true }
)

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
    nextSlide()
  }, 4000)
}

const stopAutoSlide = () => {
  if (autoSlideInterval.value != null) {
    clearInterval(autoSlideInterval.value)
    autoSlideInterval.value = null
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
        <div class="load" v-if="data.length == 0">
          <LoadingView />
        </div>
        <div
          v-else
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
                <div v-if="!loadedImages[index]" class="loading image"><LoadingView /></div>
                <img
                  v-show="loadedImages[index]"
                  :src="`https://otruyen.cc/_next/image?url=https://img.otruyenapi.com/uploads/comics/${item.thumb_url}&w=1200&q=100`"
                  alt="image"
                  @load="onImageLoad(index)"
                  class="image"
                />
              </div>
            </div>
          </div>
          <div class="banner-info">
            <p>
              Chương:  {{ aaa }}
              {{ item.chaptersLatest ? item.chaptersLatest[0].chapter_name : 'Đang cập nhật' }}
            </p>
            <p>{{ item.name }}</p>
            <p>
              {{ item.origin_name.join(', ') }}
            </p>
            <div class="banner-categories">
              <span v-for="(value, index) in item.category" :key="index" class="banner-category">{{
                value.name
              }}</span>
            </div>
            <div class="banner-buttons">
              <a :href="`/doc/${item.slug}/chuong/1`" class="banner-button button-read">Đọc truyện</a>
              <a :href="'/chi-tiet/' + item.slug" class="banner-button button-info">Xem thông tin</a>
            </div>
          </div>
        </div>
        <div class="swiper-buttons">
          <div class="swiper-button" @click="prevSlide">❮</div>
          <div class="swiper-button" @click="nextSlide">❯</div>
        </div>
      </div>
      <div class="banner-description">
        <span
          >"Website cung cấp truyện tranh miễn phí nhanh chất lượng cao. Nguồn truyện tranh chất
          lượng cao cập nhật nhanh nhất. API truyện tranh, Data truyện tranh miễn phí"</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.load {
  z-index: 4;
  width: 100%;
  height: 100%;
  position: absolute;
}
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
  max-width: 55%;
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
  line-height: 1.2em;
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
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

.banner-categories {
  display: block;
}

.banner-categories .banner-category {
  margin: 0 2px 2px 0;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 0.1rem 0.5rem;
  border-radius: 0.2rem;
  display: inline-block;
  font-size: 0.8em;
}

.banner-buttons {
  display: block;
  margin-top: 20px;
}

.banner-buttons .banner-button {
  font-weight: 500;
  font-size: 14px;
  padding: 8px 20px;
  border-radius: 4px;
  margin-right: 10px;
}

.banner-poster {
  position: absolute;
  top: -20%;
  left: 60%;
  width: 30%;
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

.banner-poster-content .image {
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

.banner-description span {
  color: var(--text-color-1);
}

@media (max-width: 1080px) {
  .banner-items {
    aspect-ratio: 9/4;
  }

  .banner-poster {
    position: absolute;
    top: -5%;
    left: 60%;
    width: 30%;
  }

  .banner-info {
    left: 20px;
  }

  .banner-info p:first-child {
    font-size: 14px;
  }

  .banner-info p:nth-child(2) {
    font-size: 24px;
  }

  .banner-info p:nth-child(3) {
    font-size: 12px;
  }

  .banner-buttons {
    display: block;
    margin-top: 10px;
  }

  .banner-buttons .banner-button {
    font-weight: 500;
    font-size: 13px;
  }
}

@media (max-width: 768px) {
  .banner-items {
    aspect-ratio: 2;
  }

  .banner-poster {
    position: absolute;
    top: 5%;
    left: 70%;
    width: 30%;
  }

  .banner-info {
    max-width: 65%;
  }

  .banner-poster-content,
  .banner-poster-shadow {
    border: 5px solid #fff;
  }

  .banner-info p:first-child {
    font-size: 12px;
  }

  .banner-info p:nth-child(3) {
    display: none;
  }

  .banner-buttons .banner-button {
    font-size: 12px;
  }

  .banner-categories .banner-category {
    display: none;
  }
}

@media (max-width: 640px) {
  .banner-info p:nth-child(2) {
    font-size: 18px;
  }
  .banner-info p:nth-child(1) {
    display: none;
  }

  .banner-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  .banner-buttons .banner-button {
    width: max-content;
    height: max-content;
    padding: 5px 10px;
  }

  .banner-description {
    font-size: 12px;
  }
}

@media (max-width: 540px) {
  .banner-info p:nth-child(2) {
    font-size: 16px;
  }
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
