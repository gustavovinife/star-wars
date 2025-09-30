import type { IPeople } from "../../domain/entities/people";
import type { IGetPeopleUseCase } from "../../domain/usecases/get-people-use-case";

export class RemoteGetPeopleUseCase implements IGetPeopleUseCase {
  private readonly url: string;

  constructor(url: string) {
    this.url = url;
  }

  async execute(name: string): Promise<IPeople[]> {
    const response = await fetch(`${this.url}/people?name=${name}`);

    const data = await response.json();
    return data.results.map((item: any) => ({
      id: item.name + Math.random().toString(36).substring(2, 15),
      name: item.name,
      films: item.films,
      height: parseInt(item.height, 10),
      mass: parseInt(item.mass, 10),
      birth_year: item.birth_year,
      gender: item.gender,
      eyeColor: item.eye_color,
      hair_color: item.hair_color,
    }));
  }
}
