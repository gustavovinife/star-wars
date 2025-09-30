import type { IFilm } from "../../domain/entities/films";
import type { IGetFilmsUseCase } from "../../domain/usecases/get-films-use-case";

export class RemoteGetFilmsUseCase implements IGetFilmsUseCase {
  private readonly url: string;

  constructor(url: string) {
    this.url = url;
  }

  async execute(name: string): Promise<IFilm[]> {
    const response = await fetch(`${this.url}/films?name=${name}`);

    const data = await response.json();
    return data.results.map((item: any) => ({
      id: item.title + Math.random().toString(36).substring(2, 15),
      title: item.title,
      description: item.opening_crawl,
      characters: item.characters,
    }));
  }
}
