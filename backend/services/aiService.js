import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateProductDescription = async (
  productName,
  category,
  keyFeatures,
  tone = "Professional"
) => {
  const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
  });

  const prompt = `
You are an expert marketing copywriter.

Generate a product description for the following food product..

Product Name: ${productName}

Category: ${category}

Features:
${keyFeatures.join(", ")}

Tone: ${tone}

Rules:
- Around 4 lines 
-  Highlight freshness and quality.
-  Mention that the product is sourced from regional/local farmers whenever appropriate.
- Attractive and professional
- Mention benefits instead of only features
Mention health benefits when relevant.
- Be suitable for an e-commerce website.
- End with a call to action.
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
};