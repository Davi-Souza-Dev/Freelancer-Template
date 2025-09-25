<script setup lang="ts">
import Button from '@/components/ComponentButtonFinal.vue'
import ButtonBack from '@/components/ComponentButtonBack.vue'
import Social from '@/components/ComponentSocial.vue'
import Loader from '@/components/ComponentLoader.vue'
import Stepper from '@/components/ComponentStepper.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import useInfoStore from '@/stores/infoStore'
import useCarrinhoStore from '@/stores/carrinhoStore'

const infoUser = useInfoStore()
const carrinho = useCarrinhoStore()
const next = ref(false)

const loading = ref(false)
const cep = ref('')
const formData = ref({
  cep: '',
  rua: '',
  numero: 0,
  complemento: '',
  bairro: '',
  cidade: '',
})

// VERIFICANDO SE JÁ NÃO EXISTEM DADOS
onMounted(() => {
  cep.value = infoUser.getInfo.endereco.cep
  formData.value.rua = infoUser.getInfo.endereco.rua
  formData.value.numero = infoUser.getInfo.endereco.numero
  formData.value.complemento = infoUser.getInfo.endereco.complemento
  formData.value.bairro = infoUser.getInfo.endereco.bairro
  formData.value.cidade = infoUser.getInfo.endereco.cidade
  formatCep()
  input()
})

// FORMATAR O CEP
const formatCep = () => {
  let cepAtaul = cep.value.replace(/\D/g, '')
  if (cepAtaul.length > 5) {
    cep.value = cepAtaul.replace(/^(\d{5})(\d{1,3})$/, '$1-$2')
  } else {
    cep.value = cepAtaul
  }
  let cepBusca = cepAtaul
  if (cepBusca.length === 8) {
    buscarCep(cepBusca)
  }
}

const buscarCep = async (cep: String) => {
  if (cep.length === 8) {
    // CONSUMINDO A API
    const response = await axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((resp) => {
        loading.value = true
        formData.value.cep = resp.data.cep
        formData.value.bairro = resp.data.bairro
        formData.value.cidade = resp.data.localidade
        formData.value.rua = resp.data.logradouro
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        loading.value = false
      })
  }
}

const input = () => {
  if (
    cep.value != '' &&
    formData.value.rua != '' &&
    formData.value.bairro != '' &&
    formData.value.cidade != '' &&
    formData.value.numero != 0 &&
    formData.value.numero > 0
  ) {
    infoUser.setEndereco(
      cep.value,
      formData.value.rua,
      formData.value.numero,
      formData.value.complemento,
      formData.value.bairro,
      formData.value.cidade,
    )
    next.value = true
  } else {
    next.value = false
  }
}

