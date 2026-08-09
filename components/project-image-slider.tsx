"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
  FiX,
} from "react-icons/fi";

type SliderImage = {
  src: string;
  alt: string;
};

type ProjectImageSliderProps = {
  images: readonly SliderImage[];
  galleryLabel: string;
  priority?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  aspectClassName?: string;
  className?: string;
};

const swipeThreshold = 45;

function ProjectImageSliderComponent({
  images,
  galleryLabel,
  priority = false,
  autoplay = true,
  autoplayDelay = 4500,
  aspectClassName = "aspect-[16/8.3]",
  className = "",
}: ProjectImageSliderProps) {
  const reduceMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(
    () => new Set(),
  );
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touchPaused, setTouchPaused] = useState(false);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const touchResumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fullscreenButton = useRef<HTMLButtonElement | null>(null);
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    setCurrent((index) => Math.min(index, Math.max(images.length - 1, 0)));
  }, [images.length]);

  useEffect(
    () => () => {
      if (touchResumeTimer.current) clearTimeout(touchResumeTimer.current);
    },
    [],
  );

  const goTo = useCallback(
    (nextIndex: number, nextDirection?: number) => {
      if (!hasMultipleImages) return;

      const wrappedIndex =
        ((nextIndex % images.length) + images.length) % images.length;
      setDirection(
        nextDirection ??
          (wrappedIndex === current
            ? direction
            : wrappedIndex > current
              ? 1
              : -1),
      );
      setCurrent(wrappedIndex);
    },
    [current, direction, hasMultipleImages, images.length],
  );

  const showPrevious = useCallback(
    () => goTo(current - 1, -1),
    [current, goTo],
  );
  const showNext = useCallback(() => goTo(current + 1, 1), [current, goTo]);

  useEffect(() => {
    if (
      !hasMultipleImages ||
      !autoplay ||
      reduceMotion ||
      hovered ||
      focused ||
      touchPaused ||
      fullscreenOpen
    ) {
      return;
    }

    const timer = window.setInterval(showNext, autoplayDelay);
    return () => window.clearInterval(timer);
  }, [
    autoplay,
    autoplayDelay,
    focused,
    hasMultipleImages,
    hovered,
    reduceMotion,
    showNext,
    touchPaused,
    fullscreenOpen,
  ]);

  const closeFullscreen = useCallback(() => {
    setFullscreenOpen(false);
    window.requestAnimationFrame(() => fullscreenButton.current?.focus());
  }, []);

  const pauseAfterTouch = useCallback(() => {
    setTouchPaused(true);
    if (touchResumeTimer.current) clearTimeout(touchResumeTimer.current);
    touchResumeTimer.current = setTimeout(() => setTouchPaused(false), 7000);
  }, []);

  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      pauseAfterTouch();
      const swipeStrength = Math.abs(info.offset.x) + Math.abs(info.velocity.x);

      if (swipeStrength < swipeThreshold) return;
      if (info.offset.x < 0) showNext();
      else showPrevious();
    },
    [pauseAfterTouch, showNext, showPrevious],
  );

  if (images.length === 0) return null;

  const currentImage = images[current];
  const isLoaded = loadedImages.has(currentImage.src);

  if (!hasMultipleImages) {
    return (
      <>
        <div
          className={`group relative overflow-hidden bg-neutral-200 dark:bg-[#252720] ${aspectClassName} ${className}`}
        >
          {!isLoaded && (
            <div
              className="absolute inset-0 animate-pulse bg-linear-to-br from-[#e8e3d8] via-[#f4f0e8] to-[#ddd6c7] motion-reduce:animate-none dark:from-[#252720] dark:via-[#303229] dark:to-[#20221c]"
              aria-hidden
            />
          )}
          <Image
            className={`object-cover transition-[transform,opacity] duration-700 ease-out will-change-transform transform-gpu group-hover:scale-[1.03] ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
            priority={priority}
            onLoad={() =>
              setLoadedImages((loaded) => new Set(loaded).add(currentImage.src))
            }
          />
          <FullscreenButton
            buttonRef={fullscreenButton}
            onClick={() => setFullscreenOpen(true)}
            imageAlt={currentImage.alt}
          />
        </div>
        <FullscreenViewer
          open={fullscreenOpen}
          image={currentImage}
          current={current}
          total={images.length}
          galleryLabel={galleryLabel}
          onClose={closeFullscreen}
        />
      </>
    );
  }

  return (
    <>
      <div
        className={`group/slider relative touch-pan-y overflow-hidden bg-neutral-200 outline-hidden focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-inset dark:bg-[#252720] ${aspectClassName} ${className}`}
        role="region"
        aria-roledescription="carousel"
        aria-label={galleryLabel}
        tabIndex={0}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setFocused(false);
        }}
        onPointerDown={(event) => {
          if (event.pointerType === "touch") pauseAfterTouch();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            showPrevious();
          } else if (event.key === "ArrowRight") {
            event.preventDefault();
            showNext();
          }
        }}
      >
        {!isLoaded && (
          <div
            className="absolute inset-0 animate-pulse bg-linear-to-br from-[#e8e3d8] via-[#f4f0e8] to-[#ddd6c7] motion-reduce:animate-none dark:from-[#252720] dark:via-[#303229] dark:to-[#20221c]"
            aria-hidden
          />
        )}

        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentImage.src}
            className="absolute inset-0"
            custom={direction}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { x: `${direction * 100}%`, opacity: 0.7 }
            }
            animate={{ x: 0, opacity: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { x: `${direction * -100}%`, opacity: 0.7 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.42,
              ease: [0.22, 1, 0.36, 1],
            }}
            drag={reduceMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={handleDragEnd}
          >
            <Image
              className={`select-none object-cover transition-[transform,opacity] duration-700 ease-out will-change-transform transform-gpu group-hover/slider:scale-[1.03] ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              sizes="(max-width: 760px) 100vw, 50vw"
              priority={priority && current === 0}
              draggable={false}
              onLoad={() =>
                setLoadedImages((loaded) =>
                  new Set(loaded).add(currentImage.src),
                )
              }
            />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          className="pointer-events-none absolute left-3 top-1/2 z-10 grid size-9 -translate-x-1 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-ink/70 text-white opacity-0 shadow-lg backdrop-blur-xs transition-[opacity,transform,background-color,color] duration-300 ease-out hover:scale-105 hover:bg-gold hover:text-ink focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white group-hover/slider:pointer-events-auto group-hover/slider:translate-x-0 group-hover/slider:opacity-100 group-focus-within/slider:pointer-events-auto group-focus-within/slider:translate-x-0 group-focus-within/slider:opacity-100 motion-reduce:transition-none [@media(hover:none)]:pointer-events-auto [@media(hover:none)]:translate-x-0 [@media(hover:none)]:opacity-100"
          onClick={showPrevious}
          aria-label="Show previous project image"
        >
          <FiChevronLeft aria-hidden />
        </button>
        <button
          type="button"
          className="pointer-events-none absolute right-3 top-1/2 z-10 grid size-9 translate-x-1 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-ink/70 text-white opacity-0 shadow-lg backdrop-blur-xs transition-[opacity,transform,background-color,color] duration-300 ease-out hover:scale-105 hover:bg-gold hover:text-ink focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white group-hover/slider:pointer-events-auto group-hover/slider:translate-x-0 group-hover/slider:opacity-100 group-focus-within/slider:pointer-events-auto group-focus-within/slider:translate-x-0 group-focus-within/slider:opacity-100 motion-reduce:transition-none [@media(hover:none)]:pointer-events-auto [@media(hover:none)]:translate-x-0 [@media(hover:none)]:opacity-100"
          onClick={showNext}
          aria-label="Show next project image"
        >
          <FiChevronRight aria-hidden />
        </button>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 translate-y-1 items-center gap-1.5 rounded-full bg-ink/70 px-2.5 py-1.5 opacity-0 backdrop-blur-xs transition-[opacity,transform] duration-300 ease-out group-hover/slider:pointer-events-auto group-hover/slider:translate-y-0 group-hover/slider:opacity-100 group-focus-within/slider:pointer-events-auto group-focus-within/slider:translate-y-0 group-focus-within/slider:opacity-100 motion-reduce:transition-none [@media(hover:none)]:pointer-events-auto [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className={`size-2 rounded-full transition-[width,background-color] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white ${
                current === index
                  ? "w-5 bg-[#e1b54e]"
                  : "bg-white/60 hover:bg-white"
              }`}
              onClick={() => goTo(index)}
              aria-label={`Show project image ${index + 1} of ${images.length}`}
              aria-current={current === index ? "true" : undefined}
            />
          ))}
        </div>

        <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-ink/70 px-2.5 py-1 text-[.65rem] font-bold tabular-nums text-white opacity-0 backdrop-blur-xs transition-opacity duration-300 group-hover/slider:opacity-100 group-focus-within/slider:opacity-100 motion-reduce:transition-none [@media(hover:none)]:opacity-100">
          {current + 1} / {images.length}
        </span>
      <FullscreenButton
        buttonRef={fullscreenButton}
        onClick={() => setFullscreenOpen(true)}
        imageAlt={currentImage.alt}
        className="left-3 top-3 lg:left-auto lg:right-3 lg:top-12"
      />
        <span className="sr-only" aria-live="polite" aria-atomic="true">
          Showing image {current + 1} of {images.length}
        </span>
      </div>
      <FullscreenViewer
        open={fullscreenOpen}
        image={currentImage}
        current={current}
        total={images.length}
        galleryLabel={galleryLabel}
        onClose={closeFullscreen}
        onPrevious={showPrevious}
        onNext={showNext}
      />
    </>
  );
}

type FullscreenButtonProps = {
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  onClick: () => void;
  imageAlt: string;
  className?: string;
};

function FullscreenButton({
  buttonRef,
  onClick,
  imageAlt,
  className = "left-3 top-3 lg:left-auto lg:right-3",
}: FullscreenButtonProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      className={`pointer-events-auto absolute z-20 grid size-8 scale-100 place-items-center rounded-full border border-white/25 bg-ink/75 text-sm text-white opacity-100 shadow-lg backdrop-blur-xs transition-[opacity,transform,background-color,color] duration-300 hover:scale-105 hover:bg-gold hover:text-ink focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none lg:pointer-events-none lg:size-9 lg:scale-95 lg:bg-ink/70 lg:text-base lg:opacity-0 lg:group-hover:pointer-events-auto lg:group-hover:scale-100 lg:group-hover:opacity-100 lg:group-hover/slider:pointer-events-auto lg:group-hover/slider:scale-100 lg:group-hover/slider:opacity-100 lg:group-focus-within:pointer-events-auto lg:group-focus-within:scale-100 lg:group-focus-within:opacity-100 lg:group-focus-within/slider:pointer-events-auto lg:group-focus-within/slider:scale-100 lg:group-focus-within/slider:opacity-100 ${className}`}
      onClick={onClick}
      aria-label={`View ${imageAlt} in fullscreen`}
      title="View fullscreen"
    >
      <FiMaximize2 aria-hidden />
    </button>
  );
}

type FullscreenViewerProps = {
  open: boolean;
  image: SliderImage;
  current: number;
  total: number;
  galleryLabel: string;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
};

function FullscreenViewer({
  open,
  image,
  current,
  total,
  galleryLabel,
  onClose,
  onPrevious,
  onNext,
}: FullscreenViewerProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowLeft" && onPrevious) {
        event.preventDefault();
        onPrevious();
      } else if (event.key === "ArrowRight" && onNext) {
        event.preventDefault();
        onNext();
      } else if (event.key === "Tab") {
        const controls = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onNext, onPrevious, open]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <motion.div
      ref={dialogRef}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 p-3 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${galleryLabel} fullscreen viewer`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative h-full w-full">
        <Image
          className="object-contain"
          src={image.src}
          alt={image.alt}
          fill
          sizes="100vw"
          priority
        />

        <button
          ref={closeButtonRef}
          type="button"
          className="absolute right-2 top-2 z-10 grid size-11 place-items-center rounded-full border border-white/20 bg-black/65 text-xl text-white shadow-lg backdrop-blur-sm transition hover:scale-105 hover:bg-white hover:text-black focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gold sm:right-3 sm:top-3"
          onClick={onClose}
          aria-label="Close fullscreen image"
        >
          <FiX aria-hidden />
        </button>

        {onPrevious && onNext && (
          <>
            <button
              type="button"
              className="absolute left-2 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/65 text-xl text-white shadow-lg backdrop-blur-sm transition hover:scale-105 hover:bg-gold hover:text-black focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white sm:left-3"
              onClick={onPrevious}
              aria-label="Show previous fullscreen image"
            >
              <FiChevronLeft aria-hidden />
            </button>
            <button
              type="button"
              className="absolute right-2 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/65 text-xl text-white shadow-lg backdrop-blur-sm transition hover:scale-105 hover:bg-gold hover:text-black focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white sm:right-3"
              onClick={onNext}
              aria-label="Show next fullscreen image"
            >
              <FiChevronRight aria-hidden />
            </button>
          </>
        )}

        <div className="pointer-events-none absolute bottom-2 left-1/2 z-10 max-w-[calc(100%-1rem)] -translate-x-1/2 rounded-full bg-black/65 px-4 py-2 text-center text-xs text-white backdrop-blur-sm sm:bottom-3">
          <span>{image.alt}</span>
          {total > 1 && (
            <span className="ml-2 font-bold tabular-nums text-gold">
              {current + 1} / {total}
            </span>
          )}
        </div>
      </div>
    </motion.div>,
    document.body,
  );
}

export const ProjectImageSlider = memo(ProjectImageSliderComponent);
