import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ThemeProvider } from "styled-components";
import { light } from "../../presentation/themes/light";
import { DetailsPage } from "../../presentation/pages/details/page";
import type { IPeople } from "../../domain/entities/people";
import type { IFilm } from "../../domain/entities/films";

const mockNavigate = vi.fn();
const mockUseParams = vi.fn();
const mockGetSinglePerson = vi.fn();
const mockGetSingleFilm = vi.fn();

let mockUseStarWarsReturn = {
  singlePerson: null as IPeople | null,
  singleFilm: null as IFilm | null,
  loading: false,
  error: null as string | null,
  getSinglePerson: mockGetSinglePerson,
  getSingleFilm: mockGetSingleFilm,
};

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
  useParams: () => mockUseParams(),
}));

vi.mock("../../hooks/useStarWars", () => ({
  useStarWars: () => mockUseStarWarsReturn,
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

  describe("Loading state", () => {
    it("should show loading message when loading is true", () => {
      mockUseParams.mockReturnValue({ type: "people", id: "1" });
      mockUseStarWarsReturn = {
        singlePerson: null,
        singleFilm: null,
        loading: true,
        error: null,
        getSinglePerson: mockGetSinglePerson,
        getSingleFilm: mockGetSingleFilm,
      };

      makeSut();

      expect(screen.getByText("Loading...")).toBeInTheDocument();
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
      mockUseParams.mockReturnValue({ type: "films", id: "1" });
      mockUseStarWarsReturn = {
        singlePerson: null,
        singleFilm: mockFilm,
        loading: false,
        error: null,
        getSinglePerson: mockGetSinglePerson,
        getSingleFilm: mockGetSingleFilm,
      };
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

    it("should have back to search button", () => {
      makeSut();

      const backButton = screen.getByRole("button", { name: "Back To Search" });
      expect(backButton).toBeInTheDocument();

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
      mockUseParams.mockReturnValue({ type: "people", id: "1" });
      mockUseStarWarsReturn = {
        singlePerson: mockPerson,
        singleFilm: null,
        loading: false,
        error: null,
        getSinglePerson: mockGetSinglePerson,
        getSingleFilm: mockGetSingleFilm,
      };
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

    it("should have back to search button", () => {
      makeSut();

      const backButton = screen.getByRole("button", { name: "Back To Search" });
      expect(backButton).toBeInTheDocument();

      fireEvent.click(backButton);
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
