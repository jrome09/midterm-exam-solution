import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { productRouter } from "./products/product.routes";
import { userRouter } from "./users/users.routes";

dotenv.config();

if (!process.env.PORT) {
  console.log(`No port value specified...`);
}

const PORT = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use("/", userRouter);
app.use("/", productRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
