import { Sequelize } from "sequelize";

import comtypes from "@/common/comtypes";
import { Singleton, Get } from "@/common/comtypes/singleton";
import { RegisterCloser } from "@/connclose/manager";

const vDbConnection:Singleton<Sequelize> = comtypes.NewSingleton(() => {
  const sequelize = new Sequelize();
  RegisterCloser(sequelize.close);
  return sequelize;
});

export default function GetConnection() {
  return Get(vDbConnection);
}
