import { DiscussModel } from '../model/DiscussionSchema.js';
import { trycatchmethod } from "../middleware/trycatchmethod.js";

export const createDiscussion = trycatchmethod(async (req, res) => {
    const { problem_id, title, content } = req.body;

    const discussion = await DiscussModel.create({
        problem_id,
        user_id: req.user._id, 
        title,
        content,
    });

    res.status(201).json({ success: true, discussion });
});
