<template>
  <!-- MAIN GRID WITH TOW COLUMNS -->
  <div class="grid grid-cols-2 bg-purple-700">

    <!-- Form Cell -->
    <div class="bp-section">
      <h2 class="bp-form-label">Bank Form</h2>
      <div>
        <div class="bp-field-div">
          <label class="bp-label" for="bank">Bank:</label>
          <input id="bank" class="bp-input" type="text" autofocus placeholder="Bank name..." />
          <div class="bp-required">Name field is required</div>
        </div>
        <div class="bp-field-div">
          <label class="bp-label" for="agency">Agency:</label>
          <input id="agency" class="bp-input" type="text" autofocus placeholder="Agency number..." />
          <div class="bp-required">Name field is required</div>
        </div>
        <div class="bp-field-div">
          <label class="bp-label" for="account">Account:</label>
          <input id="account" class="bp-input" type="text" autofocus placeholder="Account number..." />
          <div class="bp-required">Name field is required</div>
        </div>
      </div>

      <!-- BUTTONS -->
      <div class="bp-div-three-button">
        <button class="bp-button bp-bt-new">New</button>
        <button class="bp-button bp-bt-cancel">Cancel</button>
        <button class="bp-button bp-bt-save">Save</button>
      </div>
    </div>

    <!-- Grid Cell -->
    <div class="bp-section">
      <div class="bg-blue-400">
        <div class="grid grid-cols-4 gap-2">
          <div>Bank</div>
          <div>Agency</div>
          <div>Acount</div>
          <div>Delete</div>
          <div>Universal</div>
          <div>0000</div>
          <div>9999</div>
          <div>x</div>
          <div>Universal</div>
          <div>0000</div>
          <div>9999</div>
          <div>x</div>
          <div>Universal</div>
          <div>0000</div>
          <div>9999</div>
          <div>x</div>
          <div>Universal</div>
          <div>0000</div>
          <div>9999</div>
          <div>x</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="postcss"></style>
