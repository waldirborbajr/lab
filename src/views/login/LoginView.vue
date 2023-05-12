<template>
  <section class="bp-section">
    <h3 class="bp-login-label">Login</h3>
    <div class="bp-grid">
      <div class="bp-div"><label class="bp-label" for="login">Username<input type="text" class="bp-input"></label></div>
      <div class="bp-div"><label class="bp-label" for="password">Password<input type="password" class="bp-input"></label>
      </div>
      <div class="bp-div"><label class="bp-label" for="tokenone">Token One<input type="text" class="bp-input"></label>
      </div>
      <div class="bp-div"><label class="bp-label" for="tokentwo">Token Two<input type="text" class="bp-input"></label>
      </div>
    </div>

    <div class="bp-div-button">
      <button class="bp-button bp-cancel">Cancel</button>
      <button class="bp-button bp-login" type="submit">Login </button>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="postcss">
.bp-login-label {
  @apply font-medium tracking-wider text-xl mb-6 text-slate-800
}

.bp-section {
  @apply w-[590px] mx-auto mt-14 shadow-lg p-8 rounded-xl border border-slate-300
}

.bp-grid {
  @apply grid gap-4;
  grid-template-columns: 50% 50%
}

.bp-div {
  @apply flex-col
}

.bp-input {
  @apply border border-slate-500 rounded-lg px-4 py-3
}

.bp-label {
  @apply font-mono tracking-wide mb-3
}

.bp-button {
  @apply w-full border-slate-600 py-3 rounded-lg
}

.bp-div-button {
  @apply grid grid-cols-2 gap-4 mt-4 text-lg
}

.bp-login {
  @apply bg-green-600 text-slate-300
}

.bp-cancel {
  @apply bg-slate-300 text-slate-900
}
</style>
