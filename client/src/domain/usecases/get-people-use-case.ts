import type { IPeople } from "../entities/people";

export interface IGetPeopleUseCase {
  execute: (name: string) => Promise<IPeople[]>;
}
