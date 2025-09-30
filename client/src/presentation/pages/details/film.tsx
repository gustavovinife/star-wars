import React, { useContext, useState, useEffect } from "react";
import type { IFilm } from "../../../domain/entities/films";
import { DetailsPageContext } from "./context";
import { extractIdFromUrl } from "../../../utils/url";
import { RemoteGetSinglePersonUseCase } from "../../../data/usecases/remote-get-single-person-use-case";
import * as S from "./styles";

interface CharacterReference {
  url: string;
  name: string;
}

interface FilmDetailsProps {
  film: IFilm;
}

export const FilmDetails: React.FC<FilmDetailsProps> = ({ film }) => {
  const { handleLinkClick } = useContext(DetailsPageContext);
  const [characterNames, setCharacterNames] = useState<CharacterReference[]>(
    []
  );
  const [loadingCharacters, setLoadingCharacters] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const singlePersonUseCase = new RemoteGetSinglePersonUseCase(API_BASE_URL);

  const ParallelGetPeople = async (
    characterUrls: string[]
  ): Promise<CharacterReference[]> => {
    if (!characterUrls || characterUrls.length === 0) return [];

    try {
      const characterIds = characterUrls.map((url) => extractIdFromUrl(url));

      const fetchPromises = characterIds.map(async (id, index) => {
        try {
          const personData = await singlePersonUseCase.execute(id);
          return {
            url: characterUrls[index],
            name: personData.name || `Character ${index + 1}`,
          };
        } catch (error) {
          console.error(`Error fetching character ${id}:`, error);
          return {
            url: characterUrls[index],
            name: `Character ${index + 1}`,
          };
        }
      });

      const results = await Promise.all(fetchPromises);
      return results;
    } catch (error) {
      console.error("Error in ParallelGetPeople:", error);
      return [];
    }
  };

  useEffect(() => {
    if (film.characters && film.characters.length > 0) {
      setLoadingCharacters(true);

      ParallelGetPeople(film.characters)
        .then((names) => {
          setCharacterNames(names);
        })
        .finally(() => {
          setLoadingCharacters(false);
        });
    }
  }, [film.characters]);

  return (
    <S.DetailsColumns>
      <S.LeftColumn>
        <S.Title>{film.title}</S.Title>
        <S.SectionTitle>Opening Crawl:</S.SectionTitle>
        <S.Description>{film.description}</S.Description>
      </S.LeftColumn>

      <S.RightColumn style={{ marginTop: 44.5 }}>
        <S.LinksSection>
          <S.SectionTitle>Characters:</S.SectionTitle>
          <S.InlineList>
            {loadingCharacters ? (
              <span>Loading characters...</span>
            ) : characterNames.length > 0 ? (
              characterNames.map((character, index) => (
                <span key={index}>
                  <S.Link
                    onClick={() => handleLinkClick(character.url, "people")}
                    style={{ cursor: "pointer" }}
                  >
                    {character.name}
                  </S.Link>
                  {index < characterNames.length - 1 && ", "}
                </span>
              ))
            ) : (
              film.characters.map((character, index) => (
                <span key={index}>
                  <S.Link
                    onClick={() => handleLinkClick(character, "people")}
                    style={{ cursor: "pointer" }}
                  >
                    Character {index + 1}
                  </S.Link>
                  {index < film.characters.length - 1 && ", "}
                </span>
              ))
            )}
          </S.InlineList>
        </S.LinksSection>
      </S.RightColumn>
    </S.DetailsColumns>
  );
};
