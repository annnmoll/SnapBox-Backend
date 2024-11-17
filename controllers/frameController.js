import Frame from "../model/frameModel.js";

export const createFrame = async (req, res) => {
  try {
    const isExist = await Frame.findOne({ name: req.body.name });
    if (isExist) {
      return res
        .status(400)
        .json({ success: false, message: "Frame already exists" });
    }
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

export const deleteFrame = async (req, res) => {
  try {
    const frame = await Frame.findById(req.params.id);
    if (!frame) {
      return res
        .status(404)
        .json({ success: false, message: "Frame not found" });
    }
    await frame.remove();
    return res
      .status(200)
      .json({ success: true, message: "Frame deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error });
  }
};

export const updateFrame = async (req, res) => {
  try {
    const { id } = req.params;

    const isExist = await Frame.findById(id);
    if (!isExist) {
      return res
        .status(404)
        .json({ success: false, message: "Frame not found" });
    }

    const frame = await Frame.findByIdAndUpdate(id, req.body, { new: true });

    return res
      .status(200)
      .json({ success: true, message: "Frame updated successfully", frame });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error });
  }
};
