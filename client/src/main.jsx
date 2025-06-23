import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { appStore } from "./app/store.js";
import { Toaster } from "./components/ui/sonner";
import { useLoadUserQuery } from "./features/api/authApi";
import LoadingSpinner from './utils/LoadingSpinner'

const CustomLoadingPage = ({ children }) => {
  const { isLoading } = useLoadUserQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <CustomLoadingPage>
        <App />
        <Toaster />
      </CustomLoadingPage>
    </Provider>
  </StrictMode>
);
