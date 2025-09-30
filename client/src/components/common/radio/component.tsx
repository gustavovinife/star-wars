import * as S from "./styles";

export type RadioProps = {
  required?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  ariaLabel?: string;
  label?: string;
};
export const Radio = (props: RadioProps) => {
  const { required, value, onChange, ariaLabel, label } = props;

  return (
    <S.Container>
      <S.Input
        id={label}
        name="radio"
        type="radio"
        required={required}
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
      />
      <S.Label htmlFor={label}>{label}</S.Label>
    </S.Container>
  );
};
