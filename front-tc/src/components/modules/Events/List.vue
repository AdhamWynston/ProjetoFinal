<template>
    <div class="layout-padding">
        <h4>
            Listar Eventos
        </h4>
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
      QCollapsible
    } from 'quasar'
    export default {
      data () {
        return {
        }
      },
      methods: {
        goCreate () {
          return this.$router.push('/events/create')
        }
      },
      filters: {
        moment: function (date) {
          return moment(date).format('DD/MM/YYYY HH:mm')
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