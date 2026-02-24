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
      <div className="
        flex h-9 w-9 items-center justify-center
        rounded border border-white/8
        bg-white/5 text-white/50 backdrop-blur-sm
        transition-all duration-200 ease-out
        group-hover:bg-primary group-hover:text-white
        group-hover:border-transparent group-hover:scale-105
        group-hover:shadow-[0_0_14px_hsl(var(--primary)/0.4)]
      ">
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
      <span className="mr-4.5 block w-px h-8 rounded-full bg-linear-to-b from-transparent to-white/20" />

      {SOCIAL_LINKS.map(({ id, label, href, Icon }, i) => (
        <SocialItem key={id} id={id} label={label} href={href} Icon={Icon} index={i} />
      ))}

      <span className="mr-4.5 block w-px h-8 rounded-full bg-linear-to-t from-transparent to-white/20" />
    </div>
  );
}