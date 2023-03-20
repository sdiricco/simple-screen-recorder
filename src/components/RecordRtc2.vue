<template>
  <div class="main-container">
    <div class="controls">
      <v-btn v-if="!isRecording" @click="startRecording" color="error" icon class="mr-1">
        <v-icon icon="mdi-record-circle"></v-icon>
      </v-btn>
      <v-btn v-else @click="stopRecording" icon color="error">
        <v-icon icon="mdi-stop-circle-outline"></v-icon>
      </v-btn>
    </div>
    <video v-if="!isRecording && showVideoPlayer" ref="videoPlayer" controls autoplay></video>
    <video v-else-if="isRecording" ref="previewPlayer" autoplay muted></video>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import RecordRTC from 'recordrtc';

const videoPlayer = ref<any>(null);
const previewPlayer = ref<any>(null);
const isRecording = ref(false);
const showVideoPlayer = ref(false);
let recorder: any = null;

const startRecording = async () => {
  isRecording.value = true;

  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    
    recorder = new RecordRTC(stream, { type: 'video' });
    recorder.startRecording();
    

    // Mostra lo stream video mentre registri
    previewPlayer.value.srcObject = stream;
  } catch (error) {
    console.error('Error:', error);
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

onMounted(() => {
  if (!('mediaDevices' in navigator) || !('getDisplayMedia' in navigator.mediaDevices)) {
    alert('La funzionalità di registrazione dello schermo non è supportata in questo browser.');
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

.controls{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}
.main-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
video {
  max-width: 100%;
  height: 80vh;
  border-radius: 4px;
  border: 1px solid #333;
  margin: 8px
}
</style>