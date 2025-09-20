<script lang="ts" setup>
import Product from './ComponentCardProduct.vue'
import Button from './ComponentButton.vue'
import router from '@/router'
import useCarrinhoStore from '@/stores/carrinhoStore'
import { ref } from 'vue'


const next = ref(false)

// DEFININDO O CARRINHO
const carrinho = useCarrinhoStore()
interface Produto {
  id: number
  nome: string
  preco: number
  descricao: string
  imagem: string
}

interface Props {
  produtos: Produto[]
}

const props = defineProps<Props>()

// const produtos = ref<Produto[]>([])
const emit = defineEmits(['close'])
const btnClose = () => {
  emit('close', false)
}

// VERIFICAR OS PRODUTOS JÁ SELECIONADOS ANTES
const produtosSelected = (idProduto: number): boolean => {
  next.value = carrinho.produtos.length > 0 ? true : false

  return carrinho.getProdutos.some((produto) => produto.id === idProduto)
}
// SELECIONAR E GUARDAR O PRODUTO
const selectProduto = (props: Produto) => {
  const produto = carrinho.getProdutos.find((p) => props.id === p.id)
  if (!produto) {
    console.log("Adicionado");

    carrinho.setProduto(props.id, props.nome, props.preco, props.imagem)
    return
  } else {
    carrinho.removerProduto(props.id)
  }
}
</script>
<template>
  <div class="background">
    <div class="containerPopup">
      <button class="btnClose" @click="btnClose()">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
              stroke="#1C274C"
              stroke-width="1.5"
              stroke-linecap="round"
            ></path>
            <path
              d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
              stroke="#1C274C"
              stroke-width="1.5"
              stroke-linecap="round"
            ></path>
          </g>
        </svg>
      </button>
      <span class="title">Selecione o(s) produto(s)</span>
      <div class="containerProducts">
        <Product
          v-for="produto in props.produtos"
          @select="selectProduto"
          :key="produto.id"
          :nome="produto.nome"
          :preco="produto.preco"
          :id="produto.id"
          :fundo="Math.floor(produto.id / 2) % 2 === 0 ? 'b1' : 'b2'"
          :checked="produtosSelected(produto.id)"
        />
      </div>
      <Button url="/info" v-show="next"/>
    </div>
  </div>
</template>

<style scoped>
.background {
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0px;
  background: rgba(0, 0, 0, 0.63);
}

.containerPopup {
  width: 100%;
  height: 80%;
  position: absolute;
  bottom: 0;
  background: #fafafa;
  border-radius: 20px 20px 0px 0px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
  overflow: scroll;
}

::-webkit-scrollbar {
  display: none;
}

.btnClose {
  width: 40px;
  height: 40px;
  display: flex;
  align-self: flex-end;
  background: none;
}

.btnClose svg path {
  stroke: var(--color1);
}

.title {
  font-family: var(--font);
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: 900;
  text-align: center;
}

.containerProducts {
  width: 100%;
  height: fit-content;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
