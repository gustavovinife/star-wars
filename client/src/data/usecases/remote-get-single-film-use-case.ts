import type { IFilm } from "../../domain/entities/films";
import type { IGetSingleFilmUseCase } from "../../domain/usecases/get-single-film-use-case";
import { extractIdFromUrl } from "../../utils/url";

export class RemoteGetSingleFilmUseCase implements IGetSingleFilmUseCase {
  private readonly url: string;

  constructor(url: string) {
    this.url = url;
  }

  async execute(id: string): Promise<IFilm> {
    const response = await fetch(`${this.url}/films/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch film with id ${id}`);
    }

    const data = await response.json();
    return {
      id: extractIdFromUrl(data.url),
      title: data.title,
      description: data.opening_crawl,
      characters: data.characters,
      character_names: data.character_names || [],
    };
  }
}
