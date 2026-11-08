import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/social_events";
const client = new MongoClient(uri);
const db = client.db();

// The Express API checks both claims against this exact URL.
const baseURL = process.env.BETTER_AUTH_URL?.replace(/\/+$/, "");

const googleId = process.env.GOOGLE_CLIENT_ID;
const googleSecret = process.env.GOOGLE_CLIENT_SECRET;

export const auth = betterAuth({
  baseURL,
  // Atlas supports transactions, but a standalone local mongod does not.
  database: mongodbAdapter(db, uri.startsWith("mongodb+srv") ? { client } : undefined),
  // The brief allows 6-character passwords. The form checks the letter rules.
  emailAndPassword: { enabled: true, minPasswordLength: 6 },
    account: { accountLinking: { enabled: true, trustedProviders: ["google"] } },
  socialProviders:
    googleId && googleSecret
      ? { google: { clientId: googleId, clientSecret: googleSecret } }
      : undefined,
  plugins: [
    jwt({
      jwt: {
        issuer: baseURL,
        audience: baseURL,
        // The Express API reads these claims. The user id is the token's subject.
        definePayload: ({ user }) => ({
          name: user.name,
          email: user.email,
          image: user.image ?? null,
        }),
      },
    }),
    nextCookies(), // must stay last
  ],
});
