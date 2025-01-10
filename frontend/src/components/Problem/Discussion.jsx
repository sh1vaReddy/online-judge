import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NEW_DISCUSSION, GET_DISCUSSION } from "../util/Event";
import { io } from "socket.io-client";
import {server} from '../../constants/config';


const Discussion = () => {
  const socket = io(`${server}`, {
    withCredentials: true,
  });

  const [content, setContent] = useState("");
  const { id } = useParams();
  const [discussions, setDiscussions] = useState([]);
 


  useEffect(() => {
    socket.emit(GET_DISCUSSION, { id });
    socket.on(GET_DISCUSSION, (discussionData) => {
      setDiscussions(discussionData);
    });

    return () => {
      socket.off(GET_DISCUSSION); 
      socket.disconnect();
    };
  }, [id,socket]);

  const handleSendMessage = () => {
    if (content.trim() === "") {
      alert("Message cannot be empty.");
      return;
    }
    socket.emit(NEW_DISCUSSION, { content, id }, (error) => {
      if (error) {
        alert("Failed to send message. Please try again.");
      } else {
        setContent("");
      }
    });
  };

  return (
    <div className="flex flex-col h-[550px] bg-gray-100">
      <div className="flex-grow overflow-auto p-4 dark:bg-gray-700">
        <h1 className="text-xl font-semibold mb-4 ">Welcome to the discussion</h1>
        <ul className="space-y-4 ">
          {discussions.map((item, index) => (
            <li key={index} className="bg-white shadow-md rounded-md p-4 dark:bg-gray-600">
              <h2 className="text-lg font-bold text-gray-700 dark:text-white">{item.user_name}</h2>
              <p className="text-gray-600 dark:text-gray-100">{item.content}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 bg-white shadow-md sticky bottom-0 dark:bg-gray-700">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500
            dark:text-black
            "
            placeholder="Type your message..."
            aria-label="Type your message"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Discussion;
