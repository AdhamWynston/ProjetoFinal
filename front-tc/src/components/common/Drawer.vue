<template>
    <div>
        <q-list no-border link inset-delimiter>
            <div class="row flex-center bg-white" style="width: 100%; height: 110px;"><img src="~assets/L.png" style="height: 75px;"> <div style="margin-left: 15px;">Lean Tools</div></div>
            <q-list-header>Ações no sistema</q-list-header>
            <q-side-link item to="/home">
                <q-item-side icon="home" />
                <q-item-main label="Home" sublabel="General Information" />
            </q-side-link>
            <q-side-link item to="/clients">
                <q-item-side icon="ion-ios-people" />
                <q-item-main label="Clientes" sublabel="Modúlo Clientes" />
            </q-side-link>
            <q-side-link item to="/users">
                <q-item-side icon="supervisor_account" />
                <q-item-main label="Usuários" sublabel="Modúlo Usuários" />
            </q-side-link>
            <q-side-link item to="/employees">
                <q-item-side icon="insert_chart" />
                <q-item-main label="Funcionários" sublabel="Modúlo Funcionários" />
            </q-side-link>
            <q-item link @click="logout()">
                <q-item-side  icon="ion-android-exit" />
                <q-item-main label="Sair" />
            </q-item>
        </q-list>
    </div>
</template>

<script>
  import {
    QIcon,
    QList,
    Loading,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QSideLink
  } from 'quasar'
  export default {
    name: 'drawer',
    components: {
      Loading,
      QIcon,
      QList,
      QListHeader,
      QItem,
      QItemSide,
      QItemMain,
      QSideLink
    },
    methods: {
      closeLoading () {
        setTimeout(Loading.hide, 600)
      },
      logout () {
        Loading.show()
        let goToLogin = () => {
          this.closeLoading()
          this.$router.push('/login')
        }
        this.$store.dispatch('logout')
          .then(goToLogin)
          .catch(goToLogin)
      }
    }
  }
</script>

<style>
</style>