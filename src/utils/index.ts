export async function requestWebcamStream(){
    return await navigator.mediaDevices.getUserMedia({ video: true });
}

export async function requestScreenStream(){
    return await navigator.mediaDevices.getDisplayMedia({ video: true });
}

export async function requestAudioStream(){
    await navigator.mediaDevices.getUserMedia({ audio: true });
}