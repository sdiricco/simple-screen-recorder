<template>
  <HomeComponent v-if="mainStore.step === 'home'" @click-proceed="onClickProced"/>
  <ChooseSources v-else-if="mainStore.step === 'choose-source'" @click-start-recording="onClickStartRecording" />
  <RecordComponent v-else-if="mainStore.step === 'record'" @recording-completed="onRecordingCompleted" />
  <PlayerComponent v-else-if="mainStore.step === 'player'" @go-back="onGoBack" />
</template>

<script setup lang="ts">
import HomeComponent from '@/components/HomeComponent.vue';
import ChooseSources from '@/components/ChooseSources.vue';
import RecordComponent from '@/components/RecordComponent.vue';
import PlayerComponent from '@/components/PlayerComponent.vue';
import {useMainStore} from "@/store/main";
const mainStore = useMainStore();

function onClickProced(){
  mainStore.step = 'choose-source'
}

async function onClickStartRecording(){
  await mainStore.requestStream();
  if (mainStore.stream) {
    mainStore.step = 'record'
  }
}

async function onRecordingCompleted(){
  mainStore.stopSharingAllTracks();
  mainStore.step = 'player';
}

async function onGoBack(){
  mainStore.$reset();
  mainStore.step = 'choose-source'
}
</script>
