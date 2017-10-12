<template>
  <div class="layout-padding">
    <q-stepper v-model="currentStep">
      <q-step name="first" title="Dados Pessoais" color="light">
        <div class="row-inline">
          <div class="row sm-gutter self-center">
            <div class="col-xs-12 col-sm-8">
              <q-field
                      :error="$v.employee.name.$error"
                      error-label="Por favor, preencha com nome válido">
                <q-input
                        max-length="100"
                        v-model="employee.name"
                        float-label="Nome Completo"
                        class="no-margin"
                        @blur="$v.employee.name.$touch"
                />
              </q-field>
            </div>
          </div>
          <div class="row xs-gutter">
            <div class="col-xs-12 col-sm-4">
              <q-field
                      :error="$v.employee.document.$error"
                      error-label="Por favor, preencha com CPF válido">
                  <q-input
                          v-model="documentComputed"
                          max-length="11"
                          float-label="Nº Documento(CPF)"
                          @blur="$v.employee.document.$touch"
                  />
              </q-field>
            </div>
          </div>
          <div class="row sm-gutter">
            <div class="col-xs-12 col-sm-6">
              <q-field :error="error" error-label="Por favor, preencha com E-mail válido">
                <q-input
                        v-model="employee.email"
                        type="email"
                        class="no-margin"
                        float-label="E-mail"
                        @blur="$v.employee.email.$touch"
                        :error="$v.employee.email.$error"
                        required
                />
              </q-field>
            </div>
          </div>
          <div class="row sm-gutter">
            <div class="col-xs-12 col-sm-3">
              <q-field :error="error" error-label="Por favor, preencha com telefone válido">
                <q-input
                        type="text"
                        v-model="employee.phone"
                        v-on:keyup="phoneFormat(1)"
                        class="no-margin"
                        @blur="$v.employee.phone.$touch"
                        :error="$v.employee.phone.$error"
                        max-length="15"
                        float-label="Telefone" />
              </q-field>
            </div>
            <div class="col-xs-12 col-sm-3">
              <q-field
                      :error="$v.employee.phoneAlternative.$error"
                      error-label="Por favor, preencha com telefone válido">
                <q-input
                        type="text"
                        max-length="15"
                        class="no-margin"
                        v-on:keyup="phoneFormat(2)"
                        v-model="employee.phoneAlternative"
                        @blur="$v.employee.phoneAlternative.$touch"
                        float-label="Telefone Alernativo"
                />
              </q-field>
            </div>
          </div>
          <q-stepper-navigation>
            <q-btn :disabled="$v.employee.$invalid"  color="primary" @click="currentStep = 'second'">Avançar</q-btn>
          </q-stepper-navigation>
        </div>
      </q-step>
      <q-step name="second" title="Endereço">
        <div class="row xs-gutter">
          <div class="col-xs-12 col-sm-3">
            <q-field
                    :error="$v.employee.zip_code.$error"
                    error-label="Por favor, preencha este campo">
              <q-input
                      v-on:keyup="cepFormat"
                      max-length="9"
                      v-model="employee.zip_code"
                      float-label="CEP"
                      class="no-margin"
                      @blur="$v.employee.zip_code.$touch"
              />
            </q-field>
          </div>
        </div>
        <div class="row sm-gutter">
          <div class="col-xs-12 col-sm-5">
            <q-field
                    :error="$v.employee.city.$error"
                    error-label="Por favor, preencha este campo">
              <q-input
                      max-length="100"
                      v-model="employee.city"
                      float-label="Cidade"
                      class="no-margin"
                      @blur="$v.employee.name.$touch"
              />
            </q-field>
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-field
                    :error="$v.employee.state.$error"
                    error-label="Por favor, preencha este campo">
              <q-select
                      v-model="employee.state"
                      float-label="Estado"
                      @blur="$v.employee.state.$touch"
                      :options="states"
              />
            </q-field>
          </div>
        </div>
        <div class="row sm-gutter">
          <div class="col-xs-12 col-sm-5">
            <q-field
                    :error="$v.employee.street.$error"
                    error-label="Por favor, preencha este campo">
              <q-input
                      max-length="100"
                      v-model="employee.street"
                      float-label="Logradouro"
                      class="no-margin"
                      @blur="$v.employee.street.$touch"
              />
            </q-field>
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-field
                    :error="$v.employee.neighborhood.$error"
                    error-label="Por favor, preencha este campo">
              <q-input
                      max-length="100"
                      v-model="employee.neighborhood"
                      float-label="Bairro"
                      class="no-margin"
                      @blur="$v.employee.neighborhood.$touch"
              />
            </q-field>
          </div>
        </div>
        <div class="row sm-gutter">
          <div class="col-xs-12 col-sm-3">
            <q-field
                    :error="$v.employee.number.$error"
                    error-label="Por favor, preencha este campo">
              <q-input
                      max-length="100"
                      v-model="employee.number"
                      float-label="Número"
                      class="no-margin"
                      @blur="$v.employee.number.$touch"
              />
            </q-field>
          </div>
          <div class="col-xs-12 col-sm-5">
            <q-field
                    :error="$v.employee.complement.$error"
                    error-label="Por favor, preencha este campo">
              <q-input
                      max-length="60"
                      v-model="employee.complement"
                      float-label="Complemento"
                      class="no-margin"
                      @blur="$v.employee.complement.$touch"
              />
            </q-field>
          </div>
        </div>
        <q-stepper-navigation>
          <q-btn color="primary" @click="currentStep = 'first'">Voltar</q-btn>
          <q-btn color="green" :disabled="$v.employee.$invalid" @click="save()">Salvar</q-btn>
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
  import { CNPJ, CPF } from 'cpf_cnpj'
  import validationFormat from '../../../mixins/validationClient.mixin'
  import statesMixin from '../../../mixins/states.mixin'
  import formatMixin from '../../../mixins/employeeFormat.mixin'
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
    mixins: [statesMixin, formatMixin, validationFormat],
    methods: {
      save () {
        if (this.$v.employee.$invalid === false) {
          let data = {
            name: this.employee.name,
            document: this.employee.document,
            state: this.employee.state,
            city: this.employee.city,
            zip_code: this.employee.zip_code,
            street: this.employee.street,
            type: this.employee.type,
            neighborhood: this.employee.neighborhood,
            number: this.employee.number,
            complement: this.employee.complement,
            phone: this.employee.phone,
            phoneAlternative: this.employee.phoneAlternative,
            email: this.employee.email
          }
          this.$store.dispatch('employeeUpdate', {id: this.$route.params.id, data: data})
            .then(() => {
              this.$store.dispatch('employeesGet', this.$route.params.id)
              this.$router.push('/employees')
              Toast.create.positive({
                html: 'Atualizado com sucesso',
                icon: 'done'
              })
            })
            .catch(() => {
              Toast.create.negative({
                html: 'Não pode ser atualizado',
                icon: 'cancel'
              })
            })
        }
        else {
          Toast.create.negative('Verifique os dados')
        }
      }
    },
    computed: {
      employee () {
        return this.$store.state.employees.one || {}
      },
      documentComputed: {
        get: function () {
          if (this.employee && this.employee.document) {
            if (this.employee.document.length === 11) {
              if (CPF.isValid(this.employee.document)) {
                return CPF.format(this.employee.document)
              }
              else {
                this.employee.document = ''
                return Toast.create.negative('Informe um CPF válido')
              }
            }
            else {
              return CPF.format(this.employee.document)
            }
          }
          else {
            return ''
          }
        },
        set: function (newValue) {
          if (this.employee.type === 1) {
            this.employee.document = CPF.strip(newValue)
          }
          else {
            this.employee.document = CNPJ.strip(newValue)
          }
        }
      }
    },
    data () {
      return {
        error: false,
        currentStep: 'first'
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
