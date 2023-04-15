import { defineStore } from "pinia";
import RecordRTC from "recordrtc";
import _ from "lodash";

interface Store {
  recorder: any
}

export const useMainStore = defineStore("main", {
  state: () =>
    <Store>{
      recorder: null,
    },
  getters: {
    stream: (state:any) => null,
  },
  actions: {
    //Start gif recorder
    start(payload: { width: number; height: number }) {
      if (!this.stream || !payload.height || !payload.width) {
        return;
      }
      this.recorder = new RecordRTC.GifRecorder(this.stream, { width: payload.width, height: payload.height, frameRate: 200, quality: 100 });
      this.recorder.record();
      console.log(`[Start recording window ${this.stream.id} with <GifRecorder>. Target resolution: ${payload.width}x${payload.height}]`);
      this.recorder = false;
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
