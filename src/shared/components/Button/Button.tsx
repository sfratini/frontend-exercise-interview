import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '~/theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: React.ReactNode;
}

const sizeStyles: Record<ButtonSize, ReturnType<typeof css>> = {
  sm: css`
    padding: 4px 10px;
    font-size: ${theme.fontSize.sm};
  `,
  md: css`
    padding: 7px 14px;
    font-size: ${theme.fontSize.md};
  `,
  lg: css`
    padding: 10px 20px;
    font-size: ${theme.fontSize.lg};
  `,
};

const variantStyles: Record<ButtonVariant, ReturnType<typeof css>> = {
  primary: css`
    background: ${theme.colors.primary};
    color: ${theme.colors.text.inverse};
    border: 1px solid transparent;
    &:hover:not(:disabled) {
      background: ${theme.colors.primaryHover};
    }
  `,
  secondary: css`
    background: ${theme.colors.surface};
    color: ${theme.colors.text.primary};
    border: 1px solid ${theme.colors.border};
    &:hover:not(:disabled) {
      background: ${theme.colors.surfaceHover};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${theme.colors.text.secondary};
    border: 1px solid transparent;
    &:hover:not(:disabled) {
      background: ${theme.colors.surfaceHover};
      color: ${theme.colors.text.primary};
    }
  `,
  danger: css`
    background: ${theme.colors.status.error};
    color: ${theme.colors.text.inverse};
    border: 1px solid transparent;
    &:hover:not(:disabled) {
      opacity: 0.85;
    }
  `,
};

const StyledButton = styled.button<{ $variant: ButtonVariant; $size: ButtonSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s ease, opacity 0.15s ease;
  white-space: nowrap;
  line-height: 1.4;

  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant }) => variantStyles[$variant]}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  disabled,
  ...rest
}: ButtonProps) => (
  <StyledButton $variant={variant} $size={size} disabled={disabled || isLoading} {...rest}>
    {isLoading ? 'Loading…' : children}
  </StyledButton>
);
