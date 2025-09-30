import styled, { css } from "styled-components";

export const Container = styled.button<{ fullWidth?: boolean }>`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.neutral.white};
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  border-radius: 100px;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}

  &:disabled {
    background-color: ${({ theme }) => theme.colors.neutral.gray};
    color: ${({ theme }) => theme.colors.neutral.white};
  }
`;
