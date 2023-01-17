<script lang="ts" setup>
const languages = ['jp']
</script>

<template>
  <div class="text-red-500">
  <NuxtLink v-for="lang of languages" :key="lang" :href="`/language/${lang}`">{{ lang }}</NuxtLink>
  </div>
</template>