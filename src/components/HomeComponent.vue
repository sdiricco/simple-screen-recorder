<template>
  <div class="mx-auto my-auto d-flex flex-column">
    <font-awesome-icon size="10x" class="mb-5" icon="fa-compact-disc" spin color="#e2515f" />
    <div class="custom-font">
      Screen Recorder
    </div>
    <v-btn 
      class="mt-5"
      prepend-icon="mdi-record-circle"
      size="x-large" 
      rounded="pill" 
      variant="outlined"
      color="#e2515f"
      @click="emit('click-start-recording')"
    >
        Avvia adesso
    </v-btn>
  </div>
</template>


<style>
@import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');
.custom-font{
  font-family: 'Shadows Into Light', cursive;
  color: #e2515f;
  font-size: 48px;
}
</style>

<script setup lang="ts">
import {defineEmits} from "vue"
const emit = defineEmits(['click-start-recording'])
</script>

