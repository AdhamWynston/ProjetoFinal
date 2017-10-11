<template>
  <div class="layout-padding justify-center">
    <div class="row">
      <div class="col-auto">
      <h5>
       Informações do Cliente
      </h5>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-md-8">
    <q-list link>
      <q-collapsible icon="perm_identity" label="Dados Pessoais">
        <div>
      <q-item>
        <q-item-main>
          <q-item-tile label>Nome</q-item-tile>
          <q-item-tile sublabel>{{ client.name }}</q-item-tile>
        </q-item-main>
      </q-item>
      <q-item>
        <q-item-main>
          <q-item-tile label>Nº Documento</q-item-tile>
          <q-item-tile sublabel>{{ client.document }}</q-item-tile>
        </q-item-main>
      </q-item>
      <q-item>
        <q-item-main>
          <q-item-tile label>Telefone</q-item-tile>
          <q-item-tile sublabel>{{ client.phone }}</q-item-tile>
        </q-item-main>
      </q-item>
      <template v-if="client.phoneAlternative != null">
        <q-item>
          <q-item-main>
            <q-item-tile label>Telefone Alternativo</q-item-tile>
            <q-item-tile sublabel>{{ client.phoneAlternative }}</q-item-tile>
          </q-item-main>
        </q-item>
      </template>
      <q-item>
        <q-item-main>
          <q-item-tile label>E-mail</q-item-tile>
          <q-item-tile sublabel>{{ client.email }}</q-item-tile>
        </q-item-main>
      </q-item>
          <q-item>
            <q-item-main>
              <q-item-tile label>Cadastrado em</q-item-tile>
              <q-item-tile sublabel>{{ client.created_at | moment }}</q-item-tile>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-main>
              <q-item-tile label>Atualizado em</q-item-tile>
              <q-item-tile sublabel>{{ client.updated_at | moment }}</q-item-tile>
            </q-item-main>
          </q-item>
        </div>
      </q-collapsible>
      <q-collapsible icon="ion-ios-location" label="Endereço">
        <div>
          <q-item>
            <q-item-main>
              <q-item-tile label>Cidade</q-item-tile>
              <q-item-tile sublabel>{{ client.city }}</q-item-tile>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-main>
              <q-item-tile label>CEP</q-item-tile>
              <q-item-tile sublabel>{{ client.zip_code }}</q-item-tile>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-main>
              <q-item-tile label>Estado</q-item-tile>
              <q-item-tile sublabel>{{ client.state }}</q-item-tile>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-main>
              <q-item-tile label>Rua/Logradouro</q-item-tile>
              <q-item-tile sublabel>{{ client.street }}</q-item-tile>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-main>
              <q-item-tile label>Número</q-item-tile>
              <q-item-tile sublabel>{{ client.number }}</q-item-tile>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-main>
              <q-item-tile label>Bairro</q-item-tile>
              <q-item-tile sublabel>{{ client.neighborhood }}</q-item-tile>
            </q-item-main>
          </q-item>
          <template v-if="client.complement != null">
            <q-item>
              <q-item-main>
                <q-item-tile label>Complemento</q-item-tile>
                <q-item-tile sublabel>{{ client.complement }}</q-item-tile>
              </q-item-main>
            </q-item>
          </template>
        </div>
      </q-collapsible>
      <q-collapsible icon="ion-levels" label="Extras">
        <div>
          <q-item tag="label">
            <q-item-main>
              <q-item-tile label>Cliente está ativo?</q-item-tile>
              <q-item-tile sublabel>Selecione se sim</q-item-tile>
            </q-item-main>
            <q-item-side right>
              <q-toggle color="secondary" v-model="client.status" />
            </q-item-side>
          </q-item>
          <q-item-separator />
          <q-item tag="label">
            <q-item-main>
              <q-item-tile label>Notificações</q-item-tile>
              <q-item-tile sublabel>Notificar o cliente quando estiver eventos próximos?</q-item-tile>
            </q-item-main>
            <q-item-side>
              <q-checkbox v-model="checked_two" />
            </q-item-side>
          </q-item>
        </div>
      </q-collapsible>
    </q-list>
      </div>
    </div>
    <q-fixed-position corner="bottom-left" :offset="[16, 16]">
      <q-btn  @click="goEdit()" round icon="ion-edit" color="orange">
      </q-btn>
    </q-fixed-position>
  </div>
</template>

<script>
  /* eslint-disable indent */
import moment from 'moment'
import {
  QFixedPosition,
  QFab,
  QFabAction,
  QModal,
  QStepper,
  QStep,
  QStepperNavigation,
  QModalLayout,
  QCheckbox,
  QRadio,
  QToggle,
  QList,
  QListHeader,
  QItem,
  QItemSeparator,
  QCollapsible,
  QInnerLoading,
  QItemSide,
  QItemMain,
  QItemTile,
  QLayout,
  QCard,
  QCardTitle,
  QCardMedia,
  QCardActions,
  QCardSeparator,
  QCardMain,
  QToolbar,
  QToolbarTitle,
  QSearch,
  QTabs,
  QRouteTab,
  QBtn,
  QIcon,
  QSideLink,
  QTooltip,
  QScrollArea} from 'quasar'
export default {
  components: {
    QFixedPosition,
    QCheckbox,
    QModal,
    QModalLayout,
    QRadio,
    QToggle,
    QCollapsible,
    QList,
    QStepper,
    QStep,
    QStepperNavigation,
    QItem,
    QItemSeparator,
    QItemTile,
    QInnerLoading,
    QTooltip,
    QCard,
    QCardMedia,
    QCardActions,
    QCardSeparator,
    QCardMain,
    QCardTitle,
    QFabAction,
    QFab,
    QLayout,
    QToolbar,
    QToolbarTitle,
    QSearch,
    QTabs,
    QRouteTab,
    QBtn,
    QIcon,
    QItemSide,
    QItemMain,
    QSideLink,
    QListHeader,
    QScrollArea
  },
  data () {
    return {
      checked_one: true,
      list2: true,
      checked_two: true,
      clientCreated: ''
    }
  },
  computed: {
    client () {
      return this.$store.state.clients.one || {}
    }
  },
  mounted () {
    this.$store.dispatch('clientsGet', this.$route.params.id)
  },
  filters: {
    moment: function (date) {
      return moment(date).format('DD/MM/YYYY HH:mm')
    }
  },
  methods: {
    back () {
      window.history.go(-1)
    },
    clientDate () {
      this.clientCreated = moment().format('DD/MM/YYYY')
      return this.clientCreated
    },
    goEdit () {
      this.$router.push('/clients/' + this.client.id + '/edit')
    }
  }
}
</script>

<style>
</style>
