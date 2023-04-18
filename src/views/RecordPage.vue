<template>
  <RecordComponent @recording-completed="onRecordingCompleted"/>
</template>

<script setup lang="ts">
import RecordComponent from '@/components/RecordComponent.vue';
import router from '@/router';
function onRecordingCompleted(){
  router.push({name: 'player-page'})
}
</script>

<style scoped>
</style>
