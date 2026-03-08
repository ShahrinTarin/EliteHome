"use client";

import { Linkedin, Gamepad2, FacebookIcon, InstagramIcon, XIcon } from "lucide-react";

const SOCIAL_LINKS = [
  { id: "facebook",  label: "Facebook",  href: "#", Icon: FacebookIcon  },
  { id: "instagram", label: "Instagram", href: "#", Icon: InstagramIcon },
  { id: "linkedin",  label: "LinkedIn",  href: "#", Icon: Linkedin      },
  { id: "discord",   label: "Discord",   href: "#", Icon: Gamepad2      },
  { id: "x",         label: "X",         href: "#", Icon: XIcon         },
];

type IconComponent = React.ComponentType<{ size?: number; strokeWidth?: number }>;

function SocialItem({ label, href, Icon, index }: {
  id: string; label: string; href: string; Icon: IconComponent; index: number;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className={`group relative flex items-center justify-end animate-slide-up stagger-${index + 1}`}
    >
      {/* Tooltip */}
      <span className="
        pointer-events-none absolute right-full mr-3
        px-2 py-0.5 rounded
        bg-primary text-primary-foreground
        text-[8px] font-medium uppercase tracking-[2px] whitespace-nowrap
        opacity-0 translate-x-1.5
        transition-all duration-200 ease-out
        group-hover:opacity-100 group-hover:translate-x-0
      ">
        {label}
        <span className="absolute left-full top-1/2 -translate-y-1/2 border-y-4 border-y-transparent border-l-4 border-l-primary" />
      </span>

      {/* Icon */}
      <div
        className="
          flex h-9 w-9 items-center justify-center
          rounded border border-white/15
          text-white/60 backdrop-blur-sm
          transition-all duration-300 ease-out
          group-hover:scale-110
          group-hover:border-transparent
        "
        style={{
          background: "rgba(239, 191, 4, 0.08)",
          boxShadow: "0 0 10px rgba(239, 191, 4, 0.18), inset 0 0 8px rgba(239, 191, 4, 0.06)",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.background = "rgba(239, 191, 4, 0.85)";
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 0 20px rgba(239, 191, 4, 0.7), 0 0 40px rgba(239, 191, 4, 0.3), inset 0 0 12px rgba(255,255,255,0.1)";
          (e.currentTarget as HTMLDivElement).style.color = "#1a0f00";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.background = "rgba(239, 191, 4, 0.08)";
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 0 10px rgba(239, 191, 4, 0.18), inset 0 0 8px rgba(239, 191, 4, 0.06)";
          (e.currentTarget as HTMLDivElement).style.color = "rgba(255,255,255,0.6)";
        }}
      >
        <Icon size={16} strokeWidth={1.5} />
      </div>
    </a>
  );
}

export default function SocialStickyNav() {
  return (
    <div
      className="absolute right-0 z-20 flex flex-col items-end gap-1.5 pr-3"
      style={{ top: "55%", transform: "translateY(-50%)" }}
    >
      {/* Top line */}
      <span
        className="mr-4.5 block w-px h-8 rounded-full"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(239,191,4,0.35))" }}
      />

      {SOCIAL_LINKS.map(({ id, label, href, Icon }, i) => (
        <SocialItem key={id} id={id} label={label} href={href} Icon={Icon} index={i} />
      ))}

      {/* Bottom line */}
      <span
        className="mr-4.5 block w-px h-8 rounded-full"
        style={{ background: "linear-gradient(to top, transparent, rgba(239,191,4,0.35))" }}
      />
    </div>
  );
}