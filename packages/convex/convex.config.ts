import { defineApp } from "convex/server";
import auth from "./convex/auth";
import server from "./server";

export default defineApp({
  auth,
  ...server,
});
