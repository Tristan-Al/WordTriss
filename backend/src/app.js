import express from "express";
import cors from "cors";

// Routes imports
import apiRoutes from "./routes/api.routes.js";

const app = express();

// Config App Express
app.use(cors()); // Enable cors
app.use(express.json()); // Parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true })); // Parse requests of content-type - application/x-www-form-urlencoded

// Routes
app.use("/api", apiRoutes);

// Export Express app
export default app;
