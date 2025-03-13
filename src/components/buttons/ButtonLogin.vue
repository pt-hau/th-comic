<script setup lang="ts"></script>

<template>
  <button class="login-button">
    <span>Login</span>
  </button>
</template>

<style scoped>
.login-button {
  width: 50px;
  height: 30px;
  background-color: #3c8bc6;
  border-radius: 4px;
  border: none;
  transition: 0.3s;
  cursor: pointer;
}

.login-button:hover {
  background-color:rgb(69, 169, 245);
}

.login-button span {
  color: var(--vt-c-white);
  font-weight: 500;
}
</style>
