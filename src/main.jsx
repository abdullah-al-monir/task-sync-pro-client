import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Route from "./routes/Route";
import AuthProvider from "./providers/AuthProvider";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <RouterProvider router={Route} />{" "}
      </SnackbarProvider>
    </AuthProvider>
  </React.StrictMode>
);
