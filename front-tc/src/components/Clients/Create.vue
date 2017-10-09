<template>
  <div class="layout-padding">
    <q-stepper v-model="currentStep">
      <q-step name="first" title="Dados Pessoais">
        <div class="row xs-gutter">
          <div class="col-xs-12 col-sm-6">
            <q-field
                    helper="Insira o nome completo do cliente"
                    :error="$v.form.name.$error"
                    error-label="Por favor, preencha com nome válido">
            <q-input
                    max-length="100"
                    v-model="form.name"
                    float-label="Nome Completo"
                    class="no-margin"
                    @blur="$v.form.name.$touch"
            />
              </q-field>
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-field
                    helper="Selecione o tipo de cliente"
                    :error="$v.form.type.$error"
                    error-label="Por favor, preencha este campo">
              <q-select
                      v-model="form.type"
                      float-label="Tipo de pessoa?"
                      @blur="$v.form.type.$touch"
                      :options="options"
              />
            </q-field>
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-field
                    :error="$v.form.document.$error"
                    error-label="Por favor, preencha um Nº Documento válido">
              <template v-if="this.form.type === 1">
                <q-input
                        v-model="documentComputed"
                        max-length="11"
                        float-label="Nº Documento(CPF)"
                        @blur="$v.form.document.$touch"
                />
              </template>
              <template v-if="this.form.type === 2">
                <q-input
                        v-model="documentComputed"
                        max-length="14"
                        float-label="Nº Documento(CNPJ)"
                        @blur="$v.form.document.$touch"
                        :error="$v.form.document.$error"
                />
              </template>
            </q-field>
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-field :error="error" error-label="Por favor, preencha com E-mail válido">
              <q-input
                      v-model="form.email"
                      type="email"
                      class="no-margin"
                      float-label="E-mail"
                      @blur="$v.form.email.$touch"
                      :error="$v.form.email.$error"
                      required
              />
            </q-field>
          </div>
            <div class="col-xs-12 col-sm-3">
              <q-field :error="error" error-label="Por favor, preencha com telefone válido">
              <q-input
                      type="text"
                      v-model="phoneComputed"
                      class="no-margin"
                      @blur="$v.form.phone.$touch"
                      :error="$v.form.phone.$error"
                      max-length="15"
                      float-label="Telefone" />
              </q-field>
            </div>
            <div class="col-xs-12 col-sm-3">
              <q-field
                      :error="$v.form.phoneAlternative.$error"
                      error-label="Por favor, preencha com telefone válido">
              <q-input
                      type="text"
                      max-length="15"
                      class="no-margin"
                      v-model="phoneAlternativeComputed"
                      @blur="$v.form.phoneAlternative.$touch"
                      float-label="Telefone Alernativo"
              />
              </q-field>
          </div>
        </div>
        <q-stepper-navigation>
          <template v-if="phoneComputed != ''">
            <q-btn color="primary" @click="currentStep = 'second'">Avançar</q-btn>
          </template>
          <template v-if="phoneComputed === ''">
            <q-btn disable color="primary" @click="currentStep = 'second'">Avançar</q-btn>
          </template>
        </q-stepper-navigation>
      </q-step>
      <q-step name="second" title="Endereço">
        <div class="row sm-gutter">
          <div class="col-12">
            <q-input
                    v-model="form.name"
                    class="no-margin"
                    float-label="Nome"
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-field error-label="Por favor, preencha com E-mail válido">
            <q-input
                    v-model="form.document"
                    class="no-margin"
                    float-label="Nº Documento"
            />
            </q-field>
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-field error-label="Por favor, preencha com E-mail válido">
            <q-input
                    v-model="form.email"
                    type="email"
                    class="no-margin"
                    float-label="E-mail"
                    @blur="$v.form.email.$touch"
                    :error="$v.form.email.$error"
                    required
            />
            </q-field>
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
          <template v-if="phoneComputed === ''">
            <q-btn color="green" @click="submit()">Salvar</q-btn>
          </template>
          <template v-if="phoneComputed != ''">
            <q-btn color="green" @click="submit()">teste</q-btn>
          </template>
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
  import { required, email, numeric, minLength } from 'vuelidate/lib/validators'
  var CPF = require('cpf_cnpj').CPF
  import PhoneFormatter from '../../services/my-formatter'
  var CNPJ = require('cpf_cnpj').CNPJ
  import {
    QInput,
    QSelect,
    QBtn,
    QField,
    QAlert,
    Toast,
    QStepper,
    QStep,
    QStepperNavigation
  } from 'quasar'
  export default {
    methods: {
      submit () {
        this.$v.form.$touch()
        if (this.$v.form.$error) {
          Toast.create('Please review fields again.')
          return console.log('oi')
        }
      },
      seila () {
        console.log(CPF.isValid('01335065145'))
      }
    },
    computed: {
      documentComputed: {
        get: function () {
          if (this.form && this.form.document) {
            if (this.form.type === 1) {
              return CPF.format(this.form.document)
            }
            else {
              return CNPJ.format(this.form.document)
            }
          }
          else {
            return ''
          }
        },
        set: function (newValue) {
          if (this.form.type === 1) {
            console.log(this.form.type)
            this.form.document = CPF.strip(newValue)
          }
          else {
            console.log(this.form.type)
            this.form.document = CNPJ.strip(newValue)
          }
        }
      },
      phoneComputed: {
        get: function () {
          if (this.form && this.form.phone) {
            return PhoneFormatter.modules.phoneFormatter(this.form.phone)
          }
          else {
            return ''
          }
        },
        set: function (newValue) {
          console.log(newValue)
          this.form.phone = PhoneFormatter.modules.strip(newValue)
        }
      },
      phoneAlternativeComputed: {
        get: function () {
          if (this.form && this.form.phoneAlternative) {
            return PhoneFormatter.modules.phoneFormatter(this.form.phoneAlternative)
          }
          else {
            return ''
          }
        },
        set: function (newValue) {
          console.log(newValue)
          this.form.phoneAlternative = PhoneFormatter.modules.strip(newValue)
        }
      }
    },
    data () {
      return {
        error: false,
        currentStep: 'first',
        options: [
          {
            label: 'Fisíca',
            value: 1
          },
          {
            label: 'Jurídica',
            value: 2
          }
        ],
        form: {
          email: '',
          name: '',
          document: '',
          state: '',
          city: '',
          zip_code: '',
          street: '',
          type: 1,
          neighborhood: '',
          number: '',
          complement: '',
          phone: '',
          phoneAlternative: ''
        }
      }
    },
    validations: {
      form: {
        email: { required, email },
        name: { required, minLength: minLength(3) },
        document: { required, numeric, minLength: minLength(11) },
        state: { required },
        city: { required },
        zip_code: { required, numeric },
        street: { required },
        type: { required },
        neighborhood: { required },
        number: { required },
        complement: { required },
        phone: { required, numeric },
        phoneAlternative: { numeric, minLength: minLength(11) }
      }
    },
    components: {
      QInput,
      QField,
      QSelect,
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
