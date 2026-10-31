"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  X,
  Play,
  Volume2,
  VolumeX,
  MessageCircle,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { siteData } from "@/data/siteData";

interface ReelModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
  poster?: string;
}

export function ReelModal({
  isOpen,
  onClose,
  videoSrc = siteData.video.src,
  poster = siteData.video.poster,
}: ReelModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>("0:00");
  const [duration, setDuration] = useState<string>("0:00");

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const video = videoRef.current;
      if (video) {
        video.currentTime = 0;
        video.muted = false;
        setIsMuted(false);
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => {
              // Browser blocked unmuted autoplay -> fall back to muted
              video.muted = true;
              setIsMuted(true);
              video
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => setIsPlaying(false));
            });
        }
      }
    } else {
      document.body.style.overflow = "unset";
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const current = video.currentTime;
    const total = video.duration;
    setProgress((current / total) * 100);
    setCurrentTime(formatTime(current));
    setDuration(formatTime(total));
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    video.currentTime = ratio * video.duration;
    setProgress(ratio * 100);
  };

  const waClean = siteData.contact.whatsapp.replace(/[^0-9]/g, "");

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Yashin Stay Official Cinema Reel"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-2xl transition-all duration-300"
      onClick={onClose}
    >
      {/* Close Button Top Right */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-amber text-white hover:text-forest-dark transition-all duration-300 border border-white/20 shadow-2xl group cursor-pointer"
        aria-label="Close Cinema Reel Modal"
      >
        <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Main Luxury Phone Stage */}
      <div
        className="relative w-full max-w-[390px] aspect-[9/16] max-h-[88vh] rounded-[2.5rem] bg-[#070F0A] border-2 border-amber/40 shadow-[0_0_80px_rgba(197,160,89,0.3)] overflow-hidden flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dynamic Island / Top Camera Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 w-28 h-4 rounded-full bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-forest-dark border border-emerald-500/50 mr-2" />
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Video Canvas */}
        <div
          className="relative w-full h-full bg-black cursor-pointer overflow-hidden group"
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            poster={poster}
            playsInline
            loop
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleTimeUpdate}
            className="w-full h-full object-cover select-none"
          />

          {/* Top Video Header Overlay */}
          <div className="absolute top-10 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber/30 text-amber text-[11px] font-mono tracking-widest uppercase">
              <Sparkles
                className="w-3 h-3 text-amber animate-spin"
                style={{ animationDuration: "4s" }}
              />
              <span>Inauguration Reel</span>
            </div>

            {/* Mute / Unmute Button */}
            <button
              type="button"
              onClick={toggleMute}
              className="pointer-events-auto p-2 rounded-full bg-black/60 hover:bg-amber text-white hover:text-forest-dark backdrop-blur-md border border-white/20 transition-all duration-300 cursor-pointer shadow-lg"
              aria-label={isMuted ? "Unmute video audio" : "Mute video audio"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-amber-300" />
              ) : (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              )}
            </button>
          </div>

          {/* Central Play/Pause Animation Overlay (visible when paused) */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity">
              <div className="w-16 h-16 rounded-full bg-amber/90 text-forest-dark flex items-center justify-center shadow-[0_0_30px_rgba(197,160,89,0.6)] transform scale-110 transition-transform">
                <Play className="w-7 h-7 ml-1 fill-current" />
              </div>
            </div>
          )}

          {/* Bottom Gradient Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />

          {/* Bottom Reel Details & CTAs */}
          <div className="absolute inset-x-0 bottom-0 p-5 z-20 flex flex-col gap-3 pointer-events-none">
            <div>
              <p className="font-serif text-lg text-white font-medium drop-shadow-md">
                Yashin Stay • Vythiri, Wayanad
              </p>
              <p className="text-xs text-white/80 font-sans font-light mt-0.5 line-clamp-2 drop-shadow-sm">
                Ribbon-cutting ceremony, private springwater pool, and misty hillside cottage suites.
              </p>
            </div>

            {/* Scrub Time Progress Bar */}
            <div
              className="pointer-events-auto relative w-full h-1.5 bg-white/25 rounded-full cursor-pointer overflow-hidden group/bar"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-gradient-to-r from-amber via-amber-light to-amber rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-white/70">
              <span>{currentTime}</span>
              <span>{duration}</span>
            </div>

            {/* Direct WhatsApp CTA Button */}
            <a
              href={`https://wa.me/${waClean}?text=${encodeURIComponent(
                "Hello Yashin Stay, I watched your cinematic reel and would like to enquire about reserving a cottage in Vythiri, Wayanad."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-sans font-medium text-xs shadow-[0_4px_20px_rgba(16,185,129,0.4)] transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>Enquire About Reel on WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

