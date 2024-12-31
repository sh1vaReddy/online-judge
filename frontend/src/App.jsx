import { lazy, Suspense, useEffect, useState } from "react";
import { ThemeProvider } from "./ThemeContext.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Home/Loader.jsx";
import { server } from "./constants/config.jsx";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { userExists, userNotExists } from "./redux/reducers/authslice.js";
import ProtectRoute from "./components/auth/ProtectRoute.jsx";
import { SocketProvider } from "./Socket";

const Home = lazy(() => import("./components/Home/Home.jsx"));
const Login = lazy(() =>
  import("./components/Loginandsinup/Loginandsingup.jsx")
);
const Editor = lazy(() => import("./components/Problem/Editor.jsx"));
const Compiler = lazy(() => import("./components/Compiler/Compiler.jsx"));
const ProblemCreation = lazy(() =>
  import("./components/Admin/ProblemCreation.jsx")
);
const ProblemList = lazy(() => import("./components/Home/ProblemList.jsx"));
const ProblemDelete = lazy(() =>
  import("./components/Admin/ProblemDelete.jsx")
);
const ProblemUpdate = lazy(() =>
  import("./components/Admin/ProblemUpdate.jsx")
);
const Unauthorized = lazy(() => import("./components/Admin/unauthorized.jsx"));
const Dashboard = lazy(() => import("./components/Admin/Dashborad.jsx"));
const AdminCreateContest = lazy(() => import("./components/Admin/CreateContest.jsx"));
const Assignment = lazy(() => import("./components/Contest/Assignment.jsx"));
const ContestList = lazy(() => import("./components/Contest/Contestlist.jsx"));
const UserProfile = lazy(() => import("./components/Header/UserProfile.jsx"));
const ContestProblem = lazy(() => import("./components/Contest/ContestProblem.jsx"));
const Leaderboard = lazy(() => import("./components/Home/Leaderboard.jsx"));
const AdminMonitorcontest=lazy(()=>import("./components/Admin/Monitringcontest.jsx"))
const AdminDelteContest=lazy(()=>import('./components/Admin/DeleteContest.jsx'))
const Conatct=lazy(()=>import('./components/Header/Contact.jsx'));
const GetIssue=lazy(()=>import('./components/Admin/Getallissuse.jsx'));
const UpdateIssue=lazy(()=>import('./components/Admin/UpdateIssue.jsx'));
const Discussion=lazy(()=>import('./components/Problem/Discussion.jsx'));

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${server}/api/v1/me`, {
          withCredentials: true,
        });
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
      <SocketProvider> {/* Move SocketProvider here */}
        <ThemeProvider>
          <BrowserRouter>
            <Suspense fallback={<Loader />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Layout />}>
                  <Route path="/Discussion" element={<Discussion />} />
                  <Route index element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/compiler" element={<Compiler />} />
                  <Route path="/problem/:id" element={<Editor />} />
                  <Route path="/problem" element={<ProblemList />} />
                  <Route path="/unauthorized" element={<Unauthorized />} />
                  <Route path="/Conatct" element={<Conatct />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/profile" element={<UserProfile />} />
                <Route path="/contest" element={<ContestList />} />
                <Route path='/Assignment/:id' element={<Assignment/>}/>
                <Route path='/Contest/problem/:id' element={<ContestProblem/>}/>
                </Route>
  
                {/* Protected Routes */}
                
  
                {/* Admin Protected Routes */}
                <Route
                  element={
                    <ProtectRoute
                      user={user}
                      role={user?.role}
                      requirerole="admin"
                      redirect="/login"
                    />
                  }
                >
                  <Route path="/admin/create/contest" element={<AdminCreateContest />} />
                  <Route path="/admin/contest/monitor" element={<AdminMonitorcontest />} />
                  <Route path="/admin/contest/delete" element={<AdminDelteContest />} />
                  <Route path="/admin/problem/create" element={<ProblemCreation />} />
                  <Route path="/admin/problem/update" element={<ProblemUpdate />} />
                  <Route path="/admin/problem/delete" element={<ProblemDelete />} />
                  <Route path="/admin/dashboard" element={<Dashboard />} />
                  <Route path="/admin/issue" element={<GetIssue />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/admin/Issue/update/:id" element={<UpdateIssue />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ThemeProvider>
      </SocketProvider>
    </>
  );
  
};

export default App;
