<script setup lang="ts">
import 'swiper/swiper-bundle.css'

defineProps<{ item: IDataItem }>()

</script>

<template>
  <div class="card-container">
    <div class="card">
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
            <p>Chương: {{ item.chaptersLatest[0].chapter_name }}</p>
            <p>Thể loại: {{ item.category.map((c) => c.name).join(', ') }}</p>
            <div class="card-buttons">
              <a href="/" class="card-button">Đọc truyện</a>
              <a :href="'/detail/' + item.slug" class="card-button">Xem thông tin</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  perspective: 1000px;
  width: 100%;
  height: 100%;
}

.card {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.5s;
}

.card-info {
  flex-grow: 1;
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  max-width: 600px;
  padding: 10px;
  color: white;
  top: 0px;
}

.card-info p {
  display: -webkit-box;
  display: box;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-info p:first-child {
  font-size: 14px;
  font-weight: 600;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  margin-bottom: 15px;
}

.card-info p:nth-child(2) {
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 10px;
  -webkit-line-clamp: 3;
  line-clamp: 3;
}

.card-buttons {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: end;
}

.card-buttons .card-button {
  width: 100%;
  box-sizing: border-box;
  font-weight: 500;
  font-size: 14px;
  padding: 8px 20px;
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

.card-container:hover .card {
  transform: rotateY(180deg);
}
</style>
