<script lang="ts" setup></script>

<template>
  <div class="fundo">
    <svg viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>
    <h1>Carregando os dados...</h1>
  </div>
</template>

<style scoped>
.fundo {
  backdrop-filter: blur(2px);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  font-family: var(--font);
  text-transform: uppercase;
  font-size: 0.9rem;
  gap: 10px;
  font-weight: 900;
  color: var(--color1);
  z-index: 100;
}

svg {
  width: 3.25em;
  transform-origin: center;
  animation: rotate4 2s linear infinite;
}

circle {
  fill: none;
  stroke: var(--color1);
  stroke-width: 2;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: dash4 1.5s ease-in-out infinite;
}

@keyframes rotate4 {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash4 {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }

  100% {
    stroke-dashoffset: -125px;
  }
}
</style>
