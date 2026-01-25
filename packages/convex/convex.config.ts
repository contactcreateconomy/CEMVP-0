import { defineApp } from "convex/compat";
import * as schema from "./schema";
import * as functions from "./server";

export default defineApp({
  schema: {
    ...schema,
  },
  ...functions,
});
