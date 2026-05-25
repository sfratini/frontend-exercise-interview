import styled from 'styled-components';

interface FlexProps {
  gap?: string;
  align?: string;
  justify?: string;
  wrap?: boolean;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: row;
  gap: ${({ gap }) => gap ?? '0'};
  align-items: ${({ align }) => align ?? 'flex-start'};
  justify-content: ${({ justify }) => justify ?? 'flex-start'};
  flex-wrap: ${({ wrap }) => (wrap ? 'wrap' : 'nowrap')};
`;

export const FlexColumn = styled(Flex)`
  flex-direction: column;
`;

export const FlexMiddle = styled(Flex)`
  align-items: center;
  justify-content: center;
`;
