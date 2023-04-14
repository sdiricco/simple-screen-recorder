<template>
  <div class="mx-auto my-auto d-flex flex-column">
    <font-awesome-icon size="10x" class="mb-5" icon="fa-compact-disc" spin color="#e2515f" />
    <div class="custom-font mb-5">Screen Recorder</div>
      <div v-for="item in items" :key="item" class="text-h6 font-weight-thin">
        - {{ item }}
      </div>
    <div class="mx-auto mt-5">
      <v-btn
        class="mt-5"
        prepend-icon="mdi-record-circle"
        size="x-large"
        rounded="pill"
        variant="outlined"
        color="#e2515f"
        @click="emit('click-start-recording')">
        Avvia adesso
      </v-btn>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap");
.custom-font {
  font-family: "Shadows Into Light", cursive;
  color: #e2515f;
  font-size: 48px;
}
</style>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["click-start-recording"]);
const items = ref(["Completamente open source", "Registra lo schermo del tuo dispositivo", "Registra l’audio del tuo dispositivo", "Registra la webcam del tuo dispositivo"]);
</script>
