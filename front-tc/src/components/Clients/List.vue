<template>
  <div class="layout-padding">
    <q-data-table
            :data="clients.data || []"
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
    <q-fixed-position corner="bottom-left" :offset="[16, 16]">
      <q-btn  @click="goCreate()" round icon="ion-plus-round" color="primary">
      </q-btn>
    </q-fixed-position>
  </div>
</template>

<script>
  /* eslint-disable no-unreachable */

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
    QBtn,
    QTooltip,
    QCollapsible,
    clone
  } from 'quasar'
  export default {
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
    },
    data () {
      return {
        config: {
          title: 'Listagem dos Clientes',
          columnPicker: true,
          leftStickyColumns: 0,
          rightStickyColumns: 2,
          refresh: true,
          bodyStyle: {
            maxHeight: '500px'
          },
          selection: 'single',
          rowHeight: '50px',
          responsive: true,
          pagination: {
            rowsPerPage: 5,
            options: [5, 10, 15, 30, 50, 500]
          },
          messages: {
            noData: '<i class="material-icons">error_outline</i> Nenhum registro para exibir.',
            noDataAfterFiltering: '<i class="material-icons">error_outline</i> Nenhum resultado. Refine os termos da busca.'
          },
          labels: {
            columns: 'Colunas',
            search: 'Pesquisar cliente...',
            allCols: 'Todas as colunas',
            clear: 'limpar',
            all: 'Todos',
            rows: 'Registros por página',
            selected: {
              singular: 'item selecionado.',
              width: '20px'
            }
          }
        },
        columns: [
          {
            label: 'Nome',
            field: 'name',
            width: '100px',
            sort: true,
            filter: true
          },
          {
            label: 'Nº Documento',
            field: 'document',
            width: '60px',
            sort: false,
            filter: true
          },
          {
            label: 'Telefone',
            field: 'phone',
            width: '60px',
            sort: false,
            filter: true
          },
          {
            label: 'Status',
            field: 'status',
            format (value) {
              if (value === 1) {
                return '<i class="material-icons text-positive">check_circle</i> Ativado'
              }
              return '<i class="material-icons text-danger">warning</i> Desativado'
            },
            width: '30px'
          },
          {
            label: 'Cadastrado em',
            field: 'created_at',
            width: '60px',
            sort: true,
            filter: true
          }
        ]
      }
    },
    computed: {
      clients () {
        return this.$store.state.clients.list
      }
    },
    methods: {
      goCreate () {
        return this.$router.push('/clients/create')
      },
      goTo (item) {
        let id = item.rows[0].data.id
        return this.$router.push('/clients/' + id)
      },
      refresh (done) {
        this.timeout = setTimeout(() => {
          done()
        }, 5000)
      }
    },
    mounted () {
      this.$store.dispatch('clientsList')
    },
    filters: {
      moment: function (date) {
        return moment(date).format('DD/MM/YYYY hh:mm')
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
    }
  }
</script>

<style>
</style>
