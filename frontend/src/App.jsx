import { lazy, Suspense } from "react";
import { ThemeProvider } from "./ThemeContext.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";


const Home = lazy(() => import("./components/Home/Home.jsx"));
const Login=lazy(()=>import("./components/Loginandsinup/Loginandsingup.jsx"))

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/sing' element={<Login/>}/>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
