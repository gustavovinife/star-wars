import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: bold;
`;

export const Input = styled.input`
  accent-color: ${({ theme }) => theme.colors.blue};
`;
