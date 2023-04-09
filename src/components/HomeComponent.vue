<template>
  <div class="main-container">
    <img 
      src="/HatchfulExport-All/logo_transparent.png"
      alt="Your Logo"
      class="logo animation-logo" 
    />
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

.animation-logo{
  animation: keyframelogo 2s linear infinite
}

@keyframes keyframelogo {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}


.logo {
  width: 350px; /* Adatta la larghezza del logo secondo le tue esigenze */
  height: auto; /* Mantiene le proporzioni corrette del logo */
  margin: 16px 0; /* Aggiunge un margine sopra e sotto il logo */
}
</style>
