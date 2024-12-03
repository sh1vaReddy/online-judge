import { lazy, Suspense, useEffect } from "react";
import { ThemeProvider } from "./ThemeContext.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "./components/Home/Loader.jsx";
import { server } from './constants/config.jsx';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { userExists, userNotExists } from "./redux/reducers/authslice.js";
import ProtectRoute from './components/auth/ProtectRoute.jsx';

const Home = lazy(() => import("./components/Home/Home.jsx"));
const Login = lazy(() => import("./components/Loginandsinup/Loginandsingup.jsx"));
const Editor = lazy(() => import("./components/Problem/Editor.jsx"));
const Compiler = lazy(() => import('./components/Compiler/Compiler.jsx'));
const ProblemCreation = lazy(() => import('./components/Admin/ProblemCreation.jsx'));
const ProblemList = lazy(() => import('./components/Home/ProblemList.jsx'));
const ProblemDelete = lazy(() => import('./components/Admin/ProblemDelete.jsx'));
const ProblemUpdate = lazy(() => import('./components/Admin/ProblemUpdate.jsx'));

const App = () => {
  const dispatch = useDispatch();
  const { user} = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${server}/api/v1/me`, { withCredentials: true });
        dispatch(userExists(response.data.data)); 
      } catch (error) {
        dispatch(userNotExists()); 
      }
    };

    fetchUserData(); 
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <ThemeProvider>
        <BrowserRouter>
          <Suspense fallback={<div><Loader /></div>}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/compiler" element={<Compiler />} />
                <Route path="/problem/:id" element={<Editor />} />
                <Route path="/problem" element={<ProblemList />} />
              </Route>

              {/* Protect Routes */}
              <Route element={<ProtectRoute user={user}   requirerole="admin" redirect="/login" />}>
                <Route path="/problem/create" element={<ProblemCreation />} />
                <Route path="/problem/update" element={<ProblemUpdate />} />
                <Route path="/problem/delete" element={<ProblemDelete />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
