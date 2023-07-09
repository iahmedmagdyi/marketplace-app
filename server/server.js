const express = require("express");
const dbConfig = require("./config/dbconfig");
require("dotenv").config();
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const bidRoute = require("./routes/bidsRoute");
const notificationRoute = require("./routes/notificationRoute");
const app = express();
app.use(express.json());
app.use(cors());

//routes
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/bids", bidRoute);
app.use("/api/notifications", notificationRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

// deployment config
const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
