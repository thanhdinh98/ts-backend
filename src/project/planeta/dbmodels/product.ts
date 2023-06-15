import {
  DataTypes, Model, ModelStatic,
} from "sequelize";
import GetConnection from "../../../database/connection";
import comtypes from "../../../common/comtypes";

const vProductDefineSinlgeton = comtypes.NewSingleton(async () => {
  const connection = await GetConnection();
  return connection?.define<ProductAttribute>("Product", {
    Id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: DataTypes.JSONB,
    Slug: DataTypes.STRING,
    Tags: DataTypes.ARRAY(DataTypes.STRING),
    Description: DataTypes.JSONB,
    Options: DataTypes.JSONB,
    CreateTime: DataTypes.BIGINT,
    UpdateTime: DataTypes.BIGINT,
    DeleteTime: DataTypes.BIGINT,
  }, {
    tableName: "product",
    timestamps: true,
    updatedAt: "UpdateTime",
    createdAt: "CreateTime",
    deletedAt: "DeleteTime",
  });
});

type Option = {
  [key: string]: {
    AdditionPrice: number
    Value: string
  }[]
};

type LocaleString = {
  [locale: string]: string
};

export class ProductAttribute extends Model {
  Id!: number;
  Name!: LocaleString;
  Slug!: string;
  Tags!: string[];
  Description!: LocaleString;
  Options!: Option[];
  CreateTime!: number;
  UpdateTime!: number;
  DeleteTime!: number;
}

type ProductGetter = {
  productAction: ModelStatic<ProductAttribute> | undefined
  newProduct: ProductAttribute | undefined
};

export default async function Product(): Promise<ProductGetter> {
  const product = await vProductDefineSinlgeton.Get();
  return {
    productAction: product,
    newProduct: product?.build(),
  };
}
