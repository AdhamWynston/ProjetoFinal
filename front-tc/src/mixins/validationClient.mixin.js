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
        email,
        async isUnique (value) {
          if (value === '') {
            return true
          }
          const response = await fetch(`http://127.0.0.1:8000/api/unique/clients?where[email]=${value}`)
          return Boolean(await response.json())
        }
      },
      name: { required, minLength: minLength(3) },
      document: { required,
        numeric,
        minLength: minLength(11),
        async isUnique (value) {
          if (value === '') {
            return true
          }
          const response = await fetch(`http://127.0.0.1:8000/api/unique/clients?where[document]=${value}`)
          return Boolean(await response.json())
        }
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
