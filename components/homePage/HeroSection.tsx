"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { useIsLight } from "@/lib/hooks/herohooks/useislight";
import { heroImages, heroSlides } from "@/lib/mockdata";
import SocialStickyNav from "./Socialstickynav";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-montserrat",
  display: "swap",
});

const DURATION = 1.1;
const EASE = "power4.inOut";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const outerRefs = useRef<HTMLDivElement[]>([]);
  const imgRefs = useRef<HTMLDivElement[]>([]);
  const textRefs = useRef<HTMLDivElement[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const isAnimating = useRef(false);
  const scrollBuffer = useRef(0);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isLight = useIsLight();

  const goTo = useCallback(
    (index: number) => {
      if (
        isAnimating.current ||
        index === current ||
        index < 0 ||
        index >= heroSlides.length
      )
        return;
      isAnimating.current = true;

      const direction = index > current ? 1 : -1;
      const outgoing = current;
      const incoming = index;

      const tl = gsap.timeline({
        onComplete: () => {
          heroSlides.forEach((_, i) => {
            if (i !== incoming) {
              gsap.set(outerRefs.current[i], {
                x: i < incoming ? "-100%" : "100%",
                zIndex: 0,
              });
              gsap.set(imgRefs.current[i], { x: "0%" });
            }
          });
          isAnimating.current = false;
        },
      });

      if (progressRef.current) {
        tl.set(
          progressRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          0
        ).to(
          progressRef.current,
          { scaleX: 1, duration: DURATION, ease: "power2.inOut" },
          0
        );
      }

      gsap.set(outerRefs.current[incoming], {
        x: direction > 0 ? "100%" : "-100%",
        zIndex: 2,
      });
      gsap.set(outerRefs.current[outgoing], { zIndex: 1 });
      gsap.set(imgRefs.current[incoming], {
        x: direction > 0 ? "-4%" : "4%",
      });

      tl.to(
        outerRefs.current[outgoing],
        { x: direction > 0 ? "-100%" : "100%", duration: DURATION, ease: EASE },
        0
      );
      tl.to(
        imgRefs.current[outgoing],
        { x: direction > 0 ? "4%" : "-4%", duration: DURATION, ease: EASE },
        0
      );
      tl.to(outerRefs.current[incoming], { x: "0%", duration: DURATION, ease: EASE }, 0);
      tl.to(
        imgRefs.current[incoming],
        { x: "0%", duration: DURATION * 1.15, ease: "power3.out" },
        0
      );

      const outAnims = textRefs.current[outgoing]?.querySelectorAll(".anim");
      if (outAnims?.length) {
        tl.to(
          outAnims,
          {
            y: direction > 0 ? -24 : 24,
            opacity: 0,
            duration: 0.4,
            stagger: { each: 0.03, from: direction > 0 ? "start" : "end" },
            ease: "power2.in",
          },
          0
        );
      }

      const inAnims = textRefs.current[incoming]?.querySelectorAll(".anim");
      if (inAnims?.length) {
        gsap.set(inAnims, { y: direction > 0 ? 48 : -48, opacity: 0, filter: "blur(6px)" });
        tl.to(
          inAnims,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: { each: 0.1, from: "start" },
            ease: "power3.out",
          },
          DURATION * 0.45
        );
      }

      setCurrent(incoming);
    },
    [current]
  );

  useEffect(() => {
    heroSlides.forEach((_, i) => {
      const anims = textRefs.current[i]?.querySelectorAll(".anim");
      if (anims) gsap.set(anims, { opacity: 0, y: 40, filter: "blur(6px)" });

      if (i === 0) {
        gsap.set(outerRefs.current[i], { x: "0%", zIndex: 1 });
        gsap.set(imgRefs.current[i], { x: "0%" });
      } else {
        gsap.set(outerRefs.current[i], { x: "100%", zIndex: 0 });
        gsap.set(imgRefs.current[i], { x: "0%" });
      }
    });

    const firstAnims = textRefs.current[0]?.querySelectorAll(".anim");
    if (firstAnims) {
      gsap.to(firstAnims, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.1,
        stagger: 0.13,
        ease: "power3.out",
        delay: 0.5,
      });
    }
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const hero = containerRef.current;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      if (rect.top > 0 || rect.bottom < window.innerHeight * 0.5) return;

      scrollBuffer.current += e.deltaY;
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        scrollBuffer.current = 0;
      }, 300);

      if (Math.abs(scrollBuffer.current) > 80) {
        const dir = scrollBuffer.current > 0 ? 1 : -1;
        scrollBuffer.current = 0;
        const next = current + dir;
        if (next < 0 || next >= heroSlides.length) return;
        e.preventDefault();
        goTo(next);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [current, goTo]);

  return (
    <section
      ref={containerRef}
      className={`${cormorant.variable} ${montserrat.variable} relative w-full h-dvh overflow-hidden bg-background`}
    >
      {/* Grain texture */}
      <div className="hero-grain" />

      {/* Slide progress bar */}
      <div
        ref={progressRef}
        className="hero-progress absolute top-0 left-0 w-full h-0.5 bg-primary z-50 origin-left scale-x-0"
      />

      {/* Slide images */}
      {heroImages.map((img, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) outerRefs.current[i] = el;
          }}
          className="absolute inset-0 overflow-hidden will-change-transform"
        >
          <div
            ref={(el) => {
              if (el) imgRefs.current[i] = el;
            }}
            className="absolute inset-0 will-change-transform"
          >
            <Image
              src={img.src}
              alt={`Hero ${i + 1}`}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: img.position }}
            />
          </div>
          <div className={isLight ? "hero-overlay-light" : "hero-overlay-dark"} />
        </div>
      ))}

      {/* Slide text content */}
      {heroSlides.map((slide, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) textRefs.current[i] = el;
          }}
          className={`absolute inset-0 flex flex-col justify-center px-[8vw] pt-20 sm:pt-20 z-10 ${
            i === current ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div className="anim slide-num mb-4 sm:mb-4.5 font-(family-name:--font-montserrat) text-xs tracking-[3px] uppercase text-primary/80 transition-colors duration-700">
            {slide.label}
          </div>

          <h1 className="anim font-(family-name:--font-cormorant) text-[clamp(64px,9vw,128px)] sm:text-[clamp(84px,9vw,128px)] font-light leading-[1.04] tracking-[-0.5px] mb-4 sm:mb-7.5 whitespace-pre-line text-white/95 transition-colors duration-700">
            {slide.title}
          </h1>

          <div className="anim w-16 h-0.5 bg-primary/70 mb-3 sm:mb-6" />

          <p className="anim font-(family-name:--font-montserrat) font-light text-[clamp(11px,1.45vw,18px)] sm:text-[clamp(13px,1.45vw,18px)] tracking-[0.6px] mb-6 sm:mb-11 max-w-120 leading-[1.7] sm:leading-[1.9] text-white/65 transition-colors duration-700">
            {slide.subtitle}
          </p>

          <div className="anim">
            <a href="#listings" className="hero-cta">
              {slide.cta}
              <span className="hero-cta-arrow" />
            </a>
          </div>
        </div>
      ))}

      {/* Dot navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3.5 items-center">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-5 h-2 bg-primary shadow-[0_0_10px_2px_hsl(var(--primary)/0.5)]"
                : "w-2 h-2 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-[8vw] z-20 flex flex-col items-center gap-2">
        <div className="scroll-arrow">
          <div className="scroll-arrow-icon" />
          <span className="scroll-arrow-label">Scroll</span>
        </div>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-8 right-[4vw] z-20 font-(family-name:--font-cormorant) text-3xl md:text-5xl tracking-[2px] text-white/35 transition-colors duration-700">
        {String(current + 1).padStart(2, "0")}
        <span className="mx-1.5 text-white/18">/</span>
        {String(heroSlides.length).padStart(2, "0")}
      </div>

      <SocialStickyNav />
    </section>
  );
}