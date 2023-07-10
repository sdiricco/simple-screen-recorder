<template>
  <v-app class="v-app-container">
    <v-main app class="v-main-container">
      <router-view></router-view>
    </v-main>
    <FooterComponent/>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useMainStore} from "@/store/main"
import FooterComponent from './components/FooterComponent.vue';
const mainStore = useMainStore()
onMounted(() => {
  mainStore.checkBrowserCompatibility();
})
</script>

<style>
body{
  zoom: 100%;
}
html{
  overflow-y: auto !important;
}
</style>

<style scoped>
.v-main-container{
  height: calc(100vh - 50px);
  margin-bottom: 50px;
  overflow-y: auto;
  display: flex;
}
.bordered{
  border-top: 2px solid #222;
}
</style>
