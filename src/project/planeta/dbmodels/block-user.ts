import {
  DataTypes, Model, ModelStatic,
} from "sequelize";
import GetConnection from "../../../database/connection";
import comtypes from "../../../common/comtypes";

const vBlockUserDefineSinlgeton = comtypes.NewSingleton(async () => {
  const connection = await GetConnection();
  return connection?.define<BlockUserAttribute>("BlockUser", {
    Id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    Ip: DataTypes.STRING,
    Reason: DataTypes.STRING,
    Country: DataTypes.STRING,
    CreateTime: DataTypes.BIGINT,
    UpdateTime: DataTypes.BIGINT,
    DeleteTime: DataTypes.BIGINT,
  }, {
    tableName: "block_user",
    timestamps: true,
    updatedAt: "UpdateTime",
    createdAt: "CreateTime",
    deletedAt: "DeleteTime",
  });
});

export class BlockUserAttribute extends Model {
  Id!: number;
  Ip!: string;
  Country!: string;
  Reason!: string;
  CreateTime!: number;
  UpdateTime!: number;
  DeleteTime!: number;
}

type BlockUserGetter = {
  blockUserAction: ModelStatic<BlockUserAttribute> | undefined
  newBlockUser: BlockUserAttribute | undefined
};

export default async function BlockUser(): Promise<BlockUserGetter> {
  const product = await vBlockUserDefineSinlgeton.Get();
  return {
    blockUserAction: product,
    newBlockUser: product?.build(),
  };
}
