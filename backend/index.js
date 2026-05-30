const express = require("express");
const DBConnection = require("./db/dbConnect");
const routes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


DBConnection();
app.use('/', routes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});