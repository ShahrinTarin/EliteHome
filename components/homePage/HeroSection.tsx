"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Cormorant_Garamond, Montserrat } from "next/font/google";

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

const images = [
  { src: "/heroimages/heroimg1.png", position: "center center" },
  { src: "/heroimages/heroimg2.png", position: "60% center" },
  { src: "/heroimages/heroimg3.png", position: "center center" },
];

const slides = [
  {
    label: "01 / Modern Living",
    title: "Redefine\nYour Space",
    subtitle: "Luxury homes curated for the discerning few.",
    cta: "Explore Properties",
  },
  {
    label: "02 / Premium Estates",
    title: "Where Dreams\nTake Form",
    subtitle: "Architecture that speaks before you walk inside.",
    cta: "View Listings",
  },
  {
    label: "03 / Exclusive Deals",
    title: "Invest in\nTimeless Value",
    subtitle: "The finest properties in the most coveted locations.",
    cta: "Get Started",
  },
];

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

  const DURATION = 1.1;
  const EASE = "power4.inOut";

  const goTo = useCallback(
    (index: number) => {
      if (
        isAnimating.current ||
        index === current ||
        index < 0 ||
        index >= slides.length
      )
        return;
      isAnimating.current = true;

      const direction = index > current ? 1 : -1;
      const outgoing = current;
      const incoming = index;

      const tl = gsap.timeline({
        onComplete: () => {
          slides.forEach((_, i) => {
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
    slides.forEach((_, i) => {
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
        if (next < 0 || next >= slides.length) return;
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
      className={`hero-section ${cormorant.variable} ${montserrat.variable}`}
      style={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        overflow: "hidden",
        background: "#05040a",
        fontFamily: cormorant.style.fontFamily,
      }}
    >
      {/* Grain texture */}
      <div className="hero-grain" />

      {/* Slide progress bar */}
      <div ref={progressRef} className="hero-progress" />

      {/* Slide images */}
      {images.map((img, i) => (
        <div
          key={i}
          ref={(el) => { if (el) outerRefs.current[i] = el; }}
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            willChange: "transform",
          }}
        >
          <div
            ref={(el) => { if (el) imgRefs.current[i] = el; }}
            style={{ position: "absolute", inset: 0, willChange: "transform" }}
          >
            <Image
              src={img.src}
              alt={`Hero ${i + 1}`}
              fill
              priority={i === 0}
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: img.position }}
            />
          </div>
          <div className="hero-overlay" />
        </div>
      ))}

      {/* Slide text content */}
      {slides.map((slide, i) => (
        <div
          key={i}
          ref={(el) => { if (el) textRefs.current[i] = el; }}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px 8vw 0 8vw",
            zIndex: 10,
            pointerEvents: i === current ? "auto" : "none",
          }}
        >
          <div className="anim slide-num" style={{ marginBottom: 22 }}>
            {slide.label}
          </div>

          <h1
            className="anim hero-title"
            style={{
              fontSize: "clamp(50px, 6.8vw, 96px)",
              fontWeight: 300,
              lineHeight: 1.04,
              color: "#fff",
              letterSpacing: "-0.5px",
              margin: "0 0 26px",
              whiteSpace: "pre-line",
              fontFamily: cormorant.style.fontFamily,
            }}
          >
            {slide.title}
          </h1>

          {/* Gold divider */}
          <div
            className="anim"
            style={{
              width: 48,
              height: 1,
              background: "hsl(45 97% 47% / 0.7)",
              marginBottom: 22,
            }}
          />

          <p
            className="anim hero-subtitle"
            style={{
              fontFamily: montserrat.style.fontFamily,
              fontWeight: 300,
              fontSize: "clamp(12px, 1.2vw, 15px)",
              color: "rgba(255,255,255,0.70)",
              letterSpacing: "0.6px",
              marginBottom: 44,
              maxWidth: 360,
              lineHeight: 1.8,
            }}
          >
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

      {/* Navigation dots */}
      <div
        style={{
          position: "absolute",
          bottom: 96,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
          display: "flex",
          gap: 14,
          alignItems: "center",
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero-dot ${i === current ? "active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 84, left: "8vw", zIndex: 20 }}>
        <div className="scroll-arrow">
          <div className="scroll-arrow-icon" />
          <span className="scroll-arrow-label">Scroll</span>
        </div>
      </div>

      {/* Slide counter */}
      <div
        className="hero-counter"
        style={{
          position: "absolute",
          bottom: 98,
          right: "4vw",
          zIndex: 20,
          fontFamily: cormorant.style.fontFamily,
          fontSize: 43,
          color: "rgba(255,255,255,0.35)",
          letterSpacing: 2,
        }}
      >
        {String(current + 1).padStart(2, "0")}
        <span
          className="hero-counter-sep"
          style={{ margin: "0 6px", color: "rgba(255,255,255,0.15)" }}
        >
          /
        </span>
        {String(slides.length).padStart(2, "0")}
      </div>
    </section>
  );
}