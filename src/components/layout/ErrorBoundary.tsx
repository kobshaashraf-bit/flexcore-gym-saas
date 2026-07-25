import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // In production this would report to an error-tracking service
    // (Sentry, LogRocket, etc). Logged here so failures are never silent.
    console.error("Unhandled application error:", error, info.componentStack);
  }

  private handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center">
          <Logo />
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10">
            <AlertTriangle className="h-7 w-7 text-destructive" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight">Something went wrong</h1>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              An unexpected error occurred while rendering this page. You can try reloading, or head
              back to your dashboard.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button onClick={this.handleReload} className="gap-2">
              <RefreshCcw className="h-4 w-4" /> Reload app
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <a href="/dashboard">
                <Home className="h-4 w-4" /> Go to dashboard
              </a>
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
