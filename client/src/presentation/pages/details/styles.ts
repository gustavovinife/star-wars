import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.large};
  justify-content: center;

  .details-card {
    width: 100%;
    max-width: 1000px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.medium};
  }
`;

export const DetailsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.large};
`;

export const DetailsColumns = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.large};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

export const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary.main};
  margin: 0;
`;

export const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral.dark};
  margin: 0;
  padding-bottom: ${({ theme }) => theme.spacing.small};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.border};
`;

export const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.neutral.dark};
  margin: 0;
`;

export const DetailsInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
`;

export const DetailItem = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.neutral.dark};
`;

export const LinksSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

export const InlineList = styled.div`
  line-height: 1.6;
`;

export const Link = styled.a`
  color: ${({ theme }) => theme.colors.blue};
  text-decoration: none;
  font-weight: 400;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.dark};
    text-decoration: underline;
  }

  &:visited {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const ActionSection = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-top: ${({ theme }) => theme.spacing.medium};
`;

export const LoadingContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  font-size: 1.125rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral.gray};
`;

export const ErrorContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.medium};
  min-height: 400px;
  text-align: center;

  h2 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.neutral.dark};
    margin: 0;
  }

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.neutral.gray};
    margin: 0;
  }
`;
