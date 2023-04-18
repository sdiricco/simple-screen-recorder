<template>
  <PlayerComponent @go-back="router.push({name:'choose-sources-page'})"/>
</template>

<script setup lang="ts">
import PlayerComponent from '@/components/PlayerComponent.vue';
import router from '@/router';

</script>

<style scoped>
</style>
