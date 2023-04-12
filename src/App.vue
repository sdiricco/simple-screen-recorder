<template>
  <v-app class="v-app-container">
    <v-main class="v-main-container">
      <router-view></router-view>
    </v-main>
    <v-footer app class="text-center d-flex justify-center   v-footer-container bg-transparent bordered" height="50px">
        <v-btn class="mx-4" icon="mdi-github" variant="text"></v-btn>
        <div>{{ new Date().getFullYear() }} — <strong>Simone Di Ricco</strong></div>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useMainStore} from "@/store/main"
const mainStore = useMainStore()
onMounted(() => {
  mainStore.checkBrowserCompatibility();
})
</script>

<style>
html{
  overflow-y: hidden !important;
}
</style>

<style scoped>

.v-main-container{
  height: calc(100vh - 50px);
}
.bordered{
  border-top: 2px solid #222;
}
</style>
