<template>
  <div class="layout-padding">
    <h4>CREATE USER</h4>
  </div>
</template>

<script>
  import { CNPJ, CPF } from 'cpf_cnpj'
  import validationClientMixin from '../../../mixins/validationClient.mixin'
  import statesMixin from '../../../mixins/states.mixin'
  import formatMixin from '../../../mixins/format.mixin'
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
    QStepperNavigation
  } from 'quasar'
  export default {
    mixins: [statesMixin, formatMixin, validationClientMixin],
    methods: {
      closeLoading () {
        setTimeout(Loading.hide, 600)
      },
      submit () {
        if (this.$v.client.$invalid === false) {
          this.$store.dispatch('clientInsert', this.client)
            .then(() => {
              Loading.show()
              this.$router.push('/clients')
              this.closeLoading()
              Toast.create.positive({
                html: 'Cliente cadastrado com sucesso',
                icon: 'done'
              })
            })
            .catch(() => {
              Toast.create.negative({
                html: 'Não pode ser cadastrado',
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
      documentComputed: {
        get: function () {
          if (this.client && this.client.document) {
            if (this.client.type === 1) {
              if (this.client.document.length === 11) {
                if (CPF.isValid(this.client.document)) {
                  return CPF.format(this.client.document)
                }
                else {
                  this.client.document = ''
                  return Toast.create.negative('Informe um CPF válido')
                }
              }
              else {
                return CPF.format(this.client.document)
              }
            }
            else {
              return CNPJ.format(this.client.document)
            }
          }
          else {
            return ''
          }
        },
        set: function (newValue) {
          if (this.client.type === 1) {
            this.client.document = CPF.strip(newValue)
          }
          else {
            this.client.document = CNPJ.strip(newValue)
          }
        }
      }
    },
    data () {
      return {
        error: false,
        currentStep: 'first',
        client: {
          email: '',
          name: '',
          document: '',
          phone: '',
          type: 1,
          phoneAlternative: '',
          state: '',
          city: '',
          zip_code: '',
          street: '',
          neighborhood: '',
          number: '',
          complement: ''
        }
      }
    },
    components: {
      QInput,
      QField,
      QSelect,
      Loading,
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
