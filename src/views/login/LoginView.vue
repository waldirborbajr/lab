<template>
  <div class="bp-section">
    <h3 class="bp-form-label">Login</h3>
    <div class="bp-grid">
      <div class="bp-field-div"><label class="bp-label" for="login">Username<input type="text" class="bp-input"></label>
      </div>
      <div class="bp-field-div"><label class="bp-label" for="password">Password<input type="password"
            class="bp-input"></label>
      </div>
      <div class="bp-field-div"><label class="bp-label" for="tokenone">Token One<input type="text"
            class="bp-input"></label>
      </div>
      <div class="bp-field-div"><label class="bp-label" for="tokentwo">Token Two<input type="text"
            class="bp-input"></label>
      </div>
    </div>

    <div class="bp-div-button">
      <button class="bp-button bp-bt-cancel">Cancel</button>
      <button class="bp-button bp-bt-save" type="submit">Login </button>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="postcss"></style>
