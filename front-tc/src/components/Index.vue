<template>
    <q-layout
            ref="layout"
            :view="indexStore.view"
            :left-breakpoint="indexStore.leftBreakpoint"
            :right-breakpoint="indexStore.rightBreakpoint"
            :reveal="indexStore.reveal"
    >
        <q-toolbar slot="header" color="dark" class="glossy">
            <q-btn
                    flat
                    @click="$refs.layout.toggleLeft()"
            >
                <q-icon name="menu" />
            </q-btn>
            <q-toolbar-title>
                sgENV
                <div slot="subtitle">Sistema Gerenciador de Eventos</div>
            </q-toolbar-title>
            <template v-if=" this.$route.name != 'index' " >
            <q-btn class="within-iframe-hide" flat @click="back()" style="margin-right: 5px">
                <q-icon name="keyboard_arrow_left" />
                Voltar
            </q-btn>
            </template>
        </q-toolbar>
        <q-tabs slot="navigation" class="glossy" color="dark" v-if="!indexStore.hideTabs">
            <q-route-tab slot="title" icon="home" to="/" label="Home" />
            <q-route-tab slot="title" icon="ion-ios-people" to="/clients" label="Clientes" />
            <template v-if="isAdministrator">
                <q-route-tab slot="title" icon="supervisor_account" to="/users" label="Usuários" />
            </template>
        </q-tabs>
        <div slot="left">
            <q-side-link item to="/" exact>
                <q-item-side  icon="home" />
                <q-item-main label="Home" />
            </q-side-link>
            <q-side-link item to="/clients" exact>
                <q-item-side  icon="ion-ios-people" />
                <q-item-main label="Clientes" />
            </q-side-link>
            <q-side-link item to="/users" exact>
                <q-item-side  icon="supervisor_account" />
                <q-item-main label="Usuários" />
            </q-side-link>
            <q-item link @click="logout()">
                <q-item-side  icon="ion-android-exit" />
                <q-item-main label="Sair" />
            </q-item>
        </div>
            <router-view />
    </q-layout>
</template>

<script>
    /* eslint-disable indent */
    import indexStore from './index-store'
    import authMixin from '../mixins/auth.mixin'
    import {
        Loading,
        QSideLink,
        QLayout,
        QToolbar,
        QToolbarTitle,
        QBtn,
        QIcon,
        QTabs,
        Ripple,
        QRouteTab,
        QList,
        QListHeader,
        QItem,
        QItemSide,
        QItemMain
    } from 'quasar'

    export default {
        name: 'index',
        components: {
            Loading,
            Ripple,
            QSideLink,
            QLayout,
            QToolbar,
            QTabs,
            QRouteTab,
            QToolbarTitle,
            QBtn,
            QIcon,
            QList,
            QListHeader,
            QItem,
            QItemSide,
            QItemMain
        },
        mixins: [authMixin],
        data () {
          return {
            indexStore
          }
        },
      methods: {
        closeLoading () {
          setTimeout(Loading.hide, 600)
        },
        back () {
          window.history.go(-1)
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
      },
        computed: {
            list () {
                return this.$store.state.Expenses.list
            }
        }
    }
</script>

<style scoped="">
    .container {
        padding: 20px;
    }
</style>
