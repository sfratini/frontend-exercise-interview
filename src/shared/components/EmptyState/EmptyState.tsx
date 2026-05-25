import React from 'react';
import styled from 'styled-components';
import { theme } from '~/theme';
import { FlexColumn, FlexMiddle } from '../Flex';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

const Container = styled(FlexMiddle)`
  flex-direction: column;
  gap: ${theme.spaces.lg};
  padding: ${theme.spaces.xxxl};
  text-align: center;
`;

const Title = styled.p`
  font-size: ${theme.fontSize.lg};
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin: 0;
`;

const Description = styled.p`
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.text.secondary};
  margin: 0;
  max-width: 360px;
`;

export const EmptyState = ({ title, description, action, icon }: EmptyStateProps) => (
  <Container>
    {icon && <FlexMiddle>{icon}</FlexMiddle>}
    <FlexColumn gap={theme.spaces.sm} align="center">
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
    </FlexColumn>
    {action}
  </Container>
);
