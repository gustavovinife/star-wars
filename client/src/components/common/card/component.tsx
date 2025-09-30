import * as S from "./styles";

export type CardProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

export const Card = (props: CardProps) => {
  const { children, style, className } = props;

  return (
    <S.Container data-testid="card" style={style} className={className}>
      {children}
    </S.Container>
  );
};
