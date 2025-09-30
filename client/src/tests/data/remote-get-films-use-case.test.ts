import { RemoteGetFilmsUseCase } from "../../data/usecases/remote-get-films-use-case";
import { describe, it, expect, beforeEach, afterAll, vi } from "vitest";

const mockFetch = vi.fn();
(globalThis as any).fetch = mockFetch;

const mockMathRandom = vi.spyOn(Math, "random");

describe("RemoteGetFilmsUseCase", () => {
  let useCase: RemoteGetFilmsUseCase;
  const mockUrl = "https://api.example.com";

  beforeEach(() => {
    useCase = new RemoteGetFilmsUseCase(mockUrl);
    vi.clearAllMocks();
    mockMathRandom.mockReturnValue(0.123456789);
  });

  afterAll(() => {
    mockMathRandom.mockRestore();
  });

  it("should successfully fetch and map films data", async () => {
    const mockApiResponse = {
      results: [
        {
          title: "A New Hope",
          opening_crawl: "It is a period of civil war...",
          characters: ["character1", "character2"],
        },
      ],
    };

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockApiResponse),
    });

    const result = await useCase.execute("Star Wars");

    expect(mockFetch).toHaveBeenCalledWith(`${mockUrl}/films?name=Star Wars`);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("A New Hope");
    expect(result[0].description).toBe("It is a period of civil war...");
    expect(result[0].characters).toEqual(["character1", "character2"]);
    expect(result[0].id).toMatch(/^A New Hope[a-z0-9]+$/);
  });

  it("should handle fetch errors", async () => {
    const errorMessage = "Network error";
    mockFetch.mockRejectedValueOnce(new Error(errorMessage));

    await expect(useCase.execute("Star Wars")).rejects.toThrow(errorMessage);
    expect(mockFetch).toHaveBeenCalledWith(`${mockUrl}/films?name=Star Wars`);
  });
});
