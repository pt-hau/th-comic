<script setup lang="ts">
import { inject, onMounted, ref, watch, type Ref } from 'vue'
import IconSearch from '../icons/IconSearch.vue'
import { ListService } from '@/services/listService'
import { useRouter } from 'vue-router'
import LoadingView from '../LoadingView.vue'

const showSearch = inject('showSearch') as Ref<boolean>
const dataSearch = ref<IResponseDataStatus>()
const router = useRouter()
const fetchDataSearch = async (keyword: string) => {
  isNull.value = false
  const result = await ListService.getSearch(keyword)
  if (result) dataSearch.value = result.data
  if(result.data.data.items.length == 0) {
    isNull.value = true
  }
}
const closeModal = () => {
  if (showSearch) showSearch.value = false
}

const isNull = ref(false)
const searchQuery = ref('')
const searchHistory = ref<string[]>(JSON.parse(localStorage.getItem('searchHistory') || '[]'))

const handleReSearch = (index: number) => {
  const keyword = searchHistory.value[index]

  searchHistory.value.splice(index, 1)
  searchHistory.value.unshift(keyword)

  localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))

  fetchDataSearch(keyword)
}
const handleSearch = () => {
  if (searchQuery.value.trim() === '') return

  if (!searchHistory.value.includes(searchQuery.value)) {
    searchHistory.value.unshift(searchQuery.value)
  }

  if (searchHistory.value.length > 3) {
    searchHistory.value.pop()
  }

  fetchDataSearch(searchQuery.value)

  searchQuery.value = ''

  localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))
}

const removeKeyword = (index: number) => {
  searchHistory.value.splice(index, 1)
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))
}

watch(showSearch, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

//load img
const loadedImages = ref<boolean[]>([])

onMounted(() => {
  if (dataSearch.value?.data.items) {
    loadedImages.value = dataSearch.value?.data.items.map(() => false)
  }
})

const onImageLoad = (index: number) => {
  loadedImages.value[index] = true
}

watch(
  () => dataSearch.value?.data.items,
  (newItems) => {
    if (newItems) {
      loadedImages.value = newItems.map(() => false)
    }
  }
)
</script>

<template>
  <transition name="fade">
    <div v-show="showSearch" class="modal-search" @click.self="closeModal">
      <transition name="slide-up">
        <div v-show="showSearch" class="modal-search-content">
          <div @click="closeModal" class="close button">Đóng</div>
          <div class="search">
            <input
              class="search-input"
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              placeholder="Tìm truyện..."
            />
            <div class="search-icon" @click="handleSearch"><IconSearch /></div>
          </div>
          <div v-if="searchHistory.length" class="search-history">
            <div v-for="(keyword, index) in searchHistory" :key="index" class="history-item">
              <span @click="() => handleReSearch(index)"> {{ keyword }}</span>
              <button class="button" @click="removeKeyword(index)">X</button>
            </div>
          </div>
          <p class="null" v-show="isNull">Không tìm thấy kết quả!</p>
          <div class="cards">
            <div
              v-for="(item, index) in dataSearch?.data.items"
              :key="index"
              class="card"
              @click="() => router.push(`/chi-tiet/${item.slug}`)"
            >
              <div class="card-image">
                <div class="card-face">
                  <div v-if="!loadedImages[index]"><LoadingView /></div>
                  <img
                    v-show="loadedImages[index]"
                    :src="`https://otruyen.cc/_next/image?url=https://img.otruyenapi.com/uploads/comics/${item.thumb_url}&w=1200&q=100`"
                    alt="image"
                    class="img-card"
                    @load="onImageLoad(index)"
                  />
                </div>
              </div>
              <div class="card-info">
                <p>
                  <span class="name">{{ item.name }}</span>
                </p>
                <p><span>Thể loại:</span> {{ item?.category.map((i) => i.name).join(', ') }}</p>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave-from {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition:
    transform 0.3s,
    opacity 0.3s;
}
.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}
.slide-up-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.modal-search {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.267);
  z-index: 1000;
}

.modal-search-content {
  backdrop-filter: blur(10px);
  border-radius: 8px;
  border: 1px solid rgb(226, 219, 219);
  background-color: rgba(49, 48, 48, 0.497);
  padding: 15px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.null {
  color: white;
}
.close {
  margin-left: auto;
  padding: 5px 10px;
  display: flex;
  width: max-content;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-size: 12px;
  margin-bottom: 5px;
}

.button {
  background-color: goldenrod;
  color: white;
  transition: 0.3s;
  cursor: pointer;
}

.button:hover {
  background-color: white;
  color: #3c8bc6;
}

.search {
  padding: 10px;
  box-sizing: border-box;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 1px;
  background-color: #363636;
  width: 100%;
  transition: 0.3s;
  position: relative;
  padding-right: 40px;
  border-radius: 4px;
}

.search-input {
  border: none;
  outline: none;
  color: white;
  width: 100%;
  background-color: transparent;
}

.search-input::placeholder {
  color: #b0b0b0;
}

.search:hover {
  background-color: #636262;
}

.search-icon {
  width: 40px;
  color: white;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.history-item {
  display: flex;
  align-items: center;
}

.history-item span {
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  padding: 3px;
  border-radius: 4px;
  color: var(--color-tex);
  display: -webkit-box;
  display: box;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  cursor: pointer;
}

.history-item button {
  height: 24px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  flex-grow: 1;
  width: 100%;
  overflow-y: auto;
}

.card {
  padding: 5px;
  box-sizing: border-box;
  background-color: rgba(143, 143, 143, 0.174);
  border-radius: 4px;
  display: flex;
  gap: 10px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 0 5px var(--shadow);
}

.card:hover {
  background-color: rgba(143, 143, 143, 0.326);
}

.card-image {
  aspect-ratio: 5/6;
  height: 60px;
  border: 1px solid white;
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
  color: white;
}

.card-info p {
  display: -webkit-box;
  display: box;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  font-weight: 400;
  -webkit-line-clamp: 1;
  line-clamp: 1;
}

.card-info .name {
  font-size: 14px;
}
.card-info p span {
  font-weight: 400;
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
  overflow: hidden;
  background-color: lightblue;
}
</style>
