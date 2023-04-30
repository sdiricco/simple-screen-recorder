<template>
  <div class="mx-auto my-auto">
    <video 
      v-if="!mainStore.recordAsGif"
      ref="videoPlayer"
      autoplay
      controls
    >
    </video>
    <img v-else ref="gif" src="" class="gif-class" download/>

    <div 
      class="controls mt-4">

      <v-btn 
        prepend-icon="mdi-download"
        class="mr-4"
        size="large"
        rounded="pill"
        color="blue"
        @click="onClickDownload"
        >
          Scarica
      </v-btn>
      <v-btn 
        prepend-icon="mdi-record-circle"  
        size="large" 
        @click="emit('go-back')" 
        variant="outlined"
        rounded="pill"
        color="#e2515f">
          Registra di nuovo
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import {useMainStore} from "@/store/main"
import { useVideoRecorder } from "@/store/videoRecorder";
import {useGifRecorder} from "@/store/gifRecorder"
const mainStore = useMainStore();
const videoRecorder = useVideoRecorder();
const gifRecorder = useGifRecorder();
const gif = ref<any>(null);
const videoPlayer = ref<any>(null);

const emit = defineEmits(["go-back"]);


function onClickDownload(){
  if (mainStore.recordAsGif) {
    gifRecorder.download()
  }else{
    videoRecorder.donwload();
  }
}


onMounted(async () => {
  if (mainStore.recordAsGif) {
    gif.value.src = gifRecorder.gifUrl
  }else{
    videoPlayer.value.src = videoRecorder.getVideoUrl
  }
});
</script>

<style scoped>
.controls {
  display: flex;
  align-items: center;
  justify-content: center;

}
video {
  max-height: 50vh;
  border-radius: 16px;
}


.gif-container{
  
}
.gif-class{
  max-height: 50vh;

  /* max-height: calc(100vh - 100px); */

}

</style>
