<template>
  <HomeComponent @click-proceed="router.push({name: 'choose-sources-page'})"/>
</template>

<script setup lang="ts">
import HomeComponent from '@/components/HomeComponent.vue';
import router from '@/router';
</script>
