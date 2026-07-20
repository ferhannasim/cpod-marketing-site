import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { VideoEmbed } from "./video-embed";
import { LogoWall } from "./logo-wall";
import { TestimonialList } from "./testimonial-list";
import { StepList } from "./step-list";
import { logos } from "@/content/logos";
import { testimonials } from "@/content/testimonials";
import { steps } from "@/content/steps";

describe("VideoEmbed", () => {
  it("renders a poster button and no dialog before click", () => {
    render(<VideoEmbed id="Hz8PK6i8ZsE" title="Intro" />);
    expect(screen.getByRole("button", { name: "Play video: Intro" })).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  it("opens a modal with the playing video on click, and closes it", () => {
    render(<VideoEmbed id="Hz8PK6i8ZsE" title="Intro" />);
    fireEvent.click(screen.getByRole("button", { name: "Play video: Intro" }));
    const dialog = screen.getByRole("dialog");
    const iframe = dialog.querySelector("iframe");
    expect(iframe?.getAttribute("src")).toContain("youtube-nocookie.com/embed/Hz8PK6i8ZsE");
    expect(iframe?.getAttribute("title")).toBe("Intro");
    fireEvent.click(screen.getByRole("button", { name: "Close video" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("LogoWall", () => {
  it("renders all 14 supplier logos with alt text and no links", () => {
    const { container } = render(<LogoWall />);
    expect(logos).toHaveLength(14);
    for (const logo of logos) expect(screen.getByAltText(logo.name)).toBeInTheDocument();
    expect(container.querySelector("a")).toBeNull();
  });
});

describe("TestimonialList", () => {
  it("renders the 3 reviews with 5-star ratings", () => {
    render(<TestimonialList />);
    expect(testimonials).toHaveLength(3);
    for (const t of testimonials) expect(screen.getByText(t.name)).toBeInTheDocument();
    expect(screen.getAllByRole("img", { name: "5 out of 5 stars" })).toHaveLength(3);
  });
});

describe("StepList", () => {
  it("renders the 5 steps as an ordered list", () => {
    render(<StepList />);
    expect(steps).toHaveLength(5);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(5);
    expect(items[0]).toHaveTextContent("Pick a product");
  });
});
