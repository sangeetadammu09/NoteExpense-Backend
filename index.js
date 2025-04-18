import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from "path";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import transactionCategoryRoutes from "./routes/transactioncategory.routes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

const allowedOrigins = [
	"http://localhost:5173",
//	"https://expense-tracker-app-three-beryl.vercel.app",
	// add more origins as needed
  ];
  

//app.use(cors({ origin: "http://localhost:5173", credentials: false }));

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(
	cors({
	  origin: allowedOrigins,
	  credentials: true,
	  methods: ["GET", "POST", "PUT", "DELETE"],
	})
  );
  app.use(helmet());
  app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cookieParser()); // allows us to parse incoming cookies

app.use("/api/auth", authRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/transaction/category", transactionCategoryRoutes);

app.get("/welcome", (req, res) => {
	console.log('welcome')
});

// if (process.env.NODE_ENV === "development") {
// 	app.use(express.static(path.join(__dirname, "/frontend/dist")));

// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// 	});
// }

app.listen(PORT, () => {
	connectDB();
	console.log("Server is running on port: ", PORT);
});