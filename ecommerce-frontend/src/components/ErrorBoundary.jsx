import React, { Component } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700">
          <div className="flex items-center gap-3">
            <FiAlertCircle className="w-6 h-6" />
            <div>
              <h3 className="font-medium">Something went wrong</h3>
              <p className="mt-2 text-sm">Please try refreshing the page or contact support if the issue persists.</p>
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-4">
                  <details className="text-red-600">
                    <summary>View error details</summary>
                    <pre className="mt-2 p-4 bg-red-100 rounded-lg whitespace-pre-wrap">
                      {this.state.error?.toString()}
                    </pre>
                  </details>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
