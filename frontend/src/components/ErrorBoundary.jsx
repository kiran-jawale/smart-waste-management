import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Application Error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-white to-emerald-50 px-4 dark:from-[#0f172a] dark:via-slate-900 dark:to-slate-950">
          <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
            <div className="border-b border-gray-200 bg-emerald-50 px-8 py-6 dark:border-slate-700 dark:bg-emerald-500/10">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-4xl shadow-sm dark:bg-slate-800">
                  ⚠️
                </div>

                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Something went wrong
                  </h1>

                  <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
                    SmartPeepal encountered an unexpected error.
                  </p>
                </div>
              </div>
            </div>

            <div className="px-8 py-8">
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-500/20 dark:bg-amber-500/10">
                <p className="text-sm leading-relaxed text-amber-800 dark:text-amber-200">
                  The application failed while rendering this page. You can try
                  refreshing the application to continue using the platform.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={this.handleReload}
                  className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-700"
                >
                  Reload Application
                </button>

                <button
                  onClick={() => window.history.back()}
                  className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  Go Back
                </button>
              </div>

              {import.meta.env.DEV && this.state.error && (
                <div className="mt-8 overflow-auto rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-500/20 dark:bg-red-500/10">
                  <h2 className="mb-3 text-sm font-semibold text-red-700 dark:text-red-300">
                    Development Error Details
                  </h2>

                  <pre className="whitespace-pre-wrap break-words text-xs leading-relaxed text-red-600 dark:text-red-400">
                    {this.state.error.toString()}
                  </pre>
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