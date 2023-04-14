<template>
  <div class="mx-auto my-auto d-flex flex-column">
    <font-awesome-icon size="10x" class="mb-5" icon="fa-compact-disc" spin color="#e2515f" />
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


<script setup lang="ts">
import {defineEmits} from "vue"
const emit = defineEmits(['click-start-recording'])
</script>

