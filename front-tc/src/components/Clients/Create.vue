<template>
  <div class="layout-padding">
    <q-stepper v-model="currentStep">
      <q-step name="first" title="Dados Pessoais">
        <div class="row xs-gutter">
          <div class="col-xs-12 col-sm-6">
            <q-field
                    helper="Insira o nome completo do cliente"
                    :error="$v.form.person.name.$error"
                    error-label="Por favor, preencha com nome válido">
            <q-input
                    max-length="100"
                    v-model="form.person.name"
                    float-label="Nome Completo"
                    class="no-margin"
                    @blur="$v.form.person.name.$touch"
            />
              </q-field>
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-field
                    helper="Selecione o tipo de cliente"
                    :error="$v.form.person.type.$error"
                    error-label="Por favor, preencha este campo">
              <q-select
                      v-model="form.person.type"
                      float-label="Tipo de pessoa?"
                      @blur="$v.form.person.type.$touch"
                      :options="options"
              />
            </q-field>
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-field
                    :error="$v.form.person.document.$error"
                    error-label="Por favor, preencha um Nº Documento válido">
              <template v-if="this.form.person.type === 1">
                <q-input
                        v-model="documentComputed"
                        max-length="11"
                        float-label="Nº Documento(CPF)"
                        @blur="$v.form.person.document.$touch"
                />
              </template>
              <template v-if="this.form.person.type === 2">
                <q-input
                        v-model="documentComputed"
                        max-length="14"
                        float-label="Nº Documento(CNPJ)"
                        @blur="$v.form.person.document.$touch"
                        :error="$v.form.person.document.$error"
                />
              </template>
            </q-field>
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-field :error="error" error-label="Por favor, preencha com E-mail válido">
              <q-input
                      v-model="form.person.email"
                      type="email"
                      class="no-margin"
                      float-label="E-mail"
                      @blur="$v.form.person.email.$touch"
                      :error="$v.form.person.email.$error"
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
                      @blur="$v.form.person.phone.$touch"
                      :error="$v.form.person.phone.$error"
                      max-length="15"
                      float-label="Telefone" />
              </q-field>
            </div>
            <div class="col-xs-12 col-sm-3">
              <q-field
                      :error="$v.form.person.phoneAlternative.$error"
                      error-label="Por favor, preencha com telefone válido">
              <q-input
                      type="text"
                      max-length="15"
                      class="no-margin"
                      v-model="phoneAlternativeComputed"
                      @blur="$v.form.person.phoneAlternative.$touch"
                      float-label="Telefone Alernativo"
              />
              </q-field>
          </div>
        </div>
        <q-stepper-navigation>
            <q-btn :disabled="$v.form.person.$invalid"  color="primary" @click="currentStep = 'second'">Avançar</q-btn>
        </q-stepper-navigation>
      </q-step>
      <q-step name="second" title="Endereço">
        <div class="xs-gutter">
          <div class="row">
            <div class="col-xs-12 col-sm-2">
              <q-field
                      :error="$v.form.address.zip_code.$error"
                      error-label="Por favor, preencha este campo">
                <q-input
                        v-on:keyup="buscarCEP"
                        max-length="9"
                        v-model="form.address.zip_code"
                        float-label="CEP"
                        class="no-margin"
                        @blur="$v.form.address.zip_code.$touch"
                />
              </q-field>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-4">
              <q-field
                      :error="$v.form.address.city.$error"
                      error-label="Por favor, preencha este campo">
                <q-input
                        max-length="100"
                        v-model="form.address.city"
                        float-label="Cidade"
                        class="no-margin"
                        @blur="$v.form.person.name.$touch"
                />
              </q-field>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-4">
              <q-field
                      :error="$v.form.address.street.$error"
                      error-label="Por favor, preencha este campo">
                <q-input
                        max-length="100"
                        v-model="form.address.street"
                        float-label="Logradouro"
                        class="no-margin"
                        @blur="$v.form.person.name.$touch"
                />
              </q-field>
            </div>
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
  import { required, email, numeric, minLength } from 'vuelidate/lib/validators'
  var CPF = require('cpf_cnpj').CPF
  import axios from 'axios'
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
      },
      buscarCEP () {
        if (this.form.address.zip_code.length === 8) {
          this.form.address.zip_code = PhoneFormatter.modules.cepFormatter(this.form.address.zip_code)
          if (/^[0-9]{5}-[0-9]{3}$/.test(this.form.address.zip_code)) {
            axios.get('https://viacep.com.br/ws/' + this.form.address.zip_code + '/json/')
              .then((response) => {
                console.log(response.data)
                this.form.address.city = response.data.localidade
                this.form.address.state = response.data.uf
              })
          }
        }
      },
      seila () {
        console.log(CPF.isValid('01335065145'))
      }
    },
    computed: {
      documentComputed: {
        get: function () {
          if (this.form.person && this.form.person.document) {
            if (this.form.person.type === 1) {
              if (this.form.person.document.length === 11) {
                if (CPF.isValid(this.form.person.document)) {
                  return CPF.format(this.form.person.document)
                }
                else {
                  this.form.person.document = ''
                  return Toast.create.negative('Informe um CPF válido')
                }
              }
              else {
                return CPF.format(this.form.person.document)
              }
            }
            else {
              return CNPJ.format(this.form.person.document)
            }
          }
          else {
            return ''
          }
        },
        set: function (newValue) {
          if (this.form.person.type === 1) {
            this.form.person.document = CPF.strip(newValue)
          }
          else {
            this.form.person.document = CNPJ.strip(newValue)
          }
        }
      },
      phoneComputed: {
        get: function () {
          if (this.form.person && this.form.person.phone) {
            return PhoneFormatter.modules.phoneFormatter(this.form.person.phone)
          }
          else {
            return ''
          }
        },
        set: function (newValue) {
          this.form.person.phone = PhoneFormatter.modules.strip(newValue)
        }
      },
      phoneAlternativeComputed: {
        get: function () {
          if (this.form.person && this.form.person.phoneAlternative) {
            return PhoneFormatter.modules.phoneFormatter(this.form.person.phoneAlternative)
          }
          else {
            return ''
          }
        },
        set: function (newValue) {
          this.form.person.phoneAlternative = PhoneFormatter.modules.strip(newValue)
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
          person: {
            email: '',
            name: '',
            document: '',
            phone: '',
            type: 1,
            phoneAlternative: ''
          },
          address: {
            state: '',
            city: '',
            zip_code: '',
            street: '',
            neighborhood: '',
            number: '',
            complement: ''
          }
        }
      }
    },
    validations: {
      form: {
        person: {
          email: { required, email },
          name: { required, minLength: minLength(3) },
          document: { required, numeric, minLength: minLength(11) },
          phone: { required, numeric },
          type: { required },
          phoneAlternative: { numeric, minLength: minLength(11) }
        },
        address: {
          state: { required },
          city: { required },
          zip_code: { required },
          street: { required },
          neighborhood: { required },
          number: { required },
          complement: { required }
        }
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
