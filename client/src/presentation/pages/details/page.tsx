import { useNavigate, useLocation } from "react-router";
import { Button, Card } from "../../../components";
import * as S from "./styles";
import type { IPeople } from "../../../domain/entities/people";
import type { IFilm } from "../../../domain/entities/films";

interface LocationState {
  data: IPeople | IFilm;
  type: "people" | "films";
}

export const DetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const data = state?.data;
  const type = state?.type;

  const handleBackToSearch = () => {
    navigate("/");
  };

  if (!data || !type) {
    return (
      <S.Container>
        <Card className="details-card">
          <S.ErrorContent>
            <h2>No Data Available</h2>
            <p>Please navigate from the search results to view details.</p>
            <Button onClick={handleBackToSearch}>Back To Search</Button>
          </S.ErrorContent>
        </Card>
      </S.Container>
    );
  }

  const isFilm = type === "films";
  const filmData = data as IFilm;
  const peopleData = data as IPeople;

  return (
    <S.Container>
      <Card className="details-card">
        <S.DetailsContent>
          <S.DetailsColumns>
            <S.LeftColumn>
              {isFilm ? (
                <>
                  <S.Title>{filmData.title}</S.Title>
                  <S.SectionTitle>Opening Crawl:</S.SectionTitle>
                  <S.Description>{filmData.description}</S.Description>
                </>
              ) : (
                <>
                  <S.Title>{peopleData.name}</S.Title>
                  <S.SectionTitle>Details:</S.SectionTitle>
                  <S.DetailsInfo>
                    <S.DetailItem>
                      Birth Year: {peopleData.birth_year}
                    </S.DetailItem>
                    <S.DetailItem>Gender: {peopleData.gender}</S.DetailItem>
                    <S.DetailItem>
                      Eye Color: {peopleData.eyeColor}
                    </S.DetailItem>
                    <S.DetailItem>
                      Hair Color: {peopleData.hair_color}
                    </S.DetailItem>
                    <S.DetailItem>Height: {peopleData.height}cm</S.DetailItem>
                    <S.DetailItem>Mass: {peopleData.mass}kg</S.DetailItem>
                  </S.DetailsInfo>
                </>
              )}
            </S.LeftColumn>

            <S.RightColumn style={{ marginTop: 44.5 }}>
              <S.LinksSection>
                <S.SectionTitle>
                  {isFilm ? "Characters:" : "Movies:"}
                </S.SectionTitle>
                <S.InlineList>
                  {isFilm
                    ? filmData.characters.map((character, index) => (
                        <span key={index}>
                          <S.Link
                            href={character}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Character {index + 1}
                          </S.Link>
                          {index < filmData.characters.length - 1 && ", "}
                        </span>
                      ))
                    : peopleData.films.map((film, index) => (
                        <span key={index}>
                          <S.Link
                            href={film}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Movie {index + 1}
                          </S.Link>
                          {index < peopleData.films.length - 1 && ", "}
                        </span>
                      ))}
                </S.InlineList>
              </S.LinksSection>
            </S.RightColumn>
          </S.DetailsColumns>

          <S.ActionSection>
            <Button onClick={handleBackToSearch}>Back To Search</Button>
          </S.ActionSection>
        </S.DetailsContent>
      </Card>
    </S.Container>
  );
};
