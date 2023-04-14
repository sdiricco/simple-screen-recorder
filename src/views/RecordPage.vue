<template>
  <RecordComponent v-if="mainStore.isSourceSelected"/>
  <PlayerComponent v-else-if="mainStore.isFileReady"/>
  <ChooseSources v-else/>
</template>

<script setup lang="ts">
import RecordComponent from '@/components/RecordComponent.vue';
import PlayerComponent from '@/components/PlayerComponent.vue';
import ChooseSources from '@/components/ChooseSources.vue';
import {useMainStore} from "@/store/main"
const mainStore = useMainStore();
</script>

<style scoped>
</style>
