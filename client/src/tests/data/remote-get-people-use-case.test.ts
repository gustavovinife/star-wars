import { RemoteGetPeopleUseCase } from "../../data/usecases/remote-get-people-use-case";
import type { IPeople } from "../../domain/entities/people";
import { describe, it, expect, beforeEach, vi } from "vitest";

const mockFetch = vi.fn();
(globalThis as any).fetch = mockFetch;

describe("RemoteGetPeopleUseCase", () => {
  let useCase: RemoteGetPeopleUseCase;
  const mockUrl = "https://api.example.com";

  beforeEach(() => {
    useCase = new RemoteGetPeopleUseCase(mockUrl);
    vi.clearAllMocks();
  });

  it("should successfully fetch and map people data", async () => {
    const mockApiResponse = {
      results: [
        {
          id: "1",
          name: "Luke Skywalker",
          films: ["film1", "film2"],
          height: 172,
          mass: 77,
          birth_year: "19BBY",
          gender: "male",
          eye_color: "blue",
          hair_color: "blond",
        },
      ],
    };

    const expectedResult: IPeople[] = [
      {
        id: "1",
        name: "Luke Skywalker",
        films: ["film1", "film2"],
        height: 172,
        mass: 77,
        birth_year: "19BBY",
        gender: "male",
        eyeColor: "blue",
        hair_color: "blond",
      },
    ];

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockApiResponse),
    });

    const result = await useCase.execute("Luke");

    expect(mockFetch).toHaveBeenCalledWith(`${mockUrl}/people?name=Luke`);
    expect(result).toEqual(expectedResult);
  });

  it("should handle fetch errors", async () => {
    const errorMessage = "Network error";
    mockFetch.mockRejectedValueOnce(new Error(errorMessage));

    await expect(useCase.execute("Luke")).rejects.toThrow(errorMessage);
    expect(mockFetch).toHaveBeenCalledWith(`${mockUrl}/people?name=Luke`);
  });
});
