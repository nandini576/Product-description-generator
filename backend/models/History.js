import mongoose from "mongoose";
const historySchema = new mongoose.Schema({
    // "userId": {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    "productName": {type: String, required: true},
    "category": {type: String, required: true},
    "description": {type: String, required: true},
    "keyFeatures": {type: [String], required: true},
},{"timestamps": true})
export default mongoose.model("History", historySchema)