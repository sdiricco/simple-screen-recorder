import { defineStore } from "pinia";
import RecordRTC from "recordrtc";
import _ from "lodash";
import { log } from "console";

interface Store {
  devices: any;

  audioStream: MediaStream | null;
  audioPermissions: boolean;

  webcamStream: MediaStream | null;
  webcamPermissions: boolean;

  screenStream: MediaStream | null;
  screenPermissions: boolean;

  stream: MediaStream | null;

  tracks: Array<any>,

  track: any;
  isSourceSelected: boolean;
  recorder: RecordRTC | null;
  gifRecorder: any;
  gifUrl: string | null;
  fileBlob: Blob | null;
  isFileReady: boolean;
  recordingVideoOptions: Array<any>;
  recordingVideoOptionSelectedIdx: number;
  isAudioEnabled: boolean;
  recorderStarted: boolean;
  recorderPaused: boolean;
}

export const useMainStore = defineStore("main", {
  state: () =>
    <Store>{
      devices: [],

      audioStream: null,
      audioPermissions: false,

      webcamStream: null,
      webcamPermissions: false,

      screenStream: null,
      screenPermissions: false,








      stream: null,

      tracks: [],

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
          type: "screen",
        },
        {
          type: "webcam",
        },
      ],
      recordingVideoOptionSelectedIdx: 0,

      isAudioEnabled: false,
    },
  getters: {
    getStream: (state) => state.stream,
    getUrl: (state) => {
      if (!state.fileBlob) {
        return;
      }
      return URL.createObjectURL(state.fileBlob);
    },
    getVideoOptionSelected: (state) => state.recordingVideoOptions[state.recordingVideoOptionSelectedIdx],
  },
  actions: {
    //Check browser compatibility
    checkBrowserCompatibility() {
      if (!("mediaDevices" in navigator) || !("getDisplayMedia" in navigator.mediaDevices)) {
        alert("La funzionalità di registrazione dello schermo non è supportata in questo browser.");
      }
    },
    //Request permission to client
    async requestPermissions() {
      try {
        if (this.stream) {
          return;
        }
        const tracks = [];
        if (this.isAudioEnabled) {
          const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          tracks.push(...audioStream.getTracks());
        }
        if (this.getVideoOptionSelected.type === "webcam") {
          const webcamStream = await navigator.mediaDevices.getUserMedia({ video: true });
          tracks.push(...webcamStream.getTracks());
        }
        if (this.getVideoOptionSelected.type === "screen") {
          const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
          tracks.push(...screenStream.getTracks());
        }
        this.stream = new MediaStream(tracks);
        this.isSourceSelected = true;
      } catch (error: any) {
        console.log(error.message);
      }
    },
    //Request available media devices
    async requestDevices(){
      this.devices = await navigator.mediaDevices.enumerateDevices();
    },

    //Request stream
    async requestStream(){
      if (this.isAudioEnabled) {
        await this.requestAudioStream();
      }
      if (this.getVideoOptionSelected.type === "webcam") {
        await this.requestWebcamStream();
      }
      if (this.getVideoOptionSelected.type === "screen") {
        await this.requestScreenStream(); 
      }
      if (this.tracks.length) {
        this.stream = new MediaStream(this.tracks);
      }
    },

    //Request audio stream
    async requestAudioStream(){
      try {
        this.audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.audioPermissions = true;
        this.tracks.push(...this.audioStream.getTracks());
      } catch (error:any) {
        //handle error (alert user)
        this.audioPermissions = false;
        console.log(`Error request audio stream: ${error.message}`);
      }
    },
    //Request camera stream
    async requestWebcamStream(){
      try {
        this.webcamStream = await navigator.mediaDevices.getUserMedia({ video: true });
        this.webcamPermissions = true;
        this.tracks.push(...this.webcamStream.getTracks());
      } catch (error:any) {
        //handle error (alert user)
        this.webcamPermissions = false;
        console.log(`Error request camera stream: ${error.message}`);
      }
    },
    //Request screen stream
    async requestScreenStream(){
      try {
        this.screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        this.screenPermissions = true;
        this.tracks.push(...this.screenStream.getTracks());
      } catch (error:any) {
        //handle error (alert user)
        this.screenPermissions = false;
        console.log(`Error request screen stream: ${error.message}`);
      }
    },
    //Stop sharing all tracks
    stopSharingAllTracks() {
      if (!this.stream) {
        return;
      }
      const tracks = this.stream.getTracks();
      tracks.forEach((track: any) => track.stop());
      this.isSourceSelected = false;
      this.stream = null;
    },
    startRecording() {
      //call webmRecorder.start() or gifRecorder.start();
    },
    stopRecording() {
      //call webmRecorder.stop() or gifRecorder.stop();
    },
    pauseRecording() {
      //call webmRecorder.pause() or gifRecorder.pause();
    },
    resumeRecording() {
      //call webmRecorder.resume() or gifRecorder.resume();
    },
    donwload() {
      //download gif image or webm file
    },
  },
});
