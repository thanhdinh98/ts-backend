import { Request, Response } from "express";
import _helper from "./0_helper";
import comutils from "../../../../../common/comutils";
import productmod from "../../../lib/productmod";
import { ProductAttribute } from "../../../dbmodels/product";

type ProductListRequest = {
  paging: {
    limit: number
    offset: number
  }
  tag: string
};

type ProductListResponse = {
  products: {
    name: any,
    description: any
    slug: string
    tags: string[]
    options: any,
    create_time: number
  }[],
  paging:{
    limit: number
    offset: number
    total: number
  }
};

async function ProductList(req: Request, res: Response): Promise<Error | any> {
  let reqModel = _helper.LoadRequestBody<ProductListRequest>(req.body, {
  });
  if (comutils.IsError(reqModel)) {
    return <Error>reqModel;
  }
  reqModel = <ProductListRequest>reqModel;
  let products = await productmod.GetListProduct();
  if (comutils.IsError(products)) {
    return <Error>products;
  }
  products = <ProductAttribute[]>products;
  const resModel:ProductListResponse = {
    products: products.map((product) => ({
      name: product.Name,
      description: product.Description,
      slug: product.Slug,
      tags: product.Tags,
      options: product.Options,
      create_time: product.CreateTime,
    })),
    paging: {
      limit: 1,
      offset: 1,
      total: 1,
    },
  };
  return res.json(resModel);
}

export default {
  ProductList,
};
