import { AlertCircleIcon } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";

interface ErrorBoundaryState {
  hasError: boolean;
  countdown: number;
}

export class ErrorBoundary extends React.Component<any, ErrorBoundaryState> {
  timer: NodeJS.Timeout | null = null;

  constructor(props: any) {
    super(props);
    this.state = { hasError: false, countdown: 5 };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("App error:", error);
    toast.error("Erreur détectée. Veuillez contacter le développeur.");
  }

  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 w-full">
          <div className="max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
            <div className="flex justify-center mb-6">
              <AlertCircleIcon className="w-16 h-16 text-red-600" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Une erreur est survenue
            </h2>

            <p className="text-gray-600 mb-5 leading-relaxed">
              Cette page rarement est affichée. Nous avons détecté une erreur
              dans l'application. Veuillez contacter le developpeur.
            </p>

            <div className="mt-6 text-xs text-gray-400">
              Code erreur : <span className="font-mono">#500-GEN</span>
            </div>

            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="mt-6 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
            >
              Retourner au tableau de bord
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
