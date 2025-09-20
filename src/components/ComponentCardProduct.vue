<script lang="ts" setup>
interface Props {
  id: number
  nome: string
  preco: number
  fundo: string
  checked: boolean
}

const props = defineProps<Props>()

const emit = defineEmits(['select'])
const select = () => {
  emit('select', props)
}
</script>

<template>
  <label class="productLabel">
    <input
      type="checkbox"
      :value="props.id"
      name="productCheckbox"
      :checked="props.checked"
      @change="select"
    />
    <div class="containerProduct" :class="props.fundo">
      <img src="" />
      <span class="title">{{ props.nome }}</span>
      <span class="price">{{ `R$: ${props.preco}` }}</span>
    </div>
  </label>
</template>

<style scoped>
.productLabel {
  cursor: pointer;
  display: inline-block;
}

.containerProduct {
  width: 140px;
  height: 180px;
  border-radius: 5px 5px 10px 10px;
  padding: 5px 5px 10px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.b1 {
  background: var(--color1-2);
}

.b2 {
  background: var(--color2-2);
}

input[type='checkbox'] {
  display: none;
}

input[type='checkbox']:checked + .b1 {
  outline: 2px solid var(--color1);
}

input[type='checkbox']:checked + .b2 {
  outline: 2px solid var(--color2);
}

.containerProduct img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  object-fit: cover;
}

.containerProduct .title {
  width: 100%;
  text-align: left;
  font-family: var(--font);
  padding: 0 0 0 5px;
  text-transform: uppercase;
  font-size: 0.9rem;
  font-weight: 900;
}

.containerProduct .price {
  width: 100%;
  text-align: left;
  font-family: var(--font);
  padding: 0 0 0 5px;
  text-transform: uppercase;
  font-size: 0.9rem;
  font-weight: 700;
}
</style>
