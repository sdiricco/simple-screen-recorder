export async function requestVideoStream() {
  return await navigator.mediaDevices.getUserMedia({ video: true });
}

export async function requestScreenStream() {
  return await navigator.mediaDevices.getDisplayMedia({ video: true });
}

export async function requestAudioStream() {
  return await navigator.mediaDevices.getUserMedia({ audio: true });
}

export function checkBrowserCompatibility() {
  if (!("mediaDevices" in navigator) || !("getDisplayMedia" in navigator.mediaDevices)) {
    throw("La funzionalità di registrazione dello schermo non è supportata in questo browser.");
  }
}

export async function requestDevices(){
  return await navigator.mediaDevices.enumerateDevices();
}

export function mergeStream(streams:any = []):MediaStream{
  const tracks:any = [];
  for (const stream of streams) {
    tracks.push(...stream.getTracks());
  }
  return new MediaStream(tracks);
}
