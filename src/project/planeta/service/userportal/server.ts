import express from "express";
import InitRouteV1 from "./v1/0_routes";

export default function UserPortalServer() {
  const app = express();
  InitRouteV1(app);
  app.listen(8080, () => {
    console.log("App is listening on port 8080");
  });
}
