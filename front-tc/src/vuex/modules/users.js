import 'vue-resource'
import Vue from 'vue'

export default {
  state: {
    list: [],
    one: {}
  },
  mutations: {
    update (state, config) {
      state[config.state] = config.data
    }
  },
  actions: {
    usersList (context) {
      return Vue.http.get('http://127.0.0.1:8000/api/users')
        .then((res) => {
          context.commit('update', {
            state: 'list',
            data: res
          })
        })
    },
    usersGet (context, id) {
      return Vue.http.get('http://127.0.0.1:8000/api/users/' + id)
        .then((res) => {
          context.commit('update', {
            state: 'one',
            data: res.data
          })
        })
    },
    clientInsert (context, data) {
      return Vue.http.post('http://127.0.0.1:8000/api/users', data)
    },
    clientUpdate (context, config) {
      return Vue.http.put('http://127.0.0.1:8000/api/users/' + config.id, config.data)
    },
    clientDesactive (context, id) {
      return Vue.http.delete('http://127.0.0.1:8000/api/users/' + id)
    }
  }
}
