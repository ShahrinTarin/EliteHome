"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    const smoothWrapperRef = useRef<HTMLDivElement>(null);
    const smoothContentRef = useRef<HTMLDivElement>(null);
    const [isSmoothReady, setIsSmoothReady] = useState(false);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        const ctx = gsap.context(() => {
            ScrollSmoother.create({
                wrapper: smoothWrapperRef.current!,
                content: smoothContentRef.current!,
                smooth: 2.5,
                effects: true,
                smoothTouch: 0.2,
                normalizeScroll: true,
            });
            setIsSmoothReady(true);
        });

        return () => ctx.revert();
    }, []);

    return (
        <div
            id="smooth-wrapper"
            ref={smoothWrapperRef}
            style={isSmoothReady
                ? { overflow: "hidden", height: "100vh", width: "100%" }
                : { width: "100%" }
            }
        >
            <div id="smooth-content" ref={smoothContentRef}>
                {children}
            </div>
        </div>
    );
}