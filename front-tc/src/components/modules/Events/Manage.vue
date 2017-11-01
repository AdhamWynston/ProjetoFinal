<template>
    <div class="layout-padding row justify-center">
        <div class="col-xs-12 col-sm-8 col-md-8">
            <q-collapsible
                    icon="info_outline"
                    label="Dados do Evento"
                    style="max-width: 600px; margin-bottom: 25px"
                    class="shadow-2"
            >
                <div>
                    <q-item>
                        <q-item-main>
                            <q-item-tile label>Nome</q-item-tile>
                            <q-item-tile sublabel>{{ event.name }}</q-item-tile>
                        </q-item-main>
                    </q-item>
                    <q-item>
                        <q-item-main>
                            <q-item-tile label>Início do evento</q-item-tile>
                            <q-item-tile sublabel>{{ event.startDate | moment}}</q-item-tile>
                        </q-item-main>
                    </q-item>
                    <q-item>
                        <q-item-main>
                            <q-item-tile label>Término do evento</q-item-tile>
                            <q-item-tile sublabel>{{ event.endDate | moment}}</q-item-tile>
                        </q-item-main>
                    </q-item>
                    <q-item>
                        <q-item-main>
                            <q-item-tile label>Quantidade de Seguranças</q-item-tile>
                            <q-item-tile sublabel>{{ event.quantityEmployees }}</q-item-tile>
                        </q-item-main>
                    </q-item>
                    <q-item>
                        <q-item-main>
                            <q-item-tile label>Observações</q-item-tile>
                            <q-item-tile sublabel>{{ event.observations }}</q-item-tile>
                        </q-item-main>
                    </q-item>
                    <q-item>
                        <q-item-main>
                            <q-item-tile label>Cadastrado em</q-item-tile>
                            <q-item-tile sublabel>{{ event.created_at | moment }}</q-item-tile>
                        </q-item-main>
                    </q-item>
                    <q-item>
                        <q-item-main>
                            <q-item-tile label>Atualizado em</q-item-tile>
                            <q-item-tile sublabel>{{ event.updated_at | moment }}</q-item-tile>
                        </q-item-main>
                    </q-item>
                </div>
            </q-collapsible>
            <template v-show="">
                <q-data-table
                        :data="employees.data || []"
                        :columns="columns"
                        :config="config"
                        @refresh="refresh"
                >
                    <template slot="col-created_at" scope="cell">
                        <span>{{cell.row.created_at | moment }}</span>
                    </template>
                    <template slot="selection" scope="selection">
                        <q-btn class="primary clear" @click="goTo(selection)"><q-icon name="remove_red_eye"></q-icon>Visualizar Registro</q-btn>
                    </template>
                </q-data-table>
            </template>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import dataTableEventMixin from '../../../mixins/dataTableEvent.mixin'
    import { CNPJ, CPF } from 'cpf_cnpj'
    import {
      QDataTable,
      QFixedPosition,
      QFab,
      QFabAction,
      Toast,
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
      mixins: [dataTableEventMixin],
      data () {
        return {
          client: {}
        }
      },
      computed: {
        employees () {
          return this.$store.state.employees.list
        },
        event () {
          return this.$store.state.events.one || {}
        }
      },
      mounted () {
        this.$store.dispatch('eventsGet', this.$route.params.id)
      },
      filters: {
        moment: function (date) {
          return moment(date).format('DD/MM/YYYY HH:mm')
        },
        document: function (value) {
          if (value.length === 11) {
            return CPF.format(value)
          }
          return CNPJ.format(value)
        }
      },
      components: {
        QDataTable,
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
        Toast,
        QSideLink,
        QListHeader,
        QScrollArea
      }
    }
</script>

<style>
</style>