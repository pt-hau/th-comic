<script setup lang="ts">
import { inject } from 'vue';
import IconLight from '../icons/IconLight.vue'

const toggleTheme = inject('toggleTheme') as (() => void);
</script>

<template>
        <div @click="toggleTheme" class="button-dark">
          <div class="button-dark-icon">
            <div class="dark-icon"></div>
            <div class="light-icon">
              <IconLight />
            </div>
          </div>
        </div>
</template>

<style scoped>
.button-dark {
  width: 42px;
  position: relative;
  height: fit-content;
  padding: 3px;
  border-radius: 2rem;
  outline: none;
  overflow: hidden;
  transition: 0.3s;
  cursor: pointer;
}

.button-dark {
  border: 3px groove #f0d474;
  background: #706235;
}

.button-dark:hover {
  background: #706235;
}

.dark .button-dark {
  border: 3px groove #0bd3d0;
  background: #0d292b;
}

.button-dark-icon {
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  transition: 0.3s ease-in-out;
}

.dark .button-dark-icon {
  transform: translateX(22px);
  background-color: #0bd3d0;
}

.button-dark-icon {
  transform: translateX(0);
  background-color: #f0d474;
}

.dark .button-dark:hover .button-dark-icon {
  background-color: #3afffc;
}

.button-dark:hover .button-dark-icon {
  background-color: #f5e947;
}

.button-dark-icon .dark-icon {
  position: absolute;
  width: 17px;
  height: 17px;
  border-radius: 100%;
  transition: 0.3s;
  z-index: 2;
}

.dark .button-dark-icon .dark-icon {
  transform: translateX(-2px) translateY(-2px);
  background: #0d292b;
}

.button-dark-icon .dark-icon {
  transform: translateX(-56px) translateY(-56px);
  background: #8d7c46;
}

.button-dark-icon .light-icon {
  position: absolute;
  width: 12px;
  height: 12px;
  transition: transform 0.3s ease-in-out;
  top: 50%;
  left: 50%;
  z-index: 3;
  line-height: 0;
}

.button-dark-icon .light-icon {
  transform: translate(-50%, -50%);
  color: #8d7c46;
}

.dark .button-dark-icon .light-icon {
  transform: translate(-80%, -80%);
  color: #0bd3d0;
}
</style>
