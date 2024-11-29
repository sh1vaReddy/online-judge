import { lazy, Suspense } from "react";
import { ThemeProvider } from "./ThemeContext.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Loader from "./components/Home/Loader.jsx";

const Home = lazy(() => import("./components/Home/Home.jsx"));
const Login = lazy(() => import("./components/Loginandsinup/Loginandsingup.jsx"));
const Editor = lazy(() => import("./components/Problem/Editor.jsx"));
const Compiler=lazy(()=>import('./components/Compiler/Compiler.jsx'));
const Problem=lazy(()=>import('./components/Admin/ProblemCreation.jsx'));

const App = () => {
  return (
    <>
     <ToastContainer/>
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<div><Loader/></div>}>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route path="/" element={<Home />} />
              <Route path="/sing" element={<Login />} />
              <Route path="/create/problem" element={<Problem/>} />
              <Route path='/compiler'element={<Compiler/>}/>
              <Route path='/problem/:id' element={<Editor/>}/>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
    </>
   
  );
};

export default App;
