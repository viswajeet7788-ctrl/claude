"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { heroSlides } from "@/lib/destinations";

export function HeroCarousel({ children }: { readonly children?: ReactNode }) {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((next: number) => {
    setIndex((next + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length);
    }, 6000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  return (
    <section
      aria-label="Featured destinations"
      className="relative mx-auto mt-4 h-[560px] w-full max-w-7xl overflow-hidden rounded-none px-0 md:h-[600px] md:rounded-[2rem] md:px-0"
    >
      {heroSlides.map((slide, i) => (
        <div
          key={slide.id}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            i === index ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={`${slide.location}`}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" />
        </div>
      ))}

      <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-12">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-sm font-medium text-white backdrop-blur-md">
            <MapPin className="size-3.5" />
            {heroSlides[index].location}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold text-white text-balance md:text-6xl">
            {heroSlides[index].title}
          </h1>
          <p className="mt-3 max-w-xl text-base text-white/85 text-pretty md:text-lg">
            {heroSlides[index].tagline}
          </p>
          {children ? <div className="mt-8 flex w-full justify-center">{children}</div> : null}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {heroSlides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show ${slide.location}`}
                aria-current={i === index}
                className={cn(
                  "h-1.5 rounded-full bg-white/50 transition-all",
                  i === index ? "w-8 bg-white" : "w-4 hover:bg-white/80",
                )}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className="flex size-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/30"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="flex size-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/30"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
