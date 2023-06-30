import React, { ReactNode } from 'react';

import { StyledErrorBoundary } from './ComponentStyles/ErrorBoundary.styled';
interface IProps {
  children: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<IProps, ErrorBoundaryState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(error, errorInfo);
  }
  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <StyledErrorBoundary>
          <h1>Something went wrong.</h1>
        </StyledErrorBoundary>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
