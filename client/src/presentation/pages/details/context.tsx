import React, { createContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import type { IPeople } from "../../../domain/entities/people";
import type { IFilm } from "../../../domain/entities/films";
import { useStarWars } from "../../../hooks/useStarWars";
import { extractIdFromUrl } from "../../../utils/url";

interface DetailsPageContextType {
  type: string | undefined;
  id: string | undefined;
  singlePerson: IPeople | null;
  singleFilm: IFilm | null;
  loading: boolean;
  handleBackToSearch: () => void;
  handleLinkClick: (url: string, linkType: "people" | "films") => void;
}

const DetailsPageContext = createContext<DetailsPageContextType>(
  {} as DetailsPageContextType
);

interface DetailsPageProviderProps {
  children: React.ReactNode;
}

export const DetailsPageProvider: React.FC<DetailsPageProviderProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { type, id } = useParams<{ type: string; id: string }>();

  const { singlePerson, singleFilm, loading, getSinglePerson, getSingleFilm } =
    useStarWars();

  useEffect(() => {
    if (!type || !id) return;

    if (type === "people") {
      getSinglePerson(id);
    } else {
      getSingleFilm(id);
    }
  }, [type, id, getSinglePerson, getSingleFilm]);

  const handleBackToSearch = () => {
    navigate("/");
  };

  const handleLinkClick = (url: string, linkType: "people" | "films") => {
    const linkId = extractIdFromUrl(url);
    navigate(`/details/${linkType}/${linkId}`);
  };

  const contextValue: DetailsPageContextType = {
    type,
    id,
    singlePerson,
    singleFilm,
    loading,
    handleBackToSearch,
    handleLinkClick,
  };

  return (
    <DetailsPageContext.Provider value={contextValue}>
      {children}
    </DetailsPageContext.Provider>
  );
};

export { DetailsPageContext };
