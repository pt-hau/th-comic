<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import CardRotateY from '../cards/CardRotateY.vue'
import LoadingView from '../LoadingView.vue'
import SwiperCustom from '../SwiperCustom.vue'

const props = defineProps<{ data: IDataItem[] }>()

const numberShow = ref(5)

const updateNumberShow = () => {
  numberShow.value = window.innerWidth > 1280 ? 5 : window.innerWidth > 1080 ? 4 : window.innerWidth > 768 ? 3: 2
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
  <div class="new">
    <div class="content">
      <SwiperCustom :name="'Truyện mới'" :numberShow="numberShow" :data="props.data">
        <template #loading="{index}">
          <div class="new-item">
            <div class="item-right">
              <LoadingView />
            </div>
            <div class="item-left">
              <span>{{ index + 1 < 10 ? '0' : '' }}{{ index }}</span>
              <span>...</span>
            </div>
          </div>
        </template>
        <template #item="{ item, index }">
          <div class="new-item">
            <div class="new-item-content">
              <div class="item-right">
              <CardRotateY :item="item" />
            </div>
            <div class="item-left">
              <span>{{ index + 1 < 10 ? '0' : '' }}{{ index + 1 }}</span>
              <span>{{ item.name }}</span>
            </div>
            </div>
          </div>
        </template>
      </SwiperCustom>
    </div>
  </div>
</template>

<style scoped>
.new {
  position: relative;
  width: 100%;
  background-color: var(--bg-banner);
}

.new-content {
  position: relative;
}

.new-item {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  box-sizing: border-box;
  padding-right: 10px;
}

.new-item-content {
  position: relative;
  width: 100%;
  height: 100%;
}

.new-item .item-left {
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

.new-item .item-left span:first-child {
  font-size: 30px;
  line-height: 1.3em;
  color: var(--text-color-1);
  font-weight: 700;
  min-width: 60px;
}

.new-item .item-left span:nth-child(2) {
  font-size: 14px;
  color: var(--text-color-2);
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  line-height: normal;
  text-overflow: ellipsis;
}

.new-item .item-right {
  position: absolute;
  bottom: 0;
  left: 40px;
  top: 0;
  right: 0;
  height: 100%;
  border-radius: 10px;
}
</style>
