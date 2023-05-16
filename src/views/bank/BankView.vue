<template>
  <!-- MAIN GRID WITH TWO COLUMNS -->
  <div class="grid grid-cols-2 gap-1 mx-auto">
    <!-- Form Cell -->
    <div class="bp-section">
      <h2 class="bp-form-label">Bank Form</h2>
      <form action="submit">
        <div>
          <div class="bp-field-div">
            <label class="bp-label" for="name">Bank:</label>
            <input class="bp-input" v-model.trim="data.name" id="name" type="text" autofocus required
              placeholder="Bank name..." />
            <div class="text-sm font-semibold text-red-700" v-if="v$?.name?.$dirty && v$?.name?.$error">
              Please, Bank Name it is required
            </div>
          </div>
          <div class="bp-field-div">
            <label class="bp-label" for="agency">Agency:</label>
            <input v-model.trim="data.agency" id="agency" class="bp-input" type="text" autofocus required
              placeholder="Agency number..." />
            <div class="text-sm font-semibold text-red-700" v-if="v$?.agency?.$dirty && v$?.agency?.$error">
              Please, Bank Agency Code it is required
            </div>
          </div>
          <div class="bp-field-div">
            <label class="bp-label" for="account">Account:</label>
            <input v-model.trim="data.account" id="account" class="bp-input" type="text" autofocus required
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
          <button class="bp-button bp-bt-save" @click="onSubmitClick" type="submit">Save</button>
        </div>
      </form>
    </div>

    <!-- Grid Cell -->
    <div class="bp-section">
      <div>
        <button type="button" class="bg-indigo-500 bp-button" disabled v-show="data.loading">
          <svg class="mr-3 w-5 h-5 animate-spin" viewBox="0 0 24 24"></svg>
          Loading data...
        </button>
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
          <tr v-for="(bank, index) in data.banks" :key="index">
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
import { onBeforeMount, reactive, onMounted } from 'vue'
import { Trash2, Edit } from 'lucide-vue-next'
// import BPButton from '../../components/button/BPButton.vue'
import { required, integer, minLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import http from '../../common/http-common.ts'

// Used to build grid
// <!-- Grid
onBeforeMount(async () => {
  await browseList()
})
// --> Grido

let data = reactive({
  banks: [],
  id: null,
  name: '',
  agency: '',
  account: '',
  loading: false
})

const rules = {
  name: { required },
  agency: { required, integer, minLength: minLength(2) },
  account: { required, integer, minLength: minLength(2) }
}

const v$ = useVuelidate(rules, data)

const clearFiel = () => {
  data.id = null
  data.name = ''
  data.agency = ''
  data.account = ''
}

onMounted(() => {
  clearFiel()
})

const browseList = async () => {
  data.loading = true
  await http
    .get('/bank')
    .then((response) => {
      data.banks = response.data.data
      data.loading = false
    })
    .catch((error) => {
      console.log(error)
    })
}

// const showAlert = () => {
//   alert('BPButton Clicked')
// }

const onNewClick = () => {
  clearFiel()
}

const onSubmitClick = async () => {
  console.log(data)
  if (data.id === null || data.id === undefined) {
    // New bank
    await http
      .post('/bank', data)
      .then((response) => {
        console.log(response.data)
        browseList()
        clearFiel()
      })
      .catch((error) => {
        console.log(error)
      })
  } else {
    // Update bank
    await http
      .put(`/bank/${data.id}`, data)
      .then((response) => {
        console.log(response.data)
        browseList()
      })
      .catch((error) => {
        console.log(error)
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
      console.log(error)
    })
}

const editBank = async (id: BigInt) => {
  await http
    .get(`/bank/${id}`)
    .then((response) => {
      // bankModel.value = response.data.data
      console.log(response.data)
      data = response.data.data
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>
