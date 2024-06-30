const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const db = require("./src/db/connection");
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// Define routes
const routerUser = require("./src/routes/userRoute");
const routerTask = require("./src/routes/taskRoute");
app.use("/api/user", routerUser);
app.use("/api/tasks", routerTask);

// Start the server
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));

// Database connection error handling
db.on("error", console.error.bind(console, "MongoDB connection error:"));
