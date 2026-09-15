"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 600;

export default function ScrollAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const [imagesLoaded, setImagesLoaded] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    let animationFrameId: number;
    let currentImageIndex = 1;

    const renderImage = (img: HTMLImageElement) => {
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;

      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      // Object-cover equivalent mapping
      if (imgRatio > canvasRatio) {
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      } else {
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      }

      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();

    const images: HTMLImageElement[] = new Array(FRAME_COUNT);

    const getFrameUrl = (index: number) => {
      if (isMobile) {
        return `/mobile-frames/frame_${index.toString().padStart(6, "0")}.jpg`;
      } else {
        return `/desktop-frames/frame_${index.toString().padStart(6, "0")}.jpg`;
      }
    };

    let isCancelled = false;
    const requestedFrames = new Set<number>();

    const loadFrame = (index: number) => {
      if (index < 1 || index > FRAME_COUNT || requestedFrames.has(index)) return;
      if (isCancelled) return;

      requestedFrames.add(index);
      const img = new Image();
      img.src = getFrameUrl(index);
      
      img.onload = () => {
        if (isCancelled) return;
        images[index - 1] = img;
        setImagesLoaded((prev) => prev + 1);
        
        // Render if this image is the one we're currently waiting for
        if (currentImageIndex === index) {
          if (animationFrameId) cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(() => renderImage(img));
        }
      };
    };

    // Fast load ONLY the very first 3 frames so initial render is instant.
    // Zero background spam - we'll load the rest dynamically as they scroll!
    for (let i = 1; i <= 3; i++) {
      loadFrame(i);
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;

      if (maxScrollTop <= 0) return;

      const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScrollTop));
      const frameIndex = Math.max(1, Math.min(FRAME_COUNT, Math.floor(scrollFraction * FRAME_COUNT) + 1));
      
      currentImageIndex = frameIndex;

      // Smart dynamic lookahead: Only request frames immediately around the scroll position
      // 10 frames ahead, 5 frames behind
      for (let i = frameIndex; i <= Math.min(frameIndex + 10, FRAME_COUNT); i++) {
        loadFrame(i);
      }
      for (let i = frameIndex - 1; i >= Math.max(1, frameIndex - 5); i--) {
        loadFrame(i);
      }

      // If the targeted frame is already loaded, render it immediately
      if (images[frameIndex - 1] && images[frameIndex - 1].complete) {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(() => {
          renderImage(images[frameIndex - 1]);
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", () => {
      updateCanvasSize();
      handleScroll();
    });

    return () => {
      isCancelled = true;
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  return (
    <div className="fixed inset-0 w-full h-full bg-black z-0">
      <canvas ref={canvasRef} className="w-full h-full object-cover" />
    </div>
  );
}
