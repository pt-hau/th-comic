<script setup lang="ts">
import router from '@/router';
import LoginButton from '../buttons/ButtonLogin.vue';
import SearchButton from '../buttons/ButtonSearch.vue';
</script>

<template>
  <header>
    <div class="header-content">
      <div class="header-logo" @click='router.push("/")'>
        <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="50" />
        <span>Manga</span>
      </div>
      <div class="header-wrapper">
        <nav class="header-nav">
          <RouterLink to="/genres">Truyện mới</RouterLink>
          <RouterLink to="/newest">Hoàn thành</RouterLink>
          <RouterLink to="/types">Thể loại</RouterLink>
        </nav>
      </div>
      <div class="header-button"> 
        <SearchButton />
        <LoginButton />
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  line-height: 1.5;
  top: 0;
  width: 100%;
  height: 50px;
  backdrop-filter: blur(5px);
  border-bottom: 1px solid #4d4c4c;
  background-color: var(--bg-banner);
  z-index: 50;
}

.header-content {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1280px;
  height: 100%;
  margin: 0 auto;
  flex-grow: 1;
  padding: 0 2rem;
}

.header-logo {
  display: flex;
  gap: 5px;
  margin-right: 20px;
  cursor: pointer;
}

.header-logo span {
  font-weight: 700;
  font-size: 18px;
  color: var(--vt-c-white);
}

.header-wrapper {
  flex-grow: 1;
}

.header-nav {
  display: flex;
  gap: 20px;
  flex-grow: 1;
}

.header-nav a {
  position: relative;
}

.header-nav a::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background-color: rgb(37, 105, 207);
  transform: scaleX(0);
  transition: transform 0.3s;
}

.header-nav a:hover::after {
  transform: scaleX(1);
}

.header-nav a.router-link-active {
  color: var(--vt-c-white);
}

.header-nav a {
  color: var(--vt-c-white-mute);
}

.header-button {
  display: flex;
  gap: 10px;
}
</style>
