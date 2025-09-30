import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.neutral.white};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
`;

export const Title = styled.h1`
  font-size: 1.125rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;
