import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import { ClerkProvider } from "@clerk/clerk-react";
// import ClerkAppearanceProvider from "./components/ClerkAppearanceProvider";

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <ClerkAppearanceProvider publishableKey={PUBLISHABLE_KEY}> */}
        <App />
      {/* </ClerkAppearanceProvider> */}
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
