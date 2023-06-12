import express from "express";
import InitRouteV1 from "./v1/0_routes";
import { CloseConnections } from "@/connclose/manager";

export default function UserPortalServer() {
  const app = express();
  InitRouteV1(app);
  const listenedApp = app.listen(8080, () => {
    console.log("App is listening on port 8080");
  });

  process.on("SIGTERM", () => {
    console.log("SIGTERM signal received: closing HTTP server");
    listenedApp.close(() => {
      CloseConnections();
      console.log("HTTP server closed");
    });
  });
}
