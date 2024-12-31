import { useState } from "react";
import axios from "axios";
import { server } from "../../constants/config";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { name, email, message };

    try {
      const res = await axios.post(`${server}/api/v1/conatct`, formData);
      setResponse({ type: "success", message: res.data.message });
      setName(" ");
      setMessage(" ");
      setEmail(" ");
    } catch (error) {
      setResponse({
        type: "error",
        message: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="h-full py-40 dark:bg-gray-900 bg-gray-200">
      <div className="p-4 mx-auto max-w-xl bg-white font-sans rounded-xl">
        <h1 className="text-2xl text-gray-800 font-bold text-center">
          Contact Us
        </h1>
        {response && (
          <div
            className={`p-4 mb-4 ${
              response.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {response.message}
          </div>
        )}
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full py-4 px-4 rounded-lg text-gray-800 bg-gray-100 border focus:border-black focus:bg-transparent text-sm outline-none transition-all"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-4 px-4 rounded-lg text-gray-800 bg-gray-100 border focus:border-black focus:bg-transparent text-sm outline-none transition-all"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Enter Your Issue"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              className="w-full px-4 rounded-lg text-gray-800 bg-gray-100 border focus:border-black focus:bg-transparent text-sm pt-3 outline-none transition-all"
              required
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="text-white rounded bg-black mt-6 hover:bg-gray-900 tracking-wide text-sm px-4 py-2.5 w-full outline-none"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
