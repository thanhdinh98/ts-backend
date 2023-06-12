import { Sequelize } from "sequelize";

import comtypes from "@/common/comtypes";
import connclose from "@/connclose";

const vDbConnection = comtypes.NewSingleton(() => {
  const sequelize = new Sequelize();
  connclose.RegisterCloser(sequelize.close);
  return sequelize;
});

export default function GetConnection() {
  return vDbConnection.Get();
}
