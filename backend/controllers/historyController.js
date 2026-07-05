import History from "../models/History.js";

export const createHistory = async (req, res, next) => {
  try {
    const {productName,category,keyFeatures,description}= req.body;
    if (!productName || !category || !keyFeatures || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const history = await History.create({productName,category,keyFeatures,description});
    res.status(201).json({
      success: true,
      message: "History created successfully",
      data: history,
    });
  } catch (error) {
    next(error);
  }
};
export const getAllHistory = async (req, res, next) => {
  try {
    const history = await History.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (error) {
    next(error);
  }
};
export const getHistoryById = async (req, res, next) => {
  try {
    const history = await History.findById(req.params.id);
    if (!history) {
      return res.status(404).json({
        success: false,
        message: "History not found",
      });
    }
    res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    next(error);
  }
};
export const updateHistory = async (req, res, next) => {
  try {
    const history = await History.findByIdAndUpdate(req.params.id,req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!history) {
      return res.status(404).json({
        success: false,
        message: "History not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "History updated successfully",
      data: history,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteHistory = async (req, res, next) => {
  try {
    const history = await History.findByIdAndDelete(req.params.id);
    if (!history) {
      return res.status(404).json({
        success: false,
        message: "History not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "History deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const searchHistory = async (req, res, next) => {
  try {
    const query = req.query.q || "";

    const history = await History.find({
      productName: {
        $regex: query,
        $options: "i",
      },
    });
    res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (error) {
    next(error);
  }
};