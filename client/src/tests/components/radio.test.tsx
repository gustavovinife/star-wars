import { render, screen } from "@testing-library/react";
import { Radio } from "../../components";
import { it, describe, expect } from "vitest";
import { ThemeProvider } from "styled-components";
import { light } from "../../presentation/themes/light";
import type { RadioProps } from "../../components/common/radio/component";

const makeSut = (props: RadioProps) => {
  return render(
    <ThemeProvider theme={light}>
      <Radio {...props} />
    </ThemeProvider>
  );
};

describe("Radio component", () => {
  it("should render", () => {
    makeSut({ label: "Radio" });

    const radio = screen.getByLabelText("Radio");
    expect(radio).toBeInTheDocument();
  });

  it("should have aria-label when provided", () => {
    makeSut({ label: "Radio", ariaLabel: "Radio" });

    const radio = screen.getByLabelText("Radio");
    expect(radio).toHaveAttribute("aria-label", "Radio");
  });

  it("should have required when provided", () => {
    makeSut({ label: "Radio", required: true });

    const radio = screen.getByLabelText("Radio");
    expect(radio).toHaveAttribute("required");
  });
});
