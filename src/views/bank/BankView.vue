<template>
  <!-- MAIN GRID WITH TWO COLUMNS -->
  <div class="grid grid-cols-2 gap-1  mx-auto">

    <!-- Form Cell -->
    <div class="bp-section">
      <h2 class="bp-form-label">Bank Form</h2>
      <div>
        <div class="bp-field-div">
          <label class="bp-label" for="name">Bank:</label>
          <input class="bp-input" v-model.trim="bankModel.name" id="name" type="text" autofocus required
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
      <div class="grid grid-cols-4 gap-x-4 gap-y-4 bp-grid-font-head items-center justify-center">
        <div>Bank</div>
        <div>Agency</div>
        <div>Account</div>
        <div>Action</div>
      </div>
      <div v-for="(bank, index) in banks" :key="index">
        <div class="grid grid-cols-4 gap-x-4 gap-y-4 font-nro text-sm ">
          <div>{{ bank['name'] }}</div>
          <div>{{ bank['agency'] }}</div>
          <div>{{ bank['account'] }}</div>
          <div class="flex gap-4">
            <Trash2 class="" color="red" @click="deleteBank(bank['id'])" />
            <Edit color="green" @click="editBank(bank['id'])" />
          </div>
        </div>
      </div>

      <!--
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
-->
    </div>
  </div>
</template>


<script setup lang="ts">

import { reactive, onBeforeMount, ref } from 'vue'
import { Trash2, Edit } from 'lucide-vue-next'
import http from "../../common/http-common.ts"


// Used to build grid
// <!-- Grid
const banks = ref([])
onBeforeMount(() => {
  browseList()
})
// --> Grid

const browseList = async () => {
  await http.get("/bank")
    .then(response => {
      banks.value = response.data.data
    })
    .catch((error) => {
      console.log(error)
    })
}

const bankModel = reactive({
  id: 0,
  name: '',
  agency: '',
  account: '',
})

const saveBank = async () => {
  await http.post("/bank", bankModel)
    .then((response) => {
      console.log(response.data)
      browseList()
      bankModel.name = ""
      bankModel.agency = ""
      bankModel.account = ""
    })
    .catch((error) => {
      console.log(error)
    })
}

const deleteBank = async (id: BigInt) => {
  await http.delete(`/bank/${id}`)
    .then(() => {
      browseList()
    })
    .catch((error) => {
      console.log(error)
    })
}

const editBank = async (id: BigInt) => {
  await http.get(`/bank/${id}`)
    .then((response) => {
      // bankModel.value = response.data.data
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
}

</script>


<style scoped lang="postcss"></style>
