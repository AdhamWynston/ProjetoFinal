<template>
    <div class="layout-padding row justify-center">
        <div style="width: 600px; max-width: 90vw;">
            <q-stepper v-model="step" flat ref="stepper">
                <q-step name="first" title="Cliente" color="light">
                    <div>
                        <div class="row sm-gutter">
                            <div class="col-xs-12 col-sm-12 col-md-12">
                                <q-search inverted color="secondary" v-model="terms" placeholder="Selecione o Cliente">
                                    <q-autocomplete
                                            v-model="terms"
                                            @search="search"
                                            :max-results="4"
                                            @selected="selected"
                                    />
                                </q-search>
                            </div>
                            </div>
                        </div>
                </q-step>
                <q-step name="second" title="Dados do Evento">
                    <div>
                        <div class="row xs-gutter">
                            <div class="col-xs-12 col-sm-12">
                                <q-field
                                        :error="$v.form.name.$error"
                                        error-label="Por favor, preencha este campo">
                                    <q-input
                                            autofocus
                                            max-length="100"
                                            v-model="form.name"
                                            float-label="Nome"
                                            class="no-margin"
                                            @blur="$v.form.name.$touch"
                                    />
                                </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-5">
                                <q-field
                                        :error="$v.form.quantityEmployee.$error"
                                        error-label="Por favor, preencha este campo">
                                    <q-input
                                            type="number"
                                            v-model="form.quantityEmployee"
                                            min="0"
                                            float-label="Quantidade de Seguranças"
                                            class="no-margin"
                                            @blur="$v.form.quantityEmployee.$touch"
                                    />
                                </q-field>
                            </div>
                        </div>
                    </div>
                </q-step>
                <q-stepper-navigation>
                    <q-btn
                            v-if="step !== 'first'"
                            color="primary"
                            flat
                            @click="$refs.stepper.previous()"
                    >
                        Voltar
                    </q-btn>
                    <template v-if="step === 'second'">
                        <q-btn color="primary" :disabled="$v.form.$invalid" @click="submit"> Cadastrar </q-btn>
                    </template>
                    <template v-else>
                        <q-btn color="primary" :disabled="$v.terms.$invalid" @click="$refs.stepper.next()" >Avançar</q-btn>
                    </template>
                </q-stepper-navigation>
            </q-stepper>
        </div>
    </div>
</template>

<script>
  import { required } from 'vuelidate/lib/validators'
  import { CNPJ, CPF } from 'cpf_cnpj'
  import {
    QInput,
    QSelect,
    QBtn,
    Loading,
    QField,
    QAlert,
    Toast,
    QStepper,
    QStep,
    QStepperNavigation,
    QAutocomplete,
    QSearch,
    filter,
    QCard,
    QCardTitle,
    QCardMedia,
    QCardActions,
    QCardSeparator,
    QCardMain,
    QList,
    QItem,
    QItemMain,
    QItemSide,
    QItemTile,
    QCollapsible,
    QRating,
    QParallax,
    QIcon
  } from 'quasar'
  export default {
    data () {
      return {
        step: 'first',
        error: false,
        terms: '',
        clients: [],
        selectedClient: { address: {} },
        form: {
          name: '',
          quantityEmployee: ''
        }
      }
    },
    computed: {
      cList () {
        return this.$store.state.clients.list
      },
      parseClients () {
        return this.clients.map(client => {
          let document = this.documentFormat(client.document)
          return {
            allData: client,
            label: client.name,
            sublabel: 'CPF: ' + document,
            value: client.name
          }
        })
      }
    },
    validations: {
      terms: { required },
      form: {
        name: { required },
        quantityEmployee: { required }
      }
    },
    methods: {
      documentFormat (value) {
        if (value.length === 11) {
          return CPF.format(value)
        }
        else {
          return CNPJ.format(value)
        }
      },
      submit () {
        console.log('submit')
      },
      search (terms, done) {
        setTimeout(() => {
          done(filter(terms, {field: 'value', list: this.parseClients}))
        }, 500)
      },
      selected (client) {
        this.selectedClient = client.allData
      },
      getClients () {
        this.$http.get('http://127.0.0.1:8000/api/clients')
          .then(response => {
            this.clients = response.data
          })
      }
    },
    mounted () {
      this.getClients()
    },
    components: {
      QSelect,
      Loading,
      QAlert,
      Toast,
      QStepper,
      QStep,
      QStepperNavigation,
      QAutocomplete,
      QField,
      QSearch,
      QInput,
      QCard,
      QCardTitle,
      QCardMedia,
      QCardActions,
      QCardSeparator,
      QCardMain,
      QList,
      QItem,
      QItemMain,
      QItemSide,
      QItemTile,
      QCollapsible,
      QRating,
      QBtn,
      QParallax,
      QIcon
    }
  }
</script>

<style>
</style>