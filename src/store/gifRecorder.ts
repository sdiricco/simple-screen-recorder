import { defineStore } from "pinia";
import RecordRTC from "recordrtc";
import _ from "lodash";
import {useMainStore} from "@/store/main"


interface Store {
  recorder: any,
  gifUrl: any,
}

export const useGifRecorder = defineStore("gif-recorder", {
  state: () =>
    <Store>{
      recorder: null,
      gifUrl: null
    },
  getters: {
    getStream: () => {
      const mainStore = useMainStore();
      return mainStore.stream
    },
  },
  actions: {
    //Start gif recorder
    start(payload: { width: number; height: number }) {
      if (!this.getStream || !payload.height || !payload.width) {
        return;
      }
      this.recorder = new RecordRTC.GifRecorder(this.getStream, { width: payload.width, height: payload.height, frameRate: 200, quality: 100 });
      this.recorder.record();
      console.log(`[Start recording window ${this.getStream.id} with <GifRecorder>. Target resolution: ${payload.width}x${payload.height}]`);
    },
    //Stop
    async stop(){
      if (!this.recorder) {
        return
      }
      const recorder = this.recorder;
      const blob = await new Promise<Blob>((resolve) => recorder.stop((blob: Blob)=> resolve(blob)))
      this.gifUrl = URL.createObjectURL(blob);
      this.recorder.clearRecordedData();
    },

    //Download file
    download() {
      var link = document.createElement("a");
      link.href = this.gifUrl || "";
      link.download = "rec.gif";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
});
