import { useState, useCallback } from "react";
import type { IPeople } from "../domain/entities/people";
import type { IFilm } from "../domain/entities/films";
import { RemoteGetPeopleUseCase } from "../data/usecases/remote-get-people-use-case";
import { RemoteGetFilmsUseCase } from "../data/usecases/remote-get-films-use-case";

interface UseStarWarsReturn {
  people: IPeople[];
  films: IFilm[];
  loading: boolean;
  error: string | null;
  searchPeople: (name: string) => Promise<void>;
  searchFilms: (name: string) => Promise<void>;
  clearResults: () => void;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useStarWars = (): UseStarWarsReturn => {
  const [people, setPeople] = useState<IPeople[]>([]);
  const [films, setFilms] = useState<IFilm[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const peopleUseCase = new RemoteGetPeopleUseCase(API_BASE_URL);
  const filmsUseCase = new RemoteGetFilmsUseCase(API_BASE_URL);

  const searchPeople = useCallback(async (name: string) => {
    if (!name.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const results = await peopleUseCase.execute(name);
      setPeople(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch people");
      setPeople([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchFilms = useCallback(async (name: string) => {
    if (!name.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const results = await filmsUseCase.execute(name);
      setFilms(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch films");
      setFilms([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setPeople([]);
    setFilms([]);
    setError(null);
  }, []);

  return {
    people,
    films,
    loading,
    error,
    searchPeople,
    searchFilms,
    clearResults,
  };
};
