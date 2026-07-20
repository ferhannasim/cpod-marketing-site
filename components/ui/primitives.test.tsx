import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button, ButtonLink } from "./button";
import { Container } from "./container";
import { Section, SectionHeading } from "./section";
import { Card } from "./card";
import { Prose } from "./prose";

describe("Button", () => {
  it("renders a primary button by default", () => {
    render(<Button>Go</Button>);
    expect(screen.getByRole("button", { name: "Go" }).className).toContain("bg-brand");
  });
  it("renders variants", () => {
    render(<Button variant="outline">Alt</Button>);
    expect(screen.getByRole("button", { name: "Alt" }).className).toContain("border");
  });
  it("ButtonLink renders an anchor with the same styling", () => {
    render(<ButtonLink href="/contact">Contact</ButtonLink>);
    const link = screen.getByRole("link", { name: "Contact" });
    expect(link).toHaveAttribute("href", "/contact");
    expect(link.className).toContain("bg-brand");
  });
});

describe("layout primitives", () => {
  it("Container centers content", () => {
    const { container } = render(<Container>x</Container>);
    expect((container.firstChild as HTMLElement).className).toContain("max-w-6xl");
  });
  it("Section renders a section element with an id", () => {
    const { container } = render(<Section id="s1">x</Section>);
    expect(container.querySelector("section#s1")).not.toBeNull();
  });
  it("SectionHeading renders eyebrow and title", () => {
    render(<SectionHeading eyebrow="Why us" title="Printing methods" />);
    expect(screen.getByText("Why us")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Printing methods" })).toBeInTheDocument();
  });
  it("Card and Prose render children", () => {
    render(
      <Card>
        <Prose>
          <p>body</p>
        </Prose>
      </Card>,
    );
    expect(screen.getByText("body")).toBeInTheDocument();
  });
});
