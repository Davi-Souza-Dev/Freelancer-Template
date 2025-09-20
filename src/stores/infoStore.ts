import { defineStore } from 'pinia'

const useInfoStore = defineStore('infoStore', {
  state: () => ({
    formData: {
      nome: '',
      telefone: '',
      extra: '',
      endereco: {
        cep: '',
        rua: '',
        numero: 0,
        complemento: '',
        bairro: '',
        cidade: '',
      },
    },
  }),

  getters: {
    getInfo: (state) => state.formData,
  },
  actions: {
    setInfo(nome: string, telefone: string, extra: string) {
      this.formData.nome = nome
      this.formData.telefone = telefone
      this.formData.extra = extra
    },
    setEndereco(
      cep: string,
      rua: string,
      numero: number,
      complemento: string,
      bairro: string,
      cidade: string,
    ) {
      this.formData.endereco.cep = cep
      this.formData.endereco.rua = rua
      this.formData.endereco.numero = numero
      this.formData.endereco.complemento = complemento
      this.formData.endereco.bairro = bairro
      this.formData.endereco.cidade = cidade
    },
  },
  persist: {
    storage: localStorage,
  },
})

export default useInfoStore
