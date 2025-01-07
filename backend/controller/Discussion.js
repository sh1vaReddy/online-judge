import { DiscussModel } from "../model/DiscussionSchema.js";
import { UserModel } from "../model/User.js";
import { GET_DISSCUSSION } from "../constants/event.js";

export const createDiscussion = async (socket, { id, content }) => {
  try {
    const user = await UserModel.findById(socket.user._id);
    if (!user) {
      throw new Error("User not found");
    }
    await DiscussModel.create({
      problem_id: id,
      user_id: socket.user._id,
      user_name: user.username,
      content,
    });
    console.log("New discussion added:", content);
  } catch (error) {
    console.error("Error adding discussion:", error);
    socket.emit("error", { message: "Failed to add discussion" });
  }
};

export const handleGetDiscussion = async (socket, { id }) => {
  try {
    const discussions = await DiscussModel.find({ problem_id: id });
    socket.emit(GET_DISSCUSSION, discussions);
  } catch (error) {
    console.error("Error fetching discussions:", error);
    socket.emit(GET_DISSCUSSION, []);
  }
};
