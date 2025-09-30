import * as S from "./styles";

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  disabled?: boolean;
  fullWidth?: boolean;
};
export const Button = (props: ButtonProps) => {
  const { children, onClick, ariaLabel, disabled, fullWidth } = props;

  return (
    <S.Container
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      fullWidth={fullWidth}
    >
      {children}
    </S.Container>
  );
};
