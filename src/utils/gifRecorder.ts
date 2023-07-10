import RecordRTC from "recordrtc";

export const create = (stream:MediaStream, payload = {width: 640, height: 640, framerate: 200, quality: 100}) => {
    return new RecordRTC.GifRecorder(stream, { width: payload.width, height: payload.height, frameRate: payload.framerate, quality: payload.quality });
}

export function startRec(recorder:any){
    recorder.record();
}

export async function stopRec(recorder:any){
    const blob = await new Promise<Blob>((resolve) => recorder.stop((blob: Blob)=> resolve(blob)))
    const gifUrl = URL.createObjectURL(blob);
    recorder.clearRecordedData();  
    return gifUrl;
}

export function downloadGif(gifUrl:any, name: 'rec.gif'){
    var link = document.createElement("a");
    link.href = gifUrl || "";
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}