# YouTube Audio Compressor Extension for Google Chrome

This repository contains a Google Chrome extension that enables audio compression for YouTube videos using the Web Audio API. The compression is based on the Mozilla Web API `BaseAudioContext.createDynamicsCompressor() method`.

## Installation

To install the extension, follow these steps:

1. Clone or download this repository to your local machine.
2. Open Google Chrome and navigate to the Extensions settings. You can access this by clicking on the three dots in the top right corner, then selecting "More tools" > "Extensions", or by typing `chrome://extensions/` in the address bar and hitting Enter.
3. Enable Developer mode by toggling the switch in the top right corner of the Extensions page.
4. Click on the "Load unpacked" button that appears and select the directory where you cloned or downloaded this repository.
5. The extension should now be installed and ready to use.

## Usage

Once the extension is installed, it will automatically apply audio compression to YouTube videos. There are no additional steps required to use the extension.

## Code Overview

The core functionality of the extension is implemented in JavaScript using the Web Audio API. Here's a brief overview of the main code:

```javascript
// This code is based on the Mozilla Web API "BaseAudioContext.createDynamicsCompressor()" example
// URL: https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createDynamicsCompressor

const elementName = "video";

// Create audio context
let audioCtx = new AudioContext();

const loadCompressor = () => {
  // Assign the video element to a medElement variable
  const medElement = document.querySelector(elementName);
  // Create a new audio source from the current audio context and the current medElement
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

  // Connect the AudioBufferSourceNode to the destination
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

onElementAvailable(elementName, loadCompressor);

```

```markdown
## Modifying Compressor Parameters

To customize the behavior of the audio compressor, you can adjust the following parameters:

1. **Threshold**: 
   - Determines the level above which compression begins.
   - Default value: `-70` dB.
   - Modify this value to change when compression starts. Lower values start compression earlier.

2. **Knee**: 
   - Defines the range over which the transition from uncompressed to compressed audio occurs smoothly.
   - Default value: `20` dB.
   - Adjust this value to control the smoothness of the compression transition. Increase for a smoother transition, decrease for a more abrupt one.

3. **Ratio**:
   - Sets the amount of compression applied to the audio signal once it exceeds the threshold.
   - Default value: `12`.
   - Higher ratios result in more aggressive compression, while lower ratios produce more subtle compression.

4. **Attack**:
   - Determines the time it takes for the compressor to respond to an increase in signal level.
   - Default value: `0` seconds.
   - Adjust to control how quickly compression kicks in after the signal exceeds the threshold. Shorter times for faster response.

5. **Release**:
   - Determines how quickly the compressor stops compressing the signal once it falls below the threshold.
   - Default value: `0.75` seconds.
   - Modify to control how long it takes for the compressor to return to normal operation after the signal drops below the threshold.

To modify these values, locate the corresponding lines in the code and adjust the numerical parameters assigned to each property accordingly. Experiment with different values to achieve the desired compression effect based on the characteristics of the audio being processed.
```

# License

This project is licensed under the MIT License. Feel free to modify and distribute it according to the terms of this license.