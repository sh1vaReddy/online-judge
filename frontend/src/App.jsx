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
const ProblemCreation=lazy(()=>import('./components/Admin/ProblemCreation.jsx'));
const ProblemList=lazy(()=>import('./components/Home/ProblemList.jsx'))
const ProblemDelte=lazy(()=>import('./components/Admin/ProblemDelete.jsx'))

const App = () => {
  return (
    <>
     <ToastContainer/>
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<div><Loader/></div>}>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route path="/" element={<ProblemDelte />} />
              <Route path="/sing" element={<Login />} />
              <Route path="/create/problem" element={<ProblemCreation/>} />
              <Route path='/compiler'element={<Compiler/>}/>
              <Route path='/problem/:id' element={<Editor/>}/>
              <Route path='/problem' element={<ProblemList/>}/>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
    </>
   
  );
};

export default App;
