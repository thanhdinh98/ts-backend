import {
  DataTypes, Model, ModelStatic,
} from "sequelize";

import comtypes from "../../../common/comtypes";
import GetConnection from "../../../database/connection";

const vProductTagDefineSinlgeton = comtypes.NewSingleton(async () => {
  const connection = await GetConnection();
  return connection?.define<ProductTagAttribute>("Product", {
    Id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: DataTypes.JSONB,
    Slug: DataTypes.STRING,
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

export class ProductTagAttribute extends Model {
  Id!: number;
  Name!: string;
  Slug!: string;
  CreateTime!: number;
  UpdateTime!: number;
  DeleteTime!: number;
}

type ProductGetter = {
  productTagAction: ModelStatic<ProductTagAttribute> | undefined
  newTagProduct: ProductTagAttribute | undefined
};

export default async function Product(): Promise<ProductGetter> {
  const product = await vProductTagDefineSinlgeton.Get();
  return {
    productTagAction: product,
    newTagProduct: product?.build(),
  };
}
