<template>
  <v-app class="v-app-container">
    <v-main class="v-main-container">
      <router-view></router-view>
    </v-main>
    <v-footer app class="text-center d-flex flex-column v-footer-container bg-transparent bordered">
        <v-btn class="mx-4" icon="mdi-github" variant="text"></v-btn>
        <v-divider></v-divider>
        <div>{{ new Date().getFullYear() }} — <strong>Simone Di Ricco</strong></div>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
const icons = ["mdi-github", "mdi-twitter", "mdi-linkedin", "mdi-instagram"];
</script>

<style scoped>
.bordered{
  border-top: 2px solid #222;
}
</style>
