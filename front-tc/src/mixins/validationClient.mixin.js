import { required, email, numeric, minLength } from 'vuelidate/lib/validators'
export default {
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
      if (!this.$v.client.email.required) {
        return 'Este campo é obrigatório!'
      }
      else if (!this.$v.client.email.email) {
        return 'Preencha com E-mail válido!'
      }
      else if (!this.$v.client.email.isUnique) {
        return 'Este E-mail já está cadastrado!'
      }
      else {
        return null
      }
    }
  },
  data () {
    return {
      options: [
        {
          label: 'Fisíca',
          value: 1
        },
        {
          label: 'Jurídica',
          value: 2
        }
      ]
    }
  },
  validations: {
    client: {
      email: { required,
        email },
      name: { required, minLength: minLength(3) },
      document: { required,
        numeric,
        minLength: minLength(11)
      },
      phone: { required, minLength: minLength(11) },
      type: { required },
      phoneAlternative: { minLength: minLength(11) },
      state: { required },
      city: { required },
      zip_code: { required },
      street: { required },
      neighborhood: { required },
      number: { required },
      complement: { required }
    }
  }
}
