<template>
  <div class="d-flex flex-column justify-center align-center h-100">
    <div class="text-h3 mb-5">Cosa vuoi registrare ?</div>
    <v-slide-group
      v-model="mainStore.recordingVideoOptionSelectedIdx"
      mandatory
      class="mb-5"
    >
      <v-slide-group-item
        v-for="opt in mainStore.recordingVideoOptions"
        :key="opt.type"
        v-slot="{ isSelected, toggle }"
      >
        <v-btn
          class="ma-2"
          size="x-large"
          :color="isSelected ? 'primary' : undefined"
          @click="toggle"
        >
          {{ opt.type }}
        </v-btn>
      </v-slide-group-item>
    </v-slide-group>
    <v-btn 
      prepend-icon="mdi-record-circle"
      size="x-large" 
      rounded="pill" 
      variant="outlined"
      color="#e2515f"
      @click="mainStore.chooseScreenSource"
    >
        Registra
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "@/store/main";
const mainStore = useMainStore();
</script>

<style scoped></style>
