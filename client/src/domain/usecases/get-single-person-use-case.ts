import type { IPeople } from "../entities/people";

export interface IGetSinglePersonUseCase {
  execute: (id: string) => Promise<IPeople>;
}
