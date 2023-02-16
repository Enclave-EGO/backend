import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import cookieParse from "cookie-parser";
import routing from "./routes/index.js";
import connectDatabase from "./configs/connectDatabase/index.js";

const app = express();
dotenv.config();

// Config Swagger
// const swaggerOptions = {
// 	definition: {
// 		openapi: "3.0.3",
// 		info: {
// 			title: "SwaggerUI",
// 			version: "1.0.0",
// 			description: "A simple Express Library API"
// 		},
// 		servers: [
// 			{
// 				url: "http://localhost:4000/",
// 				description: "Development"
// 			}
// 		]
// 	},
// 	apis: ["**/*.yaml"]
// };
// const swaggerSpecs = swaggerJsDoc(swaggerOptions);
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParse());

// Connect DB & Routing
connectDatabase(app);
routing(app);



