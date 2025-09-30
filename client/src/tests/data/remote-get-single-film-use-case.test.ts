import { RemoteGetSingleFilmUseCase } from "../../data/usecases/remote-get-single-film-use-case";
import { describe, it, expect, beforeEach, vi } from "vitest";

const mockFetch = vi.fn();
(globalThis as any).fetch = mockFetch;

describe("RemoteGetSingleFilmUseCase", () => {
  let useCase: RemoteGetSingleFilmUseCase;
  const mockUrl = "https://api.example.com";

  beforeEach(() => {
    useCase = new RemoteGetSingleFilmUseCase(mockUrl);
    vi.clearAllMocks();
  });

  it("should successfully fetch and map single film data", async () => {
    const mockApiResponse = {
      title: "A New Hope",
      opening_crawl: "It is a period of civil war...",
      characters: [
        "https://swapi.dev/api/people/1/",
        "https://swapi.dev/api/people/2/",
      ],
      url: "https://swapi.dev/api/films/1/",
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockApiResponse),
    });

    const result = await useCase.execute("1");

    expect(mockFetch).toHaveBeenCalledWith(`${mockUrl}/films/1`);
    expect(result.id).toBe("1");
    expect(result.title).toBe("A New Hope");
    expect(result.description).toBe("It is a period of civil war...");
    expect(result.characters).toEqual([
      "https://swapi.dev/api/people/1/",
      "https://swapi.dev/api/people/2/",
    ]);
  });

  it("should handle fetch errors when response is not ok", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(useCase.execute("1")).rejects.toThrow(
      "Failed to fetch film with id 1"
    );
    expect(mockFetch).toHaveBeenCalledWith(`${mockUrl}/films/1`);
  });

  it("should handle network errors", async () => {
    const errorMessage = "Network error";
    mockFetch.mockRejectedValueOnce(new Error(errorMessage));

    await expect(useCase.execute("1")).rejects.toThrow(errorMessage);
    expect(mockFetch).toHaveBeenCalledWith(`${mockUrl}/films/1`);
  });
});
