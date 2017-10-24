import { required, email, numeric, minLength } from 'vuelidate/lib/validators'
export default {
  computed: {
    nameError () {
      if (!this.$v.employee.name.required) {
        return 'Este campo é obrigatório!'
      }
      else if (!this.$v.employee.name.minLength) {
        return 'Preencha com nome válido!'
      }
      else {
        return null
      }
    },
    emailError () {
      if (!this.$v.employee.email.required) {
        return 'Este campo é obrigatório!'
      }
      else if (!this.$v.employee.email.email) {
        return 'Preencha com E-mail válido!'
      }
      else {
        return null
      }
    }
  },
  validations: {
    employee: {
      email: { required, email },
      name: { required, minLength: minLength(3) },
      document: { required,
        numeric,
        minLength: minLength(11)
      },
      phone: { required, minLength: minLength(11) },
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
