<template>
  <div class="mx-auto my-auto d-flex flex-column">
    <font-awesome-icon size="8x" class="mb-5" icon="fa-compact-disc" spin color="#e2515f" />
    <div class="custom-font mb-5 text-center">Screen Recorder</div>
    <div class="d-flex align-center justify-center flex-column">
      <div class="text-body-1 font-weight-thin mx-auto w400 text-justify">
        Screen recorder è un'app gratuita ed open source. Ti permette di registrare lo schermo o la webcam del tuo dispositivo in formato video o come immagine
        animata (gif)
      </div>
    </div>
    <div class="mx-auto mt-5">
      <v-btn class="mt-5" size="large" rounded="pill" variant="outlined" color="#e2515f" @click="emit('click-proceed')"> Continua </v-btn>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap");
.custom-font {
  font-family: "Shadows Into Light", cursive;
  color: #e2515f;
  font-size: 42px;
}
</style>

<script setup lang="ts">

const emit = defineEmits(["click-proceed"]);
</script>

<style scoped>
.w400{
width: 400px;
}
</style>
