import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "../../components/";
import { it, describe, expect, vi } from "vitest";
import { ThemeProvider } from "styled-components";
import { light } from "../../presentation/themes/light";
import type { ButtonProps } from "../../components/common/button/component";

const makeSut = (props: ButtonProps) => {
  return render(
    <ThemeProvider theme={light}>
      <Button {...props}>Button</Button>
    </ThemeProvider>
  );
};

describe("Button component", () => {
  it("should render", () => {
    makeSut({ children: "Button" });

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    const onClick = vi.fn();
    makeSut({ onClick, children: "Button" });

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it("should not call onClick when disabled", () => {
    const onClick = vi.fn();
    makeSut({ onClick, children: "Button", disabled: true });

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("should have aria-label when provided", () => {
    makeSut({ children: "Button", ariaLabel: "Button" });

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Button");
  });
});
