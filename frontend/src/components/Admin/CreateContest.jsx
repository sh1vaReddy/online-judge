import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { server } from "../../constants/config";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreateContest = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [problems, setProblems] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [user, setUser] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setUserInput(value);
    const response = await axios.get(`${server}/api/v1/getallusers`,{
      withCredentials:true
    });
    setUser(response.data.user);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setParticipants(selectAll ? [] : user.map((item) => item.username));
  };

  const handleUserSelect = (username) => {
    if (participants.includes(username)) {
      setParticipants(participants.filter((user) => user !== username));
    } else {
      setParticipants([...participants, username]);
    }
  };

  const handleProblemChange = (event) => {
    const value = event.target.value;
    const problemsArray = value.split(","); 
    setProblems(problemsArray);
  };

  const handleSubmit = async () => {
    const contestData = {
      name,
      description,
      startTime,
      endTime,
      problems,
      participants,
    };

    try {
      const response = await axios.post(`${server}/api/v1/create/contest`, contestData,{
        withCredentials:true
      });
      toast.success("Contest created successfully");
      console.log("Contest created successfully:", response.data);
    } catch (error) {
      toast.error("Creating Contest Get Error")
      console.error("Error creating contest:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-white">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-500 p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6">Create Contest</h1>

          <div className="mb-4">
            <label className="block text-sm font-medium">Contest Title</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Contest Start Time</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
                <DateTimePicker
                  label="Select Start Time"
                  value={startTime}
                  onChange={(newValue) => setStartTime(newValue)}
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Contest End Time</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
                <DateTimePicker
                  label="Select End Time"
                  value={endTime}
                  onChange={(newValue) => setEndTime(newValue)}
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Problems</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none"
              onChange={handleProblemChange}
              placeholder="Enter problems, separated by commas"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Users:</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none"
              value={userInput}
              onChange={handleInputChange}
            />
            <div className="mt-2">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="selectAll"
                  className="mr-2"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
                <label htmlFor="selectAll" className="text-sm">
                  Select All
                </label>
              </div>

              {user.length > 0 && !selectAll && (
                <ul className="bg-white dark:bg-gray-700 border rounded-lg max-h-40 overflow-y-auto">
                  {user.map((item, index) => (
                    <li key={index} className="p-2 flex items-center">
                      <input
                        type="checkbox"
                        id={`user-${index}`}
                        className="mr-2"
                        checked={participants.includes(item.username)}
                        onChange={() => handleUserSelect(item.username)}
                      />
                      <label htmlFor={`user-${index}`}>{item.username}</label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Create Contest
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateContest;
