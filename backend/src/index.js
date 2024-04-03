import app from "./app.js";
import { db } from "./config/database.js";

// Config .env
import dotenv from "dotenv";
dotenv.config();

// Get port of .env file
const PORT = process.env.API_SERVER_PORT || 3000;

/**
 * Main function to Start the API server
 */
async function main() {
  try {
    await db.sync(); // With { force: true }, all tables are dropped and recreated
    // await initialSetup();
    app.listen(PORT, () => {
      console.log(`Server running on: http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
}

// Start server
main();
