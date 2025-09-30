import { useContext } from "react";
import { Button, Card } from "../../../components";
import * as S from "./styles";
import type { IPeople } from "../../../domain/entities/people";
import type { IFilm } from "../../../domain/entities/films";
import { DetailsPageProvider, DetailsPageContext } from "./context";
import { FilmDetails } from "./film";
import { PersonDetails } from "./person";

const DetailsPageContent = () => {
  const { type, singlePerson, singleFilm, loading, handleBackToSearch } =
    useContext(DetailsPageContext);

  const data = type === "people" ? singlePerson : singleFilm;
  const isFilm = type === "films";
  const filmData = data as IFilm;
  const peopleData = data as IPeople;

  if (loading || !data) {
    return (
      <S.Container>
        <Card className="details-card">
          <S.ErrorContent>
            <h2>Loading...</h2>
          </S.ErrorContent>
        </Card>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <Card className="details-card">
        <S.DetailsContent>
          {isFilm ? (
            <FilmDetails film={filmData} />
          ) : (
            <PersonDetails person={peopleData} />
          )}

          <S.ActionSection>
            <Button onClick={handleBackToSearch}>Back To Search</Button>
          </S.ActionSection>
        </S.DetailsContent>
      </Card>
    </S.Container>
  );
};

export const DetailsPage = () => {
  return (
    <DetailsPageProvider>
      <DetailsPageContent />
    </DetailsPageProvider>
  );
};
