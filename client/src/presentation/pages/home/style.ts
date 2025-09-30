import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.large};
  gap: ${({ theme }) => theme.spacing.large};
  align-items: flex-start;

  .card-search {
    width: 40%;
  }

  .card-results {
    width: 60%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    justify-content: center;

    .card-search,
    .card-results {
      width: 100%;
    }
  }
`;

export const CardSearchContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

export const CardResultsContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 400px;
`;

export const CardResultItem = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral.border};

  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.border};
  }

  padding: ${({ theme }) => theme.spacing.medium} 0;

  > span {
    font-weight: bold;
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
`;

export const EmptyResults = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.neutral.gray};
  text-align: center;
  min-height: 400px;
  max-width: 80%;
  margin: 0 auto;
`;
