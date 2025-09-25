<script setup lang="ts">
import Stepper from '@/components/ComponentStepper.vue'
import CardCat from '@/components/ComponentCardCat.vue'
import Socials from '@/components/ComponentSocial.vue'
import Popup from '@/components/ComponentPopup.vue'
import Button from '@/components/ComponentButton.vue'
import { onMounted, ref } from 'vue'
import axios, { toFormData } from 'axios'
import useCarrinhoStore from '@/stores/carrinhoStore'

// PRODUTOS SELECIONADOS
const carrinho = useCarrinhoStore()
const next = ref(false)

// JSON DE SIMULAÇÃO
interface Categoria {
  id: number
  nome: string
  imagem:string
  produtos: Produto[]
}

interface Produto {
  id: number
  nome: string
  preco: number
  descricao: string
  imagem: string
}

const categorias = ref<Categoria[]>([])
const produtos = ref<Produto[]>([])

// PEGANDO OS DADOS
onMounted(async () => {
  try {
    const response = await axios.get('/db.json')
    categorias.value = response.data.categorias
  } catch (error) {
    console.error(error)
  }
})

const popup = ref(false)

// fechar o popup
const togglePopup = (idCat?: Number) => {
  next.value = carrinho.produtos.length > 0 ? true : false
  if (idCat !== undefined) {
    const categoria = categorias.value.find((cat) => cat.id == idCat)
    produtos.value = categoria?.produtos ?? []
  }

  popup.value = !popup.value
}

</script>

<template>
  <div class="containerCategorias">
    <Stepper :step="1" title="Produtos" />
    <div class="containerCards">
      <CardCat
        @click="togglePopup"
        v-for="categoria in categorias"
        :key="categoria.id"
        :id="categoria.id"
        :titulo="categoria.nome"
        :imagem="categoria.imagem"
        :fundo="Math.floor(categoria.id / 2) % 2 === 0 ? 'b1' : 'b2'"
      />
    </div>
    <Button v-show="next" url="/info" />
    <Socials />
    <Popup @close="togglePopup()" v-show="popup" :produtos="produtos" />
  </div>
</template>

<style scoped>
.containerCategorias {
  width: 90%;
  height: fit-content;
  margin-top: 100px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
}

.containerCards {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
}
</style>
