import { defineStore } from 'pinia'
import {useMainStore} from "@/store/main"
import RecordRTC from "recordrtc";
import * as videoRecorder from "@/utils/videoRecorder"
import _ from "lodash"

interface Store {
  recorder: RecordRTC | null;
  fileBlob: Blob | null;
}

export const useVideoRecorder = defineStore("video-recorder", {
  state: () => <Store> ({ 
    recorder: null,
    fileBlob: null,
  }),
  getters: {
    getStream: () => {
      const mainStore = useMainStore();
      return mainStore.stream
    },
    getVideoUrl:(state)=> {
      return state.fileBlob && URL.createObjectURL(state.fileBlob);
    }
  },
  actions: {
    //Start recorder
    start(){
      this.recorder = this.getStream && videoRecorder.create(this.getStream)
      this.recorder && videoRecorder.startRec(this.recorder)
    },
    //Pause video recorder
    pause(){
      this.recorder && videoRecorder.pauseRec(this.recorder)
    },
    //Resume webm recorder
    resume(){
      this.recorder && videoRecorder.resumeRec(this.recorder)
    },
    //Stop webm recorder
    async stop(){
      this.fileBlob = this.recorder && await videoRecorder.stopRec(this.recorder)

    },
    donwload(){
      this.fileBlob && videoRecorder.saveRec(this.fileBlob)
    }
  },
});
