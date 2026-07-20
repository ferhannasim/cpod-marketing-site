import Image from "next/image";
import { logos } from "@/content/logos";

export function LogoWall() {
  return (
    <ul className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:grid-cols-7">
      {logos.map((logo) => (
        <li key={logo.name} className="flex items-center justify-center">
          <span className="relative h-12 w-32">
            <Image src={logo.src} alt={logo.name} fill sizes="128px" className="object-contain" />
          </span>
        </li>
      ))}
    </ul>
  );
}
