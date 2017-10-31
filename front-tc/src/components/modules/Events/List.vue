<template>
    <div class="layout-padding">
        <q-data-table
                :data="events.data || []"
                :columns="columns"
                :config="config"
                @refresh="refresh"
        >
            <template slot="col-created_at" scope="cell">
                <span>{{cell.row.created_at | moment }}</span>
            </template>
            <template slot="col-startDate" scope="cell">
                <span>{{cell.row.startDate | moment }}</span>
            </template>
            <template slot="col-endDate" scope="cell">
                <span>{{cell.row.endDate | moment }}</span>
            </template>
            <template slot="selection" scope="selection">
                <q-btn class="primary clear" @click="goTo(selection)"><q-icon name="remove_red_eye"></q-icon>Visualizar Registro</q-btn>
            </template>
        </q-data-table>
        <q-fixed-position corner="bottom-left" :offset="[10, 10]">
            <q-tooltip>
                Cadastrar Evento
            </q-tooltip>
            <q-btn  @click="goCreate()" round icon="ion-plus-round" color="primary">
            </q-btn>
        </q-fixed-position>

    </div>
</template>

<script>
    import dataTableEventMixin from '../../../mixins/dataTableEvent.mixin'
    import moment from 'moment'
    import {
      QIcon,
      QFixedPosition,
      QFab,
      QFabAction,
      QDataTable,
      QField,
      QInput,
      QCheckbox,
      QSelect,
      QSlider,
      clone,
      QBtn,
      QTooltip,
      QCollapsible
    } from 'quasar'
    export default {
      mixins: [dataTableEventMixin],
      data () {
        return {
          client: ''
        }
      },
      computed: {
        events () {
          return this.$store.state.events.list
        }
      },
      methods: {
        goCreate () {
          return this.$router.push('/events/create')
        },
        goTo (item) {
          let id = item.rows[0].data.id
          return this.$router.push('/events/' + id)
        },
        refresh (done) {
          this.timeout = setTimeout(() => {
            done()
          }, 5000)
        }
      },
      mounted () {
        this.$store.dispatch('eventsList')
      },
      filters: {
        moment: function (date) {
          return moment(date).format('DD/MM/YYYY HH:mm')
        }
      },
      watch: {
        pagination (value) {
          if (!value) {
            this.oldPagination = clone(this.config.pagination)
            this.config.pagination = false
            return
          }
          this.config.pagination = this.oldPagination
        },
        rowHeight (value) {
          this.config.rowHeight = value + 'px'
        },
        bodyHeight (value) {
          let style = {}
          if (this.bodyHeightProp !== 'auto') {
            style[this.bodyHeightProp] = value + 'px'
          }
          this.config.bodyStyle = style
        },
        bodyHeightProp (value) {
          let style = {}
          if (value !== 'auto') {
            style[value] = this.bodyHeight + 'px'
          }
          this.config.bodyStyle = style
        }
      },
      components: {
        QIcon,
        QFixedPosition,
        QFab,
        QFabAction,
        QDataTable,
        QField,
        QInput,
        QCheckbox,
        QSelect,
        QSlider,
        QBtn,
        QTooltip,
        QCollapsible
      }
    }
</script>

<style>
</style>