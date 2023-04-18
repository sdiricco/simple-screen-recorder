<template>
  <div class="mx-auto my-auto">
    <video 
      ref="recordingPlayer"
      autoplay
      muted
      :class="{animation: !mainStore.recorderPaused}">
    </video>
    <div class="text-h6 text-center">
      {{ formattedTime }}
    </div>
    <div 
      class="controls mt-4">

      <v-btn 
        v-if="!mainStore.recorderPaused"
        prepend-icon="mdi-pause-circle"
        size="large"
        @click="()=> {
          videoRecorder.pause()
          pause();
        }"
        class="mr-4"
        variant="outlined"
        rounded="pill"
        color="yellow">
        
        Pausa
      </v-btn>
      <v-btn 
        v-else-if="mainStore.recorderPaused"
        prepend-icon="mdi-play-circle"
        size="large"
        @click="() => {
          videoRecorder.resume()
          resume();
        }"
        class="mr-4"
        variant="outlined"
        rounded="pill"
        color="blue">
        
        Riprendi
      </v-btn>

      <v-btn 
        prepend-icon="mdi-stop-circle"
        size="large"
        @click="async () => {
          await videoRecorder.stop()
          emit('recording-completed')
        }"
        variant="outlined"
        rounded="pill"
        color="#e2515f">
        
        Ferma
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, computed } from "vue";
import {useMainStore} from "@/store/main"
import {useVideoRecorder} from "@/store/videoRecorder"
import { useIntervalFn } from '@vueuse/core'

const videoRecorder = useVideoRecorder();
const mainStore = useMainStore();
const recordingPlayer = ref<any>(null);

const emit = defineEmits(["recording-completed"]);

const time = ref(0)
const { pause, resume } = useIntervalFn(() => {
  time.value++
}, 1000)

const hours = computed(() => Math.floor(time.value / 3600))
const minutes = computed(() => Math.floor((time.value % 3600) / 60))
const seconds = computed(() => time.value % 60)

const formattedTime = computed(() => {
    const padZero = (num:number) => num.toString().padStart(2, '0')
    return `${padZero(hours.value)}:${padZero(minutes.value)}:${padZero(seconds.value)}`
  })

onMounted(async () => {
  recordingPlayer.value.srcObject = mainStore.stream
  recordingPlayer.value.onloadedmetadata = () => {
    // mainStore.startGifRecorder({width: recordingPlayer.value.videoWidth, height: recordingPlayer.value.videoHeight});  
  }
  videoRecorder.start();
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
