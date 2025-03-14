<script setup lang="ts">
import CardRotateY from '../cards/CardRotateY.vue'

const props = defineProps<{ data: IDataItem[] }>()
</script>

<template>
  <div class="other">
    <div class="content">
      <div class="title"><p>Có thể bạn sẽ thích</p></div>
      <div class="other-items">
      <div v-for="(item,index) in props.data" :key="index" class="other-item">
          <div class="item-top">
            <CardRotateY :item="item" />
          </div>
          <div class="item-bottom">
            <span>{{ item.name }}</span>
            <span>{{ item.origin_name.join(", ") }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.other {
  position: relative;
  width: 100%;
}

.other-content {
  position: relative;
}

.title p {
  font-size: 24px;
  font-weight: 600;
  color: white;
}

.other-items {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  width: 100%;
}

.other-item {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.other-item .item-bottom {
  display: flex;
  flex-direction: column;
  width: 100%;
}
 
.other-item .item-bottom span{
  display: -webkit-box;
  display: box;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  margin-top: 5px;
}

.other-item .item-bottom span:first-child {
  font-size: 16px;
  color: white;
  font-weight: 400;
  line-height: 1.3em;
}

.other-item .item-bottom span:nth-child(2) {
  font-size: 12px;
  line-height: 1.3em;
  color: rgb(199, 196, 196);
}

.other-item .item-top {
  aspect-ratio: 3/4;
}
</style>
