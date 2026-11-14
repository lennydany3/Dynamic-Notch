"use client";

import type { ReactNode } from "react";

/**
 * Crest is Windows-only, so a phone visitor can't install it. Instead of a
 * dead download button they get one that sends the page to themselves, through
 * the native share sheet where there is one and a `mailto:` where there isn't.
 *
 * The URL is a prop, not read here: `site.url` comes from a server-only env
 * var and would be `undefined` in the browser bundle.
 */
export default function SendLink({
  url,
  className,
  children,
}: {
  url: string;
  className?: string;
  children: ReactNode;
}) {
  const send = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Crest for Windows 11",
          text: "Crest: a living notch for Windows 11",
          url,
        });
      } catch {
        /* dismissed the sheet; nothing to do */
      }
      return;
    }
    window.location.href =
      "mailto:?subject=" +
      encodeURIComponent("Crest for Windows 11") +
      "&body=" +
      encodeURIComponent(url);
  };

  return (
    <button type="button" onClick={send} className={className}>
      {children}
    </button>
  );
}
