import { useState, useCallback } from "react";
import type { IPeople } from "../domain/entities/people";
import type { IFilm } from "../domain/entities/films";
import { RemoteGetPeopleUseCase } from "../data/usecases/remote-get-people-use-case";
import { RemoteGetFilmsUseCase } from "../data/usecases/remote-get-films-use-case";
import { RemoteGetSinglePersonUseCase } from "../data/usecases/remote-get-single-person-use-case";
import { RemoteGetSingleFilmUseCase } from "../data/usecases/remote-get-single-film-use-case";

interface UseStarWarsReturn {
  people: IPeople[];
  films: IFilm[];
  singlePerson: IPeople | null;
  singleFilm: IFilm | null;
  loading: boolean;
  error: string | null;
  searchPeople: (name: string) => Promise<void>;
  searchFilms: (name: string) => Promise<void>;
  getSinglePerson: (id: string) => Promise<void>;
  getSingleFilm: (id: string) => Promise<void>;
  clearResults: () => void;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useStarWars = (): UseStarWarsReturn => {
  const [people, setPeople] = useState<IPeople[]>([]);
  const [films, setFilms] = useState<IFilm[]>([]);
  const [singlePerson, setSinglePerson] = useState<IPeople | null>(null);
  const [singleFilm, setSingleFilm] = useState<IFilm | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const peopleUseCase = new RemoteGetPeopleUseCase(API_BASE_URL);
  const filmsUseCase = new RemoteGetFilmsUseCase(API_BASE_URL);
  const singlePersonUseCase = new RemoteGetSinglePersonUseCase(API_BASE_URL);
  const singleFilmUseCase = new RemoteGetSingleFilmUseCase(API_BASE_URL);

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

  const getSinglePerson = useCallback(async (id: string) => {
    if (!id.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const result = await singlePersonUseCase.execute(id);
      setSinglePerson(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch person");
      setSinglePerson(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const getSingleFilm = useCallback(async (id: string) => {
    if (!id.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const result = await singleFilmUseCase.execute(id);
      setSingleFilm(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch film");
      setSingleFilm(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setPeople([]);
    setFilms([]);
    setSinglePerson(null);
    setSingleFilm(null);
    setError(null);
  }, []);

  return {
    people,
    films,
    singlePerson,
    singleFilm,
    loading,
    error,
    searchPeople,
    searchFilms,
    getSinglePerson,
    getSingleFilm,
    clearResults,
  };
};
