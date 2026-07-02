const Blog = require("../models/Blog");
const slugify = require("slugify");
const Category = require("../models/Category");

class BlogController {

    async createBlog(req, res) {
        try {
            const { title, content, excerpt, category, tags, seoTitle, seoDescription } = req.body;

            const categoryExists = await Category.findById(category);
            if (!categoryExists) {
                return res.status(400).json({
                    success: false,
                    message: "Category does not exist",
                });
            }

            const blog = await Blog.create({
                title,
                content,
                excerpt,
                category,
                tags,
                seoTitle,
                seoDescription,
                slug: slugify(title, {
                    lower: true,
                    strict: true,
                }),
                author: req.user._id,
                status: "draft",
            });

            return res.status(200).json({
                success: true,
                message: "Blog created successfully",
                blog,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong",
            });
        }
    }
    async getMyBlogs(req, res) {
        try {
            const blogs = await Blog.find({ author: req.user._id })
            .populate("category", "name slug") 
            .sort({ createdAt: -1 });
            return res.status(200).json({
                success: true,
                message: "Blogs fetched successfully",
                blogs,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong",
            });
        }
    }
    async updateBlog(req, res) {
        try {
            const { id } = req.params;
            const { title, content, excerpt, category, tags, seoTitle, seoDescription } = req.body;

            const blog = await Blog.findById(id);
            if (!blog) {
                return res.status(404).json({
                    success: false,
                    message: "Blog not found",
                });
            }
            if (
                blog.status === "published" ||
                blog.status === "pending" ||
                blog.status === "archived"
            
            ){
                return res.status(400).json({
                    success: false,
                    message: "Cannot update a published blog",
                });
            }

            const categoryExists = await Category.findById(category);
            if (!categoryExists) {
                return res.status(400).json({
                    success: false,
                    message: "Category does not exist",
                });
            }

            blog.title = title;
            blog.content = content;
            blog.excerpt = excerpt;
            blog.category = category;
            blog.tags = tags;
            blog.seoTitle = seoTitle;
            blog.seoDescription = seoDescription;
            blog.slug = slugify(title, {
                lower: true,
                strict: true,
            });

            await blog.save();

            return res.status(200).json({
                success: true,
                message: "Blog updated successfully",
                blog,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong",
            });
        }
    }
    async deleteBlog(req, res) {
        try {
            const { id } = req.params;

            const blog = await Blog.findOne({
                _id: id,
                author: req.user._id,
            });

            if (!blog) {
                return res.status(404).json({
                    success: false,
                    message: "Blog not found",
                });
            }

            if (
                blog.status === "published" ||
                blog.status === "pending" ||
                blog.status === "archived"
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Cannot delete a published blog",
                });
            }

            await blog.deleteOne();

            return res.status(200).json({
                success: true,
                message: "Blog deleted successfully",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong",
            });
        }
    }

    async submitForReview(req, res) {
        try {
            const { id } = req.params;

            const blog = await Blog.findOne({
                _id: id,
                author: req.user._id,
            });

            if (!blog) {
                return res.status(404).json({
                    success: false,
                    message: "Blog not found",
                });
            }

            if (blog.status !== "draft") {
                return res.status(400).json({
                    success: false,
                    message: "Only draft blogs can be submitted for review",
                });
            }

            blog.status = "pending";
            await blog.save();

            return res.status(200).json({
                success: true,
                message: "Blog submitted for review successfully",
                blog,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong",
            });
        }
    }

    async getPendingBlogs(req, res) {
        try {
            const blogs = await Blog.find({ status: "pending" })
                .populate("category", "name slug")
                .sort({ createdAt: -1 });
            return res.status(200).json({
                success: true,
                message: "Blogs fetched successfully",
                blogs,
                totalBlogs: blogs.length,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong",
            });
        }
    }

    async publishBlog(req, res) {
        try {
            const { id } = req.params;

            const blog = await Blog.findById(id);
            if (!blog) {
                return res.status(404).json({
                    success: false,
                    message: "Blog not found",
                });
            }

            if (blog.status !== "pending") {
                return res.status(400).json({
                    success: false,
                    message: "Only pending blogs can be published",
                });
            }

            blog.status = "published";
            await blog.save();

            return res.status(200).json({
                success: true,
                message: "Blog published successfully",
                blog,
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong",
            });
        }
    }
    

}

module.exports = new BlogController();