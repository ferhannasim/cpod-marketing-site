import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "./page";
import { allVideos, featuredVideo, moreVideos } from "@/content/videos";

describe("video library page", () => {
  it("lists the featured video plus every video in the strip", () => {
    expect(allVideos).toHaveLength(moreVideos.length + 1);
    expect(allVideos[0]).toEqual(featuredVideo);
  });

  it("renders a playable facade for every video", () => {
    render(<Page />);
    expect(screen.getAllByRole("button", { name: /^Play video:/ })).toHaveLength(allVideos.length);
  });

  it("renders each video title as visible text", () => {
    render(<Page />);
    for (const video of allVideos) {
      expect(screen.getByText(video.title)).toBeInTheDocument();
    }
  });

  it("renders the page heading as the only h1", () => {
    render(<Page />);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(/video library/i);
  });
});
