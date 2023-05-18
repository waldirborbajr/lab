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
            <input class="bp-input" v-model.trim="name" id="name" type="text" autofocus required
              placeholder="Bank name..." />
          </div>
          <div class="bp-field-div">
            <label class="bp-label" for="agency">Agency:</label>
            <input v-model.trim="agency" id="agency" class="bp-input" type="text" autofocus required
              placeholder="Agency number..." />
          </div>
          <div class="bp-field-div">
            <label class="bp-label" for="account">Account:</label>
            <input v-model.trim="account" id="account" class="bp-input" type="text" autofocus required
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
      <input class="p-2 mb-2 border-2" type="text" v-model.trim="searchCriteria" @keyup="searchBank"
        placeholder="Search..." />
      <div class="align-middle" v-show="status.loading">
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
          <tr v-for="(b, index) in banks" :key="index">
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
import { onBeforeMount, reactive, onMounted, ref, toRefs } from 'vue'
import { Trash2, Edit, Loader } from 'lucide-vue-next'
import { notify } from '@kyvg/vue3-notification'
// import BPButton from '../../components/button/BPButton.vue'
import http from '../../common/http-common.ts'

// On Events
onBeforeMount(async () => {
  await browseList()
})

onMounted(() => {
  console.log('mounted')
  notify({
    group: 'top-right',
    type: 'success',
    text: 'Loading...'
  })
})

const searchCriteria = ref('')

const status = reactive({
  loading: false,
  state: false
})

// const props = defineProps<{
//   banks: []
//   id: Number
//   name: String
//   agency: String
//   account: String
// }>()

const bank = reactive({
  banks: [],
  id: null,
  name: null,
  agency: null,
  account: null
})

const { banks, id, name, agency, account } = toRefs(bank)

const clearFiel = () => {
  banks.value = []
  id.value = null
  name.value = null
  agency.value = null
  account.value = null
}

const searchBank = () => ({})
// const searchBank = computed(() => {
//   return bank.banks.filter(searchCriteria.value.toLowerCase())
// })

const browseList = async () => {
  status.loading = true
  await http
    .get('/bank')
    .then((response) => {
      bank.banks = response.data.data
      status.loading = false
    })
    .catch(() =>
      notify({
        group: 'top-right',
        type: 'error',
        text: 'ERROR: load'
      })
    )
    .finally(() => (status.state = false))
}

// const showAlert = () => {
//   alert('BPButton Clicked')
// }

const onNewClick = () => {
  clearFiel()
}

const onSubmitClick = async () => {
  status.state = true
  if (id.value === null || id.value === undefined || id.value === 0) {
    // New bank
    await http
      .post('/bank', bank)
      .then(() => {
        browseList()

        // Object.assign(bank, null)
        clearFiel()
      })
      .catch(() =>
        notify({
          group: 'top-right',
          type: 'error',
          text: 'ERROR: save'
        })
      )
      .finally(() => (status.state = false))
  } else {
    // Update bank
    await http
      .put(`/bank/${id.value}`, bank)
      .then(() => {
        browseList()
        // Object.assign(bank, null)
        clearFiel()
      })
      .catch(() =>
        notify({
          group: 'top-right',
          type: 'error',
          text: 'ERROR: update '
        })
      )
      .finally(() => (status.state = false))
  }
}

const deleteBank = async (id: BigInt) => {
  await http
    .delete(`/bank/${id}`)
    .then(() => {
      browseList()
    })
    .catch(() =>
      notify({
        group: 'top-right',
        type: 'error',
        text: 'ERROR: delete'
      })
    )
    .finally(() => (status.state = false))
}

const editBank = async (id: BigInt) => {
  await http
    .get(`/bank/${id}`)
    .then((response) => {
      Object.assign(bank, response.data.data)
    })
    .catch(() =>
      notify({
        group: 'top-right',
        type: 'error',
        text: 'ERROR: edit'
      })
    )
    .finally(() => (status.state = false))
}
</script>
