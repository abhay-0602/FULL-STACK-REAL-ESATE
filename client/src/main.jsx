import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {Auth0Provider} from "@auth0/auth0-react";
ReactDOM.createRoot(document.getElementById("root")).render(
 
    <Auth0Provider
    domain="dev-j3ksej363jexapkt.us.auth0.com"
    clientId="WJbXvAZb0I6cRjjxbveoau0KpRa9rruI"
    authorizationParams={{
      redirect_uri:"http://localhost:5173"
    }}
    audience="http://localhost:8000"
    scope="openid profile email"
    >
    <App />
    </Auth0Provider>
 

);
