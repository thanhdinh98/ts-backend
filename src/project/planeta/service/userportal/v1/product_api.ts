import { NextFunction, Request, Response } from "express";
import _helper from "./0_helper";
import comutils from "../../../../../common/comutils";
import productmod from "../../../lib/productmod";
import { ProductAttribute } from "../../../dbmodels/product";
import { ProductTagAttribute } from "../../../dbmodels/product-tag";

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

async function ProductList(req: Request, res: Response, next: NextFunction) {
  const reqModel = _helper.LoadRequestBody<ProductListRequest>(req.body, {
  });
  if (comutils.IsError(reqModel)) {
    next(<Error>reqModel);
    return;
  }
  let products = await productmod.GetListProduct();
  if (comutils.IsError(products)) {
    next(<Error>products);
    return;
  }
  products = <ProductAttribute[]>products;
  _helper.SendJSON<ProductListResponse>(res, {
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
  });
}

type ProductGetRequest = {
  slug: string
};

type ProductGetResponse = {
  product: {
    name: any,
    description: any
    slug: string
    tags: string[]
    options: any,
    create_time: number
  }
};

async function ProductGet(req: Request, res: Response, next: NextFunction) {
  const reqModel = _helper.LoadRequestBody<ProductGetRequest>(req.body, {
  });
  if (comutils.IsError(reqModel)) {
    next(<Error>reqModel);
    return;
  }
  let product = await productmod.GetProductDetailBySlug((<ProductGetRequest>reqModel).slug);
  if (comutils.IsError(product)) {
    next(<Error>product);
  }
  product = <ProductAttribute>product;
  _helper.SendJSON<ProductGetResponse>(res, {
    product: {
      name: product.Name,
      description: product.Description,
      slug: product.Slug,
      tags: product.Tags,
      options: product.Options,
      create_time: product.CreateTime,
    },
  });
}

type ProductTagListResponse = {
  product_tags: {
    name: string
    slug: string
    create_time: number
  }[]
};

async function ProductTagList(req: Request, res: Response, next: NextFunction) {
  let productTags = await productmod.GetProductTags();
  if (comutils.IsError(productTags)) {
    next(<Error>productTags);
    return;
  }
  productTags = <ProductTagAttribute[]>productTags;
  _helper.SendJSON<ProductTagListResponse>(res, {
    product_tags: productTags.map((productTag) => ({
      name: productTag.Name,
      slug: productTag.Slug,
      create_time: productTag.CreateTime,
    })),
  });
}

export default {
  ProductGet,
  ProductList,
  ProductTagList,
};
