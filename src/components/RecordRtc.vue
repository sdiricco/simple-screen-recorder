<template>
  <div class="main-container">
    <video autoplay :ref="videoPlayer" class="video-tag"></video>
    <div class="controls">
      <v-btn v-if="!isSharing" @click="startSharing" color="primary" icon> <v-icon icon="mdi-motion-play-outline"></v-icon></v-btn>
      <v-btn v-else @click="stopSharing" class="control-btn" icon color="primary"> 
        <v-icon icon="mdi-stop-circle-outline"></v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

let isSharing = ref(false);
let mediaStream = ref<any>(null);
let videoPlayer = ref<any>("videoPlayer");
let chunks = ref<any>([]);
let mediaRecorder = ref<any>(null);

async function startSharing() {
  mediaStream.value = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
  mediaRecorder.value = new MediaRecorder(mediaStream.value, { mimeType: 'video/webm;codecs=h264' });
  mediaRecorder.value.ondataavailable = (evt:any) => {
    console.log(evt.data);
    chunks.value.push(evt.data)
  };
  mediaRecorder.value.onstop = async () => {
    const blob = new Blob(chunks.value, { type: 'video/webm;codecs=h264' });
    const fileHandle =await window.showSaveFilePicker();
    const writable = await fileHandle.createWritable();
    await writable.write(blob);
    await writable.close();
  };
  mediaRecorder.value.start()
  isSharing.value = true;
  videoPlayer.value.srcObject = mediaStream.value;
}

function stopSharing() {
  isSharing.value = false;
  mediaStream.value.getTracks().forEach((track: any) => track.stop());
  mediaRecorder.value.stop()
  videoPlayer.value.srcObject = null;
}
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
}
.controls {
  position: absolute;
  bottom: 12px;
  right: 50vw;
}
.video-tag {
  height: 100vh;
}
</style>
