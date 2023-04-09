<template>
  <div class="main-container">
    <video 
      ref="videoPlayer"
      autoplay
      controls>
    </video>
    <div 
      class="controls mt-4">

      <v-btn 
        prepend-icon="mdi-download"
        class="mr-4"
        size="x-large"
        rounded="pill"
        color="blue"
        @click="mainStore.downloadFile"
        >
          Scarica
      </v-btn>
      <v-btn 
        prepend-icon="mdi-record-circle"  
        size="x-large" 
        @click="mainStore.chooseScreenSource" 
        variant="outlined"
        rounded="pill"
        color="#e2515f">
          Registra di nuovo
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import {useMainStore} from "@/store/main"
const mainStore = useMainStore();
const videoPlayer = ref<any>(null);

onMounted(async () => {
  videoPlayer.value.src = mainStore.getUrl
});

onUnmounted(() => {
});
</script>

<style scoped>
.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}
.main-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
video {
  max-width: 100%;
  max-height: 50vh;
  margin: 8px;
  border: 4px solid transparent;
  border-radius: 8px;
}


</style>
