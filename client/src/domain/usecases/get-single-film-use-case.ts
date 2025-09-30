import type { IFilm } from "../entities/films";

export interface IGetSingleFilmUseCase {
  execute: (id: string) => Promise<IFilm>;
}
