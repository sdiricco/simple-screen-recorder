<template>
  <div class="mx-auto my-auto">
    <video 
      ref="videoPlayer"
      autoplay
      controls
    >
    </video>
      <!-- <img ref="gif" src="" class="gif-class" download/> -->

    <div 
      class="controls mt-4">

      <v-btn 
        prepend-icon="mdi-download"
        class="mr-4"
        size="large"
        rounded="pill"
        color="blue"
        @click="videoRecorder.donwload"
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
import router from "@/router";
const mainStore = useMainStore();
const videoRecorder = useVideoRecorder();
const gif = ref<any>(null);
const videoPlayer = ref<any>(null);

const emit = defineEmits(["go-back"]);





onMounted(async () => {
  // gif.value.src = mainStore.gifUrl
  videoPlayer.value.src = videoRecorder.getVideoUrl
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
  max-height: calc(100vh - 100px);

}

</style>
