import { Page } from "../models/page.model.js";

/**
 * Get all pages from database
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getAllPages = async (req, res) => {
  // Get all pages from DB
  Page.findAll()
    .then((page) => res.json(page))
    .catch((error) => res.status(500).json({ message: error.message }));
};

/**
 * Get page from database by id
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getPageById = async (req, res) => {
  // Get page ID from request params
  const { pageId } = req.params; // Same as: pageId = req.params.pageId;

  // Get page by ID from DB
  Page.findByPk(pageId)
    .then((page) =>
      !page
        ? res.status(404).json({ message: "Page not found" })
        : res.json(page),
    )
    .catch((error) => res.status(500).json({ message: error.message }));
};

/**
 * Create new page in database
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const createPage = async (req, res) => {
  // Destructure request body to get values
  const { name } = req.body;

  // Validate the fields
  if (!Page.isPageFieldsValid(name)) {
    return res.status(400).json({ message: "Invalid fields" });
  }

  // Insert page in DB
  Page.create({ name })
    .then((newPage) => res.json(newPage)) // Send page to response as JSON
    .catch((error) => res.status(500).json({ message: error.message })); // Send error message
};

/**
 * Update a page in database by id
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const updatePage = async (req, res) => {
  // Get page ID from request params
  const { pageId } = req.params;

  // Destructure request body to get values
  const { name } = req.body;

  // Validate the fields
  if (!Page.isPageFieldsValid(name)) {
    return res.status(400).json({ message: "Invalid fields" });
  }

  // Update page
  Page.findByPk(pageId)
    .then((page) => {
      // Check if page exists
      if (!page) {
        return res.status(404).json({ message: "Page not found" });
      }

      // Update page data
      page.set({ name });

      // Save it in DB
      page.save().then((updatedPage) => res.json(updatedPage));
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};

/**
 * Delete a page from database by id
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const deletePage = async (req, res) => {
  // Get page ID from params
  const { pageId } = req.params;

  // Delete page from DB
  Page.destroy({ where: { id: pageId } })
    .then((num) => {
      if (num === 0) {
        // Send error message
        res.status(404).json({ message: "Page not found" });
      } else {
        // Send success message
        res.json({ message: "Page deleted successfully!" });
      }
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};
