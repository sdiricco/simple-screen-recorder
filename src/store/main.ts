import { defineStore } from 'pinia'
import RecordRTC from "recordrtc";
import _ from "lodash"

interface Store {
  stream: MediaStream | null;
  sourceSelected: boolean;
  recorder: RecordRTC | null;
  fileBlob: Blob | null;
  fileReady: boolean,

}

export const useMainStore = defineStore("main", {
  state: () => <Store> ({ 
    stream: null,
    sourceSelected: false,
    recorder: null,
    fileBlob: null,
    fileReady: false,
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
    //Choose screen source.
    //Open a standard web window and return the source selected by user
    async chooseScreenSource(){
      try {
        this.stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        console.log(this.stream.id)
        this.sourceSelected = true;
      } catch (error:any) {
        console.log(error.message);
      }
    },
    //Stop sharing all tracks
    stopSharingAllTracks(){
      if (!this.stream) {
        return;
      }
      const tracks = this.stream.getTracks();
      tracks.forEach((track:any) => track.stop());
      this.sourceSelected = false;
      this.stream = null;
    },
    //Check browser compatibility 
    checkBrowserCompatibility(){
      if (!("mediaDevices" in navigator) || !("getDisplayMedia" in navigator.mediaDevices)) {
        alert("La funzionalità di registrazione dello schermo non è supportata in questo browser.");
      }
    },
    //Start recording
    startRecordingScreen(){
      if (!this.stream) {
        return
      }
      this.recorder = new RecordRTC(this.stream, { type: "video" });
      this.recorder.startRecording();
      this.fileReady = false;
    },
    //Stop recording
    async stopRecording(){
      if (!this.recorder) {
        return;
      }
      const recorder = this.recorder;
      await new Promise((resolve) => recorder.stopRecording(()=> resolve(true)))
      this.fileBlob = this.recorder.getBlob()
      this.recorder.reset();
      this.recorder.destroy();
      this.recorder = null;
      this.stopSharingAllTracks();
      this.fileReady = true;
    },
    //Download file
    downloadFile(){
      if (!this.getUrl) return;

      const url = this.getUrl
      const a = document.createElement("a");
      a.href = url;
      a.download = `screen-recording-${new Date().toISOString()}.webm`;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    }
  },
});
