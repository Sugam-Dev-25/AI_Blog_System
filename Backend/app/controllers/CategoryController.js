const Category = require("../models/Category");
const slugify = require("slugify");

class CategoryController {
  async createCategory(req, res) {
    try {
      const { name, description } = req.body;

      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: "Category already exists",
        });
      }

      const category = await Category.create({
        name,
        description,
        slug: slugify(name, {
          lower: true,
          strict: true,
        }),
      });

      return res.status(200).json({
        success: true,
        message: "Category created successfully",
        category,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }

  async getAllCategories(req, res) {
    try {
      const categories = await Category.find({}).sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        message: "Categories fetched successfully",
        categories,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }

  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      category.name = name;
      category.description = description;
      category.slug = slugify(name, {
        lower: true,
        strict: true,
      });

      await category.save();

      return res.status(200).json({
        success: true,
        message: "Category updated successfully",
        category,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }

  async deleteCategory(req, res) {
    try {
      const { id } = req.params;

      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      await category.deleteOne();

      return res.status(200).json({
        success: true,
        message: "Category deleted successfully",
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

module.exports = new CategoryController();
