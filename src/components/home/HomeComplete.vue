<script setup lang="ts">
import CardRotateY from '../cards/CardRotateY.vue'
import LoadingView from '../LoadingView.vue';
import SwiperCustom from '../SwiperCustom.vue'

const props = defineProps<{ data: IDataItem[] }>()
</script>

<template>
  <div class="complete">
    <div class="content">
      <SwiperCustom
        :name="'Hoàn thành'"
        :numberShow="6"
        :data="props.data"
      >
      <template #loading>
        <div class="complete-item">
          <div class="item-top">
            <LoadingView />
          </div>
          <div class="loading-bottom">
          </div>
        </div>
        </template>
        <template #item="{ item }">
          <div class="complete-item">
          <div class="item-top">
            <CardRotateY :item="item" />
          </div>
          <div class="item-bottom">
            <span>{{ item.name }}</span>
            <span>{{ item.origin_name.join(", ") }}</span>
          </div>
        </div>
        </template>
      </SwiperCustom>
    </div>
  </div>
</template>

<style scoped>
.complete {
  position: relative;
  margin-top: 50px;
  width: 100%;
}

.complete-content {
  position: relative;
}

.complete-item {
  position: relative;
  width: 100%;
}

.complete-item .item-bottom {
  display: flex;
  flex-direction: column;
  width: 100%;
}
 
.complete-item .item-bottom span{
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

.complete-item .item-bottom span:first-child {
  font-size: 16px;
  color: var(--text-color-1);
  font-weight: 500;
  line-height: 1.3em;
}

.complete-item .item-bottom span:nth-child(2) {
  font-size: 12px;
  line-height: 1.3em;
  color: var(--text-color-2);
}

.complete-item .item-top {
  aspect-ratio: 3/4;
  border-radius: 10px;
  overflow: hidden;
}

.loading-bottom {
  height: 60px;
}
</style>
