//This code its based on the mozilla Web API "BaseAudioContext: createDynamicsCompressor() method" example
//URL: https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createDynamicsCompressor

const elementName = "video";
//Create audio context
let audioCtx = new AudioContext();

const loadCompressor = () => {
//Asing de video element to a medElement variable
const medElement = document.querySelector(elementName);
//Create a new audio source from the curren audio context and the current medElement
const source = new MediaElementAudioSourceNode(audioCtx, {
  mediaElement: medElement,
});

// Create a compressor node
const compressor = audioCtx.createDynamicsCompressor();
compressor.threshold.setValueAtTime(-70, audioCtx.currentTime);
compressor.knee.setValueAtTime(20, audioCtx.currentTime);
compressor.ratio.setValueAtTime(12, audioCtx.currentTime);
compressor.attack.setValueAtTime(0, audioCtx.currentTime);
compressor.release.setValueAtTime(.75, audioCtx.currentTime);

// connect the AudioBufferSourceNode to the destination
source.connect(audioCtx.destination);
source.disconnect(audioCtx.destination);
source.connect(compressor);
compressor.connect(audioCtx.destination);
}

function onElementAvailable(selector, callback) {
  const observer = new MutationObserver(mutations => {
    if (document.querySelector(selector)) {
      observer.disconnect();
      callback();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

onElementAvailable(elementName,loadCompressor);