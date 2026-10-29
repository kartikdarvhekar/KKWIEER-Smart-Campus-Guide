/**
 * Web Speech API Voice Guidance Engine
 * Uses native window.speechSynthesis to read instructions step by step
 * for students walking through corridors with phones.
 */

class VoiceGuidanceService {
  constructor() {
    this.synth = (typeof window !== "undefined" && "speechSynthesis" in window) ? window.speechSynthesis : null;
    this.isSupported = !!this.synth;
    this.isEnabled = true;
    this.isSpeaking = false;
    this.currentUtterance = null;
    this.currentStepIndex = 0;
    this.stepsQueue = [];
    this.onStepHighlightCallback = null;
    this.onStateChangeCallback = null;

    // Load available voices
    this.selectedVoice = null;
    if (this.isSupported && this.synth) {
      try {
        this.initVoices();
        if (this.synth.onvoiceschanged !== undefined) {
          this.synth.onvoiceschanged = () => this.initVoices();
        }
      } catch (err) {
        console.warn("SpeechSynthesis voice init warning:", err);
      }
    }
  }

  initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Prioritize natural Indian English, British English, or crisp US English voices
    this.selectedVoice = voices.find(v => v.lang === "en-IN") ||
                         voices.find(v => v.lang === "en-GB") ||
                         voices.find(v => v.lang === "en-US") ||
                         voices[0] || null;
  }

  setCallbacks({ onStepHighlight, onStateChange }) {
    this.onStepHighlightCallback = onStepHighlight;
    this.onStateChangeCallback = onStateChange;
  }

  toggleVoiceEnabled() {
    this.isEnabled = !this.isEnabled;
    if (!this.isEnabled) {
      this.stop();
    }
    this.notifyState();
    return this.isEnabled;
  }

  notifyState() {
    if (this.onStateChangeCallback) {
      this.onStateChangeCallback({
        isEnabled: this.isEnabled,
        isSpeaking: this.isSpeaking,
        isSupported: this.isSupported
      });
    }
  }

  /**
   * Speak a single step instruction
   * @param {string} text
   * @param {Function} [onEnd]
   */
  speakText(text, onEnd) {
    if (!this.isSupported || !this.isEnabled) {
      if (onEnd) onEnd();
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.notifyState();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.notifyState();
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn("Speech synthesis error:", e);
      this.isSpeaking = false;
      this.notifyState();
      if (onEnd) onEnd();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  /**
   * Start sequential voice readout of all steps in the route
   * @param {Array<Object>} steps
   * @param {number} startIndex
   */
  readAllSteps(steps, startIndex = 0) {
    if (!this.isSupported || !this.isEnabled || !steps || steps.length === 0) return;

    this.stepsQueue = steps;
    this.currentStepIndex = startIndex;
    this.playNextQueuedStep();
  }

  playNextQueuedStep() {
    if (!this.stepsQueue || this.currentStepIndex >= this.stepsQueue.length) {
      this.stop();
      return;
    }

    const step = this.stepsQueue[this.currentStepIndex];
    if (this.onStepHighlightCallback) {
      this.onStepHighlightCallback(this.currentStepIndex);
    }

    // Prepare speech friendly sentence in clear conversational English
    let speechSentence = step.instruction;
    if (step.landmark && !speechSentence.includes(step.landmark)) {
      speechSentence += `. ${step.landmark}`;
    }

    this.speakText(speechSentence, () => {
      // Pause 750ms before reading the next step for natural cadence
      setTimeout(() => {
        if (this.isSpeaking === false && this.stepsQueue.length > 0) {
          this.currentStepIndex++;
          this.playNextQueuedStep();
        }
      }, 750);
    });
  }

  speakStep(step, index) {
    this.stepsQueue = []; // clear multi-step queue if speaking single step
    this.currentStepIndex = index;
    if (this.onStepHighlightCallback) {
      this.onStepHighlightCallback(index);
    }

    let text = step.instruction;
    if (step.landmark && !text.includes(step.landmark)) {
      text += `. ${step.landmark}`;
    }
    this.speakText(text);
  }

  stop() {
    if (this.isSupported && this.synth) {
      this.synth.cancel();
    }
    this.isSpeaking = false;
    this.stepsQueue = [];
    this.notifyState();
  }
}

export const voiceGuidance = new VoiceGuidanceService();
