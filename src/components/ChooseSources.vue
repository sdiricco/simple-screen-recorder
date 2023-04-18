<template>
  <div class="my-auto mx-auto text-center pa-5">
    <div class="text-h4 mb-4">Cosa vuoi registrare? </div>
    <div class="d-flex">
      <v-sheet
        v-for="(opt, index) in mainStore.recordingVideoOptions"
        border
        rounded="xl"
        @click="mainStore.recordingVideoOptionSelectedIdx = index"
        :class="mainStore.recordingVideoOptionSelectedIdx === index ? 'sheet-active' : ''"
        class="sheet-content ma-2 d-flex align-center justify-center flex-column">
        <div class="d-flex">
          <font-awesome-icon v-if="opt.type !== 'webcam'" size="2x" class="ma-4" icon="fa-display" />
          <font-awesome-icon v-if="opt.type !== 'screen'" size="2x" class="ma-4" icon="fa-camera" />
        </div>
        <div class="text-h6">
          {{ translationObj[opt.type] }}
        </div>
      </v-sheet>
    </div>

    <div class="item-width my-5">
      <v-divider class="mx-4"></v-divider>
    </div>
    <div class="d-flex align-center justify-center flex-column mb-5">
      <div class="text-h5 mb-2">Microfono</div>
      <v-btn v-if="mainStore.isAudioEnabled" icon="mdi-microphone" @click="mainStore.isAudioEnabled = false" size="large" color="blue"></v-btn>
      <v-btn v-else icon="mdi-microphone-off" @click="mainStore.isAudioEnabled = true" size="large"></v-btn>
    </div>
    <div class="item-width d-flex justify-center">
      <v-btn prepend-icon="mdi-record-circle" class="margin-40px" size="large" rounded="pill" variant="outlined" color="#e2515f" @click="emit('click-start-recording')">
        Registra
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useMainStore} from "@/store/main"
import { ref } from "vue";
const mainStore = useMainStore();
const translationObj = ref<any>({
  "screen": "Schermo",
  "webcam": "Webcam",
});
const emit = defineEmits(["click-start-recording"]);

</script>

<style scoped>

.margin-40px{
  margin-top: 40px;
}
.sheet-content {
  cursor: pointer;
  height: 200px;
  width: 200px;
}

.sheet-content:hover {
  transition: transform 0.4s ease;
  transform: scale(1.05);
}

.sheet-content:not(:hover) {
  transition: transform 0.4s ease;
}

.sheet-active {
  border: 2px solid #e2515f;
}

.item-width{
  min-width: 400px;
}
</style>
