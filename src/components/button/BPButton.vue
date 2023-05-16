<template>
  <button @click="$emit('buttonClicked')">{{ props.text }}</button>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    default: 'Generic Button'
  }
})

const emit = defineEmits(['buttonClicked'])
</script>
