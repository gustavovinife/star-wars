import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ThemeProvider } from "styled-components";
import { light } from "../../presentation/themes/light";
import { DetailsPage } from "../../presentation/pages/details/page";
import type { IPeople } from "../../domain/entities/people";
import type { IFilm } from "../../domain/entities/films";

const mockNavigate = vi.fn();
const mockUseLocation = vi.fn();

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => mockUseLocation(),
}));

const makeSut = () => {
  return render(
    <ThemeProvider theme={light}>
      <DetailsPage />
    </ThemeProvider>
  );
};

describe("DetailsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("No data state", () => {
    it("should show error message when no data is provided", () => {
      mockUseLocation.mockReturnValue({
        state: null,
      });

      makeSut();

      expect(screen.getByText("No Data Available")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Please navigate from the search results to view details."
        )
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Back To Search" })
      ).toBeInTheDocument();
    });

    it("should navigate back to home when back button is clicked", () => {
      mockUseLocation.mockReturnValue({
        state: null,
      });

      makeSut();

      const backButton = screen.getByRole("button", { name: "Back To Search" });
      fireEvent.click(backButton);

      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  describe("Film details", () => {
    const mockFilm: IFilm = {
      id: "1",
      title: "A New Hope",
      description: "It is a period of civil war. Rebel spaceships...",
      characters: [
        "https://swapi.dev/api/people/1/",
        "https://swapi.dev/api/people/2/",
      ],
    };

    beforeEach(() => {
      mockUseLocation.mockReturnValue({
        state: {
          data: mockFilm,
          type: "films",
        },
      });
    });

    it("should display film details correctly", () => {
      makeSut();

      expect(screen.getByText("A New Hope")).toBeInTheDocument();
      expect(screen.getByText("Opening Crawl:")).toBeInTheDocument();
      expect(
        screen.getByText("It is a period of civil war. Rebel spaceships...")
      ).toBeInTheDocument();
      expect(screen.getByText("Characters:")).toBeInTheDocument();
    });

    it("should display character links", () => {
      makeSut();

      expect(screen.getByText("Character 1")).toBeInTheDocument();
      expect(screen.getByText("Character 2")).toBeInTheDocument();

      const characterLinks = screen.getAllByRole("link");
      expect(characterLinks).toHaveLength(2);
    });

    it("should navigate back when back button is clicked", () => {
      makeSut();

      const backButton = screen.getByRole("button", { name: "Back To Search" });
      fireEvent.click(backButton);

      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  describe("People details", () => {
    const mockPerson: IPeople = {
      id: "1",
      name: "Luke Skywalker",
      films: [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/2/",
      ],
      height: 172,
      mass: 77,
      birth_year: "19BBY",
      gender: "male",
      eyeColor: "blue",
      hair_color: "blond",
    };

    beforeEach(() => {
      mockUseLocation.mockReturnValue({
        state: {
          data: mockPerson,
          type: "people",
        },
      });
    });

    it("should display people details correctly", () => {
      makeSut();

      expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
      expect(screen.getByText("Details:")).toBeInTheDocument();
      expect(screen.getByText("Birth Year: 19BBY")).toBeInTheDocument();
      expect(screen.getByText("Gender: male")).toBeInTheDocument();
      expect(screen.getByText("Eye Color: blue")).toBeInTheDocument();
      expect(screen.getByText("Hair Color: blond")).toBeInTheDocument();
      expect(screen.getByText("Height: 172cm")).toBeInTheDocument();
      expect(screen.getByText("Mass: 77kg")).toBeInTheDocument();
      expect(screen.getByText("Movies:")).toBeInTheDocument();
    });

    it("should display movie links", () => {
      makeSut();

      expect(screen.getByText("Movie 1")).toBeInTheDocument();
      expect(screen.getByText("Movie 2")).toBeInTheDocument();

      const movieLinks = screen.getAllByRole("link");
      expect(movieLinks).toHaveLength(2);
    });

    it("should navigate back when back button is clicked", () => {
      makeSut();

      const backButton = screen.getByRole("button", { name: "Back To Search" });
      fireEvent.click(backButton);

      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
