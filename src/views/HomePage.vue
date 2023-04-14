<template>
  <HomeComponent @click-start-recording="router.push({name: 'record-page'})"/>
</template>

<script setup lang="ts">
import HomeComponent from '@/components/HomeComponent.vue';
import router from '@/router';
</script>
