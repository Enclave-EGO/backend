import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import cookieParse from "cookie-parser";
import routing from "./routes/index.js";
import connectDatabase from "./configs/connectDatabase/index.js";
import { PORT, SWAGGER_URL, LOCALHOST_URL } from "./constants/index.js";
const app = express();

// Config Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "SwaggerUI",
      version: "1.0.0",
      description: "A Simple Express Library API"
    },
    servers: [
      {
        url: LOCALHOST_URL,
        description: "Development"
      }
    ]
  },
  apis: ["**/*.yaml"]
};
const swaggerSpecs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParse());

const server = app.listen(PORT, () => {
  console.log(`Server is listening at ${LOCALHOST_URL}`);
  console.log(`API Documentation: ${SWAGGER_URL}`);
});

// Connect DB & Routing
connectDatabase(server);
routing(app);
