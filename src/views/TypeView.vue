<script setup lang="ts">
import HomeBanner from '@/components/home/HomeBanner.vue';
import HomeComplete from '@/components/home/HomeComplete.vue';
import HomeIsReleasing from '@/components/home/HomeIsReleasing.vue';
import HomeNew from '@/components/home/HomeNew.vue';
import IconLineBg from '@/components/icons/IconLineBg.vue';
import { type } from '@/constants/defaultData';
import { ListService } from '@/services/listService';
import { onMounted, ref } from 'vue';

const dataBanner = ref([]);
const dataNew = ref([]);
const dataIsReleasing = ref([]);
const dataComplete = ref([]);

const fetchBanner = async () => {
  const result = await ListService.getType(type.sapRaMat.id);
  if (result) dataBanner.value = result.data.data.items;
};

const fetchNew = async () => {
  const result = await ListService.getType(type.truyenMoi.id);
  if (result) dataNew.value = result.data.data.items;
};

const fetchIsReleasing = async () => {
  const result = await ListService.getType(type.dangPhatHanh.id);
  if (result) dataIsReleasing.value = result.data.data.items;
};

const fetchComplete = async () => {
  const result = await ListService.getType(type.hoanThanh.id);
  if (result) dataComplete.value = result.data.data.items;
};

onMounted(() => {
  fetchBanner();
  fetchNew();
  fetchIsReleasing();
  fetchComplete();
});
</script>

<template>
  <main>
    <div class="home">
        <div class="home-content">
          <HomeBanner :data="dataBanner"/>
          <HomeNew :data="dataNew"/>
          <IconLineBg />
          <HomeIsReleasing :data="dataIsReleasing" />
          <HomeComplete :data="dataComplete" />
        </div>
    </div>
  </main>
</template>

<style scoped>
.home {
  width: 100%;
  padding-bottom: 50px;
}

.home-content {
  width: 100%;
  position: relative;
}
</style>
