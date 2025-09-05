import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Import Slick carousel styles for the carousels
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import original site styles so layout/design remains unchanged
import "./assets/css/bootstrap.css";
import "./assets/css/style.css";

// Import carousel and horizontal scroll fixes
import "./assets/css/carousel-fixes.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
