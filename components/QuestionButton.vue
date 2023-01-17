<script lang="ts" setup> 
defineProps<{
  theme: 'wrong' | 'correct'
}>()
</script>

<template>
<button class="w-full h-full p-8 rounded-md" :class="[theme === 'correct' ? 'bg-green-500/70' : 'bg-red-500/70']">{{theme}}</button>
</template>