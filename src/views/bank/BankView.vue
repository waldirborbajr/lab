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
            <div class="text-sm font-semibold text-red-700" v-for="error of v$.name.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
          <div class="bp-field-div">
            <label class="bp-label" for="agency">Agency:</label>
            <input v-model.trim="bank.agency" id="agency" class="bp-input" type="text" autofocus required
              placeholder="Agency number..." />
            <div class="text-sm font-semibold text-red-700" v-if="v$?.agency?.$dirty && v$?.agency?.$error">
              Please, Bank Agency Code it is required
            </div>
          </div>
          <div class="bp-field-div">
            <label class="bp-label" for="account">Account:</label>
            <input v-model.trim="bank.account" id="account" class="bp-input" type="text" autofocus required
              placeholder="Account number..." />
            <div class="text-sm font-semibold text-red-700" v-if="v$?.account?.$dirty && v$?.account?.$error">
              Please, Bank Account Number it is required
            </div>
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
          <tr v-for="(bank, index) in bank.banks" :key="index">
            <td>{{ bank['name'] }}</td>
            <td>{{ bank['agency'] }}</td>
            <td>{{ bank['account'] }}</td>
            <td class="flex gap-4 p-2">
              <Trash2 class="transition duration-200 ease-in-out hover:scale-125" color="red"
                @click="deleteBank(bank['id'])" />
              <Edit class="transition duration-200 ease-in-out hover:scale-125" color="green"
                @click="editBank(bank['id'])" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue'
import { Trash2, Edit, Loader } from 'lucide-vue-next'
// import BPButton from '../../components/button/BPButton.vue'
import { required, integer, minLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import http from '../../common/http-common.ts'
// import { useI18n } from 'vue-i18n'

// const { t } = useI18n()

// Used to build grid
// <!-- Grid
onBeforeMount(async () => {
  await browseList()
})
// --> Grido

const bank = reactive({
  banks: [],
  id: null,
  name: '',
  agency: '',
  account: '',
  loading: false,
  state: false
})

const validations = {
  name: { required },
  agency: { required, integer, minLength: minLength(2) },
  account: { required, integer, minLength: minLength(2) }
}

const v$ = useVuelidate(validations, bank)

const clearFiel = () => {
  bank.id = null
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
    .catch((error) => {
      console.error('ERROR: acquiring data for grid: ', error)
    })
}

// const showAlert = () => {
//   alert('BPButton Clicked')
// }

const onNewClick = () => {
  clearFiel()
}

const onSubmitClick = async () => {
  console.log(bank)
  if (bank.id === null || bank.id === undefined) {
    // New bank
    await http
      .post('/bank', bank)
      .then(() => {
        browseList()
        clearFiel()
      })
      .catch((error) => console.error('ERROR: saving bank: ', error))
  } else {
    // Update bank
    await http
      .put(`/bank/${bank.id}`, bank)
      .then(() => {
        browseList()
      })
      .catch((error) => {
        console.error('ERROR: updating bank: ', error)
      })
  }
}

const deleteBank = async (id: BigInt) => {
  await http
    .delete(`/bank/${id}`)
    .then(() => {
      browseList()
    })
    .catch((error) => {
      console.error('ERROR: deleting Bank: ', error)
    })
}

const editBank = async (id: BigInt) => {
  await http
    .get(`/bank/${id}`)
    .then((response) => {
      // bankModel.value = response.data.data
      console.log(response.data)
      bank.id = response.data.data.id
      bank.name = response.data.data.name
      bank.agency = response.data.data.agency
      bank.account = response.data.data.account
      // = { ...response.data }
    })
    .catch((err) => {
      console.error('ERROR: loading data for edit: ', err)
    })
}
</script>

<i18n lang="json">
{
  "pt-BR": {
    "loading": "Por favor aguarde, carregando dados..."
  },
  "en-US": {
    "loading": "Please wait, loading data..."
  }
}
</i18n>
