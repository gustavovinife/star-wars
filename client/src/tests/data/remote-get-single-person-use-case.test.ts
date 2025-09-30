import { RemoteGetSinglePersonUseCase } from "../../data/usecases/remote-get-single-person-use-case";
import { describe, it, expect, beforeEach, vi } from "vitest";

const mockFetch = vi.fn();
(globalThis as any).fetch = mockFetch;

describe("RemoteGetSinglePersonUseCase", () => {
  let useCase: RemoteGetSinglePersonUseCase;
  const mockUrl = "https://api.example.com";

  beforeEach(() => {
    useCase = new RemoteGetSinglePersonUseCase(mockUrl);
    vi.clearAllMocks();
  });

  it("should successfully fetch and map single person data", async () => {
    const mockApiResponse = {
      name: "Luke Skywalker",
      films: [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/2/",
      ],
      height: "172",
      mass: "77",
      birth_year: "19BBY",
      gender: "male",
      eye_color: "blue",
      hair_color: "blond",
      url: "https://swapi.dev/api/people/1/",
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockApiResponse),
    });

    const result = await useCase.execute("1");

    expect(mockFetch).toHaveBeenCalledWith(`${mockUrl}/people/1`);
    expect(result.id).toBe("1");
    expect(result.name).toBe("Luke Skywalker");
    expect(result.films).toEqual([
      "https://swapi.dev/api/films/1/",
      "https://swapi.dev/api/films/2/",
    ]);
    expect(result.height).toBe(172);
    expect(result.mass).toBe(77);
    expect(result.birth_year).toBe("19BBY");
    expect(result.gender).toBe("male");
    expect(result.eyeColor).toBe("blue");
    expect(result.hair_color).toBe("blond");
  });

  it("should handle fetch errors when response is not ok", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(useCase.execute("1")).rejects.toThrow(
      "Failed to fetch person with id 1"
    );
    expect(mockFetch).toHaveBeenCalledWith(`${mockUrl}/people/1`);
  });

  it("should handle network errors", async () => {
    const errorMessage = "Network error";
    mockFetch.mockRejectedValueOnce(new Error(errorMessage));

    await expect(useCase.execute("1")).rejects.toThrow(errorMessage);
    expect(mockFetch).toHaveBeenCalledWith(`${mockUrl}/people/1`);
  });

  it("should handle numeric conversion for height and mass", async () => {
    const mockApiResponse = {
      name: "R2-D2",
      films: ["https://swapi.dev/api/films/1/"],
      height: "96",
      mass: "32",
      birth_year: "33BBY",
      gender: "n/a",
      eye_color: "red",
      hair_color: "n/a",
      url: "https://swapi.dev/api/people/3/",
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockApiResponse),
    });

    const result = await useCase.execute("3");

    expect(result.height).toBe(96);
    expect(result.mass).toBe(32);
    expect(typeof result.height).toBe("number");
    expect(typeof result.mass).toBe("number");
  });
});
