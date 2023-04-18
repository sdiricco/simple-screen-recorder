<template>
  <ChooseSources @click-start-recording="onClickStartRecording"/>
</template>

<script setup lang="ts">
import ChooseSources from '@/components/ChooseSources.vue';
import router from '@/router';
import {useMainStore} from "@/store/main"
const mainStore = useMainStore();

async function onClickStartRecording(){
  await mainStore.requestStream();
  router.push({name: "record-page"})
}
</script>

<style scoped>
</style>
