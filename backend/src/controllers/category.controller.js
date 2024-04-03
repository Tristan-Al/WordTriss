import { Category } from "../models/category.model.js";

/**
 * Get all categories from database
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getAllCategories = async (req, res) => {
  // Get all categories from DB
  Category.findAll()
    .then((category) => res.json(category))
    .catch((error) => res.status(500).json({ message: error.message }));
};

/**
 * Get category from database by id
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getCategoryById = async (req, res) => {
  // Get category ID from request params
  const { categoryId } = req.params; // Same as: categoryId = req.params.categoryId;

  // Get category by ID from DB
  Category.findByPk(categoryId)
    .then((category) =>
      !category
        ? res.status(404).json({ message: "Category not found" })
        : res.json(category),
    )
    .catch((error) => res.status(500).json({ message: error.message }));
};

/**
 * Create new category in database
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const createCategory = async (req, res) => {
  // Destructure request body to get values
  const { name } = req.body;

  // Validate the fields
  if (!Category.isCategoryFieldsValid(name)) {
    return res.status(400).json({ message: "Invalid fields" });
  }

  // Insert category in DB
  Category.create({ name })
    .then((newCategory) => res.json(newCategory)) // Send category to response as JSON
    .catch((error) => res.status(500).json({ message: error.message })); // Send error message
};

/**
 * Update a category in database by id
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const updateCategory = async (req, res) => {
  // Get category ID from request params
  const { categoryId } = req.params;

  // Destructure request body to get values
  const { name } = req.body;

  // Validate the fields
  if (!Category.isCategoryFieldsValid(name)) {
    return res.status(400).json({ message: "Invalid fields" });
  }

  // Update category
  Category.findByPk(categoryId)
    .then((category) => {
      // Check if category exists
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      // Update category data
      category.set({ name });

      // Save it in DB
      category.save().then((updatedCategory) => res.json(updatedCategory));
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};

/**
 * Delete a category from database by id
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const deleteCategory = async (req, res) => {
  // Get category ID from params
  const { categoryId } = req.params;

  // Delete category from DB
  Category.destroy({ where: { id: categoryId } })
    .then((num) => {
      if (num === 0) {
        // Send error message
        res.status(404).json({ message: "Category not found" });
      } else {
        // Send success message
        res.json({ message: "Category deleted successfully!" });
      }
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};
