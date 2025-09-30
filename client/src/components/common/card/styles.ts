import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.neutral.white};
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.spacing.xsmall};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  box-shadow: 0 0.5px 1px 0 ${({ theme }) => theme.colors.neutral.border};
  width: 100%;
`;
