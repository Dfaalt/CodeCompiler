import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center px-6">
      <div className="space-y-4 text-center">
        <h1 className="text-7xl font-extrabold tracking-tight opacity-70">
          404
        </h1>
        <p className="text-lg opacity-80">Oops! Page not found</p>

        <Button asChild className="mt-2">
          <a href="/">Back to Home</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
