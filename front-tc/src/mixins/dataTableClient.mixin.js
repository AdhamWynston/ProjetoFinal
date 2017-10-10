export default {
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
  }
}
