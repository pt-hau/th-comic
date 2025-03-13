<script setup lang="ts">
import CardRotateY from '../cards/CardRotateY.vue'
import SwiperCustom from '../SwiperCustom.vue'

const props = defineProps<{ data: IDataItem[] }>()
</script>

<template>
  <div class="isReleasing">
    <div class="content">
      <SwiperCustom
        :name="'Đang phát hành'"
        :numberShow="6"
        :data="props.data"
        #default="{ item }"
      >
        <div class="isReleasing-item">
          <div class="item-top">
            <CardRotateY :item="item" />
          </div>
          <div class="item-bottom">
            <span>{{ item.name }}</span>
            <span>{{ item.origin_name.join(", ") }}</span>
          </div>
        </div>
      </SwiperCustom>
    </div>
  </div>
</template>

<style scoped>
.isReleasing {
  position: relative;
  width: 100%;
  background-color: #111111c5;
}

.isReleasing-content {
  position: relative;
}

.isReleasing-item {
  position: relative;
  box-sizing: border-box;
  padding: 0 5px;
  width: 100%;
}

.isReleasing-item .item-bottom {
  display: flex;
  flex-direction: column;
  width: 100%;
}
 
.isReleasing-item .item-bottom span{
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

.isReleasing-item .item-bottom span:first-child {
  font-size: 16px;
  color: white;
  font-weight: 400;
  line-height: 1.3em;
}

.isReleasing-item .item-bottom span:nth-child(2) {
  font-size: 12px;
  line-height: 1.3em;
  color: rgb(199, 196, 196);
}

.isReleasing-item .item-top {
  aspect-ratio: 3/4;
}
</style>
