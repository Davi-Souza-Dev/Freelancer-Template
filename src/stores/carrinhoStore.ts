import { defineStore } from 'pinia'

interface Produto {
  id: number
  nome: string
  preco: number
  imagem: string
}

const useCarrinhoStore = defineStore('carrinho', {
  state: () => ({
    produtos: [] as Produto[],
  }),

  getters: {
    getProdutos: (state) => state.produtos,
  },
  actions: {
    setProduto(id: number, nome: string, preco: number, imagem: string) {
      const produtoExistente = this.produtos.find((p) => p.id === id)
      if (produtoExistente == undefined) {
        const produto: Produto = {
          id,
          nome,
          preco,
          imagem,
        }
        this.produtos.push(produto)
      }
      //   console.log(produto)
    },
    removerProduto(id: number) {
      this.produtos = this.produtos.filter((p) => p.id !== id)
    },
  },
  persist: {
    storage: localStorage,
  },
})

export default useCarrinhoStore
