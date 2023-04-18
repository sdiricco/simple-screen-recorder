import RecordRTC from "recordrtc";

export const create = (stream:MediaStream) => {
    return new RecordRTC(stream, { type: "video" });
}

export function startRec(recorder:RecordRTC){
    recorder.startRecording();
}

export async function stopRec(recorder:RecordRTC){
    await new Promise((resolve) => recorder.stopRecording(()=> resolve(true)))
    const blob: Blob = recorder.getBlob();
    recorder.reset();
    recorder.destroy();
    return blob;
}

export function pauseRec(recorder:RecordRTC){
    recorder.pauseRecording();
}

export function resumeRec(recorder:RecordRTC){
    recorder.resumeRecording();
}

export function saveRec(blob:Blob){
    RecordRTC.invokeSaveAsDialog(blob)
}