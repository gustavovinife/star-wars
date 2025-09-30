import { Button, Card, Input, Radio } from "../../../components";
import { useStarWars } from "../../../hooks/useStarWars";
import * as S from "./style";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const HomePage = () => {
  const [searchType, setSearchType] = useState<"people" | "movies">("people");
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  const { people, films, loading, error, searchPeople, searchFilms } =
    useStarWars();

  useEffect(() => {
    setSearch("");
  }, [searchType]);

  const handleViewDetails = (type: "people" | "films", data: any) => {
    navigate(`/details/${type}/${data.id}`, { state: { data, type } });
  };

  function handleSubmit() {
    if (searchType === "people") {
      searchPeople(search);
    } else {
      searchFilms(search);
    }
  }
  return (
    <S.Container>
      <Card className="card-search">
        <S.CardSearchContent>
          <span style={{ fontWeight: 500 }}>What are you searching for?</span>
          <S.RadioGroup>
            <Radio
              ariaLabel="People"
              label="People"
              onChange={() => setSearchType("people")}
            />
            <Radio
              ariaLabel="Movies"
              label="Movies"
              onChange={() => setSearchType("movies")}
            />
          </S.RadioGroup>

          <Input
            fullWidth
            placeholder={`${
              searchType === "people"
                ? "e.g. Chewbacca, Yoda, Boba Fett"
                : "e.g. The Empire Strikes Back"
            }`}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button
            fullWidth
            ariaLabel="Search"
            disabled={!search}
            onClick={() => handleSubmit()}
          >
            Search
          </Button>
        </S.CardSearchContent>
      </Card>

      <Card className="card-results">
        <S.CardResultsContent>
          <h3 style={{ marginBottom: 8 }}>Results</h3>

          {!loading && !error && people.length === 0 && films.length === 0 && (
            <S.EmptyResults>
              There are zero matches. Use the form to search for People or
              Movies.
            </S.EmptyResults>
          )}

          {loading && <S.EmptyResults>Searching...</S.EmptyResults>}

          {!loading && searchType === "people" && people.length > 0 && (
            <>
              {people.map((person) => (
                <S.CardResultItem key={person.id}>
                  <span>{person.name}</span>
                  <Button
                    ariaLabel="See Details"
                    onClick={() => handleViewDetails("people", person)}
                  >
                    See Details
                  </Button>
                </S.CardResultItem>
              ))}
            </>
          )}

          {!loading && searchType === "movies" && films.length > 0 && (
            <>
              {films.map((film) => (
                <S.CardResultItem key={film.id}>
                  <span>{film.title}</span>
                  <Button
                    ariaLabel="See Details"
                    onClick={() => handleViewDetails("films", film)}
                  >
                    See Details
                  </Button>
                </S.CardResultItem>
              ))}
            </>
          )}
        </S.CardResultsContent>
      </Card>
    </S.Container>
  );
};
