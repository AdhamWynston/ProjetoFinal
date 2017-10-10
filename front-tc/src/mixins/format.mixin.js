import PhoneFormatter from '../services/my-formatter'
import axios from 'axios'
export default {
  methods: {
    cepFormat () {
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
    phoneFormat (value) {
      if (this.form.person.phone.length >= 10) {
        if (value === 1) {
          this.form.person.phone = PhoneFormatter.modules.phoneFormatter(this.form.person.phone)
        }
        else {
          this.form.person.phoneAlternative = PhoneFormatter.modules.phoneFormatter(this.form.person.phoneAlternative)
        }
      }
    }
  }
}
