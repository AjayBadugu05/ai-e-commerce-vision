import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Route missing:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background text-foreground">
      <div className="neu-flat-lg rounded-4xl p-10 max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl neu-pressed flex items-center justify-center text-primary mx-auto">
          <Sparkles className="w-10 h-10 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-6xl font-black text-foreground mb-2">404</h1>
          <p className="text-sm font-bold text-muted-foreground">Tactile Coordinate Not Found</p>
        </div>
        <Link to="/" className="inline-flex neu-btn-primary px-6 py-3.5 text-xs font-extrabold items-center gap-2">
          <ArrowLeft className="w-4 h-4 text-white" /> Return to Catalog
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
