<script setup lang="ts">
import router from '@/router';
import CardRotateY from '../cards/CardRotateY.vue'
import SwiperCustom from '../SwiperCustom.vue'

const props = defineProps<{ data: IResponseDataStatus | null | undefined }>()
</script>

<template>
  <div class="list">
    <div class="cards">
    <div v-for="(item, index) in data?.data.items" :key="index" class="card" @click="() => router.push(`/chi-tiet/${item.slug}`)">
      <div class="card-image">
      <div class="card-face front">
        <img
          :src="`https://otruyen.cc/_next/image?url=https://img.otruyenapi.com/uploads/comics/${item.thumb_url}&w=1200&q=100`"
          alt="image"
          class="img-card"
        />
      </div>

      <div class="card-face back">
        <img
          :src="`https://otruyen.cc/_next/image?url=https://img.otruyenapi.com/uploads/comics/${item.thumb_url}&w=1200&q=100`"
          alt="image"
          class="img-card rotate-y-180"
        />
        <div class="card-overlay">
          <div class="card-info">
            <div class="card-buttons">
              <a :href="`/doc/${item.slug}/chuong/1`" class="card-button">Đọc truyện</a>
              <a :href="'/chi-tiet/' + item.slug" class="card-button">Xem thông tin</a>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div class="card-info">
        <p><span class="name">{{ item.name }}</span></p>
        <p><span>Chương:</span> {{ item.chaptersLatest[0].chapter_name }}</p>
        <p><span>Thể loại:</span> {{ item?.category.map((i) => i.name).join(', ') }}</p>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>
.list {
  width: 100%;
  overflow: hidden;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px;
}

.card {
  aspect-ratio: 2;
  padding: 10px;
  box-sizing: border-box;
  background-color: rgba(143, 143, 143, 0.174);
  border-radius: 4px;
  perspective: 1000px;
  display: flex;
  gap: 10px;
  cursor: pointer;
  transition: 0.3s;
}

.card:hover {
  background-color: rgba(143, 143, 143, 0.326);
}

.card-image {
  aspect-ratio: 5/6;
  height: 100%;
  border: 4px solid white;
  border-radius: 2px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.5s;
}

.card-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  max-width: 600px;
  color: white;
}

.card-info p {
  display: -webkit-box;
  display: box;
  margin-bottom: 5px;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 400;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

.card-info p:not(:first-child) {
  padding-top: 10px;
  border-top: 1px dashed rgba(37, 105, 207, 0.252);
}

.card-info .name {
  font-size: 16px;
}
.card-info p span {
  font-weight: 600;
}

.card-buttons {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: end;
  padding: 5px;
}

.card-buttons .card-button {
  width: 100%;
  box-sizing: border-box;
  font-weight: 500;
  font-size: 12px;
  padding: 10px 10px;
  border-radius: 4px;
  text-align: center;
}

.card-buttons .card-button:first-child {
  background: #ffd702;
  color: #111;
}

.card-buttons .card-button:nth-child(2) {
  margin-top: 5px;
  background: #fff;
  color: #111;
}

.card-overlay {
  position: absolute;
  overflow: hidden;
  inset: 0;
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.5);
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;
  overflow: hidden;
  background-color: lightblue;
}

.back {
  transform: rotateY(180deg);
}

.card:hover .card-image {
  transform: rotateY(180deg);
}

</style>
