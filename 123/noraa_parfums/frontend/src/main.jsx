import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { RegionProvider } from "./components/RegionContext";
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const queryClient = new QueryClient();

console.log('DEBUG: main.jsx is running');
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RegionProvider>
      <App />
    </RegionProvider>
  </QueryClientProvider>
);