<script setup lang="ts"></script>

<template>
  <button class="login-button">
    <span>Login</span>
  </button>
</template>

<style scoped>
.login-button {
  width: 40px;
  height: 30px;
  background-color: transparent;
  border-radius: 4px;
  border: 1px solid var(--title-color);
  color: var(--title-color);
  transition: 0.3s;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-button:hover {
  background-color: var(--title-color);
  color: var(--tex1-color-1);
}

.login-button span {
  color: var(--vt-c-white);
  font-weight: 500;
}
</style>
