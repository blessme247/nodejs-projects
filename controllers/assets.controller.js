import mongoose from "mongoose";
import User from "../model/User.js";
import Asset from "../model/Asset.js";

const getAllAssets = async (req, res) => {
  const assets = await Asset.find().exec();
  if (!assets) return res.status(204).json({ message: "No assets found." });
  return res.status(200).json(assets);
};

const getSingleUserAssets = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "id parameter is required" });
    }
    const user = await User.findById(id).exec();
    // console.log(user, 'userr')
    if (!user)
      return res.status(404).json({ message: `User with ${id} not found` });

    const assets = await Asset.find({ user: user._id }).exec();
    return res.status(200).json(assets);
  } catch (error) {
    // console.log(error, 'error in catch block')
    // console.log(error.reason, 'error reson in catch block')
    if (error instanceof mongoose.Error) {
      if (error.name === "CastError") {
        return res.status(400).json({ message: "Invalid user id" });
      }
      // return res.status(400).json({"message": error?.reason})
    } else {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default {
  getAllAssets,
  getSingleUserAssets,
};
