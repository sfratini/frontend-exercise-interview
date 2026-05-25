import styled from 'styled-components';
import { theme } from '~/theme';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  display: flex;
  justify-content: flex-end;
`;

export const Panel = styled.div`
  background: ${theme.colors.surface};
  width: 480px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: ${theme.shadow.lg};
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spaces.xl};
  border-bottom: 1px solid ${theme.colors.border};
`;

export const PanelTitle = styled.h2`
  font-size: ${theme.fontSize.xl};
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin: 0;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spaces.md} ${theme.spaces.lg};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.md};
  outline: none;
  &:focus {
    border-color: ${theme.colors.primary};
  }
`;

export const PanelBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${theme.spaces.xl};
  display: flex;
  flex-direction: column;
  gap: ${theme.spaces.lg};
`;

export const SearchWrapper = styled.div`
  padding: ${theme.spaces.lg} ${theme.spaces.xl} 0;
`;

export const CategoryLabel = styled.p`
  font-size: ${theme.fontSize.sm};
  font-weight: 600;
  color: ${theme.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
`;

export const ErrorMessage = styled.p`
  color: ${theme.colors.status.error};
  font-size: ${theme.fontSize.md};
  padding: ${theme.spaces.xl};
  text-align: center;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.surface};
  overflow: hidden;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: ${theme.colors.borderStrong};
  }
`;

export const ItemHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${theme.spaces.md};
  padding: ${theme.spaces.md} ${theme.spaces.lg};
`;

export const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spaces.xs};
  flex: 1;
  min-width: 0;
`;

export const ItemTitle = styled.p`
  font-size: ${theme.fontSize.md};
  font-weight: 500;
  color: ${theme.colors.text.primary};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BadgeRow = styled.div`
  display: flex;
  gap: ${theme.spaces.sm};
  align-items: center;
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 6px;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSize.xs};
  font-weight: 500;
  background: ${theme.colors.background};
  color: ${theme.colors.text.muted};
  border: 1px solid ${theme.colors.border};
`;

export const ChartPreview = styled.div`
  padding: 0 ${theme.spaces.lg} ${theme.spaces.md};
  border-top: 1px solid ${theme.colors.border};
  background: ${theme.colors.background};
`;
