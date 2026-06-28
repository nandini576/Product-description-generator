import { v4 as uuid } from "uuid";
let history = [];
// CREATE
export const createHistory = (req, res) => {
    const { productName, category, keyFeatures, description } = req.body;
    if (!productName || !category || !keyFeatures || !description) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }
    const newHistory = {
        id: uuid(),
        productName,
        category,
        keyFeatures,
        description
    };
    history.push(newHistory);
    res.status(201).json({
        success: true,
        message: "History added successfully",
        data: newHistory
    });
};
// GET ALL
export const getAllHistory = (req, res) => {
    res.status(200).json({
        success: true,
        count: history.length,
        data: history
    });
};
// GET SINGLE
export const getHistoryById = (req, res) => {
    const item = history.find(h => h.id === req.params.id);
    if (!item) {
        return res.status(404).json({
            success: false,
            message: "History not found"
        });
    }
    res.status(200).json({
        success: true,
        data: item
    });
};
// UPDATE
export const updateHistory = (req, res) => {
    const index = history.findIndex(h => h.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "History not found"
        });
    }
    history[index] = {
        ...history[index],
        ...req.body
    };
    res.status(200).json({
        success: true,
        message: "History updated",
        data: history[index]
    });
};
// DELETE
export const deleteHistory = (req, res) => {
    const index = history.findIndex(h => h.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "History not found"
        });
    }
    history.splice(index, 1);
    res.status(204).send();
};
// SEARCH
export const searchHistory = (req, res) => {
    const query = req.query.q?.toLowerCase() || "";
    const result = history.filter(item =>
        item.productName.toLowerCase().includes(query)
    );
    res.status(200).json({
        success: true,
        count: result.length,
        data: result
    });
};