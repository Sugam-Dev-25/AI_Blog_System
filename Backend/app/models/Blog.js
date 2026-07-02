const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug:{
            type: String,
            required: true,
            unique: true,

        },
        featuredImage: {
            type: String,
            default: "",
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        tags: [
            {
                type: String,
                trim: true,
            }
        ],
        content: {
            type: String,
            required: true,
        },
        excerpt: {
            type: String,
            required: true,
        },
        seoTitle:{
            type: String,
            default: "",
        },
        seoDescription: {
            type: String,
            default: "",
        },
        status:{
            type: String,
            default: "draft",
            enum: ["draft", "pending", "published", "rejected", "archived",],
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,    
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("Blog", blogSchema);