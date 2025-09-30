import type { IFilm } from "../../domain/entities/films";
import type { IGetFilmsUseCase } from "../../domain/usecases/get-films-use-case";
import { extractIdFromUrl } from "../../utils/url";

export class RemoteGetFilmsUseCase implements IGetFilmsUseCase {
  private readonly url: string;

  constructor(url: string) {
    this.url = url;
  }

  async execute(name: string): Promise<IFilm[]> {
    const response = await fetch(`${this.url}/films?name=${name}`);

    const data = await response.json();
    return data.results.map((item: any) => ({
      id: extractIdFromUrl(item.url),
      title: item.title,
      description: item.opening_crawl,
      characters: item.characters,
    }));
  }
}
