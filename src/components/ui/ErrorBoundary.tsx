import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught Error caught by ErrorBoundary:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6 bg-neu-flat text-neu-text transition-colors duration-300">
          <div className="max-w-md w-full neu-raised rounded-3xl p-8 text-center border border-white/20 dark:border-white/5 space-y-6 animate-scale-up">
            <div className="w-20 h-20 mx-auto rounded-full neu-concave flex items-center justify-center text-amber-500 shadow-neu-glow-amber">
              <AlertTriangle className="w-10 h-10 animate-bounce-subtle" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-heading font-bold text-neu-heading">
                Something went wrong
              </h2>
              <p className="text-neu-muted text-sm font-body">
                {this.state.error?.message || "An unexpected application error occurred."}
              </p>
            </div>

            <div className="p-4 neu-pressed rounded-xl text-left overflow-auto max-h-32 text-xs font-mono text-red-500/80 bg-black/5 dark:bg-black/40 border border-black/5 dark:border-white/5">
              {this.state.error?.stack || "No detailed trace available."}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={this.handleReset}
                className="w-full sm:w-auto px-6 py-3 neu-btn rounded-xl text-sm font-semibold flex items-center justify-center gap-2 text-neu-heading hover:text-amber-500 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Reload Application
              </button>
              <a
                href="/"
                className="w-full sm:w-auto px-6 py-3 neu-btn rounded-xl text-sm font-semibold flex items-center justify-center gap-2 text-neu-muted hover:text-neu-heading transition-colors"
              >
                <Home className="w-4 h-4" />
                Back Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
