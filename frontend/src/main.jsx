import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import problemapi from "./redux/Problemapi.js";
import authSLice from "./redux/reducers/authslice.js";
import { StrictMode } from "react";


const store = configureStore({
    reducer: {
      [problemapi.reducerPath]: problemapi.reducer,
      [authSLice.name]:authSLice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(problemapi.middleware),
  });


createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <StrictMode>
    <App />
  </StrictMode>
</Provider>


);
