import { createAuthClient } from "better-auth/react";

import { stripeClient } from "@better-auth/stripe/client";

export const { signIn, signUp, signOut, useSession } = createAuthClient({
  plugins: [
    stripeClient({
      subscription: true, //if you want to enable subscription management
    }),
  ],
});
