"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    const smoothWrapperRef = useRef<HTMLDivElement>(null);
    const smoothContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollSmoother.create({
                wrapper: smoothWrapperRef.current!,
                content: smoothContentRef.current!,
                smooth: 1.4,           // inertia — higher = more silky
                effects: true,         // enables data-speed / data-lag parallax
                smoothTouch: 0.1,      // subtle on touch devices
                normalizeScroll: true, // prevents address bar jump on mobile
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div id="smooth-wrapper" ref={smoothWrapperRef} style={{ overflow: "hidden", height: "100vh", width: "100%" }}>
            <div id="smooth-content" ref={smoothContentRef}>
                {children}
            </div>
        </div>
    );
}