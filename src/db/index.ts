import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle(process.env.DATABASE_URL!);

export { users } from "./schema/users";
export { sessions } from "./schema/sessions";
export { accounts } from "./schema/accounts";
export { verifications } from "./schema/verifications";
