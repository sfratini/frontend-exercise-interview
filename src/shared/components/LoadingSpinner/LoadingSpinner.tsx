import styled, { keyframes } from 'styled-components';
import { theme } from '~/theme';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Spinner = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border: 2px solid ${theme.colors.border};
  border-top-color: ${theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
  flex-shrink: 0;
`;

interface LoadingSpinnerProps {
  size?: number;
}

export const LoadingSpinner = ({ size = 20 }: LoadingSpinnerProps) => (
  <Spinner $size={size} role="status" aria-label="Loading" />
);
