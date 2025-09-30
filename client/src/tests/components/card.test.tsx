import { render, screen } from "@testing-library/react";
import { Card } from "../../components";
import { it, describe, expect } from "vitest";
import { ThemeProvider } from "styled-components";
import { light } from "../../presentation/themes/light";
import type { CardProps } from "../../components/common/card/component";

const makeSut = (props: CardProps) => {
  return render(
    <ThemeProvider theme={light}>
      <Card {...props}>Card</Card>
    </ThemeProvider>
  );
};

describe("Card component", () => {
  it("should render", () => {
    makeSut({ children: "Card" });

    const card = screen.getByTestId("card");
    expect(card).toBeInTheDocument();
  });
});
