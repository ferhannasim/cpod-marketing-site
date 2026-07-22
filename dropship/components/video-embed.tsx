"use client";

import { useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { Play, X } from "lucide-react";

export function VideoEmbed({ id, title, priority = false }: { id: string; title: string; priority?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={`Play video: ${title}`}
          className="group relative block aspect-video w-full overflow-hidden rounded-xl"
        >
          <Image
            src={`/images/videos/${id}.jpg`}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority={priority}
            className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none"
          />
          <span className="absolute inset-0 grid place-items-center bg-black/30">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-brand text-white shadow-lg">
              <Play aria-hidden className="h-7 w-7 translate-x-0.5" fill="currentColor" />
            </span>
          </span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,64rem)] -translate-x-1/2 -translate-y-1/2 focus:outline-none"
        >
          <Dialog.Title className="sr-only">{title}</Dialog.Title>
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl">
            <Dialog.Close
              aria-label="Close video"
              className="absolute right-2 top-2 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-white"
            >
              <X aria-hidden className="h-7 w-7" />
            </Dialog.Close>
            {open ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : null}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
