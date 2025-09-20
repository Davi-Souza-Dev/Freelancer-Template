<script lang="ts" setup>
// FAZENDO AS PROPS

interface Props {
  step: number
  title: String
}
const props = defineProps<Props>()
</script>
<template>
  <div class="containerStepper">
    <div class="steps">
      <div class="step" :class="{ done: props.step == 1, finish: props.step > 1 }">1</div>
      <div class="bar" :class="props.step > 1 ? 'active' : ''"></div>
      <div class="step" :class="{ done: props.step == 2, finish: props.step > 2 }">2</div>
      <div class="bar" :class="props.step > 2 ? 'active' : ''"></div>
      <div class="step" :class="{ done: props.step == 3, finish: props.step > 3 }">3</div>
    </div>
    <span
      class="tittle"
      :class="{ left: props.step == 1, center: props.step == 2, right: props.step == 3 }"
      >{{ props.title }}</span
    >
  </div>
</template>

<style scoped>
.containerStepper {
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 10px;
}

.steps {
  width: 100%;
  height: fit-content;
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-wrap: row;
  gap: 10px;
}

.step {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: none;
  border: 4px solid var(--color1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color1);
  font: 2rem;
  font-weight: 900;
  text-transform: uppercase;
  font-family: var(--font);
}

.step:not(.done) {
  background: #f3d7d5;
  color: #a7a7a7;
  border: #f3d7d5;
}

.step.finish {
  color: var(--color1-2);
  background: var(--color1);
}

.bar {
  flex: 1;
  height: 3px;
  border-radius: 30px;
  background: var(--color1);
}

.bar:not(.active) {
  background: #f3d7d5;
}

.tittle {
  width: 100%;
  font: 3rem;
  font-weight: 900;
  text-transform: capitalize;
  font-family: var(--font);   
}

.left {
  text-align: left;
}

.center {
  text-align: center;
}

.right {
  text-align: right;
}
</style>
