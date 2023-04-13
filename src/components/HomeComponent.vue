<template>
  <div class="main-container">
    <font-awesome-icon size="10x" class="mb-5" icon="fa-compact-disc" spin color="#e2515f" />
    <v-btn 
      prepend-icon="mdi-record-circle"
      size="x-large" 
      rounded="pill" 
      variant="outlined"
      color="#e2515f"
      @click="mainStore.chooseScreenSource"
    >
        Avvia adesso
    </v-btn>
  </div>
</template>


<script setup lang="ts">
import {useMainStore} from "@/store/main"
const mainStore = useMainStore()
</script>

<style scoped>

.main-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

</style>
