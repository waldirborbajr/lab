<template>
  <!-- MAIN GRID WITH TWO COLUMNS -->
  <div class="grid grid-cols-2 gap-1  mx-auto">

    <!-- Form Cell -->
    <div class="bp-section">
      <h2 class="bp-form-label">Bank Form</h2>
      <div>
        <div class="bp-field-div">
          <label class="bp-label" for="name">Bank:</label>
          <input v-model.trim="bankModel.name" id="name" class="bp-input" type="text" autofocus required
            placeholder="Bank name..." />
          <div class="bp-required">Name field is required</div>
        </div>
        <div class="bp-field-div">
          <label class="bp-label" for="agency">Agency:</label>
          <input v-model.trim="bankModel.agency" id="agency" class="bp-input" type="text" autofocus required
            placeholder="Agency number..." />
          <div class="bp-required">Name field is required</div>
        </div>
        <div class="bp-field-div">
          <label class="bp-label" for="account">Account:</label>
          <input v-model.trim="bankModel.account" id="account" class="bp-input" type="text" autofocus required
            placeholder="Account number..." />
          <div class="bp-required">Name field is required</div>
        </div>
      </div>

      <!-- BUTTONS -->
      <div class="bp-div-three-button">
        <button class="bp-button bp-bt-new">New</button>
        <button class="bp-button bp-bt-cancel">Cancel</button>
        <button @click="saveBank" type="button" class="bp-button bp-bt-save">Save</button>
      </div>
    </div>

    <!-- Grid Cell -->
    <div class="bp-section">

      <table class="table-auto table-striped">
        <thead>
          <tr>
            <th>Bank</th>
            <th>Agency</th>
            <th>Account</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(bank, index) in banks" :key=index>
            <td>{{ bank['name'] }}</td>
            <td>{{ bank['agency'] }}</td>
            <td>{{ bank['account'] }}</td>
            <td>
              <Trash2 :size="24" />
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>


<script setup lang="ts">
import { reactive, onBeforeMount, onMounted, ref } from 'vue'
import { Trash2 } from 'lucide-vue-next'
import http from "../../common/http-common.ts"

const banks = ref([])
onBeforeMount(async () => {
  try {
    await http.get("/bank")
      .then(response => {
        banks.value = response.data.data
      })
  } catch (error) {
    console.log(error)
  }
})

onMounted(() => {
  console.log('onMounted called')
})

const bankModel = reactive({
  id: 0,
  name: '',
  agency: '',
  account: '',
})

async function saveBank() {
  await http.post("/bank", bankModel)
    .then((response) => {
      console.log(response.data)
    })
}
</script>

<style scoped lang="postcss"></style>
