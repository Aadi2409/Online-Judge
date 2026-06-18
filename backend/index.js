const express = require("express");
const DBConnection = require("./db/dbConnect");
const authRoutes = require("./routes/authRoutes");
const problemRoutes = require("./routes/problemRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");



const app = express();

app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


DBConnection();
app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});