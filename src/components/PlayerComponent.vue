<template>
  <div class="main-container">
      <img ref="gif" src="" class="gif-class" download/>

    <div 
      class="controls mt-4">

      <v-btn 
        prepend-icon="mdi-download"
        class="mr-4"
        size="x-large"
        rounded="pill"
        color="blue"
        @click="mainStore.downloadGif"
        >
          Scarica
      </v-btn>
      <v-btn 
        prepend-icon="mdi-record-circle"  
        size="x-large" 
        @click="mainStore.chooseScreenSource" 
        variant="outlined"
        rounded="pill"
        color="#e2515f">
          Registra di nuovo
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import {useMainStore} from "@/store/main"
const mainStore = useMainStore();
const gif = ref<any>(null);

onMounted(async () => {
  gif.value.src = mainStore.gifUrl
});
onUnmounted(() => {
});
</script>

<style scoped>
.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 64px;

}
.main-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y:auto;
  overflow-x: hidden;
  position: relative;
}
video {
  max-width: 100%;
  max-height: 100%;
}


.gif-container{
  
}
.gif-class{
  max-height: calc(100vh - 100px);

}

</style>
