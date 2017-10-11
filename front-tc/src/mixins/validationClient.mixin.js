import { required, email, numeric, minLength } from 'vuelidate/lib/validators'
export default {
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
      email: { required, email },
      name: { required, minLength: minLength(3) },
      document: { required, numeric, minLength: minLength(11) },
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
    },
    employee: {
      email: { required, email },
      name: { required, minLength: minLength(3) },
      document: { required, numeric, minLength: minLength(11) },
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
