const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const helmet = require("helmet");
// const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const path = require("path")
const cors = require("cors");
dotenv.config();
const multer = require("multer");
// MongoDB connection
const mongourl = process.env.MONGO_URL;
mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));
const storage = multer.diskStorage({  
  destination:(req,file,cb)=>{
    cb(null,"public/images")
  },
  filename:(req,file,cb)=>{
cb(null,req.body.name)
  }
})

const upload  = multer({storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
  try {
    return res.status(200).json("File upload successful")
  } catch (error) {
    
  }
})

// Middleware
app.use(express.json());
// app.use(helmet());
// app.use(morgan("common"));
app.use(cors());
// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/images",express.static(path.join(__dirname,"public/images")))
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
