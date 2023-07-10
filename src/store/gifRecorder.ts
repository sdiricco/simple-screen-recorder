import { defineStore } from "pinia";
import _ from "lodash";
import { useMainStore } from "@/store/main";
import * as gifRecorder from "@/utils/gifRecorder";

interface Store {
  recorder: any;
  gifUrl: any;
}

export const useGifRecorder = defineStore("gif-recorder", {
  state: () =>
    <Store>{
      recorder: null,
      gifUrl: null,
    },
  getters: {
    getStream: () => {
      const mainStore = useMainStore();
      return mainStore.stream;
    },
  },
  actions: {
    //Start gif recorder
    start(payload: { width: number; height: number }) {
      this.recorder =
        this.getStream &&
        payload.height &&
        payload.width &&
        gifRecorder.create(this.getStream, { framerate: 200, quality: 100, width: payload.width, height: payload.height });
      gifRecorder.startRec(this.recorder);
      console.log(`[Start recording window ${this.getStream.id} with <GifRecorder>. Target resolution: ${payload.width}x${payload.height}]`);
    },
    //Stop
    async stop() {
      this.gifUrl = this.recorder && (await gifRecorder.stopRec(this.recorder));
    },

    //Download file
    download() {
      this.gifUrl && gifRecorder.downloadGif(this.gifUrl, "rec.gif");
    },
  },
});
