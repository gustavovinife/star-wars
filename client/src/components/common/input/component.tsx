import * as S from "./styles";

export type InputProps = {
  required?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  ariaLabel?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};
export const Input = (props: InputProps) => {
  const {
    required,
    value,
    onChange,
    ariaLabel,
    disabled,
    fullWidth,
    placeholder,
    onKeyDown,
  } = props;

  return (
    <S.Container fullWidth={fullWidth}>
      <S.Input
        required={required}
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
        disabled={disabled}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
      />
    </S.Container>
  );
};
