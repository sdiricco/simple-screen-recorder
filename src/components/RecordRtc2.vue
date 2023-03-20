<template>
  <div id="app">
    <button @click="startRecording">Inizia registrazione</button>
    <button @click="stopRecording" :disabled="!isRecording">Ferma registrazione</button>
    <video ref="videoPlayer" controls autoplay></video>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import RecordRTC from 'recordrtc';

const videoPlayer = ref<any>(null);
const isRecording = ref(false);
let recorder: any = null;

const startRecording = async () => {
  isRecording.value = true;

  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    recorder = new RecordRTC(stream, { type: 'video' });
    recorder.startRecording();
  } catch (error) {
    console.error('Error:', error);
    isRecording.value = false;
  }
};

const stopRecording = async () => {
  if (!recorder) return;
  isRecording.value = false;
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
<style>
#app {
  text-align: center;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

button {
  background-color: #42b983;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  margin: 10px;
  padding: 10px 20px;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

video {
  max-width: 100%;
  max-height: 80vh;
  border: 1px solid #ccc;
}
</style>