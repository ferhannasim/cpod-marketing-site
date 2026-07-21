import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { redirectList } from "./lib/redirects";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  async redirects() {
    return redirectList;
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
