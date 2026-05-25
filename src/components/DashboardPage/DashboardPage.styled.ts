import styled from 'styled-components';
import { theme } from '~/theme';

export const PageWrapper = styled.div`
  background: ${theme.colors.background};
  min-height: 100vh;
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spaces.xl};
  padding: ${theme.spaces.xxl};
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${theme.spaces.lg};
`;

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spaces.xs};
`;

export const PageTitle = styled.h1`
  font-size: ${theme.fontSize.xxl};
  font-weight: 700;
  color: ${theme.colors.text.primary};
  margin: 0;
`;

export const PageDescription = styled.p`
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.text.secondary};
  margin: 0;
`;

export const WidgetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spaces.xl};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SectionTitle = styled.h2`
  font-size: ${theme.fontSize.md};
  font-weight: 600;
  color: ${theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
`;

export const WidgetCount = styled.span`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.muted};
`;