// PRAPARANDO A MENSAGEM E FINALIZANDO
const finish = () => {
  // PEGANDO PRODUTOS DO CARRINHO
  const produtos = carrinho.getProdutos

  // PEGANDO INFO DO USUÁRIO
  const info = infoUser.getInfo

  // MONTANDO A LISTA DE PRODUTOS
  const listaProdutos = produtos.map((p) => `- ${p.nome} -> R$${p.preco}`).join('\n')
  const infoExtra = `*Informações Extras:* ${info.extra} `
  // MONTANDO A MENSAGEM FINAL
  const mensagem = `
*Produtos escolhidos*
${listaProdutos}

*Informações do cliente*:
  *Nome:* ${info.nome}
  *Telefone:* ${info.telefone}
  ${info.extra != '' ? infoExtra : ''}

*Endereço de Entrega*
  *Cep:* ${info.endereco.cep}
  *Rua:* ${info.endereco.rua}
  *Complemento:* ${info.endereco.complemento != '' ? info.endereco.complemento : 'nenhum'}
  *Bairro:* ${info.endereco.bairro}
  *Cidade:* ${info.endereco.cidade}
  `

  // const telefone = '5511910092398'
  const telefone = '5511949335503'
  const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`

  window.open(url, '_blank')
}
</script>

<template>
  <div class="containerInfo">
    <Loader v-show="loading" />
    <Stepper :step="3" title="Informações" />
    <div class="containerForm">
      <div class="form-row">
        <div class="input-field">
          <label for="txtNome"> CEP </label>
          <div class="inputContainer">
            <div class="inputIcon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M20 11C20 13.2685 18.8565 15.3225 17.4341 17C15.9045 18.8039 14.0525 20.1724 12.9533 20.9039C12.3717 21.2908 11.6283 21.2908 11.0467 20.9039C9.94752 20.1724 8.09548 18.8039 6.56591 17C5.14353 15.3225 4 13.2685 4 11C4 6.58172 7.58172 3 12 3C16.4183 3 20 6.58172 20 11Z"
                    stroke="#323232"
                    stroke-width="2"
                  ></path>
                  <path
                    d="M15 11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11Z"
                    stroke="#323232"
                    stroke-width="2"
                  ></path>
                </g>
              </svg>
            </div>
            <input
              type="text"
              name="numCep"
              v-model="cep"
              @keyup="formatCep"
              maxlength="9"
              placeholder="00000-000"
            />
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="input-field">
          <label for="numTel"> RUA </label>
          <div class="inputContainer">
            <input type="text" name="numTel" v-model="formData.rua" @input="input" />
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="input-field">
          <label for="numTel"> Número </label>
          <div class="inputContainer">
            <input type="number" name="numTel" v-model="formData.numero" min="0" @input="input" />
          </div>
        </div>
        <div class="input-field">
          <label for="numTel"> Complemento </label>
          <div class="inputContainer">
            <input type="text" name="numTel" v-model="formData.complemento" />
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="input-field">
          <label for="numTel"> Bairro </label>
          <div class="inputContainer">
            <input type="text" name="numTel" v-model="formData.bairro" @input="input" />
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="input-field">
          <label for="numTel"> Cidade </label>
          <div class="inputContainer">
            <input type="text" name="numTel" v-model="formData.cidade" @input="input" />
          </div>
        </div>
      </div>
    </div>
    <div class="containerButtons">
      <Button @click="finish" v-show="next" />
      <ButtonBack />
    </div>
    <Social />
  </div>
</template>

<style scoped>
.containerInfo {
  width: 90%;
  height: fit-content;
  margin-top: 100px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
}

.containerForm {
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  gap: 30px;
}

.containerForm .form-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.form-row .input-field {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-row label {
  width: 100%;
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: 900;
  font-family: var(--font);
  color: var(--color1);
}

.inputContainer {
  width: 100%;
  height: fit-content;
  display: flex;
}

.inputContainer .inputIcon {
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color2-2);
  outline: 2px solid var(--color1);
  border-radius: 5px 0px 0px 5px;
}

.inputIcon svg {
  width: 80%;
  height: 80%;
}

.inputIcon svg path {
  stroke: var(--color1);
}

.form-row .inputIcon + input {
  width: 100%;
  display: flex;
  height: 35px;
  flex: 1;
  outline: 2px solid var(--color1);
  border-radius: 0px 5px 5px 0px;
  padding: 5px;
  text-transform: capitalize;
  font-weight: bold;
  font-family: var(--font);
}

.form-row input {
  width: 100%;
  display: flex;
  height: 35px;
  flex: 1;
  outline: 2px solid var(--color1);
  border-radius: 5px;
  padding: 5px;
  text-transform: capitalize;
  font-weight: bold;
  font-family: var(--font);
}

.form-row textarea {
  width: 100%;
  min-height: 100px;
  display: flex;
  flex: 1;
  outline: 2px solid var(--color1);
  border-radius: 5px;
  padding: 5px;
  text-transform: capitalize;
  font-weight: bold;
  font-family: var(--font);
  text-indent: 10px;
}

.containerButtons {
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
}
</style>
