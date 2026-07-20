import Image from "next/image";
import { logos } from "@/content/logos";

export function LogoWall() {
  return (
    <ul className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:grid-cols-7">
      {logos.map((logo) => (
        <li
          key={logo.name}
          className="group flex items-center justify-center rounded-xl border border-zinc-200 bg-white p-4"
        >
          <span className="relative h-12 w-32 opacity-75 grayscale transition group-hover:opacity-100 group-hover:grayscale-0">
            <Image src={logo.src} alt={logo.name} fill sizes="128px" className="object-contain" />
          </span>
        </li>
      ))}
    </ul>
  );
}
