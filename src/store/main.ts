import { defineStore } from "pinia";
import _ from "lodash";
import * as media from "@/utils/media"
import { watch } from 'vue'

interface Store {
  devices: any;

  audioStream: MediaStream | null;
  audioPermissions: boolean;

  videoStream: MediaStream | null;
  webcamPermissions: boolean;

  screenStream: MediaStream | null;
  screenPermissions: boolean;

  stream: any;
  streamReady: boolean;

  recordingVideoOptions: Array<any>;
  recordingVideoOptionSelectedIdx: number;
  isAudioEnabled: boolean;
  recorderStarted: boolean;
  recorderPaused: boolean;
  recordAsGif: boolean;
  step: "home" | "choose-source" | "record" | "player";
}

export const useMainStore = defineStore("main", {
  state: () =>
    <Store>{
      devices: [],

      audioStream: null,
      audioPermissions: false,

      videoStream: null,
      webcamPermissions: false,

      screenStream: null,
      screenPermissions: false,

      stream: null,
      streamReady: false,

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

      recordAsGif: false,

      step: 'home'
    },
  getters: {
    getVideoOptionSelected: (state) => state.recordingVideoOptions[state.recordingVideoOptionSelectedIdx],
  },
  actions: {
    //Check browser compatibility
    checkBrowserCompatibility() {
      try {
        media.checkBrowserCompatibility();
      } catch (error) {
        console.log(error);
      }
    },
    //Request available media devices
    async requestDevices(){
      this.devices = await media.requestDevices()
    },
    //Request stream
    async requestStream(){
      if (this.isAudioEnabled) {
        await this.requestAudioStream();
      }
      if (this.getVideoOptionSelected.type === "webcam") {
        await this.requestWebcamStream();
      }
      else if (this.getVideoOptionSelected.type === "screen") {
        await this.requestScreenStream(); 
      }
      this.createStream();
    },

    //Create stream
    createStream(){
      const streams = [this.audioStream, this.videoStream, this.screenStream]
        .filter((s:any) => s !== null);      
      this.stream = streams.length && media.mergeStream(streams)
    },

    //Request audio stream
    async requestAudioStream(){
      try {
        this.audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.audioPermissions = true;
      } catch (error:any) {
        //handle error (alert user)
        this.audioPermissions = false;
        console.log(`Error request audio stream: ${error.message}`);
      }
    },
    //Request camera stream
    async requestWebcamStream(){
      try {
        this.videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
        this.webcamPermissions = true;
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
      this.stream = null;
    }
  },
});


