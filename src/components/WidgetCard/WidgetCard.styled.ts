import styled from 'styled-components';
import { theme } from '~/theme';

export const CardContainer = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  flex-direction: column;
  box-shadow: ${theme.shadow.sm};
  overflow: hidden;
  transition: box-shadow 0.15s ease;

  &:hover {
    box-shadow: ${theme.shadow.md};
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spaces.lg} ${theme.spaces.xl};
  border-bottom: 1px solid ${theme.colors.border};
  gap: ${theme.spaces.md};
`;

export const CardTitle = styled.h3`
  font-size: ${theme.fontSize.md};
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin: 0;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CardBody = styled.div`
  padding: ${theme.spaces.lg} ${theme.spaces.xl} ${theme.spaces.xl};
  flex: 1;
`;

export const ChartTypeBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSize.xs};
  font-weight: 500;
  background: ${theme.colors.primary}18;
  color: ${theme.colors.primary};
  flex-shrink: 0;
`;

export const CategoryBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSize.xs};
  font-weight: 500;
  background: ${theme.colors.background};
  color: ${theme.colors.text.muted};
  border: 1px solid ${theme.colors.border};
  flex-shrink: 0;
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spaces.md} ${theme.spaces.xl};
  border-top: 1px solid ${theme.colors.border};
`;
