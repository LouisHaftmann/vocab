<script lang="ts" setup>
defineProps<{
  theme: 'wrong' | 'correct'
  disabled: boolean
}>()
</script>

<template>
  <button :disabled="disabled" class="w-full h-full p-8 rounded-md" :class="[theme === 'correct' && !disabled ? 'bg-green-500/70' : 'bg-red-500/70', disabled && 'bg-neutral-700']">
    {{ theme }}
  </button>
</template>
