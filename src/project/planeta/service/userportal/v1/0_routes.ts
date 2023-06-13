import {
  Express,
} from "express";

import productApi from "./product_api";

export default function InitRouteV1(app: Express) {
  app.post("/list/", productApi.ProductList);
}
