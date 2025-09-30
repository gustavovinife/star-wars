import styled, { css } from "styled-components";

export const Container = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xsmall};

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
`;

export const Input = styled.input`
  width: 100%;
  font-weight: 500;
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.spacing.xsmall};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  background-color: #fff;
  box-shadow: inset 0 0.5px 1.5px 0 ${({ theme }) => theme.colors.neutral.border};
`;
