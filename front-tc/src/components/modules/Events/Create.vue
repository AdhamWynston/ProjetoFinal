<template>
    <div class="layout-padding row justify-center">
        <div style="width: 500px; max-width: 90vw;">
            <q-search inverted color="secondary" v-model="terms" placeholder="Featuring static data">
                <q-autocomplete
                        v-model="terms"
                        @search="search"
                        :max-results="4"
                        @selected="selected"
                />
            </q-search>
        </div>
    </div>
</template>

<script>
  import {
    QAutocomplete,
    QField,
    QSearch,
    filter,
    QInput
  } from 'quasar'

//  function parseClients () {
//    return this.cList.data.map(client => {
//      let name = client.name
//      let id = client.id
//      return {
//        label: name,
//        sublabel: id,
//        value: name
//      }
//    })
//  }
  export default {
    data () {
      return {
        terms: '',
        clients: [],
        selectedClient: { address: {} }
      }
    },
    computed: {
      cList () {
        return this.$store.state.clients.list
      },
      parseClients () {
        return this.clients.map(client => {
          return {
            allData: client,
            label: client.name,
            sublabel: client.document,
            value: client.name
          }
        })
      }
    },
    methods: {
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
        console.log(this.clients)
      }
    },
    mounted () {
      this.getClients()
    },
    components: {
      QAutocomplete,
      QField,
      QSearch,
      QInput
    }
  }
</script>

<style>
</style>