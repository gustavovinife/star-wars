import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ThemeProvider } from "styled-components";
import { light } from "../../presentation/themes/light";
import { HomePage } from "../../presentation/pages/home/page";
import type { IPeople } from "../../domain/entities/people";
import type { IFilm } from "../../domain/entities/films";

const mockUseStarWars = vi.fn();
const mockNavigate = vi.fn();

vi.mock("../../hooks/useStarWars", () => ({
  useStarWars: () => mockUseStarWars(),
}));

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

const makeSut = () => {
  return render(
    <ThemeProvider theme={light}>
      <HomePage />
    </ThemeProvider>
  );
};

describe("HomePage", () => {
  const mockSearchPeople = vi.fn();
  const mockSearchFilms = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();

    mockUseStarWars.mockReturnValue({
      people: [],
      films: [],
      loading: false,
      error: null,
      searchPeople: mockSearchPeople,
      searchFilms: mockSearchFilms,
    });
  });

  describe("Initial render", () => {
    it("should render the search form with default state", () => {
      makeSut();

      expect(
        screen.getByText("What are you searching for?")
      ).toBeInTheDocument();
      expect(screen.getByLabelText("People")).toBeInTheDocument();
      expect(screen.getByLabelText("Movies")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("e.g. Chewbacca, Yoda, Boba Fett")
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Search" })).toBeDisabled();
    });

    it("should show empty results message initially", () => {
      makeSut();

      expect(screen.getByText("Results")).toBeInTheDocument();
      expect(
        screen.getByText(
          "There are zero matches. Use the form to search for People or Movies."
        )
      ).toBeInTheDocument();
    });
  });

  describe("Search type switching", () => {
    it("should switch to movies search type and update placeholder", () => {
      makeSut();

      const moviesRadio = screen.getByLabelText("Movies");
      fireEvent.click(moviesRadio);

      expect(
        screen.getByPlaceholderText("e.g. The Empire Strikes Back")
      ).toBeInTheDocument();
    });

    it("should clear search input when switching search types", () => {
      makeSut();

      const searchInput = screen.getByPlaceholderText(
        "e.g. Chewbacca, Yoda, Boba Fett"
      );
      fireEvent.change(searchInput, { target: { value: "Luke" } });

      expect(searchInput).toHaveValue("Luke");

      const moviesRadio = screen.getByLabelText("Movies");
      fireEvent.click(moviesRadio);

      expect(searchInput).toHaveValue("");
    });
  });

  describe("Search functionality", () => {
    it("should enable search button when input has value", () => {
      makeSut();

      const searchInput = screen.getByPlaceholderText(
        "e.g. Chewbacca, Yoda, Boba Fett"
      );
      const searchButton = screen.getByRole("button", { name: "Search" });

      expect(searchButton).toBeDisabled();

      fireEvent.change(searchInput, { target: { value: "Luke" } });
      expect(searchButton).toBeEnabled();
    });

    it("should call searchPeople when searching for people", () => {
      makeSut();

      const searchInput = screen.getByPlaceholderText(
        "e.g. Chewbacca, Yoda, Boba Fett"
      );
      const searchButton = screen.getByRole("button", { name: "Search" });

      fireEvent.change(searchInput, { target: { value: "Luke Skywalker" } });
      fireEvent.click(searchButton);

      expect(mockSearchPeople).toHaveBeenCalledWith("Luke Skywalker");
      expect(mockSearchFilms).not.toHaveBeenCalled();
    });

    it("should call searchFilms when searching for movies", () => {
      makeSut();

      const moviesRadio = screen.getByLabelText("Movies");
      fireEvent.click(moviesRadio);

      const searchInput = screen.getByPlaceholderText(
        "e.g. The Empire Strikes Back"
      );
      const searchButton = screen.getByRole("button", { name: "Search" });

      fireEvent.change(searchInput, { target: { value: "A New Hope" } });
      fireEvent.click(searchButton);

      expect(mockSearchFilms).toHaveBeenCalledWith("A New Hope");
      expect(mockSearchPeople).not.toHaveBeenCalled();
    });
  });

  describe("Loading state", () => {
    it("should show loading message when loading is true", () => {
      mockUseStarWars.mockReturnValue({
        people: [],
        films: [],
        loading: true,
        error: null,
        searchPeople: mockSearchPeople,
        searchFilms: mockSearchFilms,
      });

      makeSut();

      expect(screen.getByText("Searching...")).toBeInTheDocument();
      expect(
        screen.queryByText(
          "There are zero matches. Use the form to search for People or Movies."
        )
      ).not.toBeInTheDocument();
    });
  });

  describe("People search results", () => {
    it("should display people search results", () => {
      const mockPeople: IPeople[] = [
        {
          id: "1",
          name: "Luke Skywalker",
          films: [],
          height: 172,
          mass: 77,
          birth_year: "19BBY",
          gender: "male",
          eyeColor: "blue",
          hair_color: "blond",
        },
        {
          id: "2",
          name: "Darth Vader",
          films: [],
          height: 202,
          mass: 136,
          birth_year: "41.9BBY",
          gender: "male",
          eyeColor: "yellow",
          hair_color: "none",
        },
      ];

      mockUseStarWars.mockReturnValue({
        people: mockPeople,
        films: [],
        loading: false,
        error: null,
        searchPeople: mockSearchPeople,
        searchFilms: mockSearchFilms,
      });

      makeSut();

      expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
      expect(screen.getByText("Darth Vader")).toBeInTheDocument();
      expect(screen.getAllByText("See Details")).toHaveLength(2);
    });
  });

  describe("Films search results", () => {
    it("should display films search results when movies search type is selected", () => {
      const mockFilms: IFilm[] = [
        {
          id: "1",
          title: "A New Hope",
          description: "It is a period of civil war...",
          characters: [],
        },
        {
          id: "2",
          title: "The Empire Strikes Back",
          description: "It is a dark time for the Rebellion...",
          characters: [],
        },
      ];

      mockUseStarWars.mockReturnValue({
        people: [],
        films: mockFilms,
        loading: false,
        error: null,
        searchPeople: mockSearchPeople,
        searchFilms: mockSearchFilms,
      });

      makeSut();

      const moviesRadio = screen.getByLabelText("Movies");
      fireEvent.click(moviesRadio);

      expect(screen.getByText("A New Hope")).toBeInTheDocument();
      expect(screen.getByText("The Empire Strikes Back")).toBeInTheDocument();
      expect(screen.getAllByText("See Details")).toHaveLength(2);
    });

    it("should not display films when people search type is selected", () => {
      const mockFilms: IFilm[] = [
        {
          id: "1",
          title: "A New Hope",
          description: "It is a period of civil war...",
          characters: [],
        },
      ];

      mockUseStarWars.mockReturnValue({
        people: [],
        films: mockFilms,
        loading: false,
        error: null,
        searchPeople: mockSearchPeople,
        searchFilms: mockSearchFilms,
      });

      makeSut();

      expect(screen.queryByText("A New Hope")).not.toBeInTheDocument();
    });
  });
});
