const express = require("express");
const path = require("path");

const fileRoutes = require("./routes/files");

const app = express();
const PORT = 3000;

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/files", fileRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
