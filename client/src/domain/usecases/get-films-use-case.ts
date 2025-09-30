import type { IFilm } from "../entities/films";

export interface IGetFilmsUseCase {
  execute: (name: string) => Promise<IFilm[]>;
}
