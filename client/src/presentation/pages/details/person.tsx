import React, { useContext, useState, useEffect } from "react";
import type { IPeople } from "../../../domain/entities/people";
import { DetailsPageContext } from "./context";
import { extractIdFromUrl } from "../../../utils/url";
import { RemoteGetSingleFilmUseCase } from "../../../data/usecases/remote-get-single-film-use-case";
import * as S from "./styles";

interface FilmReference {
  url: string;
  title: string;
}

interface PersonDetailsProps {
  person: IPeople;
}

export const PersonDetails: React.FC<PersonDetailsProps> = ({ person }) => {
  const { handleLinkClick } = useContext(DetailsPageContext);
  const [filmTitles, setFilmTitles] = useState<FilmReference[]>([]);
  const [loadingFilms, setLoadingFilms] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const singleFilmUseCase = new RemoteGetSingleFilmUseCase(API_BASE_URL);

  const ParallelGetTitles = async (
    filmUrls: string[]
  ): Promise<FilmReference[]> => {
    if (!filmUrls || filmUrls.length === 0) return [];

    try {
      const filmIds = filmUrls.map((url) => extractIdFromUrl(url));

      const fetchPromises = filmIds.map(async (id, index) => {
        try {
          const filmData = await singleFilmUseCase.execute(id);
          return {
            url: filmUrls[index],
            title: filmData.title || `Movie ${index + 1}`,
          };
        } catch (error) {
          console.error(`Error fetching film ${id}:`, error);
          return {
            url: filmUrls[index],
            title: `Movie ${index + 1}`,
          };
        }
      });

      const results = await Promise.all(fetchPromises);
      return results;
    } catch (error) {
      console.error("Error in ParallelGetTitles:", error);
      return [];
    }
  };

  useEffect(() => {
    if (person.films && person.films.length > 0) {
      setLoadingFilms(true);

      ParallelGetTitles(person.films)
        .then((titles) => {
          setFilmTitles(titles);
        })
        .finally(() => {
          setLoadingFilms(false);
        });
    }
  }, [person.films]);

  return (
    <S.DetailsColumns>
      <S.LeftColumn>
        <S.Title>{person.name}</S.Title>
        <S.SectionTitle>Details:</S.SectionTitle>
        <S.DetailsInfo>
          <S.DetailItem>Birth Year: {person.birth_year}</S.DetailItem>
          <S.DetailItem>Gender: {person.gender}</S.DetailItem>
          <S.DetailItem>Eye Color: {person.eyeColor}</S.DetailItem>
          <S.DetailItem>Hair Color: {person.hair_color}</S.DetailItem>
          <S.DetailItem>Height: {person.height}cm</S.DetailItem>
          <S.DetailItem>Mass: {person.mass}kg</S.DetailItem>
        </S.DetailsInfo>
      </S.LeftColumn>

      <S.RightColumn style={{ marginTop: 44.5 }}>
        <S.LinksSection>
          <S.SectionTitle>Movies:</S.SectionTitle>
          <S.InlineList>
            {loadingFilms ? (
              <span>Loading movies...</span>
            ) : filmTitles.length > 0 ? (
              filmTitles.map((film, index) => (
                <span key={index}>
                  <S.Link
                    onClick={() => handleLinkClick(film.url, "films")}
                    style={{ cursor: "pointer" }}
                  >
                    {film.title}
                  </S.Link>
                  {index < filmTitles.length - 1 && ", "}
                </span>
              ))
            ) : (
              person.films.map((film, index) => (
                <span key={index}>
                  <S.Link
                    onClick={() => handleLinkClick(film, "films")}
                    style={{ cursor: "pointer" }}
                  >
                    Movie {index + 1}
                  </S.Link>
                  {index < person.films.length - 1 && ", "}
                </span>
              ))
            )}
          </S.InlineList>
        </S.LinksSection>
      </S.RightColumn>
    </S.DetailsColumns>
  );
};
