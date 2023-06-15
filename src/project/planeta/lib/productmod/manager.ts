import comerr from "../../../../common/comerr";
import errors from "../../../../common/comerr/errors";
import dbmodels, {
  ProductModel,
  ProductTagModel,
} from "../../dbmodels";

export async function GetListProduct(): Promise<ProductModel[] | Error> {
  try {
    const {
      productAction,
    } = await dbmodels.Product();
    const products = await productAction?.findAll();
    if (typeof products === "undefined") {
      return comerr
        .WrapMessage(errors.ErrorServerUnknown
          .Wrap("undefined object"), "fetch products faield");
    }
    return products;
  } catch (err) {
    return comerr
      .WrapMessage(errors.ErrorServerUnknown
        .Wrap(err as Error), "fetch product failed");
  }
}

export async function GetProductDetailBySlug(slug:string) : Promise<ProductModel | Error> {
  try {
    const {
      productAction,
    } = await dbmodels.Product();
    const product = await productAction?.findOne({
      where: {
        id: slug,
      },
    });
    if (typeof product === "undefined") {
      return comerr
        .WrapMessage(errors.ErrorServerUnknown
          .Wrap("undefined object"), "fetch products faield");
    }
    if (product === null) {
      return comerr
        .WrapMessage(errors.ErrorDataNotFound
          .Wrap("no product found"), "fetch product detail failed");
    }
    return product;
  } catch (err) {
    return comerr
      .WrapMessage(errors.ErrorServerUnknown
        .Wrap(err as Error), "fetch product failed");
  }
}

export async function GetProductTags(): Promise<ProductTagModel[] | Error> {
  try {
    const { productTagAction } = await dbmodels.ProductTag();
    const productTags = await productTagAction?.findAll();
    if (typeof productTags === "undefined") {
      return comerr
        .WrapMessage(errors.ErrorServerUnknown
          .Wrap("undefined object"), "fetch product tags faield");
    }
    return productTags;
  } catch (err) {
    return comerr
      .WrapMessage(errors.ErrorServerUnknown
        .Wrap(err as Error), "fetch product tags failed");
  }
}
