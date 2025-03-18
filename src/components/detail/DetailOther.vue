<script setup lang="ts">
import CardRotateY from '../cards/CardRotateY.vue'
import LoadingView from '../LoadingView.vue';

const props = defineProps<{ data: IDataItem[] }>()
</script>

<template>
  <div class="other">
    <div class="content">
      <div class="title"><p>Có thể bạn sẽ thích</p></div>
      <div class="other-items" v-if="props.data.length > 0">
        <div v-for="(item, index) in props.data" :key="index" class="other-item">
          <div class="item-top">
            <CardRotateY :item="item" />
          </div>
          <div class="item-bottom">
            <span>{{ item.name }}</span>
            <span>{{ item.origin_name.join(', ') }}</span>
          </div>
        </div>
      </div>
      <div class="other-items" v-else>
        <div v-for="item, index in 20" :key="index" class="other-item">
          <div class="item-top">
            <LoadingView  class="load"/>
          </div>
          <div class="item-bottom">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.load {
  border-radius: 10px;
  overflow: hidden;
}
.other {
  position: relative;
  width: 100%;
  margin-top: 50px;
}

.other-content {
  position: relative;
}

.title p {
  font-size: 24px;
  font-weight: 600;
  color: var(--title-color);
}

.other-items {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
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
  min-height: 60px;
}

.other-item .item-bottom span {
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
  color: var(--text-color-1);
  font-weight: 400;
  line-height: 1.3em;
}

.other-item .item-bottom span:nth-child(2) {
  font-size: 12px;
  line-height: 1.3em;
  color: var(--text-color-2);
}

.other-item .item-top {
  aspect-ratio: 3/4;
}
</style>
