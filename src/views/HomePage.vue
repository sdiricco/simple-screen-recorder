<template>
  <RecordComponent v-if="mainStore.isSourceSelected"/>
  <PlayerComponent v-else-if="mainStore.isFileReady"/>
  <HomeComponent v-else/>
</template>

<script setup lang="ts">
import HomeComponent from '@/components/HomeComponent.vue';
import RecordComponent from '@/components/RecordComponent.vue';
import PlayerComponent from '@/components/PlayerComponent.vue';
import {useMainStore} from "@/store/main"
const mainStore = useMainStore();
</script>

<style scoped>
</style>
