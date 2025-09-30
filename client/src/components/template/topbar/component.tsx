import * as S from "./styles";

export type TopbarProps = {
  title: string;
};

export const Topbar = (props: TopbarProps) => {
  const { title } = props;

  return (
    <S.Container>
      <S.Title data-testid="topbar-title">{title}</S.Title>
    </S.Container>
  );
};
