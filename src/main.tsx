import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ModalContextProvider } from "./contexts/modalContext.tsx";
import { CartContextProvider } from "./contexts/CartContext.tsx";
import { UserContextprovider } from "./contexts/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ModalContextProvider>
    <CartContextProvider>
      <UserContextprovider>
        <React.StrictMode>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </React.StrictMode>
      </UserContextprovider>
    </CartContextProvider>
  </ModalContextProvider>
);
