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
import { useState } from "react";

const Home = lazy(() => import("./components/Home/Home.jsx"));
const Login = lazy(() => import("./components/Loginandsinup/Loginandsingup.jsx"));
const Editor = lazy(() => import("./components/Problem/Editor.jsx"));
const Compiler = lazy(() => import('./components/Compiler/Compiler.jsx'));
const ProblemCreation = lazy(() => import('./components/Admin/ProblemCreation.jsx'));
const ProblemList = lazy(() => import('./components/Home/ProblemList.jsx'));
const ProblemDelete = lazy(() => import('./components/Admin/ProblemDelete.jsx'));
const ProblemUpdate = lazy(() => import('./components/Admin/ProblemUpdate.jsx'));
const Unauthorized =lazy(()=>import('./components/Admin/unauthorized.jsx'));
const Dashboard=lazy(()=>import('./components/Admin/Dashborad.jsx'));

const App = () => {
  const dispatch = useDispatch();
  const { user} = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${server}/api/v1/me`, { withCredentials: true });
        dispatch(userExists(response.data.data));
      } catch (error) {
        dispatch(userNotExists());
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

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
                <Route path='/unauthorized' element={<Unauthorized/>}/>
              </Route>

              {/* Protect Routes */}
              <Route element={<ProtectRoute user={user}  role={user?.role} requirerole="admin" redirect="/login" />}>
                <Route path="/admin/problem/create" element={<ProblemCreation />} />
                <Route path="/admin/problem/update" element={<ProblemUpdate />} />
                <Route path="/admin/problem/delete" element={<ProblemDelete />} />
                <Route path="/admin/dashboard" element={<Dashboard/>}/>
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
