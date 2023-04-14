<template>
  <div class="d-flex flex-column my-5 pa-5 align-center">
    <div class="text-h4 mb-5">Cosa vuoi registrare? </div>
    <v-slide-group v-model="mainStore.recordingVideoOptionSelectedIdx" mandatory class="mb-5">
      <v-slide-group-item v-for="opt in mainStore.recordingVideoOptions" :key="opt.type" v-slot="{ isSelected, toggle }">
        <v-sheet
          border
          rounded="xl"
          @click="toggle"
          :class="isSelected ? 'sheet-active' : ''"
          class="sheet-content ma-1 d-flex align-center justify-center flex-column">
          <div class="d-flex">
            <font-awesome-icon v-if="opt.type !== 'webcam'" size="3x" class="ma-4" icon="fa-display" />
            <font-awesome-icon v-if="opt.type !== 'screen'" size="3x" class="ma-4" icon="fa-camera" />
          </div>
          <div class="text-h6">
            {{ translationObj[opt.type] }}
          </div>
        </v-sheet>
      </v-slide-group-item>
    </v-slide-group>
    <div class="item-width my-5">
      <v-divider class="mx-4"></v-divider>
    </div>
    <div class="d-flex align-center justify-center flex-column mb-5">
      <div class="text-h5 mb-2">Microfono</div>
      <v-btn v-if="mainStore.isAudioEnabled" icon="mdi-microphone" @click="mainStore.isAudioEnabled = false" size="x-large" color="blue"></v-btn>
      <v-btn v-else icon="mdi-microphone-off" @click="mainStore.isAudioEnabled = true" size="x-large"></v-btn>
    </div>

    <!-- <div class="item-width my-5">
      <v-divider class="mx-4"></v-divider>
    </div> -->
    <!-- <div class="mb-5">
      <v-checkbox density="comfortable" hide-details label="Registra come GIF" color="blue"></v-checkbox>
    </div> -->
    <div class="item-width d-flex justify-center mt-5">
      <v-btn prepend-icon="mdi-record-circle" size="x-large" rounded="pill" variant="outlined" color="#e2515f" @click="mainStore.requestPermissions()">
        Registra
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "@/store/main";
import { ref } from "vue";
const mainStore = useMainStore();
const translationObj = ref<any>({
  "screen": "Schermo",
  "webcam": "Webcam",
});
</script>

<style scoped>
.sheet-content {
  cursor: pointer;
  height: 250px;
  width: 250px;
  transform: scale(0.95);
}

.sheet-content:hover {
  transition: transform 0.4s ease;
  transform: scale(1);
}

.sheet-content:not(:hover) {
  transition: transform 0.4s ease;
  transform: scale(0.95);
}

.sheet-active {
  border: 2px solid #e2515f;
}

.item-width{
  width: 25%;
  min-width: 400px;
}
</style>
