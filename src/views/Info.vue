<script setup lang="ts">
import Button from '@/components/ComponentButton.vue'
import ButtonBack from '@/components/ComponentButtonBack.vue'
import Social from '@/components/ComponentSocial.vue'
import Stepper from '@/components/ComponentStepper.vue'
import useInfoStore from '@/stores/infoStore'
import { onMounted, ref } from 'vue'
import { MaskInput } from 'vue-3-mask'

const infoStore = useInfoStore()

const next = ref(false)
const formData = ref({
  nome: '',
  telefone: '',
  extra: '',
})

// PEGANDO OS DADOS JÁ ARMAZENADOS SE TIVER
onMounted(() => {
  formData.value.nome = infoStore.getInfo.nome
  formData.value.telefone = infoStore.getInfo.telefone
  formData.value.extra = infoStore.getInfo.extra
  input();
})

const input = () => {
  infoStore.setInfo(formData.value.nome, formData.value.telefone, formData.value.extra)
  if (formData.value.nome != '' && formData.value.telefone != '') {
    next.value = true
  }
}
</script>

<template>
  <div class="containerInfo">
    <Stepper :step="2" title="Informações" />
    <div class="containerForm">
      <div class="form-row">
        <label for="txtNome"> Nome </label>
        <div class="inputContainer">
          <div class="inputIcon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <g id="User / User_Card_ID">
                  <path
                    id="Vector"
                    d="M6 18C6.06366 18 6.12926 18 6.19691 18H12M6 18C5.01173 17.9992 4.49334 17.9868 4.0918 17.7822C3.71547 17.5905 3.40973 17.2837 3.21799 16.9074C3 16.4796 3 15.9203 3 14.8002V9.2002C3 8.08009 3 7.51962 3.21799 7.0918C3.40973 6.71547 3.71547 6.40973 4.0918 6.21799C4.51962 6 5.08009 6 6.2002 6H17.8002C18.9203 6 19.4796 6 19.9074 6.21799C20.2837 6.40973 20.5905 6.71547 20.7822 7.0918C21 7.5192 21 8.07899 21 9.19691V14.8031C21 15.921 21 16.48 20.7822 16.9074C20.5905 17.2837 20.2837 17.5905 19.9074 17.7822C19.48 18 18.921 18 17.8031 18H12M6 18C6.00004 16.8954 7.34317 16 9 16C10.6569 16 12 16.8954 12 18M6 18C6 18 6 17.9999 6 18ZM18 14H14M18 11H15M9 13C7.89543 13 7 12.1046 7 11C7 9.89543 7.89543 9 9 9C10.1046 9 11 9.89543 11 11C11 12.1046 10.1046 13 9 13Z"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
          <input
            type="text"
            name="txtNome"
            id="txtNome"
            v-model="formData.nome"
            @keyup="input"
            placeholder="Seu nome completo"
          />
        </div>
      </div>
      <div class="form-row">
        <label for="numTel"> Telefone </label>
        <div class="inputContainer">
          <div class="inputIcon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.73268 2.043C6.95002 0.832583 8.95439 1.04804 9.9737 2.40962L11.2347 4.09402C12.0641 5.20191 11.9909 6.75032 11.0064 7.72923L10.7676 7.96665C10.7572 7.99694 10.7319 8.09215 10.76 8.2731C10.8232 8.6806 11.1635 9.545 12.592 10.9654C14.02 12.3853 14.8905 12.7253 15.3038 12.7887C15.4911 12.8174 15.5891 12.7906 15.6194 12.78L16.0274 12.3743C16.9026 11.5041 18.2475 11.3414 19.3311 11.9305L21.2416 12.9691C22.8775 13.8584 23.2909 16.0821 21.9505 17.4148L20.53 18.8273C20.0824 19.2723 19.4805 19.6434 18.7459 19.7119C16.9369 19.8806 12.7187 19.6654 8.28659 15.2584C4.14868 11.144 3.35462 7.556 3.25415 5.78817L4.00294 5.74562L3.25415 5.78817C3.20335 4.89426 3.62576 4.13796 4.16308 3.60369L5.73268 2.043ZM8.77291 3.30856C8.26628 2.63182 7.322 2.57801 6.79032 3.10668L5.22072 4.66737C4.8908 4.99542 4.73206 5.35695 4.75173 5.70307C4.83156 7.10766 5.47286 10.3453 9.34423 14.1947C13.4057 18.2331 17.1569 18.3536 18.6067 18.2184C18.9029 18.1908 19.1975 18.0369 19.4724 17.7636L20.8929 16.3511C21.4704 15.777 21.343 14.7315 20.5252 14.2869L18.6147 13.2484C18.0871 12.9616 17.469 13.0562 17.085 13.438L16.6296 13.8909L16.1008 13.359C16.6296 13.8909 16.6289 13.8916 16.6282 13.8923L16.6267 13.8937L16.6236 13.8967L16.6171 13.903L16.6025 13.9166C16.592 13.9262 16.5799 13.9367 16.5664 13.948C16.5392 13.9705 16.5058 13.9959 16.4659 14.0227C16.3858 14.0763 16.2801 14.1347 16.1472 14.1841C15.8764 14.285 15.5192 14.3392 15.0764 14.2713C14.2096 14.1384 13.0614 13.5474 11.5344 12.0291C10.0079 10.5113 9.41194 9.36834 9.2777 8.50306C9.20906 8.06061 9.26381 7.70331 9.36594 7.43225C9.41599 7.29941 9.47497 7.19378 9.5291 7.11389C9.5561 7.07405 9.58179 7.04074 9.60446 7.01368C9.6158 7.00015 9.6264 6.98817 9.63604 6.9777L9.64977 6.96312L9.65606 6.95666L9.65905 6.95363L9.66051 6.95217C9.66122 6.95146 9.66194 6.95075 10.1908 7.48258L9.66194 6.95075L9.94875 6.66556C10.3774 6.23939 10.4374 5.53194 10.0339 4.99297L8.77291 3.30856Z"
                  fill="var(--color1)"
                ></path>
              </g>
            </svg>
          </div>
          <MaskInput
            v-model="formData.telefone"
            mask="(##) #####-####"
            id="numTel"
            name="numTel"
            @keyup="input"
            placeholder="(99) 9999-9999"
          />
        </div>
      </div>
      <div class="form-row">
        <label for="txtExtra"> Informações extras </label>
        <div class="inputContainer">
          <textarea
            type="text"
            name="txtExtra"
            id="txtExtra"
            @keyup="input"
            v-model="formData.extra"
            placeholder="Informações extra, pedidos ou detalhes que desejar"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="containerButtons">
      <Button v-show="next" url="/final" />
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

.form-row input {
  width: 100%;
  display: flex;
  flex: 1;
  outline: 2px solid var(--color1);
  border-radius: 0px 5px 5px 0px;
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
