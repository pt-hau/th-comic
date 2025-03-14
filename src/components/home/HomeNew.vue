<script setup lang="ts">
import CardRotateY from '../cards/CardRotateY.vue'
import IconLineBg from '../icons/IconLineBg.vue';
import SwiperCustom from '../SwiperCustom.vue'

const props = defineProps<{ data: IDataItem[] }>()
</script>

<template>
  <div class="new">
    <div class="content">
      <SwiperCustom :name="'Truyện mới'" :numberShow="5" :data="props.data" #default="{ item, index }">
        <div class="new-item">
          <div class="item-right">
            <CardRotateY :item="item"/>
          </div>
          <div class="item-left">
            <span>{{ index + 1 < 10 ? '0' : '' }}{{ index + 1 }}</span>
            <span>{{ item.name }}</span>
          </div>
        </div>
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
  color: white;
  font-weight: 700;
  min-width: 60px;
}

.new-item .item-left span:nth-child(2) {
  font-size: 14px;
  color: white;
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
}
</style>
