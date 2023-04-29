<template>
  <div class="mx-auto my-auto">
    <video ref="recordingPlayer" autoplay muted :class="{ animation: !mainStore.recorderPaused }"></video>
    <div class="text-h6 text-center">
      {{ formattedTime }}
    </div>
    <div class="controls mt-4">

      <!-- Pause button -->
      <v-btn
        v-if="!mainStore.recorderPaused"
        prepend-icon="mdi-pause-circle"
        size="large"
        @click="onClickPause"
        class="mr-4"
        variant="outlined"
        rounded="pill"
        color="yellow">
        Pausa
      </v-btn>

      <!-- Resume button -->
      <v-btn
        v-else-if="mainStore.recorderPaused"
        prepend-icon="mdi-play-circle"
        size="large"
        @click="onClickResume"
        class="mr-4"
        variant="outlined"
        rounded="pill"
        color="blue">
        Riprendi
      </v-btn>

      <!-- Stop button -->
      <v-btn
        prepend-icon="mdi-stop-circle"
        size="large"
        @click="onClickStop"
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
import { useMainStore } from "@/store/main";
import { useVideoRecorder } from "@/store/videoRecorder";
import {useGifRecorder} from "@/store/gifRecorder"
import { useIntervalFn } from "@vueuse/core";
import { mapStores } from "pinia";

const videoRecorder = useVideoRecorder();
const gifRecorder = useGifRecorder();
const mainStore = useMainStore();
const recordingPlayer = ref<any>(null);

const emit = defineEmits(["recording-completed"]);

const time = ref(0);
const timer = useIntervalFn(() => {
  time.value++;
}, 1000);

const hours = computed(() => Math.floor(time.value / 3600));
const minutes = computed(() => Math.floor((time.value % 3600) / 60));
const seconds = computed(() => time.value % 60);

const formattedTime = computed(() => {
  const padZero = (num: number) => num.toString().padStart(2, "0");
  return `${padZero(hours.value)}:${padZero(minutes.value)}:${padZero(seconds.value)}`;
});

function onClickPause(){
  timer.pause();
}

function onClickResume(){
  videoRecorder.resume();
  timer.resume();
}


async function onClickStop(){
  if (mainStore.recordAsGif) {
    await gifRecorder.stop();
  }else {
    await videoRecorder.stop();
  }
  mainStore.stopSharingAllTracks();
  emit('recording-completed');
}

onMounted(async () => {
  recordingPlayer.value.srcObject = mainStore.stream;
  if (mainStore.recordAsGif) {
    recordingPlayer.value.onloadedmetadata = () => {
      gifRecorder.start({width: recordingPlayer.value.videoWidth, height: recordingPlayer.value.videoHeight});
    };
  }
  else{
    videoRecorder.start();
  }

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
  border: 4px solid #222;
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
