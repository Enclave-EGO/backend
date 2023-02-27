import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import cookieParse from "cookie-parser";
import routing from "./routes";
import connectDatabase from "./configs/connectDatabase";
import { PORT, SWAGGER_URL, LOCALHOST_URL } from "./constants";
const app: Express = express();

// Config Swagger
const swaggerOptions: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "SwaggerUI",
      version: "1.0.0",
      description: "A simple Express Library API"
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

// Connect DB & Routing
connectDatabase();
routing(app);

app.listen(PORT, () => {
  console.log(`Server is listening at ${LOCALHOST_URL}`);
  console.log(`API Documentation: ${SWAGGER_URL}`);
});
