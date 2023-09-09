// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost/WeBuzz';
const secretKey = process.env.TOKEN_SECRET;


// ℹ️ Connects to the database
require("./db");


// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const { isAuthenticated } = require("./middleware/jwt.middleware");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const profileRouter = require('./routes/profile.routes');
app.use('/api', profileRouter);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes );

const projectRoutes = require("./routes/projects.routes");
app.use("/api", projectRoutes);


// REMOVED THE isAuthenticated from the route projects!!
// const projectRoutes = require("./routes/projects.routes");
// app.use("/api", isAuthenticated, projectRoutes);


const profileRoutes = require("./routes/profile.routes")
app.use("/api", profileRoutes);

// //Colab Finder Page Routes
// const colabPageRoutes = require("./routes/colabFinder.routes");
// app.use("/colab", colabPageRoutes);

// //Private Messaging Routes
// const messageRoutes = require("./routes/message.routes");
// app.use("/message", messageRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
