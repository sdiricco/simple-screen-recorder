import { defineStore } from 'pinia'
import RecordRTC from "recordrtc";
import _ from "lodash"

interface Store {
  stream: MediaStream | null;
  track: any;
  isSourceSelected: boolean;
  recorder: RecordRTC | null;
  gifRecorder: any;
  gifUrl: string | null;
  fileBlob: Blob | null;
  isFileReady: boolean,
  recordingVideoOptions: Array<any>
  recordingVideoOptionSelectedIdx: number,
  isAudioEnabled: boolean,
  recorderStarted: boolean,
  recorderPaused: boolean,

}

export const useMainStore = defineStore("main", {
  state: () => <Store> ({ 
    stream: null,
    isSourceSelected: false,
    track: null,

    recorder: null,

    recorderStarted: false,
    recorderPaused: false,

    gifRecorder: null,

    gifUrl: null,
    fileBlob: null,
    isFileReady: false,

    recordingVideoOptions: [
      {
        type: 'screen'
      },
      {
        type: 'webcam'
      }
    ],
    recordingVideoOptionSelectedIdx: 0,

    isAudioEnabled: false,
  }),
  getters: {
    getStream: (state) => state.stream,
    getUrl: (state) => {
      if (!state.fileBlob) {
        return;
      }
      return URL.createObjectURL(state.fileBlob);
    },
    getVideoOptionSelected: (state) => state.recordingVideoOptions[state.recordingVideoOptionSelectedIdx]
  },
  actions: {
    //Start recorder
    start(){
      if (!this.stream) {
        return
      }
      this.recorder = new RecordRTC(this.stream, { type: "video" });
      this.recorder.startRecording();
      this.recorderStarted = true;
      this.isFileReady = false;
    },
    //Pause webm recorder
    pause(){
      if (!this.recorder) {
        return;
      }
      this.recorder.pauseRecording();
      this.recorderPaused = true;
    },
    //Resume webm recorder
    resume(){
      if (!this.recorder) {
        return;
      }
      this.recorder.resumeRecording();
      this.recorderPaused = false;

    },
    //Stop webm recorder
    async stop(){
      if (!this.recorder) {
        return;
      }
      const recorder = this.recorder;
      await new Promise((resolve) => recorder.stopRecording(()=> resolve(true)))
      this.fileBlob = this.recorder.getBlob();
      this.recorder.reset();
      this.recorder.destroy();
      this.recorder = null;
      this.stopSharingAllTracks();
      this.isFileReady = true;
      this.recorderStarted = false;
      this.recorderPaused = false;
    },
    donwload(){
      if(!this.fileBlob){
        return
      }
      RecordRTC.invokeSaveAsDialog(this.fileBlob)
    }
  },
});
