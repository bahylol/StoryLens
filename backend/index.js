require("dotenv").config();
const express = require("express");
 
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
	res.send("Server is running up and healthy");
  });
  
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));