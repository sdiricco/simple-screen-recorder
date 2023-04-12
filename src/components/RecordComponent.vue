<template>
  <div class="main-container">
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
        @click="mainStore.stopGifRecorder"
        variant="outlined"
        rounded="pill"
        color="#e2515f">
        
        Interrompi
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import {useMainStore} from "@/store/main"
const mainStore = useMainStore();
const recordingPlayer = ref<any>(null);

onMounted(async () => {
  mainStore.startGifRecorder();
  recordingPlayer.value.srcObject = mainStore.getStream
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
