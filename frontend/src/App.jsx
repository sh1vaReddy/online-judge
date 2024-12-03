import { lazy, Suspense, useEffect } from "react";
import { ThemeProvider } from "./ThemeContext.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Loader from "./components/Home/Loader.jsx";
import {server} from './constants/config.jsx';
import {useDispatch} from 'react-redux';
import axios from "axios";

const Home = lazy(() => import("./components/Home/Home.jsx"));
const Login = lazy(() => import("./components/Loginandsinup/Loginandsingup.jsx"));
const Editor = lazy(() => import("./components/Problem/Editor.jsx"));
const Compiler=lazy(()=>import('./components/Compiler/Compiler.jsx'));
const ProblemCreation=lazy(()=>import('./components/Admin/ProblemCreation.jsx'));
const ProblemList=lazy(()=>import('./components/Home/ProblemList.jsx'))
const ProblemDelete=lazy(()=>import('./components/Admin/ProblemDelete.jsx'))
const ProblemUpdate=lazy(()=>import('./components/Admin/ProblemUpdate.jsx'));

const App = () => {
  

   

  return (
    <>
     <ToastContainer/>
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<div><Loader/></div>}>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route path="/" element={<Home/>} />
              <Route path="/sing" element={<Login />} />
              <Route path="/problem/create" element={<ProblemCreation/>} />
              <Route path='/compiler'element={<Compiler/>}/>
              <Route path='/problem/:id' element={<Editor/>}/>
              <Route path='/problem' element={<ProblemList/>}/>
              <Route path='/problem/update' element={<ProblemUpdate/>}/>
              <Route path='/problme/delete' element={<ProblemDelete/>}/>
              <Route path='/contest' element={<ProblemCreation/>}/>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
    </>
   
  );
};

export default App;
