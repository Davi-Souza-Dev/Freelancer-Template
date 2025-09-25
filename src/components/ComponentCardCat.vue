<script lang="ts" setup>
const emit = defineEmits(['click'])

interface Props {
  id: Number
  imagem: string
  titulo: String
  fundo: String
}

const props = defineProps<Props>()

// clicar na categoria
const clickCat = () => {
  emit('click', props.id)
}
</script>

<template>
  <div class="containerCat" @click="clickCat" :class="props.fundo">
    <img :src="props.imagem" alt="" />
    <span>{{ props.titulo }}</span>
  </div>
</template>

<style scoped>
.containerCat {
  width: 140px;
  height: 180px;
  border-radius: 5px 5px 10px 10px;
  padding: 5px 5px 10px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
}

.b1 {
  background: var(--color1-2);
}

.b2 {
  background: var(--color2-2);
}

.containerCat img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  object-fit: cover;
}

.containerCat span {
  width: 100%;
  text-align: center;
  font-family: var(--font);
  text-transform: uppercase;
  font-size: 0.9rem;
  font-weight: 900;
}
</style>
