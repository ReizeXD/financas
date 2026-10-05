// Gerador de Efeitos Sonoros usando Web Audio API
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function playTone(freq, type, duration, vol = 0.1) {
    if (!audioCtx) initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

const AudioSFX = {
    init: () => initAudio(),
    playSuccess: () => {
        try {
            playTone(600, 'sine', 0.1, 0.1);
            setTimeout(() => playTone(800, 'sine', 0.15, 0.1), 100);
        } catch(e) {}
    },
    playError: () => {
        try {
            playTone(300, 'sawtooth', 0.2, 0.1);
            setTimeout(() => playTone(200, 'sawtooth', 0.3, 0.1), 150);
        } catch(e) {}
    },
    playVictory: () => {
        try {
            playTone(400, 'sine', 0.1, 0.1);
            setTimeout(() => playTone(500, 'sine', 0.1, 0.1), 100);
            setTimeout(() => playTone(600, 'sine', 0.1, 0.1), 200);
            setTimeout(() => playTone(800, 'sine', 0.4, 0.1), 300);
        } catch(e) {}
    }
};
