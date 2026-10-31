"use client";

import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Trees } from "lucide-react";

export function ForestAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourcesRef = useRef<{ stop: () => void }[]>([]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      sourcesRef.current.forEach((s) => {
        try {
          s.stop();
        } catch {
          // ignore
        }
      });
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const startSoundscape = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // 1. Gentle Rainforest Breeze / Pink Noise Generator
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.035; // Soft gentle level
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Lowpass filter for deep misty rainforest rain on leaves
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(650, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(masterGain);
      whiteNoise.start();

      // 2. High frequency soft mountain stream shimmer
      const streamFilter = ctx.createBiquadFilter();
      streamFilter.type = "bandpass";
      streamFilter.frequency.setValueAtTime(2400, ctx.currentTime);
      streamFilter.Q.setValueAtTime(1.8, ctx.currentTime);

      const streamGain = ctx.createGain();
      streamGain.gain.setValueAtTime(0.25, ctx.currentTime);

      whiteNoise.connect(streamFilter);
      streamFilter.connect(streamGain);
      streamGain.connect(masterGain);

      sourcesRef.current = [whiteNoise];
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const stopSoundscape = () => {
    sourcesRef.current.forEach((s) => {
      try {
        s.stop();
      } catch {
        // ignore
      }
    });
    sourcesRef.current = [];
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopSoundscape();
    } else {
      startSoundscape();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(val, audioCtxRef.current.currentTime);
    }
  };

  return (
    <div
      className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2.5 p-2 pr-3.5 rounded-full bg-forest-dark/90 backdrop-blur-2xl border border-amber/30 shadow-[0_10px_35px_rgba(5,13,7,0.7)] text-white text-xs select-none transition-all duration-300 hover:border-amber/60 hover:scale-102"
      role="region"
      aria-label="Rainforest Atmosphere Audio Control"
    >
      <button
        type="button"
        onClick={toggleSound}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
          isPlaying
            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
            : "bg-white/10 text-white/80 hover:text-white border border-white/15"
        }`}
        aria-label={isPlaying ? "Mute forest ambiance sound" : "Play forest ambiance sound"}
      >
        {isPlaying ? (
          <>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <Trees className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono text-[11px] tracking-wider uppercase font-semibold">
              Rainforest Ambiance
            </span>
            <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse ml-0.5" />
          </>
        ) : (
          <>
            <Trees className="w-3.5 h-3.5 text-amber" />
            <span className="font-mono text-[11px] tracking-wider uppercase">
              Forest Sound
            </span>
            <VolumeX className="w-3.5 h-3.5 text-mist/60 ml-0.5" />
          </>
        )}
      </button>

      {isPlaying && (
        <div className="flex items-center gap-2 pl-1 border-l border-white/15 animate-fade-scale-in">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-14 h-1 accent-amber bg-white/20 rounded-lg cursor-pointer"
            aria-label="Forest audio volume"
          />
        </div>
      )}
    </div>
  );
}
