import { useEffect, useState } from "react";
import Charts from "./Charts";
import Silderbar from "./Silderbar";
import axios from 'axios';
import {server} from '../../constants/config';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const[users,setusers]=useState([]);
  const[constestlist,setcontestlist]=useState([]);
  const navigation=useNavigate();
  const [Issuelist, setIssuelist] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(`${server}/api/v1/getallusers`,{
          withCredentials:true
        });
        setusers(response.data.user);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchcontestlist=async()=>{
      try {
        const constresponse = await axios.get(`${server}/api/v1/getallcontest`,{
          withCredentials:true
        });
        setcontestlist(constresponse.data.contests)
      } catch (error) {
        console.error("Error fetching Contest:", error);
      }
    }
    const getAllIssues = async () => {
          try {
            const response = await axios.get(`${server}/api/v1/getallcontact`,{
              withCredentials:true
            });
            setIssuelist(response.data.data);
          } catch (error) {
            console.log("Error fetching issues", error);
          }
        };
      getAllIssues();
    fetchAllUsers();
    fetchcontestlist();
  }, []);

  const handleissue=()=>{
   navigation("/admin/issue")
  }

  return (
    <>
      <div className="min-h-screen flex">
        <div className="w-1/4 bg-gray-100 dark:bg-gray-900 shadow-md rounded-lg">
          <Silderbar />
        </div>
        <div className=" flex-grow bg-gray-100 dark:bg-gray-800 p-8">
          <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Welcome to the Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              This is the main content area. Use this space to display charts, tables, or other useful information.
            </p>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-blue-500 text-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-bold">Total Users</h2>
                <p className="text-4xl font-semibold mt-2">
                {users.length ? users.length : "Loading..."}
                </p>
              </div>
              <div className="bg-green-500 text-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-bold">Active Contests</h2>
                <p className="text-4xl font-semibold mt-2">
                   {constestlist.length+1 ? constestlist.length : "No Active Contset"}
                </p>
              </div>

              <div className="bg-red-500 text-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-bold"
                 onClick={handleissue}
                >Pending Issues</h2>
                <p className="text-4xl font-semibold mt-2">{Issuelist.length ? Issuelist.length : <h4>No Issue are there</h4>}</p>
              </div>
            </div>
            <div className="p-10 w-full h-[400px]">
            <Charts/>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Dashboard;
