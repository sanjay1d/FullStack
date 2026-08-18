const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

console.log("MONGO_URI =", process.env.MONGO_URI);

const connectDB = require("./config/db");
connectDB();



const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const { getTasks } = require("./controllers/taskcontroller");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/api/tasks', taskRoutes);

app.use('/api/auth', authRoutes);

app.get('/', authMiddleware.protect, getTasks);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});