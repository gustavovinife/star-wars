import { render, screen } from "@testing-library/react";
import { Input } from "../../components";
import { it, describe, expect } from "vitest";
import { ThemeProvider } from "styled-components";
import { light } from "../../presentation/themes/light";
import type { InputProps } from "../../components/common/input/component";

const makeSut = (props: InputProps) => {
  return render(
    <ThemeProvider theme={light}>
      <Input {...props} />
    </ThemeProvider>
  );
};

describe("Input component", () => {
  it("should render", () => {
    makeSut({ placeholder: "Input" });

    const input = screen.getByPlaceholderText("Input");
    expect(input).toBeInTheDocument();
  });

  it("should have aria-label when provided", () => {
    makeSut({ placeholder: "Input", ariaLabel: "Input" });

    const input = screen.getByPlaceholderText("Input");
    expect(input).toHaveAttribute("aria-label", "Input");
  });

  it("should have required when provided", () => {
    makeSut({ placeholder: "Input", required: true });

    const input = screen.getByPlaceholderText("Input");
    expect(input).toHaveAttribute("required");
  });
});
