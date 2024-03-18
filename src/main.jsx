import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// const base = "/charuhas10.github.io/";
// const base =
// process.env.NODE_ENV === "production" ? "/charuhas10.github.io/" : "/";
// basename={base}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
