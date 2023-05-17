<template>
  <div class="font-semibold text-white bg-green-700">
    {{ props.text }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    default: 'success'
  }
})
</script>
