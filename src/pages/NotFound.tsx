import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center px-4">
        <h1 className="font-serif text-8xl md:text-9xl font-bold mb-4">404</h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          Page not found
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center h-11 px-8 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
