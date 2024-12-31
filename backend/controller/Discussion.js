import { DiscussModel } from '../model/DiscussionSchema.js';
import { trycatchmethod } from "../middleware/trycatchmethod.js";

export const createDiscussion = trycatchmethod(async (req, res) => {
    const { problem_id, content } = req.body;

    const discussion = await DiscussModel.create({
        problem_id,
        user_id: req.user._id, 
        content,
    });

    res.status(201).json({ success: true, discussion });
});
