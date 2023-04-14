<template>
  <div class="mx-auto my-auto">
    <video 
      ref="recordingPlayer"
      autoplay
      muted
      class="animation">
    </video>
    <div 
      class="controls mt-4">

      <v-btn 
        prepend-icon="mdi-stop-circle"
        size="x-large"
        @click="mainStore.stopWebmRecorder"
        variant="outlined"
        rounded="pill"
        color="#e2515f">
        
        Interrompi
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import {useMainStore} from "@/store/main"
const mainStore = useMainStore();
const recordingPlayer = ref<any>(null);

onMounted(async () => {
  recordingPlayer.value.srcObject = mainStore.getStream
  recordingPlayer.value.onloadedmetadata = () => {
    // mainStore.startGifRecorder({width: recordingPlayer.value.videoWidth, height: recordingPlayer.value.videoHeight});  
  }
  mainStore.startWebmRecorder();
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
video {
  max-height: 50vh;
  border-radius: 16px;
  border: 4px solid #222
}

.animation {
  animation: intermittente 2s linear infinite;
}

@keyframes intermittente {
  0% {
    border-color: transparent;
  }
  50% {
    border-color: rgba(226, 81, 95, 0.5); /* Scegli il colore che preferisci */
  }
  100% {
    border-color: transparent;
  }
}
</style>
