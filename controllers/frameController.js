import Frame from "../model/frameModel.js";

export const createFrame = async (req, res) => {
  try {
    const frame = new Frame(req.body);
    await frame.save();

    return res.status(201).json({ success: true, frame });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error });
  }
};

export const getAllFrames = async (req, res) => {
  try {
    const frames = await Frame.find();
    return res
      .status(200)
      .json({ success: true, message: "Frames fetched successfully", frames });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error });
  }
};
