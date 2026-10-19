"use client";

import { useCallback, useEffect, useRef } from "react";

interface UseSliderOptions {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  horizontal?: boolean;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function useSlider({
  value,
  min = 0,
  max = 100,
  onChange,
  horizontal = true,
}: UseSliderOptions) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  const valueFromEvent = useCallback(
    (clientX: number, clientY: number) => {
      const track = trackRef.current;
      if (!track) return value;

      const rect = track.getBoundingClientRect();
      const ratio = horizontal
        ? (clientX - rect.left) / rect.width
        : 1 - (clientY - rect.top) / rect.height;

      return clamp(ratio, 0, 1) * (max - min) + min;
    },
    [horizontal, max, min, value]
  );

  const scheduleChange = useCallback(
    (next: number) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        onChange(clamp(next, min, max));
      });
    },
    [max, min, onChange]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      scheduleChange(valueFromEvent(e.clientX, e.clientY));
    },
    [scheduleChange, valueFromEvent]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
      scheduleChange(valueFromEvent(e.clientX, e.clientY));
    },
    [scheduleChange, valueFromEvent]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const step = e.shiftKey ? 10 : 1;
      let next = value;

      if (horizontal) {
        if (e.key === "ArrowRight") next += step;
        if (e.key === "ArrowLeft") next -= step;
      } else {
        if (e.key === "ArrowUp") next += step;
        if (e.key === "ArrowDown") next -= step;
      }

      if (next !== value) {
        e.preventDefault();
        onChange(clamp(next, min, max));
      }
    },
    [horizontal, max, min, onChange, value]
  );

  const percent = ((value - min) / (max - min)) * 100;

  return {
    trackRef,
    percent,
    handlePointerDown,
    handlePointerMove,
    handleKeyDown,
  };
}
