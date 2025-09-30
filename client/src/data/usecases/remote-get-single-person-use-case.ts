import type { IPeople } from "../../domain/entities/people";
import type { IGetSinglePersonUseCase } from "../../domain/usecases/get-single-person-use-case";
import { extractIdFromUrl } from "../../utils/url";

export class RemoteGetSinglePersonUseCase implements IGetSinglePersonUseCase {
  private readonly url: string;

  constructor(url: string) {
    this.url = url;
  }

  async execute(id: string): Promise<IPeople> {
    const response = await fetch(`${this.url}/people/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch person with id ${id}`);
    }

    const data = await response.json();
    return {
      id: extractIdFromUrl(data.url),
      name: data.name,
      films: data.films,
      film_titles: data.film_titles || [],
      height: parseInt(data.height, 10),
      mass: parseInt(data.mass, 10),
      birth_year: data.birth_year,
      gender: data.gender,
      eyeColor: data.eye_color,
      hair_color: data.hair_color,
    };
  }
}
