import {
  Express, Router,
} from "express";

export default function InitRouteV1(app: Express) {
  const productRouter = Router();
  productRouter.post("/list/");

  app.use("/product", productRouter);
}
