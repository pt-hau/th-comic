<script setup lang="ts">
import type { IItem } from '@/interfaces/detailInterface'
import { ref } from 'vue'
import LoadingView from '../LoadingView.vue'

defineProps<{
  data: IItem | null
}>()

const loadImage = ref(false)

const handleLoadImage = () => {
  loadImage.value = true
}
</script>

<template>
  <div class="banner">
    <div class="content">
      <div class="banner-content">
        <div class="image">
          <LoadingView class="img-card" v-if="!loadImage" />
          <img
            v-show="loadImage"
            :src="`https://otruyen.cc/_next/image?url=https://img.otruyenapi.com/uploads/comics/${data?.thumb_url}&w=1200&q=100`"
            alt="image"
            class="img-card"
            @load="handleLoadImage"
          />
        </div>
        <div class="info">
          <p class="name">{{ data?.name }}</p>
          <div class="info-col">
            <span class="title">Tác giả </span>
            <span class="author"> {{ data?.author.join(', ') }}</span>
          </div>
          <div class="info-col">
            <span class="title">Trạng thái </span><span class="status"> {{ data?.status }}</span>
          </div>
          <div class="info-col">
            <span class="title">Thể loại </span>
            <div class="category">
              <span v-for="(value, index) in data?.category" :key="index">{{ value.name }}</span>
            </div>
          </div>
          <div class="info-col">
            <a :href="`/doc/${data?.slug}/chuong/1`" class="read button-read">Đọc truyện</a>
          </div>
          <p class="description" v-html="data?.content"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.banner {
  width: 100%;
  padding: 100px 0 50px 0;
  position: relative;
  background-color: var(--bg-banner);
}

.banner-content {
  display: flex;
  gap: 20px;
  width: 100%;
}

.image {
  min-width: 220px;
  max-width: 220px;
  height: max-content;
  border-radius: 10px;
  border: 3px solid white;
  overflow: hidden;
  aspect-ratio: 3/4;
}

.image .img-card {
  aspect-ratio: 3/4;
  height: auto;
}

.info {
  flex-grow: 1;
  color: var(--text-color-1);
}

.name {
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  position: relative;
  color: var(--title-color);
}

.name::before {
  content: '';
  display: block;
  background-color: #4d4c4c;
  width: 100%;
  height: 1px;
  bottom: 0px;
  position: absolute;
}

.info .info-col {
  margin-top: 10px;
  display: flex;
  gap: 5px;
}

.info .info-col .title {
  font-weight: 600;
  white-space: nowrap;
}

.status {
  background-color: rgba(255, 255, 255, 0.5);
  padding: 0.2rem 0.4rem;
  line-height: 1;
  font-size: 12px;
  border-radius: 0.2rem;
}

.category {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.category span {
  border: 1px solid var(--text-color-2);
  padding: 0.2rem 0.4rem;
  font-size: 12px;
  border-radius: 0.2rem;
}

.description {
  margin-top: 20px;
  padding: 0.4rem;
  line-height: 1;
  font-size: 14px;
  border-radius: 0.2rem;
}

.read {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .banner-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }

  .name {
    font-size: 26px;
  }

  .title {
    font-size: 20px;
  }
}

@media (max-width: 640px) {
  .banner-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }

  .name {
    font-size: 22px;
  }

  .title {
    font-size: 18px;
  }
}
</style>
