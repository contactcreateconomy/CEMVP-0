import { SignIn } from "@createconomy/ui";

export default function SignInPage() {
  return <SignIn signUpHref="/signup" />;
}

export const metadata = {
  title: "Sign In - Createconomy Admin",
  description: "Sign in to your Createconomy Admin console",
};
