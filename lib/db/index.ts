import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL isn't set in .env");
}

export const connection = postgres(process.env.DATABASE_URL, { max: 1 });
export const db = drizzle(connection);
