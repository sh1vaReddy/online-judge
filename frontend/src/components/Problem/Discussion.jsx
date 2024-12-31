import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NEW_DISCUSSION, GET_DISSCUSSION } from "../util/Event";
import { getsocket } from "../../Socket";

const Discussion = () => {
  const socket = getsocket();
  const [content, setContent] = useState("");
  const { id } = useParams();
  const [Message, setMessage] = useState([]);

  useEffect(() => {
    console.log("Connecting to WebSocket");
    socket.on("connect", () => {
      console.log("Connected to WebSocket:", socket.id);
    });

    socket.on(GET_DISSCUSSION, (discussions) => {
      setMessage(discussions);
    });

    socket.emit(GET_DISSCUSSION, { id });

    return () => {
      socket.off("connect");
      socket.disconnect();
      console.log("Disconnected from WebSocket");
    };
  }, [id]);

  const handleSendMessage = () => {
    socket.emit(NEW_DISCUSSION, {
      content,
      id,
    });
    setContent("");
  };

  return (
    <div className="flex flex-col h-[550px] bg-gray-100">
      <div className="flex-grow overflow-auto p-4">
        <h1 className="text-xl font-semibold mb-4">Welcome to the discussion</h1>
        <ul className="space-y-4">
          {Message.map((item) => (
            <li
              key={item._id}
              className="bg-white shadow-md rounded-md p-4"
            >
              <h2 className="text-lg font-bold text-gray-700">{item.user_name}</h2>
              <p className="text-gray-600">{item.content}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 bg-white shadow-md sticky bottom-0">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
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
