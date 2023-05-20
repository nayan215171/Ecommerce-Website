import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppProvider } from "./context/productcontext";
import { FilterContextProvider } from "./context/Filtercontext";
import { CartProvider } from "./context/Cartcontext";
import { Auth0Provider } from "@auth0/auth0-react";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
  domain="dev-zb1d8pg8agkldlau.us.auth0.com"
  clientId="WH27QIcpHDJVdPXRgm4LrlukE8EFXivk"
  authorizationParams={{
    redirect_uri: window.location.origin
  }}
>
    <AppProvider>
        <FilterContextProvider>
            <CartProvider>
                <App />
            </CartProvider>

        </FilterContextProvider>
    </AppProvider>
    </Auth0Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
