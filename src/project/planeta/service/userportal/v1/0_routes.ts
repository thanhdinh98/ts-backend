import {
  Express, Router,
} from "express";

import productApi from "./product_api";

export default function InitRouteV1(app: Express) {
  const productRouter = Router();
  productRouter.post("/list/", productApi.ProductList);
  productRouter.post("/get/", productApi.ProductGet);
  productRouter.post("/tag/list/", productApi.ProductTagList);

  app.use("/product", productRouter);
}
