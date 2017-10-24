<template>
    <div class="layout-padding row justify-center">
            <div class="row">
                <q-card style="width: 700px">
                    <q-card-title>
                        <h4>
                            Cadastrar Usuário
                        </h4>
                    </q-card-title>
                    <q-card-main>
                        <div class="row sm-gutter">
                            <div class="col-xs-12 col-sm-8">
                                <q-field
                                        :error="$v.user.name.$error"
                                        error-label="Por favor, preencha este campo">
                                    <q-input
                                            v-model="user.name"
                                            stack-label="Nome Completo"
                                            @blur="$v.user.name.$touch"
                                    />
                                </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-8">
                                <q-field
                                        :error="$v.user.email.$error"
                                        error-label="Por favor, preencha este campo">
                                    <q-input
                                            v-model="user.email"
                                            stack-label="E-mail"
                                            @blur="$v.user.email.$touch"
                                    />
                                </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6">
                                <q-field
                                        :error="$v.user.role.$error"
                                        error-label="Por favor, preencha este campo">
                                    <q-select
                                            v-model="user.role"
                                            float-label="Permissão"
                                            @blur="$v.user.role.$touch"
                                            :options="roles"
                                    />
                                </q-field>
                            </div>
                        </div>
                        <br>
                        <q-btn @click="back"flat>Voltar</q-btn>
                        <q-btn color="primary" @click="submit">Cadastrar</q-btn>
                    </q-card-main>
                </q-card>
            </div>
    </div>
</template>

<script>
  import {
    Events,
    QSelect,
    QField,
    QInput,
    Loading,
    QCard,
    QBtn,
    Toast,
    QCardTitle,
    QCardMedia,
    QCardActions,
    QCardSeparator,
    QCardMain
  }
    from 'quasar'
  import { required, email } from 'vuelidate/lib/validators'
export default {
    data () {
      return {
        error: false,
        roles: [
          {
            label: 'Usuário',
            value: 2
          },
          {
            label: 'Administrador',
            value: 1
          }
        ],
        user: {
          name: '',
          email: '',
          role: ''
        }
      }
    },
    validations: {
      user: {
        name: { required },
        email: { email, required },
        role: { required }
      }
    },
    methods: {
      back () {
        this.$router.push('')
      },
      closeLoading () {
        setTimeout(Loading.hide, 300)
      },
      submit () {
        Loading.show({
          delay: 300
        })
        if (this.$v.user.$invalid === false) {
          this.$store.dispatch('userInsert', this.user)
            .then(() => {
              this.$router.push('/admin/users')
              this.closeLoading()
              Toast.create.positive({
                html: 'Usuário cadastrado com sucesso',
                icon: 'done'
              })
            })
            .catch(() => {
              this.closeLoading()
              Toast.create.negative({
                html: 'Não pode ser cadastrado',
                icon: 'cancel'
              })
            })
        }
        else {
          this.closeLoading()
          Toast.create.negative('Verifique os dados')
        }
      }
    },
    mounted () {
      Events.$on('createUser', () => {
        this.submit()
      })
    },
    computed: {
      nameError () {
        if (!this.$v.employee.name.required) {
          console.log(this.$v.employee.name.required)
          return 'Este campo é obrigatório!'
        }
        else if (!this.$v.employee.name.minLength) {
          console.log(this.$v.employee.name.minLength)
          return 'Preencha com nome válido!'
        }
        else {
          return null
        }
      },
      emailError () {
        if (!this.$v.user.email.required) {
          return 'Este campo é obrigatório!'
        }
        else if (!this.$v.user.email.email) {
          return 'Preencha com E-mail válido!'
        }
        else if (!this.$v.user.email.isUnique) {
          return 'Este E-mail já está cadastrado!'
        }
        else {
          return null
        }
      }
    },
    components: {
      Loading,
      Events,
      QSelect,
      QField,
      QInput,
      QCard,
      QBtn,
      Toast,
      QCardTitle,
      QCardMedia,
      QCardActions,
      QCardSeparator,
      QCardMain
    }
}
</script>

<style lang="stylus">
</style>
