import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import problemapi from "./redux/Problemapi.js";


const store = configureStore({
    reducer: {
      [problemapi.reducerPath]: problemapi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(problemapi.middleware),
  });


createRoot(document.getElementById("root")).render(
<Provider store={store}>
<App />
</Provider>


);
