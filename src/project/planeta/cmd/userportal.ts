import UserPortalServer from "../service/userportal/server";
import rootCmd from "./root";

const userPortalCmd = rootCmd.command("user-portal");
userPortalCmd.command("http").action(() => {
  UserPortalServer();
});
