import { defineStore } from 'pinia'
import RecordRTC from "recordrtc";
import _ from "lodash"
import { log } from 'node:console';

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
  recordingVideoOptionSelectedIdx: Number,
  isAudioEnabled: Boolean 
}

export const useMainStore = defineStore("main", {
  state: () => <Store> ({ 
    stream: null,
    isSourceSelected: false,
    track: null,

    recorder: null,
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
    }
  },
  actions: {
    //Check browser compatibility 
    checkBrowserCompatibility(){
      if (!("mediaDevices" in navigator) || !("getDisplayMedia" in navigator.mediaDevices)) {
        alert("La funzionalità di registrazione dello schermo non è supportata in questo browser.");
      }
    },
    //Choose screen source.
    //Open a standard web window and return the source selected by user
    async chooseScreenSource(){
      try {
        if (this.stream) {
          return;
        }
        const devices = await navigator.mediaDevices.enumerateDevices()
        console.log(devices);
        
        this.stream = await navigator.mediaDevices.getDisplayMedia({ video: true })
        this.isSourceSelected = true;
      } catch (error:any) {
        console.log(error.message);
      }
    },
    //Stop sharing all tracks
    stopSharingAllTracks(){
      if (!this.stream) {
        return
      }
      const tracks = this.stream.getTracks();
      tracks.forEach((track:any) => track.stop());
      this.isSourceSelected = false;
      this.stream = null;
    },
    //Start webm recorder
    startWebmRecorder(){
      if (!this.stream) {
        return
      }
      this.recorder = new RecordRTC(this.stream, { type: "video" });
      this.recorder.startRecording();
      this.isFileReady = false;
    },
    //Start gif recorder
    startGifRecorder(payload: {width:number, height:number}){
      if (!this.stream || !payload.height || !payload.width) {
        return;
      }
      this.gifRecorder = new RecordRTC.GifRecorder(this.stream, { width: payload.width, height: payload.height, frameRate: 200, quality: 100 })
      this.gifRecorder.record();
      console.log(`[Start recording window ${this.stream.id} with <GifRecorder>. Target resolution: ${payload.width}x${payload.height}]`);
      this.isFileReady = false;
    },
    //Stop gif recorder
    async stopGifRecorder(){
      if (!this.gifRecorder) {
        return
      }
      const recorder = this.gifRecorder;
      const blob = await new Promise<Blob>((resolve) => recorder.stop((blob: Blob)=> resolve(blob)))
      this.gifUrl = URL.createObjectURL(blob);
      this.isFileReady = true;
      this.gifRecorder.clearRecordedData();
      this.stopSharingAllTracks();
    },
    //Stop webm recorder
    async stopWebmRecorder(){
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
    },
    //Download file
    downloadGif(){
      var link = document.createElement("a");
      link.href = this.gifUrl || "";
      link.download = "rec.gif";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  },
});
