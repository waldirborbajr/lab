<template>
  <!-- MAIN GRID WITH TWO COLUMNS -->
  <div class="grid grid-cols-2 gap-1 mx-auto">
    <!-- Form Cell -->
    <div class="bp-section">
      <h2 class="bp-form-label">Bank Form</h2>
      <form @submit.prevent="onSubmitClick">
        <div>
          <div class="bp-field-div">
            <label class="bp-label" for="name">Bank:</label>
            <input class="bp-input" v-model.trim="bank.name" id="name" type="text" autofocus required
              placeholder="Bank name..." />
          </div>
          <div class="bp-field-div">
            <label class="bp-label" for="agency">Agency:</label>
            <input v-model.trim="bank.agency" id="agency" class="bp-input" type="text" autofocus required
              placeholder="Agency number..." />
          </div>
          <div class="bp-field-div">
            <label class="bp-label" for="account">Account:</label>
            <input v-model.trim="bank.account" id="account" class="bp-input" type="text" autofocus required
              placeholder="Account number..." />
          </div>
        </div>

        <!-- BUTTONS -->
        <div class="bp-div-three-button">
          <!-- <BPButton class="bp-button bp-bt-new" text="Click" @buttonClicked="showAlert" /> -->
          <button class="bp-button bp-bt-new" @click="onNewClick">New</button>
          <button class="bp-button bp-bt-cancel" @click="onNewClick">Cancel</button>
          <button class="bp-button bp-bt-save" type="submit">Save</button>
        </div>
      </form>
    </div>

    <!-- Grid Cell -->
    <div class="bp-section">
      <div class="align-middle" v-show="bank.loading">
        <Loader class="flex animate-bounce ext-green-600" size="64" stroke-width="4" />
        Please wait, loading data...
      </div>
      <table class="w-full bg-white table-auto table-striped border-collapse: collpase">
        <thead class="bg-slate-700 text-slate-300">
          <tr class="align-left items-left">
            <th>Bank</th>
            <th>Agency</th>
            <th>Account</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody class="w-full">
          <tr v-for="(b, index) in bank.banks" :key="index">
            <td>{{ b['name'] }}</td>
            <td>{{ b['agency'] }}</td>
            <td>{{ b['account'] }}</td>
            <td class="flex gap-4 p-2">
              <Trash2 class="transition duration-200 ease-in-out hover:scale-125" color="red"
                @click="deleteBank(b['id'])" />
              <Edit class="transition duration-200 ease-in-out hover:scale-125" color="green"
                @click="editBank(b['id'])" />
            </td>
          </tr>
        </tbody>
      </table>
      <div>PAGING</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue'
import { Trash2, Edit, Loader } from 'lucide-vue-next'
import { notify } from '@kyvg/vue3-notification'
// import { useI18n } from 'vue-i18n'
// import BPButton from '../../components/button/BPButton.vue'
import http from '../../common/http-common.ts'

// Contants
// const { t } = useI18n()

// Used to build grid
onBeforeMount(async () => {
  await browseList()
  notify({
    group: 'top-right',
    type: 'success',
    text: 'Loading...'
  })
})

const props = defineProps<{
  banks: []
  id: Number
  name: String
  agency: String
  account: String
  loading: Boolean
  state: Boolean
}>()

const bank = reactive({
  banks: props.banks,
  id: props.id,
  name: props.name,
  agency: props.agency,
  account: props.account,
  loading: props.loading,
  state: props.state
})

const clearFiel = () => {
  bank.id = 0
  bank.name = ''
  bank.agency = ''
  bank.account = ''
}

const browseList = async () => {
  bank.loading = true
  await http
    .get('/bank')
    .then((response) => {
      bank.banks = response.data.data
      bank.loading = false
    })
    .catch(
      (error) => console.error(t('load'))
      // notify({
      //   group: 'top-right',
      //   type: 'error',
      //   text: t('load')
      // })
    )
    .finally(() => (bank.state = false))
}

// const showAlert = () => {
//   alert('BPButton Clicked')
// }

const onNewClick = () => {
  clearFiel()
}

const onSubmitClick = async () => {
  bank.state = true
  if (bank.id === null || bank.id === undefined || bank.id === 0) {
    // New bank
    await http
      .post('/bank', bank)
      .then(() => {
        browseList()

        // Object.assign(bank, null)
        clearFiel()
      })
      .catch(
        (error) => console.error(t('save'))
        // notify({
        //   group: 'top-right',
        //   type: 'error',
        //   text: t('save')
        // })
      )
      .finally(() => (bank.state = false))
  } else {
    // Update bank
    await http
      .put(`/bank/${bank.id}`, bank)
      .then(() => {
        browseList()
        // Object.assign(bank, null)
        clearFiel()
      })
      .catch(
        (error) => console.error(t('update'))
        // notify({
        //   group: 'top-right',
        //   type: 'error',
        //   text: t('update')
        // })
      )
      .finally(() => (bank.state = false))
  }
}

const deleteBank = async (id: BigInt) => {
  await http
    .delete(`/bank/${id}`)
    .then(() => {
      browseList()
    })
    .catch(
      (error) => console.error(t('delete'))
      // notify({
      //   group: 'top-right',
      //   type: 'error',
      //   text: t('delete')
      // })
    )
    .finally(() => (bank.state = false))
}

const editBank = async (id: BigInt) => {
  await http
    .get(`/bank/${id}`)
    .then((response) => {
      Object.assign(bank, response.data.data)
    })
    .catch((err) => console.error('ERROR: loading data for edit: ', err))
    .finally(() => (bank.state = false))
}
</script>

<i18n lang="json">
{
  "pt-BR": {
    "load": "Erro carregando dados.",
    "save": "Erro salvando dados.",
    "update": "Erro atualizado dados.",
    "delete": "Erro ao remover dado."
  },
  "en-US": {
    "load": "Error loading data.",
    "save": "Error saving data.",
    "update": "Error updating data.",
    "delete": "Error deleting data."
  }
}
</i18n>
