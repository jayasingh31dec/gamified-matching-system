const app = require("./app"); // Import the app instance from app.js

const PORT = process.env.PORT || 3020; // Set port number

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
