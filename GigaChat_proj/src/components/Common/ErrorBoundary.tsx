import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
	hasError: false,
	error: null
  };

  public static getDerivedStateFromError(error: Error): State {
	return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
	console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
	if (this.state.hasError) {
	  return this.props.fallback || (
		<div style={{ padding: '20px', textAlign: 'center' }}>
		  <h2>Что-то пошло не так</h2>
		  <p>{this.state.error?.message}</p>
		  <button onClick={() => this.setState({ hasError: false, error: null })}>
			Попробовать снова
		  </button>
		</div>
	  );
	}

	return this.props.children;
  }
}

export default ErrorBoundary;