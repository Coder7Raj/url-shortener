import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import router from "./routes/router.jsx";
import useAuthStore from "./store/auth.store.js";

const App = () => {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  const isInitializing = useAuthStore((state) => state.isInitializing);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return <RouterProvider router={router} />;
};

export default App;
