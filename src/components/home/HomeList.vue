<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import CardRotateY from '../cards/CardRotateY.vue'
import LoadingView from '../LoadingView.vue'
import SwiperCustom from '../SwiperCustom.vue'

const props = defineProps<{ data: IDataItem[]; name: string }>()
const numberShow = ref(6)

const updateNumberShow = () => {
  numberShow.value =
    window.innerWidth > 1280
      ? 6
      : window.innerWidth > 1080
        ? 5
        : window.innerWidth > 768
          ? 4
          : window.innerWidth > 640
            ? 3
            : 2
}

onMounted(() => {
  updateNumberShow()
  window.addEventListener('resize', updateNumberShow)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateNumberShow)
})
</script>

<template>
  <div class="list">
    <div class="content">
      <SwiperCustom :name="'Hoàn thành'" :numberShow="numberShow" :data="props.data">
        <template #loading>
          <div class="list-item">
            <div class="item-top">
              <LoadingView />
            </div>
            <div class="loading-bottom"></div>
          </div>
        </template>
        <template #item="{ item }">
          <div class="list-item">
            <div class="item-top">
              <CardRotateY :item="item" />
            </div>
            <div class="item-bottom">
              <span>{{ item.name }}</span>
              <span>{{ item.origin_name.join(', ') }}</span>
            </div>
          </div>
        </template>
      </SwiperCustom>
    </div>
  </div>
</template>

<style scoped>
.list {
  position: relative;
  margin-top: 50px;
  width: 100%;
}

.list-content {
  position: relative;
}

.list-item {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px;
}

.list-item .item-bottom {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.list-item .item-bottom span {
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

.list-item .item-bottom span:first-child {
  font-size: 16px;
  color: var(--text-color-1);
  font-weight: 500;
  line-height: 1.3em;
}

.list-item .item-bottom span:nth-child(2) {
  font-size: 12px;
  line-height: 1.3em;
  color: var(--text-color-2);
}

.list-item .item-top {
  aspect-ratio: 3/4;
  border-radius: 10px;
}

.loading-bottom {
  height: 60px;
}
</style>
