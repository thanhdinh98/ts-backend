import { Express, Request, Response } from "express";

export default function InitRouteV1(group: Express) {
  group.get("/get/", (req: Request, res: Response) => res.status(200));
}
