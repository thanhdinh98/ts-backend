import Product, { ProductAttribute } from "./product";
import ProductTag, { ProductTagAttribute } from "./product-tag";
import BlockUser, { BlockUserAttribute } from "./block-user";

export type ProductModel = ProductAttribute;
export type ProductTagModel = ProductTagAttribute;
export type BlockUserModel = BlockUserAttribute;

export default {
  Product,
  ProductTag,
  BlockUser,
};
