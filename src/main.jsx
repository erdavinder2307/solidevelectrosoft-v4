import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initContactClickConversions } from "./utils/adsConversions";

// Import Slick carousel styles for the carousels
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import original site styles so layout/design remains unchanged
import "./assets/css/bootstrap.css";
import "./assets/css/style.css";

// Import carousel and horizontal scroll fixes
import "./assets/css/carousel-fixes.css";

// Google Ads 'contact' conversions for WhatsApp / phone / email link clicks
initContactClickConversions();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
