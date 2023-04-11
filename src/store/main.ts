import { defineStore } from 'pinia'
import RecordRTC from "recordrtc";
import _ from "lodash"

interface Store {
  stream: MediaStream | null;
  sourceSelected: boolean;
  recorder: RecordRTC | null;
  gifRecorder: RecordRTC.GifRecorder | null;
  gifUrl: string | null;
  fileBlob: Blob | null;
  fileReady: boolean,

}

export const useMainStore = defineStore("main", {
  state: () => <Store> ({ 
    stream: null,
    sourceSelected: false,
    recorder: null,
    gifRecorder: null,
    gifUrl: null,
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
      // this.recorder = new RecordRTC(this.stream, { type: "video" });
      this.gifRecorder = new RecordRTC.GifRecorder(this.stream, { width: 1920, height: 1080, frameRate: 200, quality: 100 })
      // this.recorder.startRecording();
      this.gifRecorder.record();
      this.fileReady = false;
    },
    //Stop boh... 
    async stopRecording(){
      // if (!this.recorder) {
      //   return;
      // }
      // const recorder = this.recorder;
      // await new Promise((resolve) => recorder.stopRecording(()=> resolve(true)))
      // this.fileBlob = this.recorder.getBlob();
      // this.recorder.reset();
      // this.recorder.destroy();
      // this.recorder = null;
      // this.stopSharingAllTracks();
      // this.fileReady = true;


      const recorder = this.gifRecorder;
      recorder.stop((blob)=> {
        this.gifUrl = URL.createObjectURL(blob)
        this.stopSharingAllTracks();
        this.fileReady = true;

      });
    },
    //Download file
    downloadFile(){
      if (!this.fileBlob) {
        return;
      }
      RecordRTC.invokeSaveAsDialog(this.fileBlob, 'rec.webm')
    }
  },
});
