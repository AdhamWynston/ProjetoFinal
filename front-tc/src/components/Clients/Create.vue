<template>
  <div class="layout-padding">
    <q-stepper v-model="currentStep">
      <q-step name="first" title="Dados Pessoais">
        <div class="row sm-gutter">
          <div class="col-xs-12 col-sm-6">
            <q-field :error="error" error-label="Por favor, preencha com nome válido">
            <q-input
                    v-model="form.name"
                    class="no-margin"
                    float-label="Nome"
                    autofocus
                    @blur="$v.form.name.$touch"
                    :error="$v.form.name.$error"
            />
              </q-field>
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-field :error="error" error-label="Por favor, preencha este campo">
              <q-select
                      v-model="form.type"
                      float-label="Tipo de pessoa?"
                      @blur="$v.form.type.$touch"
                      :error="$v.form.type.$error"
                      radio
                      :options="selectOptions"
              />
            </q-field>
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-field :error="error" error-label="Por favor, preencha com nome válido">
            <q-input
                    v-model="documentComputed"
                    class="no-margin"
                    max-length="11"
                    float-label="Nº Documento"
                    @blur="$v.form.document.$touch"
                    :error="$v.form.document.$error"
            />
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
              <q-field :error="error" error-label="Por favor, preencha com número válido">
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
              <q-field :error="error" error-label="Por favor, preencha com número válido">
              <q-input
                      type="text"
                      max-length="15"
                      class="no-margin"
                      v-model="phoneAlternativeComputed"
                      @blur="$v.form.phoneAlternative.$touch"
                      :error="$v.form.phoneAlternative.$error"
                      float-label="Telefone Alernativo"
              />
              </q-field>
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
          <q-btn color="green" @click="submit()">Salvar</q-btn>
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
  import { required, email, numeric, alpha, minLength } from 'vuelidate/lib/validators'
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
            return CPF.format(this.form.document)
          }
          else {
            return ''
          }
        },
        set: function (newValue) {
          this.form.document = CPF.strip(newValue)
        }
      },
      cnpjComputed: {
        get: function () {
          if (this.form && this.form.document) {
            return CNPJ.format(this.form.document)
          }
          else {
            return ''
          }
        },
        set: function (newValue) {
          this.form.document = CNPJ.strip(newValue)
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
        selectOptions: [
          {
            label: 'Fisíca',
            value: '1'
          },
          {
            label: 'Jurídica',
            value: '2'
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
          type: '',
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
        name: { required, alpha, minLength: minLength(3) },
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
  .error {
    border-color: red;
    background: #FDD;
  }

  .error:focus {
    outline-color: #F99;
  }

  .valid {
    border-color: #5A5;
    background: #EFE;
  }

  .valid:focus {
    outline-color: #8E8;
  }
</style>
