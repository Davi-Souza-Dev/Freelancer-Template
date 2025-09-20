<script setup lang="ts">
import router from '@/router';

const emit = defineEmits(['click'])

const btnClick = () => {
  router.back();
}
</script>

<template>
  <button class="cssbuttons-io-button" @click="btnClick">
       <div class="icon">
      <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0z" fill="none"></path>
        <path
          d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
          fill="currentColor"
        ></path>
      </svg>
    </div>
    Voltar
  </button>
</template>

<style scoped>
.cssbuttons-io-button {
  background: var(--color1-2);
  color: var(--color1);
  font-family: inherit;
  padding: 20px 50px;
  font-size: 17px;
  font-weight: 900;
  border-radius: 5px;
  border: none;
  display: flex;
  align-items: center;
  position: relative;
  height: 30px;
  padding-right: 3.3em;
  cursor: pointer;
  text-transform: uppercase;
  font-family: var(--font);
}

.cssbuttons-io-button .icon {
  background: var(--color1);
  margin-left: 1em;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  left: -0.7em;
  transition: all 0.1s;
  transform: scaleX(-1);
}

.cssbuttons-io-button:hover .icon {
  width: calc(100% - 0.6em);
}

.cssbuttons-io-button .icon svg {
  width: 1.1em;
  transition: transform 0.3s;
  color: var(--color1-2);
}

.cssbuttons-io-button:hover .icon svg {
  transform: translateX(0.1em);
}

.cssbuttons-io-button:active .icon {
  transform: scale(0.95);
}
</style>
