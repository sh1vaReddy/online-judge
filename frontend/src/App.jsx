import { lazy, Suspense } from "react";
import { ThemeProvider } from "./ThemeContext.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";


const Home = lazy(() => import("./components/Home/Home.jsx"));
const Login=lazy(()=>import("./components/Loginandsinup/Loginandsingup.jsx"));
const Editor=lazy(()=>import("./components/Problem/Editor.jsx"));

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/sing' element={<Login/>}/>
            <Route path='/problem' element={<Editor/>}/>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
