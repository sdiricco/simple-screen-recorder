<template>
  <div class="main-container">
    <template v-if="showVideoPlayer || isRecording">
      <video v-if="!isRecording && showVideoPlayer" ref="videoPlayer" controls autoplay></video>
      <video v-else-if="isRecording" ref="previewPlayer" autoplay muted></video>
      <div class="controls mt-4">
        <v-btn prepend-icon="mdi-stop-circle" size="x-large" v-if="isRecording" @click="stopRecording" variant="outlined" rounded="pill" color="error">
          Interrompi
        </v-btn>
        <v-btn prepend-icon="mdi-download" class="mr-4" size="x-large" v-if="!isRecording" @click="downloadVideo" rounded="pill" color="blue"> Scarica </v-btn>
        <v-btn prepend-icon="mdi-record-circle"  size="x-large" @click="startRecording" v-if="!isRecording" variant="outlined" rounded="pill" color="error"> Registra di nuovo </v-btn>
      </div>
    </template>
    <template v-else>
      <v-btn prepend-icon="mdi-record-circle" size="x-large" rounded="pill" class="mx-auto" variant="outlined" @click="startRecording" color="error"> Avvia adesso </v-btn>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import RecordRTC from "recordrtc";

const videoPlayer = ref<any>(null);
const previewPlayer = ref<any>(null);
const isRecording = ref(false);
const showVideoPlayer = ref(false);
let recorder: any = null;

const startRecording = async () => {

  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    isRecording.value = true;

    nextTick(()=> {      
      recorder = new RecordRTC(stream, { type: "video" });
      recorder.startRecording();
      previewPlayer.value.srcObject = stream;
    })


  } catch (error) {
    console.error("Error:", error);
    isRecording.value = false;
  }
};

const stopRecording = async () => {
  if (!recorder) return;
  isRecording.value = false;
  showVideoPlayer.value = true;
  previewPlayer.value.srcObject = null; // Rimuove lo stream video dal player di anteprima
  recorder.stopRecording(() => {
    const blob = recorder.getBlob();
    videoPlayer.value.src = URL.createObjectURL(blob);
    recorder.reset();
    recorder.destroy();
    recorder = null;
  });
};

const downloadVideo = () => {
  if (!videoPlayer.value.src) return;

  const url = videoPlayer.value.src;
  const a = document.createElement("a");
  a.href = url;
  a.download = `screen-recording-${new Date().toISOString()}.webm`;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
};

onMounted(() => {
  if (!("mediaDevices" in navigator) || !("getDisplayMedia" in navigator.mediaDevices)) {
    alert("La funzionalità di registrazione dello schermo non è supportata in questo browser.");
  }
});

onUnmounted(() => {
  if (recorder) {
    recorder.reset();
    recorder.destroy();
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
}

.sizing {
  min-height: 100px;
  height: 100px;
  min-width: 300px;
  width: 300px;
}
</style>
