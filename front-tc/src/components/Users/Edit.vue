<template>
  <div>

    <div class="row">
      <q-stepper v-model="currentStep">
        <q-step name="first" title="Dados Pessoais">
          <div class="row sm-gutter">
            <div class="col-12">
              <q-input
                      v-model="client.name"
                      class="no-margin"
                      float-label="Nome"
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                      v-model="cpfComputed"
                      class="no-margin"
                      float-label="Nº Documento"
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                      v-model="client.email"
                      type="email"
                      class="no-margin"
                      float-label="E-mail"
                      required
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                      type="text"
                      v-model="phoneComputed"
                      class="no-margin"
                      max-length="15"
                      float-label="Telefone" />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                      type="text"
                      max-length="15"
                      class="no-margin"
                      v-model="phoneAlternativeComputed"
                      float-label="Telefone Alernativo"
              />
            </div>
          </div>
          <q-stepper-navigation>
            <q-btn color="primary" @click="currentStep = 'second'">Avançar</q-btn>
          </q-stepper-navigation>
        </q-step>
        <q-step name="second" title="Endereço">
          <div class="row sm-gutter">
            <div class="col-12">
              <q-input
                      v-model="client.name"
                      class="no-margin"
                      float-label="Nome"
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                      v-model="client.document"
                      class="no-margin"
                      float-label="Nº Documento"
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                      v-model="client.email"
                      type="email"
                      class="no-margin"
                      float-label="E-mail"
                      required
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                      v-model="phoneComputed"
                      class="no-margin"
                      float-label="Telefone" />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                      type="text"
                      max-length="15"
                      v-model="phoneAlternativeComputed"
                      float-label="Telefone Alernativo"
              />
            </div>
          </div>
          <q-stepper-navigation>
            <q-btn color="primary" @click="currentStep = 'first'">Voltar</q-btn>
            <q-btn color="green" @click="seila()">Salvar</q-btn>
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </div>
  </div>
</template>

<script>
  import { required, email } from 'vuelidate/lib/validators'
  var CPF = require('cpf_cnpj').CPF
  import PhoneFormatter from '../../services/my-formatter'
  var CNPJ = require('cpf_cnpj').CNPJ
  import {
    QInput,
    QBtn,
    QAlert,
    Toast,
    QStepper,
    QStep,
    QStepperNavigation
  } from 'quasar'
  export default {
    methods: {
      seila () {
        console.log(CPF.isValid('01335065145'))
      }
    },
    computed: {
      client () {
        return this.$store.state.clients.one || {}
      },
      documentComputed: {
        get: function () {
          if (this.client && this.client.document) {
            return CPF.format(this.client.document)
          }
          else {
            return ''
          }
        },
        set: function (newValue) {
          this.client.document = CPF.strip(newValue)
        }
      },
      cnpjComputed: {
        get: function () {
          if (this.client && this.client.document) {
            return CNPJ.format(this.client.document)
          }
          else {
            return ''
          }
        },
        set: function (newValue) {
          this.client.document = CNPJ.strip(newValue)
        }
      },
      phoneComputed: {
        get: function () {
          if (this.client && this.client.phone) {
            return PhoneFormatter.modules.phoneFormatter(this.client.phone)
          }
          else {
            return ''
          }
        },
        set: function (newValue) {
          console.log(newValue)
          this.client.phone = PhoneFormatter.modules.strip(newValue)
        }
      },
      phoneAlternativeComputed: {
        get: function () {
          if (this.client && this.client.phoneAlternative) {
            return PhoneFormatter.modules.phoneFormatter(this.client.phoneAlternative)
          }
          else {
            return ''
          }
        },
        set: function (newValue) {
          console.log(newValue)
          this.client.phoneAlternative = PhoneFormatter.modules.strip(newValue)
        }
      }
    },
    data () {
      return {
        currentStep: 'first',
        form: {
          email: '',
          phone: ''
        }
      }
    },
    validations: {
      form: {
        email: { required, email }
      }
    },
    components: {
      QInput,
      Toast,
      QBtn,
      QAlert,
      QStepper,
      QStep,
      QStepperNavigation
    }
  }
</script>

<style scoped>
</style>
