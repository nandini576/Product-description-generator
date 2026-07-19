import { generateProductDescription } from "../services/aiService.js";

export const generateDescription = async (req, res, next) => {
  try {
    const {
      productName,
      category,
      keyFeatures,
       tone = "Professional",
    } = req.body;

    if (!productName || !category || !keyFeatures) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const description =
      await generateProductDescription(
        productName,
        category,
        keyFeatures,
        tone
      );

    res.status(200).json({
      success: true,
      description,
    });

  } catch (error) {
    next(error);
  }
};